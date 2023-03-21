import {boot} from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
import {providers} from 'near-api-js';

import NearIconUrl from '@near-wallet-selector/near-wallet/assets/near-wallet-icon.png';
import MyNearIconUrl from '@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png';
// sender wallet에서 nft를 볼 수 없기 때문에 제거
// import SenderIconUrl from '@near-wallet-selector/sender/assets/sender-icon.png'

import {setupWalletSelector, WalletSelector, Wallet, NetworkId, Network} from "@near-wallet-selector/core";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import {setupMyNearWallet} from "@near-wallet-selector/my-near-wallet";
// import {setupSender} from "@near-wallet-selector/sender";
import {setupModal, WalletSelectorModal} from "@near-wallet-selector/modal-ui";
import * as buffer from "buffer";
(window as any).Buffer = buffer.Buffer;

const THIRTY_TGAS = '30000000000000';
const NO_DEPOSIT = '0';

const CONTRACT_ADDRESS = process.env.CONTRACT_NAME;
console.log("CONTRACT_ADDRESS: " + CONTRACT_ADDRESS)

class NWallet {
  createAccessKeyFor: string
  network: NetworkId | Network
  walletSelector: WalletSelector | null = null
  wallet: Wallet | null = null
  accountId: string | null = null
  modal: WalletSelectorModal | null = null
  // state: string | null = null
  isSignIn = false

  constructor(o: { createAccessKeyFor: string, network: NetworkId | Network }) {
    this.createAccessKeyFor = o.createAccessKeyFor
    this.network = o.network
  }

  async startUp() {
    this.walletSelector = await setupWalletSelector({
      network: this.network,
      modules: [
        setupNearWallet({iconUrl: NearIconUrl}),
        setupMyNearWallet({iconUrl: MyNearIconUrl}),
        // setupSender({iconUrl: SenderIconUrl})
      ]
    })

    // this.walletSelector.on('signedIn', async event => {
    //   console.log('signedIn!!!@@1')
    //   this.isSignIn = true
    //   this.wallet = await this.walletSelector!.wallet();
    //   this.accountId = this.walletSelector!.store.getState().accounts[0].accountId;
    //   console.log(this.accountId)
    //   console.log('signedIn!!!@@2')
    // })
    //
    // this.walletSelector.on('signedOut', event => {
    //   console.log('signedOut!!@@!1')
    //   this.isSignIn = false
    //   this.wallet = null
    //   this.accountId = null
    // })
    //
    // this.walletSelector.on('accountsChanged', event => {
    //   console.log('accountsChanged!!@@!')
    // })
    //
    // this.walletSelector.on('networkChanged', event => {
    //   console.log('networkChanged!!@@!')
    // })
    //
    // this.walletSelector.on('uriChanged', event => {
    //   console.log('uriChanged!!@@!')
    // })

    this.isSignIn = this.walletSelector?.isSignedIn();

    if (this.isSignIn) {
      this.wallet = await this.walletSelector.wallet();
      this.accountId = this.walletSelector.store.getState().accounts[0].accountId;

      console.log('aa:' + this.accountId)
    }

    return this.isSignIn;
  }

  getModal() {
    if (this.modal === null && this.walletSelector !== null) {
      const description = 'Please select a wallet to sign in.';
      this.modal = setupModal(this.walletSelector, {contractId: this.createAccessKeyFor!, description});
    }

    return this.modal
  }

  getWalletSelector() {
    return this.walletSelector
  }

  signIn() {
    console.log('nw-signIn 01')
    console.log('isSignedIn(): ' + this.walletSelector?.isSignedIn())
    if (!this.isSignIn) {
      if (this.modal === null) {
        console.log('modal is null')
      }
      this.getModal()?.show()
      console.log('nw-signIn 02')
    }
  }

  signOut() {
    console.log('nw-signOut 01')
    console.log('isSignedIn(): ' + this.walletSelector?.isSignedIn())
    if (this.isSignIn) {
      if (this.wallet === null) {
        console.log('wallet is null')
        console.log(this.accountId)
      }
      this.wallet?.signOut();
      console.log('nw-signOut 02')
    }
  }

  // async getAccounts() {
  //   const isSignedIn = this.isSignedIn2()
  //   if (isSignedIn) {
  //     this.wallet = await this.walletSelector!.wallet()
  //     const accounts = await this.wallet?.getAccounts();
  //     console.log(accounts);
  //   }
  // }

  // Make a read-only call to retrieve information from the network
  async viewMethod({contractId, method, args = {}}: any) {
      const {network} = this.walletSelector!.options;
      const provider = new providers.JsonRpcProvider({url: network.nodeUrl});

      const res = await provider.query({
          request_type: 'call_function',
          account_id: contractId,
          method_name: method,
          args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
          finality: 'optimistic',
      }) as any;

      if (res && res['result'] != undefined) {
        return JSON.parse(Buffer.from(res.result).toString());
      }
  }

  // Call a method that changes the contract's state
  async callMethod({contractId, method, args = {}, gas = THIRTY_TGAS, deposit = NO_DEPOSIT}: any) {
    if (this.wallet !== null && this.accountId !== null) {
      // Sign a transaction with the "FunctionCall" action
      const outcome = await this.wallet.signAndSendTransaction({
        signerId: this.accountId!,
        receiverId: contractId,
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName: method,
              args,
              gas,
              deposit,
            },
          },
        ],
      });

      return providers.getTransactionLastResult(outcome!)
    }
    return null
  }

  // Get transaction result from the network
  async getTransactionResult(txhash: Uint8Array | string) {
      const {network} = this.walletSelector!.options;
      const provider = new providers.JsonRpcProvider({url: network.nodeUrl});

      // Retrieve transaction result from the network
      const transaction = await provider.txStatus(txhash, 'unnused');
      return providers.getTransactionLastResult(transaction);
  }
}

// import {setupWalletSelector} from "@near-wallet-selector/core";
// import {setupModal} from "@near-wallet-selector/modal-ui";
// import {setupNearWallet} from "@near-wallet-selector/near-wallet";
//
// const modalShow = (async () => {
//     const selector = await setupWalletSelector({
//         network: "testnet",
//         modules: [setupNearWallet()],
//     });
//
//     const modal = setupModal(selector, {
//         contractId: "dev-1677749804324-16392202202217",
//     });
//
//     modal.show();
// })

const wallet = new NWallet({createAccessKeyFor: CONTRACT_ADDRESS!, network: 'testnet'})
export default boot(async ({app}) => {
  // something to do

  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  app.config.globalProperties.$wallet = wallet;
})

export {NWallet, wallet};