import Vue from 'vue'
import Vuex, { storeKey } from 'vuex'
import axios from 'axios'


Vue.use(Vuex)


const state = {
  totalBalance: 0,
  PnL: 0,
  coins: ["bitcoin", "ethereum", "tether"],
  prices: {},
  selected: null,
  amountEntered: null,
  depositWithdrawAmount: null,
  tether: 0,
  transaction: [],

  deposited: 0,

  items: [ { Type: null, Crypto: null, Cost:null, Price: null, Quantity: null}
  
  ]
 
 

  
}


const mutations = {
    getPrice(state, resData){
        state.prices = resData  
        return resData
    },  

    selectedCoin(state, selectedCoin) {
      state.selected = selectedCoin
    },
    amountEntered(state, amountEntered){
      state.amountEntered = parseInt(amountEntered)
    },
    buyCrypto(state, buy){
      state.transaction.push(buy)
      state.amountEntered = ''
      
    },
    sellCrypto(state, sell){
      state.transaction.push(sell)
      state.amountEntered = ''
      
    },
    depositWithdrawAmount(state, depositWithdrawAmount){
      state.depositWithdrawAmount =  parseInt(depositWithdrawAmount)
     
    },
    totalBalanceMain(state, totalBalance){
      state.totalBalance = parseInt(totalBalance)
    },
    deposit(state, depositTether){
      state.transaction.push(depositTether)
      state.depositWithdrawAmount = ''
    },
    sell(state){
      state.tetherQuantity--
    },
    withdraw(state, withdrawTether){
      state.transaction.push(withdrawTether)
      state.depositWithdrawAmount = ''
    },
    addTransaction(state, transaction){
      state.items.push(transaction)
    }, 
    tether(state, tetherValue){
      state.tether = tetherValue
    }, 
    tetherBuySell(state, tether){
      state.transaction.push(tether)
    }, 
    deposited(state, deposited){
      state.deposited += deposited
    },
    PnL(state){
     state.PnL = state.totalBalance - state.deposited
    }
    
}


const actions = {
    getPrice({commit, state}){
      setInterval(async()=>{
        const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${state.coins.join("%2C")}&vs_currencies=usd&include_24hr_change=true`)  
        commit('getPrice', res.data)
      },1000)
    },
   buyCrypto({commit,state}){
      if(state.tether>state.amountEntered){ 
      const value = ((state.amountEntered) / (state.prices[state.selected].usd))
      const buy = {type: state.selected, quantity:value, action: 'buy'}
      const transaction = {Type: 'Buy', Crypto: (state.selected).toUpperCase(), Cost: state.amountEntered, Price: state.prices[state.selected].usd, Quantity: value.toFixed(5)}
      const tether = {type: 'tether', quantity:state.amountEntered, action: 'sell'}
      commit('buyCrypto', buy)
      commit('addTransaction', transaction)
      commit('tetherBuySell', tether)
    }else {
      alert('Not enough USDT! Please deposit.')
    }
   },
   sellCrypto({commit,state}){
    const value = ((state.amountEntered) / (state.prices[state.selected].usd))
    const sell = {type: state.selected, quantity:value, action: 'sell'}
    const transaction = {Type: 'Sell', Crypto: (state.selected).toUpperCase(), Cost: state.amountEntered, Price: state.prices[state.selected].usd, Quantity: value.toFixed(5)}
    const tether = {type: 'tether', quantity:state.amountEntered, action: 'buy'}
    commit('sellCrypto', sell)
    commit('addTransaction', transaction)
    commit('tetherBuySell', tether)
 },
   deposit({commit,state}){
    const value = ((state.depositWithdrawAmount) / (state.prices.tether.usd))
    const deposited = state.depositWithdrawAmount
    const depositTether = {type: 'tether', quantity:value, action: 'buy'}
    const transaction = {Type: 'Deposit', Crypto: 'TETHER', Cost: state.depositWithdrawAmount, Price: state.prices['tether'].usd, Quantity: value.toFixed(5)}
    commit('deposit', depositTether )
    commit('addTransaction', transaction)
    commit('deposited', deposited)
   },
   withdraw({commit,state}){
    const value = ((state.depositWithdrawAmount) / (state.prices.tether.usd))
    const withdrawTether = {type: 'tether', quantity:value, action: 'sell'}
    const transaction = {Type: 'Withdraw', Crypto: 'TETHER', Cost: state.depositWithdrawAmount, Price: state.prices['tether'].usd, Quantity: value.toFixed(5)}
    commit('withdraw', withdrawTether )
    commit('addTransaction', transaction)
   },






}



export default new Vuex.Store({
  state,
  mutations,
  actions,
})

