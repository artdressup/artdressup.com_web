import { defineStore } from 'pinia';
import SecureLS from 'secure-ls';

const ls = new SecureLS({ isCompression: false });

import { wallet } from 'boot/near-wallet';

const CONTRACT_ADDRESS = process.env.CONTRACT_NAME;

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isSignIn: wallet.isSignIn,
    accountId: wallet.accountId
  }),
  actions: {
    signIn() {
      wallet.signIn();
    },
    async signOut() {
      await wallet.signOut();
    },
    getAccountId() {
      return wallet.getAccountId();
    },
    testMethod1() {
      wallet.testCallMethod1();
    },
    testMethod2() {
      wallet.testViewMethod1();
    },
    getWalletSelector() {
      return wallet.getWalletSelector();
    },
    async fetchGreeting() {
      const currentGreeting = await wallet.viewMethod({ method: 'get_greeting', contractId: CONTRACT_ADDRESS });
      console.log('fetchGreeting:' + currentGreeting);
      return currentGreeting;
    },
    async nft_reservation(token_id: string) {
      const result = await wallet.callMethod({
        contractId: CONTRACT_ADDRESS,
        method: 'create_reservation',
        args: { token_id: token_id },
        deposit: 20
      });
      console.log('nft_reservation Result::', result);
    },
    async create_reservation(token_id: string) {
      return wallet.create_reservation(token_id);
    },
    async get_reservation() {
      return wallet.get_reservations();
    },
    async get_my_token_ids() {
      return wallet.get_my_token_ids();
    },
    async del_nft(token_id: string) {
      return wallet.test_del_nft(token_id);
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'authStore',
        storage: localStorage
      }
    ]
  }
});


const signedInCallback = () => {
  const store = useAuthStore();
  store.accountId = wallet.accountId;
  store.isSignIn = wallet.isSignIn;

  console.log('accountId: ', store.accountId)
  console.log('isSignIn: ', store.isSignIn)

  console.log('signedInCallback!!()');
};

const signedOutCallback = () => {
  const store = useAuthStore();
  store.accountId = wallet.accountId;
  store.isSignIn = wallet.isSignIn;

  console.log('accountId: ', store.accountId)
  console.log('isSignIn: ', store.isSignIn)

  console.log('signedOutCallback!!()');
};

wallet.signedInCallback = signedInCallback;
wallet.signedOutCallback = signedOutCallback;

const authStoreInit = () => {
  const store = useAuthStore();
  store.accountId = wallet.accountId;
  store.isSignIn = wallet.isSignIn;
  console.log('authStoreInit')
}
authStoreInit()
