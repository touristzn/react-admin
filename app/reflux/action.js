import Reflux from 'Reflux'

const mainAction = Reflux.createActions([
  'loginUser',
  'PathName',
  'getCities',
  'getLocations'
]);

module.exports = mainAction;