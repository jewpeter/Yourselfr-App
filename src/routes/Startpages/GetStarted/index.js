export default (store) => ({
  path: 'i/get-started',
  getComponent (nextState, cb) {
    require.ensure([], require => {
      const GetStarted = require('./GetStarted').default
      cb(null, GetStarted)
    }, 'GetStarted')
  }
})
