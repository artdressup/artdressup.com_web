import { defineStore } from 'pinia';
import { computed, reactive, toRefs, watch } from 'vue';
import { useQuasar } from 'quasar';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ isCompression: false });

import { wallet } from 'boot/near-wallet';

const CONTRACT_ADDRESS = process.env.CONTRACT_NAME;
export const useAuthStore = defineStore('authStore', () => {
    // const wallet = new NWallet({createAccessKeyFor: CONTRACT_ADDRESS!, network: 'testnet'})

    const state = reactive({
      isSignIn: wallet.isSignIn,
      accountId: wallet.accountId
    });
    const accountId1 = 'hello??';

    const init = async () => {
      console.log('auth store init 시작!!');
      await wallet.startUp();

      state.isSignIn = wallet.isSignIn;
      state.accountId = wallet.accountId;
      console.log(state.isSignIn, state.accountId);
      console.log('auth store init 처리중!!');

      wallet.walletSelector?.on('signedIn', async event => {
        console.log('signedIn!!!@@1');
        wallet.isSignIn = true;
        wallet.wallet = await wallet.walletSelector!.wallet();
        wallet.accountId = wallet.walletSelector!.store.getState().accounts[0].accountId;
        console.log(wallet.accountId);
        console.log('signedIn!!!@@2');

        state.isSignIn = true;
        state.accountId = wallet.accountId;
      });

      wallet.walletSelector?.on('signedOut', event => {
        console.log('signedOut!!@@!1');
        wallet.isSignIn = false;
        wallet.wallet = null;
        wallet.accountId = null;

        state.isSignIn = false;
        state.accountId = null;
      });

      wallet.walletSelector?.on('accountsChanged', event => {
        console.log('accountsChanged!!@@!');
      });

      wallet.walletSelector?.on('networkChanged', event => {
        console.log('networkChanged!!@@!');
      });

      wallet.walletSelector?.on('uriChanged', event => {
        console.log('uriChanged!!@@!');
      });


      console.log('auth store init 완료!?!!');
    };
    init();


    const signIn = () => {
      wallet.signIn();
    };
    const signOut = async () => {
      await wallet.signOut();
    };
    const getAccountId = () => {
      return wallet.getAccountId();
    };

    const testMethod1 = () => {
      wallet.testCallMethod1();
    };
    const testMethod2 = () => {
      wallet.testViewMethod1();
    };

    const getWalletSelector = () => {
      return wallet.getWalletSelector();
    };

    // const isSignedIn = () => {
    //   return wallet.isSignIn;
    // };

    const fetchGreeting = async () => {
      const currentGreeting = await wallet.viewMethod({ method: 'get_greeting', contractId: CONTRACT_ADDRESS });
      console.log('fetchGreeting:' + currentGreeting);
      return currentGreeting;
    };

    const nft_reservation = async (token_id: string) => {
      const result = await wallet.callMethod({
        contractId: CONTRACT_ADDRESS,
        method: 'create_reservation',
        args: { token_id: token_id },
        deposit: 20
      });
      console.log('nft_reservation Result::', result);
    };

    const create_reservation = async (token_id: string) => wallet.test_create_reservation(token_id);
    const get_reservation = async () => wallet.test_get_reservations();
    const del_nft = async (token_id: string) => wallet.test_del_nft(token_id);

    return {
      ...toRefs(state), signIn, signOut, getWalletSelector, fetchGreeting,
      testMethod1,
      testMethod2,
      getAccountId,
      accountId1,
      create_reservation,
      get_reservation,
      del_nft,
    };
  }
  // }, {
  //   persist: {
  //     key: 'authStore',
  //     storage: {
  //       getItem: (key) => ls.get(key),
  //       setItem: (key, value) => ls.set(key, value)
  //     },
  //     paths: ['state']
  //   }
  // }
);
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
