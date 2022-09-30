<template>
    <!-- <div class="row mb-3 balance py-2 px-2">
        <div class="col-5">
            <div class="row">
                <div class="col text-muted">{{ portfolioBalanceTitle }}</div>
            </div>
            <div class="row">
                <div class="col h3 total-balance"> {{ totalBalance }}</div>
            </div>
            <div class="row mb-2">
                <div class="col text-muted profit-loss"> {{ PnL }}</div>
            </div>
        </div>
        <div class="col">
            <img src="../assets/chart.png" alt="chart" class="chart mt-3" />
        </div>

        <div class="row">
            <ButtonTab/>
        </div>
    </div> -->
    <b-row class="mb-3 py-2 px-2 balance">
        <b-col cols="5">
            <b-row>
                <b-col class="text-muted">
                     {{portfolioBalanceTitle}}
                </b-col>
            </b-row>
            <b-row>
                <b-col class="h3 total-balance">
                   ${{store.state.totalBalance}}
                </b-col>
            </b-row>
            <b-row class="mb-2">
                <b-col class="text-muted">
                PnL: {{store.state.PnL}} USDT
                    {{PnL}}
                </b-col>
            </b-row>
        </b-col>
        <b-col>
            <img src="../assets/chart.png" alt="chart" class="chart mt-3" />
        </b-col>
        <b-row>
            <ButtonTab :transactionTitle="deposit"/>
            <ButtonTab :transactionTitle="withdraw"/>
            <TransactionHistory/>
        </b-row>
    </b-row>
</template>

<script>
import { ref, computed } from 'vue'
import ButtonTab from './ButtonTab.vue'
import TransactionHistory from './TransactionHistory.vue'
import store from '../store/store'

export default {
    name: 'BalanceTab',
    components: {ButtonTab, TransactionHistory},
    setup() {
      
        const portfolioBalanceTitle = ref("Portfolio Balance")
        const PnL = computed(() => store.commit('PnL') )
        const transactionTitle=ref('')
        const deposit = ref("Deposit")
        const withdraw = ref("Withdraw")
        



        return {portfolioBalanceTitle, transactionTitle, deposit, withdraw, store, PnL }
    },
}
</script>

<style scoped>
.balance {
    background-color: #63a4ff;
    background-image: linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%);
    border-radius: 10px;
    border: none;
    box-shadow:  1px 1px;
}
.withdraw-button{
    margin-left: -15px;
}
.chart{
    width: 180px;
    height: 80px;
}
</style>