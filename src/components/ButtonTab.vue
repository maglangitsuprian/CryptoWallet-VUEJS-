<template>
    <b-col cols="3"  :class="{'deposit-button': transactionTitle === 'Deposit', 'withdraw-button': transactionTitle === 'Withdraw'}">
        <!-- Button Trigger Modal -->
        <b-button type="button"
            :variant="transactionTitle === 'Deposit'? 'warning': 'info'"
            size="sm"
            @click="modalShow = !modalShow">
            {{transactionTitle}}
        </b-button>

         <b-modal v-model="modalShow" :title="transactionTitle" @ok="transactionTitle==='Deposit'? store.dispatch('deposit', depositWithdrawAmount): store.dispatch('withdraw', depositWithdrawAmount)" >
            <b-input placeholder="Enter Amount of USDT" v-model="depositWithdrawAmount">
            </b-input>
        </b-modal>

       
    </b-col>
</template>

<script>

import { ref,computed } from 'vue'
import store from '../store/store'
export default {
    name: 'ButtonTab',
    props: ["transactionTitle"],
    setup() {
      
        const modalShow= ref(false) 
        const depositWithdrawAmount = computed({
         
            get: () =>  store.state.depositWithdrawAmount,

            set: (depositWithdrawAmount) => {
              store.commit('depositWithdrawAmount', depositWithdrawAmount)
            }  
        })

        return {modalShow, store, depositWithdrawAmount}
    },
}
</script>

<style scoped>

</style>