import { defineStore } from 'pinia';
import { computed, reactive, toRefs, watch } from 'vue';

const CONTRACT_ADDRESS = process.env.CONTRACT_NAME;
export const useWsStore = defineStore('wsStore', () => {

    const state = reactive({
      tokenId: '',
      tokenRandId: ''
    });

    let ws: WebSocket | null = null;

    const wsOnOpen = async (event) => {
      console.log('WebSocket 연결 성공');
    };

    const waitOpen = async () => {
      return new Promise((resolve, reject) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          resolve();
        } else {
          const intervalId = setInterval(() => {
            if (ws && ws.readyState === WebSocket.OPEN) {
              resolve();
              clearInterval(intervalId);
            }
          }, 200);
        }
      });
    };

    const wsOnMessage = async (event) => {
      try {
        console.log('data!!!:??', event.data)
        // console.log('binaryData:??', event.binaryData)
        // const data = JSON.parse(event.binaryData.toString())
        const data = event.data
        console.log(data)
        const dataJson = JSON.parse(data)

        switch (dataJson.msg) {
          case 'stoc_getToken':
            console.log('ttid:', dataJson.content.tokenRandId);
            state.tokenId = dataJson.content.tokenId;
            state.tokenRandId = dataJson.content.tokenRandId;

            console.log('stoc_getToken::', state.tokenId, ',,', state.tokenRandId);

            const tokenRandId = dataJson.content.tokenRandId;
            const tokenId = dataJson.content.tokenId;

            // ctos_reservation
            const msg = { type: 'message', msg: 'ctos_reservation', content: { tokenId, tokenRandId } };
            const msgStr = JSON.stringify(msg);

            console.log('msgStr:', msgStr);

            ws.send(msgStr);
            // dataJson.content.tokenRandId
            break;
        }
        // console.log(`서버에서 받은 데이터: ${JSON.stringify(data)}`);
      } catch (e) {
        console.error(`wsOnMessageError: ${e}`);
        disconnect();
      }
    };

    const wsOnClose = async (event) => {
      console.log(event);
    };
    const wsOnError = async (event) => {
      console.log(event);
    };


    const connect = async () => {
      ws = new WebSocket('ws://localhost:3000/api_ws/nft_reservation');
      ws.addEventListener('open', wsOnOpen);
      ws.addEventListener('message', wsOnMessage);
      ws.addEventListener('close', wsOnClose);
      ws.addEventListener('error', wsOnError);
    };

    const disconnect = async () => {
      if (ws) {
        ws.removeEventListener('open', wsOnOpen);
        ws.removeEventListener('message', wsOnMessage);
        ws.removeEventListener('close', wsOnClose);
        ws.removeEventListener('error', wsOnError);
        ws.close();
        ws = null;
      }
    };

    type WsMsg = { type: string, msg: string, content: any }
    const getTokenId = async (coordination) => {
      try {
        if (ws === null || ws.readyState !== WebSocket.OPEN) {
          await connect();
          await waitOpen();
        }
        const wsMsg: WsMsg = { type: 'message', msg: 'ctos_getToken', content: coordination };
        const wsMsgStr = JSON.stringify(wsMsg);
        console.log('wsMsgStr??', wsMsgStr)
        ws.send(wsMsgStr);
        console.log('gg');
      } catch (e) {
        throw e;
      }
    };

    const reservation = async () => {

      console.log('');
    };


    return {
      ...toRefs(state), getTokenId, reservation
    };
  }, {
    persist: {
      key: 'wsStore',
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value)
      },
      paths: ['']
    }
  }
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
