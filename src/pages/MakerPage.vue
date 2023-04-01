<template>

  <div class='q-pa-md row'>
    <div class='col'>
<!--      <q-btn label='test call' @click='test1' />-->
<!--      <q-btn label='test view' @click='test2' />-->
<!--      <q-btn label='getToken' @click='getTokenId' />-->
<!--      <q-btn label='calltest' @click='calltest' />-->
<!--      <q-btn label='delnft' @click='calltest2' />-->
<!--      <q-btn label='viewtest' @click='viewtest' />-->
<!--      <q-btn label='gettoken' @click='gettoken' />-->
<!--      {{ tokenId }}-->

      <ins class='adsbygoogle'
           style='display:block; text-align:center;'
           data-ad-layout='in-article'
           data-ad-format='fluid'
           data-ad-client='ca-pub-5697765693347887'
           data-ad-slot='7702004195'></ins>

    </div>
    <div class='col' style='background-color: red'>
      <canvas ref='canvas1' width='512' height='512'></canvas>
    </div>
    <div class='col'>
      <DressRoom width='10px' height='10px' />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRef, watch } from 'vue';
import { useMakerStore } from 'stores/maker';
import { useAuthStore } from 'stores/auth';
import { useWsStore } from '../stores/websocket';
import { createCanvas, loadImage } from 'canvas';
import { wallet } from 'src/boot/near-wallet.ts';
import { api } from 'boot/axios';

import DressRoom from 'components/DressRoom.vue';

export default defineComponent({
  name: 'MakerPage',
  components: { DressRoom },
  async mounted() {
    // const canvas = this.$refs.canvas;
    // const context = canvas.getContext('2d')
    //
    // const myimg = await loadImage(this.getPath('body_0001'))
    // const myimg2 = await loadImage(this.getPath('eyes_0001'))
    //
    // context.fillStyle = '#ff0000'
    // context.fillRect(0, 0, 512, 512)
    // context.drawImage(myimg, 0, 0, 512, 512)
    // context.drawImage(myimg2, 0, 0, 512, 512)

    (adsbygoogle = window.adsbygoogle || []).push({});


    const canvas = this.$refs.canvas1;
    const context = canvas.getContext('2d');
    this.context1 = context;


    // 여기를 바꾸면 stores/makers.ts 에서 기본 선택 값으
    // choiceObj,  dressroomChoice 객체의 초기값도 바꿔주어야 한다.
    const myimg0 = await loadImage(this.getPath('body_0001'));
    const myimg1 = await loadImage(this.getPath('hair_0001'));
    const myimg2 = await loadImage(this.getPath('eyes_0001'));
    const myimg3 = await loadImage(this.getPath('pants_0001'));
    const myimg4 = await loadImage(this.getPath('shirts_0001'));
    const myimg5 = await loadImage(this.getPath('shoes_0000'));

    context.drawImage(myimg0, 0, 0);
    context.drawImage(myimg1, 0, 0);
    context.drawImage(myimg2, 0, 0);
    context.drawImage(myimg3, 0, 0);
    context.drawImage(myimg4, 0, 0);
    context.drawImage(myimg5, 0, 0);

    // const canvas2 = this.$refs.canvas2;
    // this.context2 = canvas2.getContext('2d')

  },
  setup() {
    const canvasRef = ref(null);
    const context1 = ref(null);
    const $makerStore = useMakerStore();
    const $authStore = useAuthStore();
    const $wsStore = useWsStore();

    const choice = ref($makerStore.dressroomChoice);

    const state = reactive({
      canvas2: null,
      tokenId: ''
    });

    const test1 = () => {
      $authStore.testMethod1();
    };

    const test2 = () => {
      $authStore.testMethod2();
    };

    const getPath = (name) => {
      return $makerStore.getPath(name);
    };

    const cLoadImage = (num, url) => {
      return new Promise((resolve, reject) => {
        loadImage(url).then(image => {
          resolve({ num, image });
        }).catch(err => {
          reject(err);
        });
      });
    };

    watch(() => $makerStore.ttock, async (data1, before) => {
      console.log('watch??');
      // const data = $makerStore.dressroomChoice;
      const promises = [];

      if (choice.value.background !== '') {
        const prom = cLoadImage(0, getPath(choice.value.background));
        promises.push(prom);
        // const img = await loadImage(getPath(choice.value.background))
        // images.push(img)
        // context1.value.drawImage(img, 0, 0, 512, 512)
      }

      if (choice.value.wing !== '') {
        const prom = cLoadImage(1, getPath(choice.value.wing));
        promises.push(prom);
        // const img = await loadImage(getPath(choice.value.wing))
        // context1.value.drawImage(img, 0, 0, 512, 512)
      }

      if (choice.value.body !== '') {
        const prom = cLoadImage(2, getPath(choice.value.body));
        promises.push(prom);
        // const img = await loadImage(getPath(choice.value.body))
        // context1.value.drawImage(img, 0, 0, 512, 512)
      }


      if (choice.value.hair !== '') {
        const prom = cLoadImage(3, getPath(choice.value.hair));
        promises.push(prom);
        // const img = await loadImage(getPath(choice.value.hair))
        // context1.value.drawImage(img, 0, 0, 512, 512)
      }

      if (choice.value.hat !== '') {
        const prom = cLoadImage(4, getPath(choice.value.hat));
        promises.push(prom);
        // const img = await loadImage(getPath(choice.value.hat))
        // context1.value.drawImage(img, 0, 0, 512, 512)
      }

      if (choice.value.flush !== '') {
        const prom = cLoadImage(5, getPath(choice.value.flush));
        promises.push(prom);
        // const img = await loadImage(getPath(choice.value.flush))
        // context1.value.drawImage(img, 0, 0, 512, 512)
      }

      if (choice.value.mouth !== '') {
        const prom = cLoadImage(6, getPath(choice.value.mouth));
        promises.push(prom);
        // const img = await loadImage(getPath(choice.value.mouth))
        // context1.value.drawImage(img, 0, 0, 512, 512)
      }

      if (choice.value.eyes !== '') {
        const prom = cLoadImage(7, getPath(choice.value.eyes));
        promises.push(prom);
        // const img = await loadImage(getPath(choice.value.eyes))
        // context1.value.drawImage(img, 0, 0, 512, 512)
      }

      if (choice.value.glasses !== '') {
        const prom = cLoadImage(8, getPath(choice.value.glasses));
        promises.push(prom);
        // const img = await loadImage(getPath(choice.value.glasses))
        // context1.value.drawImage(img, 0, 0, 512, 512)
      }

      if (choice.value.shoes !== '') {
        const prom = cLoadImage(9, getPath(choice.value.shoes));
        promises.push(prom);
        // const img = await loadImage(getPath(choice.value.shoes))
        // context1.value.drawImage(img, 0, 0, 512, 512)
      }

      if (choice.value.onePiece === '' && choice.value.pants !== '') {
        const prom = cLoadImage(10, getPath(choice.value.pants));
        promises.push(prom);
        // const img = await loadImage(getPath(choice.value.pants))
        // context1.value.drawImage(img, 0, 0, 512, 512)
      }

      if (choice.value.onePiece === '' && choice.value.shirts !== '') {
        const prom = cLoadImage(11, getPath(choice.value.shirts));
        promises.push(prom);
        // const img = await loadImage(getPath(choice.value.shirts))
        // context1.value.drawImage(img, 0, 0, 512, 512)
      }
      if (choice.value.onePiece !== '') {
        const prom = cLoadImage(12, getPath(choice.value.onePiece));
        promises.push(prom);
        // const img = await loadImage(getPath(choice.value.onePiece))
        // context1.value.drawImage(img, 0, 0, 512, 512)
      }

      if (choice.value.lHand !== '') {
        const prom = cLoadImage(13, getPath(choice.value.lHand));
        promises.push(prom);
        // const img = await loadImage(getPath(choice.value.lHand))
        // context1.value.drawImage(img, 0, 0, 512, 512)
      }

      if (choice.value.rHand !== '') {
        const prom = cLoadImage(14, getPath(choice.value.rHand));
        promises.push(prom);
        // const img = await loadImage(getPath(choice.value.rHand))
        // images.push(img)
        // context1.value.drawImage(img, 0, 0, 512, 512)
      }

      Promise.all(promises).then(results => {
        results.sort((a, b) => a.num - b.num);

        context1.value.clearRect(0, 0, 512, 512);
        for (const obj of results) {
          context1.value.drawImage(obj.image, 0, 0, 512, 512);
        }
      });

      // if (images.length > 0) {
      //   for (let i =0; i<images.length; i++) {
      //     context1.value.drawImage(images[i], 0, 0, 512, 512)
      //   }
      // }
    });

    // const drawImage = (data: dress) => {
    //   data.
    // }

    const getTokenId = async () => {
      const choiceObj = $makerStore.choiceObj;
      console.log('choiceObj::', JSON.stringify(choiceObj));
      $wsStore.getTokenId(choiceObj);
    };

    const image2 = async () => {
      // const canvas1 = canvasRef.value;
      const myimg = await loadImage(getPath('body_0000'));
      const myimg2 = await loadImage(getPath('eyes_0001'));
      const myimg3 = await loadImage(getPath('shirts_0000'));
      const myimg4 = await loadImage(getPath('pants_0000'));
      const myimg5 = await loadImage(getPath('hair_0000'));
      const myimg6 = await loadImage(getPath('shoes_0000'));


      context1.value.drawImage(myimg, 0, 0, 512, 512);
      context1.value.drawImage(myimg2, 0, 0, 512, 512);

      context1.value.drawImage(myimg3, 0, 0, 512, 512);
      context1.value.drawImage(myimg4, 0, 0, 512, 512);

      context1.value.drawImage(myimg5, 0, 0, 512, 512);
      context1.value.drawImage(myimg6, 0, 0, 512, 512);

    };

    const clearRect = async () => {
      context1.value.clearRect(0, 0, 512, 512);
    };


    const calltest = async () => {
      const result = await wallet.testCallMethod1();
      state.tokenId = JSON.stringify(result);
      console.log('calltest result:', result);
    };

    const calltest2 = async () => {
      const result = await wallet.testCallMethod2();
      // state.tokenId = JSON.stringify(result)
      console.log('calltest2 result:', result);
    };

    const viewtest = async () => {
      const result = await wallet.testViewMethod1();
      console.log('testview result:', result);
    };
    const gettoken = async () => {
      const data = {
        account_id: 'hsyang.testnet',
        token_id: 'hello123token12344567',
        coordination: {
          body: 1,
          hair: 1,
          eyes: 1,
          shirts: 1,
          pants: 1,
          shoes: 0
        }
      };

      api.post('/getnft', data).then(response => {
        console.log(response.data);
        console.log(response.data.hello);
      })

        .catch(err => {
          console.log(err);
        });

    };

    return {
      viewtest,
      calltest,
      calltest2,
      getPath,
      image2,
      canvasRef,
      context1,
      clearRect,
      ...toRef(state),

      getTokenId,
      test1,
      test2,
      gettoken
    };
  }
});
</script>

<style scoped>

</style>
