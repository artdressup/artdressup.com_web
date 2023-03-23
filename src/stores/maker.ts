import { defineStore } from 'pinia';
// import {reactive, toRefs} from "vue";
import { api } from 'boot/axios';
import axios from 'axios';
import { reactive, Ref, ref, toRefs } from 'vue';
// import { createCanvas, loadImage } from 'canvas';
import { createCanvas, loadImage } from 'canvas';

const IMG_WIDTH = 512;
const IMG_HEIGHT = 512;

enum DressRoomCategory {
  body,
  hat,
  hair,
  eyes,
  glasses,
  flush,
  mouth,
  shirts,
  pants,
  onePiece,
  lHand,
  rHand,
  shoes,
  wing,
  background
}

interface DressRoomMeta {
  body: number,
  hat: number,
  hair: number,
  eyes: number,
  glasses: number,
  flush: number,
  mouth: number,
  shirts: number,
  pants: number,
  onePiece: number,
  lHand: number,
  rHand: number,
  shoes: number,
  wing: number,
  background: number
}

interface DressRoomItems {
  body: string[],
  hat: string[],
  hair: string[],
  eyes: string[],
  glasses: string[],
  flush: string[],
  mouth: string[],
  shirts: string[],
  pants: string[],
  onePiece: string[],
  lHand: string[],
  rHand: string[],
  shoes: string[],
  wing: string[],
  background: string[]
}

interface DressRoomChoice {
  body: string,
  hat: string,
  hair: string,
  eyes: string,
  glasses: string,
  flush: string,
  mouth: string,
  shirts: string,
  pants: string,
  onePiece: string,
  lHand: string,
  rHand: string,
  shoes: string,
  wing: string,
  background: string
}

export const useMakerStore = defineStore('makerStore', () => {
  const cdn_url = 'https://d2licbkztr442e.cloudfront.net/resource/';
  const dressroomCategory = [
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
  ];
  const dressroomMeta: Ref<DressRoomMeta | null> = ref(null);
  const dressroomItems: Ref<DressRoomItems> = ref({
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
  });
  const dressroomChoice: Ref<DressRoomChoice> = ref({
    body: 'body_0001',
    hat: '',
    hair: '',
    eyes: 'eyes_0001',
    glasses: '',
    flush: '',
    mouth: '',
    shirts: '',
    pants: '',
    onePiece: '',
    lHand: '',
    rHand: '',
    shoes: '',
    wing: '',
    background: ''
  });

  const state = reactive({
    ttock: false,
    body: '',
    hat: '',
    hair: '',
    eyes: '',
    glasses: '',
    flush: '',
    mouth: '',
    shirts: '',
    pants: '',
    onePiece: '',
    lHand: '',
    rHand: '',
    shoes: '',
    wing: '',
    background: ''
  });

  // const getDressRoomMeta = async () => {
  //   if (state.dressroommeta !== null) {
  //     return state.dressroommeta
  //   }
  //
  //   state.dressroommeta = await axios.get(`${cdn_url}/meta/dressroom.json`)
  //
  //   return state.dressroommeta
  // }

  const init = async () => {
    const res = await axios.get(`${cdn_url}dressroom.json`);
    if (res !== undefined && res.data !== undefined) {
      dressroomMeta.value = res.data;

      for (const catName of dressroomCategory) {
        setCategoryUrls(catName);
      }

      console.log('init 완료!?');
      console.log(JSON.stringify(dressroomItems.value));
    }
  };
  init();

  const getPath = (name: string) => {
    let path = '';

    if (name.includes('body_')) {
      path = `${cdn_url}00_body/${name}.webp`;
    } else if (name.includes('hat_')) {
      path = `${cdn_url}01_hat/${name}.webp`;
    } else if (name.includes('hair_')) {
      path = `${cdn_url}02_hair/${name}.webp`;
    } else if (name.includes('eyes_')) {
      path = `${cdn_url}03_eyes/${name}.webp`;
    } else if (name.includes('glasses_')) {
      path = `${cdn_url}04_glasses/${name}.webp`;
    } else if (name.includes('flush_')) {
      path = `${cdn_url}05_flush/${name}.webp`;
    } else if (name.includes('mouth_')) {
      path = `${cdn_url}06_mouth/${name}.webp`;
    } else if (name.includes('shirts_')) {
      path = `${cdn_url}07_shirts/${name}.webp`;
    } else if (name.includes('pants_')) {
      path = `${cdn_url}08_pants/${name}.webp`;
    } else if (name.includes('onePiece_')) {
      path = `${cdn_url}09_onePiece/${name}.webp`;
    } else if (name.includes('lHand_')) {
      path = `${cdn_url}10_lHand/${name}.webp`;
    } else if (name.includes('rHand_')) {
      path = `${cdn_url}11_rHand/${name}.webp`;
    } else if (name.includes('shoes_')) {
      path = `${cdn_url}12_shoes/${name}.webp`;
    } else if (name.includes('wing_')) {
      path = `${cdn_url}13_wing/${name}.webp`;
    } else if (name.includes('background_')) {
      path = `${cdn_url}14_background/${name}.webp`;
    }

    return path;
  };

  const setCategoryUrls = async (category: string) => {
    if (dressroomMeta.value === null) return;
    const result: Array<string> = [];
    switch (category) {
      case 'body': {
        const count = dressroomMeta.value.body;
        for (let i = 0; i < count; i++) {
          const numStr = i.toString().padStart(4, '0');
          const name = `body_${numStr}`
          const path = getPath(name);
          result.push(path);
        }
        dressroomItems.value.body = result;
      }
        break;
      case 'hat': {
        const count = dressroomMeta.value.hat;
        for (let i = 0; i < count; i++) {
          const numStr = i.toString().padStart(4, '0');
          const name = `hat_${numStr}`
          const path = getPath(name);
          result.push(path);
        }
        dressroomItems.value.hat = result;
      }
        break;
      case 'hair': {
        const count = dressroomMeta.value.hair;
        for (let i = 0; i < count; i++) {
          const numStr = i.toString().padStart(4, '0');
          const name = `hair_${numStr}`
          const path = getPath(name);
          result.push(path);
        }
        dressroomItems.value.hair = result;
      }
        break;
      case 'eyes': {
        const count = dressroomMeta.value.eyes;
        for (let i = 0; i < count; i++) {
          const numStr = i.toString().padStart(4, '0');
          const name = `eyes_${numStr}`
          const path = getPath(name);
          result.push(path);
        }
        dressroomItems.value.eyes = result;
      }
        break;
      case 'glasses': {
        const count = dressroomMeta.value.glasses;
        for (let i = 0; i < count; i++) {
          const numStr = i.toString().padStart(4, '0');
          const name = `glasses_${numStr}`
          const path = getPath(name);
          result.push(path);
        }
        dressroomItems.value.glasses = result;
      }
        break;
      case 'flush': {
        const count = dressroomMeta.value.flush;
        for (let i = 0; i < count; i++) {
          const numStr = i.toString().padStart(4, '0');
          const name = `flush_${numStr}`
          const path = getPath(name);
          result.push(path);
        }
        dressroomItems.value.flush = result;
      }
        break;
      case 'mouth': {
        const count = dressroomMeta.value.mouth;
        for (let i = 0; i < count; i++) {
          const numStr = i.toString().padStart(4, '0');
          const name = `mouth_${numStr}`
          const path = getPath(name);
          result.push(path);
        }
        dressroomItems.value.mouth = result;
      }
        break;
      case 'shirts': {
        const count = dressroomMeta.value.shirts;
        for (let i = 0; i < count; i++) {
          const numStr = i.toString().padStart(4, '0');
          const name = `shirts_${numStr}`
          const path = getPath(name);
          result.push(path);
        }
        dressroomItems.value.shirts = result;
      }
        break;
      case 'pants': {

        const count = dressroomMeta.value.pants;
        for (let i = 0; i < count; i++) {
          const numStr = i.toString().padStart(4, '0');
          const name = `pants_${numStr}`
          const path = getPath(name);
          result.push(path);
        }
        dressroomItems.value.pants = result;
      }
        break;
      case 'onePiece': {
        const count = dressroomMeta.value.onePiece;
        for (let i = 0; i < count; i++) {
          const numStr = i.toString().padStart(4, '0');
          const name = `onePiece_${numStr}`
          const path = getPath(name);
          result.push(path);
        }
        dressroomItems.value.onePiece = result;
      }
        break;
      case 'lHand': {
        const count = dressroomMeta.value.lHand;
        for (let i = 0; i < count; i++) {
          const numStr = i.toString().padStart(4, '0');
          const name = `lHand_${numStr}`
          const path = getPath(name);
          result.push(path);
        }
        dressroomItems.value.lHand = result;
      }
        break;
      case 'rHand': {
        const count = dressroomMeta.value.rHand;
        for (let i = 0; i < count; i++) {
          const numStr = i.toString().padStart(4, '0');
          const name = `rHand_${numStr}`
          const path = getPath(name);
          result.push(path);
        }
        dressroomItems.value.rHand = result;
      }
        break;
      case 'shoes': {
        const count = dressroomMeta.value.shoes;
        for (let i = 0; i < count; i++) {
          const numStr = i.toString().padStart(4, '0');
          const name = `shoes_${numStr}`
          const path = getPath(name);
          result.push(path);
        }
        dressroomItems.value.shoes = result;
      }
        break;
      case 'wing': {
        const count = dressroomMeta.value.wing;
        for (let i = 0; i < count; i++) {
          const numStr = i.toString().padStart(4, '0');
          const name = `wing_${numStr}`
          const path = getPath(name);
          result.push(path);
        }
        dressroomItems.value.wing = result;
      }
        break;
      case 'background': {
        const count = dressroomMeta.value.background;
        for (let i = 0; i < count; i++) {
          const numStr = i.toString().padStart(4, '0');
          const name = `background_${numStr}`
          const path = getPath(`background_${numStr}`);
          result.push(path);
        }
        dressroomItems.value.background = result;
      }
        break;
    }

    return result;
  };

  const getName = (url: string) => {
    const lastSlashIndex = url.lastIndexOf('/') + 1; // 1을 더하는 이유는 / 이후의 문자열을 가져오기 위해서입니다.
    const name1 = url.substring(lastSlashIndex, url.lastIndexOf('.'));
    return name1
  }

  const choiceDress = (url: string) => {
    const name = getName(url)
    console.log('choiceDress!!' , name)

    if (name.includes('body_')) {
      // 동일한 이름이 들어오면 제거
      if (dressroomChoice.value.body === name) {
        dressroomChoice.value.body = ''
      } else {
        dressroomChoice.value.body = name
      }
    } else if (name.includes('hat_')) {
      if (dressroomChoice.value.hat === name) {
        dressroomChoice.value.hat = ''
      } else {
        dressroomChoice.value.hat = name
      }
    } else if (name.includes('hair_')) {
      if (dressroomChoice.value.hair === name) {
        dressroomChoice.value.hair = ''
      } else {
        dressroomChoice.value.hair = name
      }
    } else if (name.includes('eyes_')) {
      if (dressroomChoice.value.eyes === name) {
        dressroomChoice.value.eyes = ''
      } else {
        dressroomChoice.value.eyes = name
      }
    } else if (name.includes('glasses_')) {
      if (dressroomChoice.value.glasses === name) {
        dressroomChoice.value.glasses = ''
      } else {
        dressroomChoice.value.glasses = name
      }
    } else if (name.includes('flush_')) {
      if (dressroomChoice.value.flush === name) {
        dressroomChoice.value.flush = ''
      } else {
        dressroomChoice.value.flush = name
      }
    } else if (name.includes('mouth_')) {
      if (dressroomChoice.value.mouth === name) {
        dressroomChoice.value.mouth = ''
      } else {
        dressroomChoice.value.mouth = name
      }
    } else if (name.includes('shirts_')) {
      if (dressroomChoice.value.shirts === name) {
        dressroomChoice.value.shirts = ''
      } else {
        dressroomChoice.value.shirts = name
      }
    } else if (name.includes('pants_')) {
      if (dressroomChoice.value.pants === name) {
        dressroomChoice.value.pants = ''
      } else {
        dressroomChoice.value.pants = name
      }
    } else if (name.includes('onePiece_')) {
      if (dressroomChoice.value.onePiece === name) {
        dressroomChoice.value.onePiece = ''
      } else {
        dressroomChoice.value.onePiece = name
      }
    } else if (name.includes('lHand_')) {
      if (dressroomChoice.value.lHand === name) {
        dressroomChoice.value.lHand = ''
      } else {
        dressroomChoice.value.lHand = name
      }
    } else if (name.includes('rHand_')) {
      if (dressroomChoice.value.rHand === name) {
        dressroomChoice.value.rHand = ''
      } else {
        dressroomChoice.value.rHand = name
      }
    } else if (name.includes('shoes_')) {
      if (dressroomChoice.value.shoes === name) {
        dressroomChoice.value.shoes = ''
      } else {
        dressroomChoice.value.shoes = name
      }
    } else if (name.includes('wing_')) {
      if (dressroomChoice.value.wing === name) {
        dressroomChoice.value.wing = ''
      } else {
        dressroomChoice.value.wing = name
      }
    } else if (name.includes('background_')) {
      if (dressroomChoice.value.background === name) {
        dressroomChoice.value.background = ''
      } else {
        dressroomChoice.value.background = name
      }
    }

    if (dressroomChoice.value === null || dressroomChoice.value === undefined) {
      console.log("???")
    }

    console.log(JSON.stringify(dressroomChoice.value))

    state.ttock = !state.ttock
    console.log('ttock: ', state.ttock)
  };

  const imageToBase64 = async (url: string) => {
    const img = await loadImage(url)
    const canvas = createCanvas(IMG_WIDTH, IMG_HEIGHT);
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, IMG_WIDTH, IMG_HEIGHT)
    return canvas.toDataURL();
  }

  return {
    getName,
    getPath,
    dressroomItems,
    dressroomChoice,
    choiceDress,
    ...toRefs(state)
  };
}, {
  persist: {
    key: 'makerStore',
    paths: ['']
  }
});

