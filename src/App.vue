<template>
  <div id="app">
    <b-container class="my-5 mx-auto px-4 py-4 text-dark">
      <b-row class="mb-4 text-center">
        <b-col class="h3">
            Crypto Wallet 
            <span class="logo"><img src="./assets/logo.png" alt="logo" /></span>
        </b-col>
      </b-row>
      
      <BalanceTab/>
      <CoinTable/>
      <BuySellTab/>

    </b-container>
  </div>
  
  
</template>

<script>
import BalanceTab from './components/BalanceTab.vue';
import CoinTable from './components/CoinTable.vue'
import BuySellTab from './components/BuySellTab.vue'
import store from './store/store';
export default {
    name: "App",
    components: { BalanceTab,CoinTable, BuySellTab },
    setup(){
    
      return {store}
    }
}
</script>

<style>
.container{
  min-height: 30rem;
  width: 25rem;
  background-color: rgb(255, 255, 255,0.6);
  border-radius:20px;
  border: none;
  box-shadow: 1px 1px 1px 1px;
}
* {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
body{
    background: url(./assets/bg-wallpaper.jpg) no-repeat center fixed;
}
img{
    height: 30px;
    width: 30px;
}

</style>
