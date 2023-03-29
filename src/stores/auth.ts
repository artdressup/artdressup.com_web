import {defineStore} from 'pinia';
import {computed, reactive, toRefs, watch} from "vue";
import {useQuasar} from "quasar";
import SecureLS from "secure-ls";

const ls = new SecureLS({isCompression: false})

import {NWallet} from "boot/near-wallet";

const CONTRACT_ADDRESS = process.env.CONTRACT_NAME;
export const useAuthStore = defineStore('authStore', () => {
    const wallet = new NWallet({createAccessKeyFor: CONTRACT_ADDRESS!, network: 'testnet'})

    const state = reactive({
      isSignedIn: wallet.isSignIn,
      accountId: ''
      // walletSelector: computed(()=>{
      //     return wallet.getWalletSelector()
      // }),
    })

    const init = async () => {
      console.log("init!!!???")
      state.isSignedIn = await wallet.startUp()
      console.log("init!!!")

      const walletSelector = wallet.getWalletSelector()

      walletSelector?.on('signedIn', async event => {
        console.log('wson signedIn:')
        wallet.isSignIn = true
        state.isSignedIn = wallet.isSignIn
        wallet.wallet = await walletSelector!.wallet()
        wallet.accountId = walletSelector!.store.getState().accounts[0].accountId
        state.accountId = wallet.accountId
      })

      walletSelector?.on('signedOut', async event => {
        console.log('wson signedOut:')
        wallet.isSignIn = false
        state.isSignedIn = wallet.isSignIn
        wallet.wallet = null
        wallet.accountId = null
        state.accountId = ''
      })
    }
    init()

    // wa?.on('signedIn', event => {
    //   console.log('signedIn!!!')
    // })
    //
    // ws?.on('signedOut', event => {
    //   console.log('signedOut!!!')
    // })

    const signIn = () => {
      wallet.signIn()
    }
    const signOut = () => {
      wallet.signOut()
    }
    const testMethod1 = () => {
      wallet.testCallMethod1()
    }
    const testMethod2 = () => {
      wallet.testViewMethod1()
    }

    const getWalletSelector = () => {
      return wallet.getWalletSelector()
    }

    const isSignedIn2 = () => {
      return wallet.isSignIn
    }

    const fetchGreeting = async () => {
      const currentGreeting = await wallet.viewMethod({method: 'get_greeting', contractId: CONTRACT_ADDRESS});
      console.log('fetchGreeting:' + currentGreeting)
      return currentGreeting
    }

    return {
      ...toRefs(state), signIn, signOut, getWalletSelector, fetchGreeting, isSignedIn2,
      testMethod1,
      testMethod2,
    };
  }, {
    persist: {
      key: 'authStore',
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value)
      },
      paths: ['']
    }
  }
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
