<template>
      <b-row>
        <b-col>
            <b-row class="mb-2 justify-content-center">
                <b-col cols="7">
                    <b-row class="my-1">
                        <b-form-input id="input-small" class="text-center" size="sm" placeholder="Enter Amount in USDT" v-model="amountEntered"></b-form-input>
                    </b-row>
                </b-col>
            </b-row>
            <b-row class="justify-content-center mb-2">
                <b-col cols="5" class="text-center">
                    <b-form-select v-model="selected" :options="coins"></b-form-select>
                </b-col>
            </b-row>
            <b-row class="justify-content-center mb-2">
                <b-col cols="5" class="text-center">
                    <b-button-group>
                        <b-button variant="success" @click="store.dispatch('buyCrypto')">Buy</b-button>
                        <b-button variant="danger" @click="store.dispatch('sellCrypto')">Sell</b-button>
                     </b-button-group>
                </b-col>
            </b-row>
        </b-col>
      </b-row>
      
</template>

<script>
import { computed } from 'vue'
import store from '../store/store'
export default {
    name: 'BuySellTab',
    setup() {
        const coins = computed(()=> {
            const coins = store.state.coins
            return coins.map((cryptoName) => {
                const title = cryptoName.charAt(0).toUpperCase()+cryptoName.slice(1)
                return {value: cryptoName, text:title}
            })
        })

        const selected = computed({
            get: () =>  store.state.selected,

            set: (selectedCoin) => {
                store.commit('selectedCoin', selectedCoin)
            }
        })

        const amountEntered = computed({
            get: ()=> store.state.amountEntered,
            set: (amountEntered)=> {
                store.commit('amountEntered', amountEntered)
            }
        })
    // //    const options = ref(  [
    // //       { value:  , text: 'Coin' },
    // //       { value: 'a', text: 'Bitcoin' },
    // //       { value: 'b', text: 'Ethereum' },
    // //       { value: 'c', text: 'Tether' },
    // //     ])
    //     const options = ref([{
            
    //             }])
        // const test = computed(()=>{
        //     store.state.coins.forEach(coin => {
        //     options.value['text'] = coin
        //     })
        // })
        
      
          
        
        
        
        return { store, coins, selected, amountEntered}
    },
}
</script>


<style scoped>

</style>