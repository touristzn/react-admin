const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const koa = require('koa');
const views = require('koa-views');
const staticServe = require('koa-static')
const webpack = require('webpack')

const webpackConfig = require('../../build/webpack.prod.config');

// new app
const app = new koa();

const spinner = ora('building for production...');
spinner.start();

webpack(webpackConfig, (err, stats) => {
  spinner.stop();
  if (err) throw err;

  process.stdout.write(
    `${stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    })}\n\n`,
  );

  console.log(chalk.cyan('  Build complete.\n'));
  console.log(
    chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
        "  Opening index.html over file:// won't work.\n",
    ),
  );
});

app.use(staticServe(path.join(__dirname, '../../dist')));
app.use(views(path.join(__dirname, '../../dist'), {
  extension: 'ejs'
}));

app.use(async (ctx) => {
  await ctx.render('index.html');
});
