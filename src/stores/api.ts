import {defineStore} from 'pinia';
// import {reactive, toRefs} from "vue";
import {api} from 'boot/axios'
import axios from 'axios';
import {reactive, toRefs} from 'vue';

export const uesApiStore = defineStore('apiStore', () => {

    const state = reactive({
      data: null
    })

    const hello = async () => {
      const res = await api.get('/hello')
      if (res.status === axios.HttpStatusCode.Ok) {
        console.log('이거 맞지않나?')
        state.data = res.data
        console.log(res.data)
        console.log('state.data: ' + state.data)
        return res.data
      } else {
        console.log('200이 아닌거지')
        return null
      }
      // res.status
      // console.log(res)
    }

    return {
      hello, ...toRefs(state)
    };
  },
)
// export const useCounterStore = defineStore('counter', {
//   state: () => ({
//     counter: 0
//   }),
//
//   getters: {
//     doubleCount (state) {
//       return state.counter * 2;
//     }
//   },
//
//   actions: {
//     increment () {
//       this.counter++;
//     }
//   }
// });
