import { defineStore } from 'pinia';
import SecureLS from 'secure-ls';
import { reactive, toRefs } from 'vue';

const ls = new SecureLS({ isCompression: false });

import { wallet } from 'boot/near-wallet';

const CONTRACT_ADDRESS = process.env.CONTRACT_NAME;

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    isSignIn: wallet.isSignIn,
    accountId: wallet.accountId
  }),
  actions: {
    async init() {
      console.log('auth store init start');
      await wallet.startUp();

      this.isSignIn = wallet.isSignIn;
      this.accountId = wallet.accountId;
      console.log(this.isSignIn, this.accountId);
      console.log('auth store init 처리중!!');

      wallet.walletSelector?.on('signedIn', async event => {
        console.log('signedIn!!!@@1');
        wallet.isSignIn = true;
        wallet.wallet = await wallet.walletSelector!.wallet();
        wallet.accountId = wallet.walletSelector!.store.getState().accounts[0].accountId;
        console.log(wallet.accountId);
        console.log('signedIn!!!@@2');

        this.isSignIn = true;
        this.accountId = wallet.accountId;
      });

      wallet.walletSelector?.on('signedOut', event => {
        console.log('signedOut!!@@!1');
        wallet.isSignIn = false;
        wallet.wallet = null;
        wallet.accountId = null;

        this.isSignIn = false;
        this.accountId = null;
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

      console.log('auth store init done');
    },


    signIn() {
      wallet.signIn();
    },
    async signOut () {
      await wallet.signOut();
    },
    getAccountId () {
      return wallet.getAccountId();
    },
    testMethod1 () {
      wallet.testCallMethod1();
    },
    testMethod2 () {
      wallet.testViewMethod1();
    },
    getWalletSelector () {
      return wallet.getWalletSelector();
    },
    async fetchGreeting () {
      const currentGreeting = await wallet.viewMethod({ method: 'get_greeting', contractId: CONTRACT_ADDRESS });
      console.log('fetchGreeting:' + currentGreeting);
      return currentGreeting;
    },
    async nft_reservation (token_id: string) {
      const result = await wallet.callMethod({
        contractId: CONTRACT_ADDRESS,
        method: 'create_reservation',
        args: { token_id: token_id },
        deposit: 20
      });
      console.log('nft_reservation Result::', result);
    },
    async create_reservation (token_id: string) {
      return wallet.test_create_reservation(token_id)
    },
    async get_reservation () {
      return wallet.test_get_reservations()
    },
    async del_nft (token_id: string) {
      return wallet.test_del_nft(token_id)
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: localStorage,
      },
    ],
  }
});

const store = useAuthStore()
store.init()
