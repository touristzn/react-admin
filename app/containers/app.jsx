import React from 'react'
import Reflux from 'Reflux'
import { NavLink, withRouter } from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import IosArrowUp from 'react-ionicons/lib/IosArrowUp'
import IosArrowDown from 'react-ionicons/lib/IosArrowDown'
import withI18n from '@/components/withI18n'
import { getCity, getLocation, login } from '@/fetch/pulic'
import mainAction from '@/reflux/action'
import mainStore from '@/reflux/store'
import menus from '@/static/utils/menus'
import { getQueryString } from '@/static/utils/site'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      menuData: null,
      showLang: false,
    }
  }

  componentDidMount() {
    // 开发和ut环境不执行登录流程
    if (process.env.NODE_ENV === 'development') {
      this.noLogin()
    }
    // staging和production环境执行登录流程
    this.loginServer()
  }

  // 登录
  loginServer = async () => {
    // 从url中获取spacetation传过来的token
    const token = getQueryString('token') || null
    // token不存在，跳出
    if ( !token ) return
    // 下面执行登录流程
    // 通过 `spacetation token` 去后端获取accessToken和用户信息
    const loginUser = await login({ token });
    // 将数据存入store
    if (loginUser.code === 0) {
      this.setMenu()
      mainAction.loginUser(loginUser.data);
      this.getData()
    }
  }

  // dev和ut环境不登录
  noLogin = () => {
    const user = {
      id: 10,
      name: 'xf',
      email: 'xinfeng.zhao2@wework.com',
      uuid: null,
      roles: [{ id: 13, name: 'engineer' }],
      accessToken:
        'eyJraWQiOiJFRjRGMjJDMC01Q0IwLTQzNDgtOTY3Qi0wMjY0OTVFN0VGQzgiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJ3d2NoaW5hIiwiYXVkIjoid3djaGluYS1pb3MiLCJzdWIiOiIiLCJpYXQiOjE1NDY0MDA0NDMsImp0aSI6IjJiYzMyMWM2LWNhZGYtNDQyYS1iY2M5LWE1NzM1NTEyYjUxMyIsInVpZCI6LTF9.lT_kQ0Ctt6_UA_diBA7vxtN-HTcq5HrQer7Epb3QeW6_eC2-OsVQctqUZA0A-gjndNM6FWl8-581GDHdlEuxSg',
      refreshToken: '770ec2a1-1669-4bf2-a7cb-782fb9123be4',
    }
    mainAction.loginUser(user);
    this.setMenu()
    this.getData()
  }

  // 渲染菜单
  setMenu = () => {
    const userRoles = mainStore.loginUser.roles
    let filterMenus = []
    let roles = []
    // 筛选出当前用户的所有角色下可以显示的页面
    userRoles.forEach(role => {
      return roles.push(role.name)
    });

    const mainMenu = menus.map((item, i) => {
      let menu = {
        title: item.title,
      }

      let childrens = item.children.filter(ele => {
       // 过滤菜单
       let subMenus = ele.filterRoles.filter(val => {
          return roles.indexOf(val) !== -1
        });

        return subMenus.length > 0
      });

      if (childrens.length > 0) {
        menu.children = childrens;
        filterMenus.push(menu)
      }
      
      if (filterMenus.length > 0) {
        // 根据权限筛选显示菜单中的第一个页面为首页并跳转到该页面
        const url = `${filterMenus[0].children[0].path}`;
        this.props.history.push(url)
        mainAction.PathName(url)

        // 生成菜单
        const subMenu = childrens.map((val, j) => {
          return (
            <li key={j}>
              <NavLink
                to={val.path}
                onClick={() => {this.getUrl(val.path)}}
              >
                { val.title }
              </NavLink>
            </li>
          )
        })
  
        return (
          <div className="nav-list" key={i}>
            <span className="nav-list_title">
              { item.title }
            </span>
            <ul>
              { subMenu }
            </ul>
          </div>
        )
      }
    })
    
    this.setState({
      menuData: mainMenu
    })
  }


  // 拉取城市和社区列表，存入store
  getData = async () => {
    const data = await Promise.all([getCity(), getLocation()])
    mainAction.getCities(data[0].data)
    mainAction.getLocations(data[1].data)
  }

  // 存入当前的pathname
  getUrl = (url) => {
    mainAction.PathName(url)
  }

  // 切换语言
  selectLanguages = () => {
    const { showLang } = this.state
    this.setState({ showLang: !showLang })
  }

  // 点击内容区域关闭选择语言下拉菜单
  closeSelectLang = () => {
    const { showLang } = this.state;
    if (showLang) this.setState({ showLang: false })
  }

  render() {
    const { __ } = this.props
    const { menuData, showLang } = this.state
    const pathname = mainStore.pathname
    const languages = mainStore.languages.map((item, i) => {
      return (
        <li key={i}>
          <a href={`/${item.key}${pathname}`}>
            { item.label }
          </a>
        </li>
      )
    })

    return (
      <React.Fragment>
        <div className="header">
          <div className="header_lang">
            <span
              onClick={this.selectLanguages}
            >
              { __('语言') }
              {
                showLang
                ? <IosArrowUp fontSize="14px" color="#333" />
                : <IosArrowDown fontSize="14px" color="#333" />
              }
              {
                showLang &&
                <ul>
                  { languages }
                </ul>
              }
            </span>
          </div>
          <span>{ __('退出') }</span>
        </div>

        <div className="left-nav">
          <div className="exit">
            <img src={require('../static/images/wework.svg')} alt=""/>
          </div>

          { menuData }
        </div>

        <div className="right-page" onClick={this.closeSelectLang}>
          {this.props.children}
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withI18n(App));