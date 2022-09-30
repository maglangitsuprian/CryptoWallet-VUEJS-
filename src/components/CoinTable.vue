<template>

<b-row class="mb-4 coin-table py-2 px-2">
    <b-col>
        <b-row class="text-center mb-2">
            <b-col class="text-muted">COIN</b-col>
            <b-col class="text-muted">BALANCE</b-col>
            <b-col class="text-muted">COIN PRICE</b-col>
        </b-row>
        <b-row class="crypto-tab mb-2 py-2 p-3" v-for="(price, index) in store.state.prices" :key="index">
            
            <b-col>
                <b-row>
                    <b-col class="text-center"><img :src="require(`../assets/${index}.png`)" :alt="index"></b-col>
                    <b-col class="text-end">{{(totalQuantity(index)).toFixed(5)}} {{(index).toUpperCase()}}</b-col>
                    <b-col class="text-end " :class="Math.sign(price.usd_24h_change) === -1 ? 'text-danger': 'text-success'">{{(price.usd_24h_change).toFixed(2)}}%</b-col>
                 </b-row>
                <b-row>
                    <b-col class="text-center">{{index.toUpperCase()}}</b-col>
                    <b-col class="text text-muted text-end">${{(cryptoValue(index)).toFixed(2)}}</b-col>
                    <b-col class="text text-muted text-end">${{(price.usd).toFixed(2)}}</b-col>
                </b-row>
            </b-col>
        </b-row>
      {{totalBalanceMain}}
      {{tether}}

    </b-col>

</b-row>
   


</template>


<script>
import { computed, onMounted, ref } from 'vue'
import store from '../store/store'

export default {
    name: 'CoinTable',
    setup() {
        
        // let prices = ref({})
        // const tickerDelay = 1000
        // const coins =  ref(["bitcoin", "ethereum", "tether"])
        // const prices = computed(()=>store.state.prices)
        // const bitcoinQuantity = computed(()=> store.state.bitcoinQuantity)
        // setInterval(async()=>{
        //     const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coins.value.join("%2C")}&vs_currencies=usd&include_24hr_change=true`)  
        //     prices.value = res.data
        // }, tickerDelay)
        onMounted(()=>{
            store.dispatch("getPrice")
        })
        
            // const transaction = [
            //     {type: "bitcoin", quantity: 5, action: 'buy'},
            //     {type: "bitcoin", quantity: 5, action: 'buy'},
            //     {type: "bitcoin", quantity: 5},
            //     {type: "bitcoin", quantity: 5},
            //     {type: "bitcoin", quantity: 5},     
            //     {type: "ethereum", quantity: 5},
            //     {type: "bitcoin", quantity: 5},   
            //     {type: "tether", quantity: 1},
            //     {type: "cardano", quantity: 100},
              
            // ]

        const totalQuantity = (type) => {
            // return "totalBalance "+type

            let total = 0
            store.state.transaction.forEach(t => {
                if(t.type===type && t.action === 'buy') {
                    total += t.quantity}
                else if(t.type===type && t.action === 'sell') {
                    total -= t.quantity
                }
            })
             return total
        }

        const cryptoValue = (type) => {
            let value = 0 
            let total = 0
           
            store.state.transaction.forEach(t => {
                if(t.type===type && t.action === 'buy') {
                    total += t.quantity
                
                } else if(t.type===type && t.action === 'sell'){
                    total -= t.quantity
                      
                }
                store.state.transaction.forEach(t => {
                if(t.type === type){
                let cryptoPrice = (store.state.prices[type].usd)
                
                 value = total * cryptoPrice
                
                    }
                }) 
            })
                
                return value    
                
                  
             
        }

        const totalBalance = () => {
            let total = 0
            store.state.coins.forEach(coin => {
              total +=  cryptoValue(coin)
            })
            return total.toFixed(2)
        }

        const totalBalanceMain = computed(()=>store.commit('totalBalanceMain', totalBalance()))

        const tether = computed(()=> store.commit('tether', cryptoValue('tether')))


        
        return { store, cryptoValue, totalQuantity, totalBalance, totalBalanceMain, tether}
    },
}
</script>


<style scoped>
.coin-table {
    background-color: white;
    border-radius: 10px;
    border: none;
    box-shadow: 1px 1px;
    
}
.crypto-tab{
    border-radius:20px;
    border: none;
    box-shadow: 1px 1px 1px 1px;
    cursor: pointer;
}
</style>