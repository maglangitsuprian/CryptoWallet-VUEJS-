<template>
    <!-- <div class="col-3 transaction-history">
            Button trigger modal
            <button
              type="button"
              class="btn btn-dark btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
            >
              <i class="fa-solid fa-clock-rotate-left"></i>
            </button>
            Modal
            <div
              class="modal fade"
              id="exampleModal2"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Transaction History
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Type</th>
                          <th scope="col">Crypto</th>
                          <th scope="col">Cost</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody class="transaction-body">
                        <tr>
                          <td>1</td>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div> -->


          <b-col cols="3" class="transaction-history">
                <b-button variant="dark" size="sm" @click="modalShow = !modalShow">
                    Transaction
                </b-button>
                <b-modal v-model="modalShow" title="TRANSACTION HISTORY">
                    <div>
                        <b-table striped hover :items="store.state.items"></b-table>
                    </div>
                </b-modal>
          </b-col>
          
</template>


<script>

import { computed, ref} from 'vue'
import store from '../store/store'

export default {
    name: 'TransactionHistory',
    setup() {

        // const items = computed(()=>{
        //   const transaction = store.state.transaction
        //   const type = store.state.transaction.action
        //   const crypto = store.state.transaction.type
        //   const cost = store.state.amountEntered
        //   const price =  store.state.prices[store.state.selected].usd

        //   return transaction.forEach(t => {
        //     return {Type: type, Crypto: crypto, Cost: cost, Price: price}
        //   })
        // })
        const modalShow = ref(false)

        // const items = ref([
        //     { Type: null, Crypto: null, Cost:null, Price: null},

        
        //   ])

        // const itemPush = ()=> {
        //   const type = store.state.transaction.action
        //   const crypto = store.state.transaction.type
        //   const cost = store.state.amountEntered
        //   const price =  store.state.prices[store.state.selected].usd

        //     store.state.transaction.forEach(() =>{
        //     items.value.push({Type: type, Crypto: crypto, Cost: cost, Price: price})
        //   })
        // }


        




        return {modalShow, store }
},
}
</script>


<style scoped>
.transaction-history {
    margin-left: -4px;
}
</style>