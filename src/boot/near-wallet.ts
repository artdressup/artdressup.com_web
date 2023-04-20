import {boot} from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
import {providers, utils} from 'near-api-js';

import NearIconUrl from '@near-wallet-selector/near-wallet/assets/near-wallet-icon.png';
import MyNearIconUrl from '@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png';
// sender wallet에서 nft를 볼 수 없기 때문에 제거
import SenderIconUrl from '@near-wallet-selector/sender/assets/sender-icon.png'

import {setupWalletSelector, WalletSelector, Wallet, NetworkId, Network} from "@near-wallet-selector/core";
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import {setupMyNearWallet} from "@near-wallet-selector/my-near-wallet";
import {setupSender} from "@near-wallet-selector/sender";
import {setupModal, WalletSelectorModal} from "@near-wallet-selector/modal-ui";
import * as buffer from "buffer";
(window as any).Buffer = buffer.Buffer;

const THIRTY_TGAS = '30000000000000';
const NO_DEPOSIT = '0';

const CONTRACT_ADDRESS = 'test.artdressup.testnet' // process.env.CONTRACT_NAME;
console.log("CONTRACT_ADDRESS: " + CONTRACT_ADDRESS)

type Callback = ()=>void;

class NWallet {
  createAccessKeyFor: string
  network: NetworkId | Network
  walletSelector: WalletSelector | null = null
  wallet: Wallet | null = null
  accountId: string | null = null
  modal: WalletSelectorModal | null = null
  // state: string | null = null
  isSignIn = false
  signedInCallback: null | Callback = null
  signedOutCallback: null | Callback = null

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
          setupSender({iconUrl: SenderIconUrl})
        ]
      })

      this.walletSelector?.on('signedIn', async event => {
        console.log('signedIn!!!@@1');
        this.isSignIn = true;
        this.wallet = await this.walletSelector!.wallet();
        this.accountId = this.walletSelector!.store.getState().accounts[0].accountId;
        console.log('signedIn!!!@@2');
        if (this.signedInCallback !== null) {
          this.signedInCallback()
        }
      });

      this.walletSelector?.on('signedOut', event => {
        console.log('signedOut!!@@!1');
        this.isSignIn = false;
        this.accountId = null;

        if (this.signedOutCallback !== null) {
          this.signedOutCallback()
        }
      });

      this.walletSelector?.on('accountsChanged', event => {
        console.log('accountsChanged!!@@!');
      });

      this.walletSelector?.on('networkChanged', event => {
        console.log('networkChanged!!@@!');
      });

      this.walletSelector?.on('uriChanged', event => {
        console.log('uriChanged!!@@!');
      });

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

  getAccountId() {
    return this.accountId
  }

  signIn() {
    console.log('nw-signIn 01')
    console.log('isSignedIn(): ' + this.walletSelector?.isSignedIn())
    console.log('accountId:::', this.accountId)
    if (!this.isSignIn) {
      if (this.modal === null) {
        console.log('modal is null')
      }
      this.getModal()?.show()
      console.log('nw-signIn 02')
    }
  }

  async signOut() {
    console.log('nw-signOut 01')
    console.log('isSignedIn(): ' + this.walletSelector?.isSignedIn())
    console.log('signOut AccountId', this.accountId)
    if (this.isSignIn) {
      if (this.wallet === null) {
        console.log('wallet is null')
        console.log(this.accountId)
      }
      await this.wallet?.signOut();
      this.accountId = null
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

      return null;
  }

  // Call a method that changes the contract's state
  async callMethod({contractId, method, args = {}, gas = THIRTY_TGAS, deposit = NO_DEPOSIT}: any) {
    try {
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
    } catch (e) {
      console.log('callMethodErr:', e)
    }
  }

  // nft 예약 생성
  async create_reservation(token_id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const account_id = this.accountId
        if (account_id === null) {
          throw new Error('Unable to get account id.')
        }

        const result = await this.callMethod({ contractId: CONTRACT_ADDRESS, method: 'create_reservation', args: { token_id }, deposit: wallet.parseNearAmount('20') });
        console.log('test_create_reservation Result::', result)
        resolve(reject)
      } catch (e) {
        console.log(e)
        reject(e)
      }
    })
  }

  async get_reservations() {
    return new Promise(async (resolve, reject) => {
      try {
        const account_id = this.accountId
        if (account_id === null) {
          throw new Error('Unable to get account id.')
        }

        const result = await this.viewMethod({ contractId: CONTRACT_ADDRESS, method: 'get_reservations', args: { account_id: account_id }});
        if (result !== null) {
          console.log('test_get_reservations:', result)
        } else {
          console.log('test_get_reservations result is null')
        }
        resolve(result)
      } catch (e) {
        console.log('get_reservations 여기서 에러??')
        console.log(e)
        reject(e)
      }
    })
  }

  // nft 소각
  async test_del_nft(token_id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const accountId = this.accountId
        if (accountId === null) {
          throw new Error('Unable to get account id.')
        }

        const result = await this.callMethod({ contractId: CONTRACT_ADDRESS, method: 'del_nft', args: { token_id: token_id }, gas: '300000000000000'});
        console.log('test_del_nft Result::', result)
        resolve(result)
      } catch (e) {
        console.log(e)
        reject(e)
      }
    })
  }

  async testCallMethod1() {
    try {
      const result = await this.callMethod({ contractId: CONTRACT_ADDRESS, method: 'create_reservation', args: { token_id: 'hello123token12344567' }, deposit: wallet.parseNearAmount('20') });
      console.log('testCallMethod1 Result::', result)
    } catch (e) {
      console.log(e)
    }
  }

  async testCallMethod2() {
    try {
      const result = await this.callMethod({ contractId: CONTRACT_ADDRESS, method: 'del_nft', args: { token_id: 'hello123token12344567' }, gas: '300000000000000'});
      console.log('testCallMethod1 Result::', result)
    } catch (e) {
      console.log(e)
    }
  }

  async testViewMethod1() {
    try {
      const result = await this.viewMethod({ contractId: CONTRACT_ADDRESS, method: 'get_reservations', args: { account_id: 'hsyang.testnet' }});
      if (result !== null) {
        console.log('testViewMethod1:', result)
      } else {
        console.log('testViewMethod1 result is null')
      }
    } catch (e) {
      console.log(e)
    }
  }

  parseNearAmount(nearAmount: string) {
    try {
      const deposit = utils.format.parseNearAmount(nearAmount)
      console.log('deposit::', deposit)
      return deposit
    } catch (e) {
      console.error('parseNearAmount err:', e)
      throw e
    }
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
  await wallet.startUp()
  console.log('boot wallet.startUp done!')
  // console.log('boot wallet.startUp!!')
})


export { wallet };
