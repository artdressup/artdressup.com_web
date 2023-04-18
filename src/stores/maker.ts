import { defineStore } from 'pinia';
// import {reactive, toRefs} from "vue";
import { api } from 'boot/axios';
import axios from 'axios';
import { reactive, Ref, ref, toRefs } from 'vue';
// import { createCanvas, loadImage } from 'canvas';
import { createCanvas, loadImage } from 'canvas';

const IMG_WIDTH = 512;
const IMG_HEIGHT = 512;

export const useMakerStore = defineStore('makerStore', {
  state: () => ({
    cdn_url: 'https://cdn.artdressup.com/resource/',
    dressroomCategory: [
      'body',
      'hat',
      'hair',
      'eyes',
      'glasses',
      'flush',
      'mouth',
      'shirts',
      'pants',
      'onePiece',
      'lHand',
      'rHand',
      'shoes',
      'wing',
      'background'
    ],
    dressroomMeta: null,
    dressroomItems: {
      body: [],
      hat: [],
      hair: [],
      eyes: [],
      glasses: [],
      flush: [],
      mouth: [],
      shirts: [],
      pants: [],
      onePiece: [],
      lHand: [],
      rHand: [],
      shoes: [],
      wing: [],
      background: []
    },
    dressroomChoice: {
      body: 'body_0001',
      hat: '',
      hair: 'hair_0001',
      eyes: 'eyes_0001',
      glasses: '',
      flush: '',
      mouth: '',
      shirts: 'shirts_0001',
      pants: 'pants_0001',
      onePiece: '',
      lHand: '',
      rHand: '',
      shoes: 'shoes_0000',
      wing: '',
      background: ''
    },
    choiceObj: {
      body: 1,
      hair: 1,
      eyes: 1,
      shirts: 1,
      pants: 1,
      shoes: 0
    },
    ttock: false,
    tokenObj: {},
    reservations: []
  }),
  getters: {
    getTokenObj3: (state) => state.tokenObj,
    getTestnetChoiceStr: (state) => (token_id: string) => {
      return state.tokenObj[token_id];
    }
  },
  actions: {
    async init() {
      console.log('maker store init start')
      const res = await axios.get(`${this.cdn_url}dressroom.json`);
      if (res !== undefined && res.data !== undefined) {
        console.log(res.data)
        this.dressroomMeta = res.data;

        for (const catName of this.dressroomCategory) {
          this.setCategoryUrls(catName);
        }

        console.log('maker store init done');
        // console.log(JSON.stringify(this.dressroomItems));
      }
    },
    getPath(name: string) {
      let path = '';
      if (name.includes('body_')) {
        path = `${this.cdn_url}00_body/${name}.webp`;
      } else if (name.includes('hat_')) {
        path = `${this.cdn_url}01_hat/${name}.webp`;
      } else if (name.includes('hair_')) {
        path = `${this.cdn_url}02_hair/${name}.webp`;
      } else if (name.includes('eyes_')) {
        path = `${this.cdn_url}03_eyes/${name}.webp`;
      } else if (name.includes('glasses_')) {
        path = `${this.cdn_url}04_glasses/${name}.webp`;
      } else if (name.includes('flush_')) {
        path = `${this.cdn_url}05_flush/${name}.webp`;
      } else if (name.includes('mouth_')) {
        path = `${this.cdn_url}06_mouth/${name}.webp`;
      } else if (name.includes('shirts_')) {
        path = `${this.cdn_url}07_shirts/${name}.webp`;
      } else if (name.includes('pants_')) {
        path = `${this.cdn_url}08_pants/${name}.webp`;
      } else if (name.includes('onePiece_')) {
        path = `${this.cdn_url}09_onePiece/${name}.webp`;
      } else if (name.includes('lHand_')) {
        path = `${this.cdn_url}10_lHand/${name}.webp`;
      } else if (name.includes('rHand_')) {
        path = `${this.cdn_url}11_rHand/${name}.webp`;
      } else if (name.includes('shoes_')) {
        path = `${this.cdn_url}12_shoes/${name}.webp`;
      } else if (name.includes('wing_')) {
        path = `${this.cdn_url}13_wing/${name}.webp`;
      } else if (name.includes('background_')) {
        path = `${this.cdn_url}14_background/${name}.webp`;
      }

      return path;
    },
    async setCategoryUrls(category: string) {
      if (this.dressroomMeta === null) return;
      const result: Array<string> = [];
      switch (category) {
        case 'body': {
          const count = this.dressroomMeta.body;
          for (let i = 0; i < count; i++) {
            const numStr = i.toString().padStart(4, '0');
            const name = `body_${numStr}`;
            const path = this.getPath(name);
            result.push(path);
          }
          this.dressroomItems.body = result;
        }
          break;
        case 'hat': {
          const count = this.dressroomMeta.hat;
          for (let i = 0; i < count; i++) {
            const numStr = i.toString().padStart(4, '0');
            const name = `hat_${numStr}`;
            const path = this.getPath(name);
            result.push(path);
          }
          this.dressroomItems.hat = result;
        }
          break;
        case 'hair': {
          const count = this.dressroomMeta.hair;
          for (let i = 0; i < count; i++) {
            const numStr = i.toString().padStart(4, '0');
            const name = `hair_${numStr}`;
            const path = this.getPath(name);
            result.push(path);
          }
          this.dressroomItems.hair = result;
        }
          break;
        case 'eyes': {
          const count = this.dressroomMeta.eyes;
          for (let i = 0; i < count; i++) {
            const numStr = i.toString().padStart(4, '0');
            const name = `eyes_${numStr}`;
            const path = this.getPath(name);
            result.push(path);
          }
          this.dressroomItems.eyes = result;
        }
          break;
        case 'glasses': {
          const count = this.dressroomMeta.glasses;
          for (let i = 0; i < count; i++) {
            const numStr = i.toString().padStart(4, '0');
            const name = `glasses_${numStr}`;
            const path = this.getPath(name);
            result.push(path);
          }
          this.dressroomItems.glasses = result;
        }
          break;
        case 'flush': {
          const count = this.dressroomMeta.flush;
          for (let i = 0; i < count; i++) {
            const numStr = i.toString().padStart(4, '0');
            const name = `flush_${numStr}`;
            const path = this.getPath(name);
            result.push(path);
          }
          this.dressroomItems.flush = result;
        }
          break;
        case 'mouth': {
          const count = this.dressroomMeta.mouth;
          for (let i = 0; i < count; i++) {
            const numStr = i.toString().padStart(4, '0');
            const name = `mouth_${numStr}`;
            const path = this.getPath(name);
            result.push(path);
          }
          this.dressroomItems.mouth = result;
        }
          break;
        case 'shirts': {
          const count = this.dressroomMeta.shirts;
          for (let i = 0; i < count; i++) {
            const numStr = i.toString().padStart(4, '0');
            const name = `shirts_${numStr}`;
            const path = this.getPath(name);
            result.push(path);
          }
          this.dressroomItems.shirts = result;
        }
          break;
        case 'pants': {

          const count = this.dressroomMeta.pants;
          for (let i = 0; i < count; i++) {
            const numStr = i.toString().padStart(4, '0');
            const name = `pants_${numStr}`;
            const path = this.getPath(name);
            result.push(path);
          }
          this.dressroomItems.pants = result;
        }
          break;
        case 'onePiece': {
          const count = this.dressroomMeta.onePiece;
          for (let i = 0; i < count; i++) {
            const numStr = i.toString().padStart(4, '0');
            const name = `onePiece_${numStr}`;
            const path = this.getPath(name);
            result.push(path);
          }
          this.dressroomItems.onePiece = result;
        }
          break;
        case 'lHand': {
          const count = this.dressroomMeta.lHand;
          for (let i = 0; i < count; i++) {
            const numStr = i.toString().padStart(4, '0');
            const name = `lHand_${numStr}`;
            const path = this.getPath(name);
            result.push(path);
          }
          this.dressroomItems.lHand = result;
        }
          break;
        case 'rHand': {
          const count = this.dressroomMeta.rHand;
          for (let i = 0; i < count; i++) {
            const numStr = i.toString().padStart(4, '0');
            const name = `rHand_${numStr}`;
            const path = this.getPath(name);
            result.push(path);
          }
          this.dressroomItems.rHand = result;
        }
          break;
        case 'shoes': {
          const count = this.dressroomMeta.shoes;
          for (let i = 0; i < count; i++) {
            const numStr = i.toString().padStart(4, '0');
            const name = `shoes_${numStr}`;
            const path = this.getPath(name);
            result.push(path);
          }
          this.dressroomItems.shoes = result;
        }
          break;
        case 'wing': {
          const count = this.dressroomMeta.wing;
          for (let i = 0; i < count; i++) {
            const numStr = i.toString().padStart(4, '0');
            const name = `wing_${numStr}`;
            const path = this.getPath(name);
            result.push(path);
          }
          this.dressroomItems.wing = result;
        }
          break;
        case 'background': {
          const count = this.dressroomMeta.background;
          for (let i = 0; i < count; i++) {
            const numStr = i.toString().padStart(4, '0');
            const name = `background_${numStr}`;
            const path = this.getPath(`background_${numStr}`);
            result.push(path);
          }
          this.dressroomItems.background = result;
        }
          break;
      }

      return result;
    }
    ,
    getName (url: string) {
     const lastSlashIndex = url.lastIndexOf('/') + 1; // 1을 더하는 이유는 / 이후의 문자열을 가져오기 위해서입니다.
      const name1 = url.substring(lastSlashIndex, url.lastIndexOf('.'));
      return name1;
    },
    getNum (name: string) {
      try {
        const lastSlashIndex = name.lastIndexOf('_') + 1; // 1을 더하는 이유는 / 이후의 문자열을 가져오기 위해서입니다.
        const numStr = name.substring(lastSlashIndex, name.length);
        console.log('numStr:', numStr);
        const num = parseInt(numStr);
        console.log('getNum:', num);
        return num;
      } catch (e) {
        throw e;
      }
    },
    choiceDress (url: string) {
      const name = this.getName(url);
      const num = this.getNum(name);
      console.log('choiceDress!!', name);

      if (name.includes('body_')) {
        this.dressroomChoice.body = name;
        this.choiceObj['body'] = num;
      } else if (name.includes('hat_')) {
        if (this.dressroomChoice.hat === name) {
          this.dressroomChoice.hat = '';
          delete this.choiceObj['hat'];
        } else {
          this.dressroomChoice.hat = name;
          this.choiceObj['hat'] = num;
        }
      } else if (name.includes('hair_')) {
        this.dressroomChoice.hair = name;
        this.choiceObj['hair'] = num;
      } else if (name.includes('eyes_')) {
        this.dressroomChoice.eyes = name;
        this.choiceObj['eyes'] = num;
      } else if (name.includes('glasses_')) {
        if (this.dressroomChoice.glasses === name) {
          this.dressroomChoice.glasses = '';
          delete this.choiceObj['glasses'];
        } else {
          this.dressroomChoice.glasses = name;
          this.choiceObj['glasses'] = num;
        }
      } else if (name.includes('flush_')) {
        if (this.dressroomChoice.flush === name) {
          this.dressroomChoice.flush = '';
          delete this.choiceObj['flush'];
        } else {
          this.dressroomChoice.flush = name;
          this.choiceObj['flush'] = num;
        }
      } else if (name.includes('mouth_')) {
        if (this.dressroomChoice.mouth === name) {
          this.dressroomChoice.mouth = '';
          delete this.choiceObj['mouth'];
        } else {
          this.dressroomChoice.mouth = name;
          this.choiceObj['mouth'] = num;
        }
      } else if (name.includes('shirts_')) {
        this.dressroomChoice.shirts = name;
        this.choiceObj['shirts'] = num;

        this.dressroomChoice.onePiece = '';
        delete this.choiceObj['onePiece'];
      } else if (name.includes('pants_')) {
        this.dressroomChoice.pants = name;
        this.choiceObj['pants'] = num;

        this.dressroomChoice.onePiece = '';
        delete this.choiceObj['onePiece'];
      } else if (name.includes('onePiece_')) {
        if (this.dressroomChoice.onePiece === name) {
          this.dressroomChoice.onePiece = '';
          delete this.choiceObj['onePiece'];
        } else {
          this.dressroomChoice.onePiece = name;
          this.choiceObj['onePiece'] = num;
        }
      } else if (name.includes('lHand_')) {
        if (this.dressroomChoice.lHand === name) {
          this.dressroomChoice.lHand = '';
          delete this.choiceObj['lHand'];
        } else {
          this.dressroomChoice.lHand = name;
          this.choiceObj['lHand'] = num;
        }
      } else if (name.includes('rHand_')) {
        if (this.dressroomChoice.rHand === name) {
          this.dressroomChoice.rHand = '';
          delete this.choiceObj['rHand'];
        } else {
          this.dressroomChoice.rHand = name;
          this.choiceObj['rHand'] = num;
        }
      } else if (name.includes('shoes_')) {
        if (this.dressroomChoice.shoes === name) {
          this.dressroomChoice.shoes = '';
          delete this.choiceObj['shoes'];
        } else {
          this.dressroomChoice.shoes = name;
          this.choiceObj['shoes'] = num;
        }
      } else if (name.includes('wing_')) {
        if (this.dressroomChoice.wing === name) {
          this.dressroomChoice.wing = '';
          delete this.choiceObj['wing'];
        } else {
          this.dressroomChoice.wing = name;
          this.choiceObj['wing'] = num;
        }
      } else if (name.includes('background_')) {
        if (this.dressroomChoice.background === name) {
          this.dressroomChoice.background = '';
          delete this.choiceObj['background'];
        } else {
          this.dressroomChoice.background = name;
          this.choiceObj['background'] = num;
        }
      }

      if (this.dressroomChoice === null || this.dressroomChoice === undefined) {
        console.log('???');
      }

      console.log(JSON.stringify(this.dressroomChoice));

      this.ttock = !this.ttock;
      console.log('ttock: ', this.ttock);
    },
//   // 테스트넷에서 사용할 nft 토큰 아이디 ( 한 계정에 한해서 모든 조합 mint 해볼 수 있도록 )
    getTestnetTokenId (accountId: string) {
      const choiceStr0 = JSON.stringify(this.choiceObj);
      const copiedObject = JSON.parse(choiceStr0)

      // 원피스가 있을 경우 상의/하의 제거
      if (copiedObject['onePiece'] !== undefined) {
        delete copiedObject['shirts']
        delete copiedObject['pants']
      }

      const choiceStr = JSON.stringify(copiedObject);

      const tokenStr = `${choiceStr}${accountId}`;
      const hash = CryptoJS.SHA256(tokenStr);
      const tokenId = hash.toString(CryptoJS.enc.Hex);

      // 토큰 아이디에 대한 선택값 저장
      this.tokenObj[tokenId] = choiceStr;
      return tokenId;
    },
    async imageToBase64 (url: string) {
      const img = await loadImage(url);
      const canvas = createCanvas(IMG_WIDTH, IMG_HEIGHT);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, IMG_WIDTH, IMG_HEIGHT);
      return canvas.toDataURL();
    },
    // getTestnetChoiceStr (token_id: string) {
    //   return this.tokenObj[token_id];
    // },
    TokenObj() {
      console.log(JSON.stringify(this.tokenObj));
    },
    TestABC() {
      this.tokenObj['abc'] = 'helo??'
    },
    DelTokenObj(token_id: string) {
      delete this.tokenObj[token_id];
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'maker',
        storage: localStorage,
      },
    ],
  }
});

const store = useMakerStore();
store.init()
