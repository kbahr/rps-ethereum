import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import network from './network'
import layout from './layout'
import route from './route'
import foundersWallet from './foundersWallet'
import scutixCoin from './scutixCoin'
import whitelist from './whitelist'
import contractEvents from './contractEvents'
import stateWatchers from './plugins/stateWatchers'

Vue.use(Vuex)

export default new Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    network,
    layout,
    route,
    foundersWallet,
    scutixCoin,
    whitelist,
    contractEvents
  },
  plugins: [stateWatchers]
})
