<template>

  <q-btn v-if='authStore.isSignIn' label='getReservation' @click='getReservation' />
  <div class='q-pa-md gt-sm row'>
    <div class='col-2'>
      <img src='icons/icon.png' style='width: 30px; height: 30px' @click='$router.push("/")' />
      <!--      <ins class='adsbygoogle'-->
      <!--           style='display:block; text-align:center;'-->
      <!--           data-ad-layout='in-article'-->
      <!--           data-ad-format='fluid'-->
      <!--           data-ad-client='ca-pub-5697765693347887'-->
      <!--           data-ad-slot='7702004195'></ins>-->

    </div>
    <div class='col'>
      <div style='height: 10vh'></div>
      <div class='row justify-center'>
        <canvas ref='canvas1' width='512' height='512' style='display: block'></canvas>
      </div>

      <div class='row justify-center'>
        <div v-if='makerStore.reservations.length > 0'>
          <template v-for='token_id in makerStore.reservations' :key='token_id'>
            <q-btn label='recieve' @click='nftMint(token_id)'>
              <q-tooltip>
                token_id: {{ token_id }}
              </q-tooltip>
            </q-btn>
          </template>
        </div>
        <div v-else>
          <q-btn v-if='authStore.isSignIn' label='mint' @click='nftReservation' />
        </div>

      </div>


    </div>
    <div class='col'>
      <div class='row justify-end' style='height: 5vh'>
        <!--        <q-btn label='hello'/>-->
        <!--        {{getAccountId()}}-->


        <q-badge v-if='authStore.isSignIn' color='orange' :label=authStore.accountId />
        <q-btn v-if='authStore.isSignIn' label='signOut' @click='signOut' />
        <q-btn v-else label='signIn' @click='signIn' />

      </div>

      <DressRoom width='2vw' height='2vw' />

    </div>
  </div>


  <div class='q-pa-md lt-md column'>
    <div class='col row justify-start'>
      <div class='col'>
        <img src='icons/icon.png' style='width: 30px; height: 30px;' @click='$router.push("/")' />
      </div>
      <div class='col-auto self-end'>
        <q-badge v-if='authStore.isSignIn' color='orange' :label=authStore.accountId />
        <q-btn v-if='authStore.isSignIn' label='signOut' @click='signOut' />
        <q-btn v-else label='signIn' @click='signIn' />
      </div>
    </div>
    <div class='col'>
      <div class='row justify-center' style='display: flex'>
        <canvas ref='canvas2' width='320' height='320' style='display: block'></canvas>
      </div>
    </div>
    <div v-if='authStore.isSignIn' class='col row justify-center q-pa-md'>

      <div v-if='makerStore.reservations.length > 0'>
        <template v-for='token_id in makerStore.reservations' :key='token_id'>
          <q-btn label='recieve' @click='nftMint(token_id)'>
            <q-tooltip>
              token_id: {{ token_id }}
            </q-tooltip>
          </q-btn>
        </template>
      </div>
      <div v-else>
        <q-btn v-if='authStore.isSignIn' label='mint' @click='nftReservation' />
      </div>

    </div>
    <div class='col'>
      <div class='row justify-center'>
        <DressRoom class='col-auto' width='2vw' height='2vw' />
      </div>

    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRef, watch, computed } from 'vue';
import { useMakerStore } from 'stores/maker';
import { useAuthStore } from 'stores/auth';
// import { useWsStore } from '../stores/websocket';
import { createCanvas, loadImage } from 'canvas';
import { wallet } from 'src/boot/near-wallet.ts';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

import DressRoom from 'components/DressRoom.vue';

export default defineComponent({
  name: 'MakerPage',
  components: { DressRoom },
  async mounted() {
    // (adsbygoogle = window.adsbygoogle || []).push({});
    // await this.getReservation();

    const canvas = this.$refs.canvas1;
    const context = canvas.getContext('2d');
    this.context1 = context;

    const canvas2 = this.$refs.canvas2;
    const context2 = canvas2.getContext('2d');
    this.context2 = context2;

    this.canvasRefresh1();

  },
  setup() {
    console.log('makerPage setup!!!');
    const context1 = ref(null);
    const context2 = ref(null);
    const makerStore = useMakerStore();
    const authStore = useAuthStore();
    const choice = ref(makerStore.dressroomChoice);
    const $q = useQuasar();

    // authStore.init();
    // makerStore.init();

    // const state = reactive({
    //   // isSignedIn: computed(() => $authStore.isSignedIn),
    //   canvas2: null,
    //   tokenId: ''
    // });

    const getPath = (name) => {
      return makerStore.getPath(name);
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

    const canvasRefresh1 = async () => {
      canvasRefresh(choice, context1, context2);
    };

    const canvasRefresh = async (choice, context1, context2) => {
      const promises = [];
      if (choice.value === undefined) {
        console.log('choice.value 는 undefined다!!');

      }

      if (choice.value !== undefined && choice.value.background !== '') {
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

        context2.value.clearRect(0, 0, 512, 512);
        for (const obj of results) {
          context2.value.drawImage(obj.image, 0, 0, 512, 512, 0, 0, 320, 320);
        }
      });

    };

    watch(() => makerStore.ttock, async (data1, before) => {
      console.log('watch??');
      await canvasRefresh(choice, context1, context2);
      // const data = makerStore.dressroomChoice;
      // if (images.length > 0) {
      //   for (let i =0; i<images.length; i++) {
      //     context1.value.drawImage(images[i], 0, 0, 512, 512)
      //   }
      // }
    });

    // const drawImage = (data: dress) => {
    //   data.
    // }

    const getTokenId = () => {
      const accountId = authStore.accountId;
      if (accountId === null) {
        return null;
      }
      const tokenId = makerStore.getTestnetTokenId(accountId);
      console.log('tokenId::::', tokenId);
      return tokenId;
    };

    const getAccountId = () => {
      return authStore.getAccountId();
    };

    const signIn = () => {
      authStore.signIn();
    };

    const signOut = () => {
      authStore.signOut();
    };

    const nftReservation = async () => {
      if (authStore.isSignIn === false) {
        signIn();
      } else {

        $q.dialog({
          title: 'Mint',
          message: 'Do you create NFTs with your current images? The cost is 20 near coins.',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          const tokenId = getTokenId();
          const result = await authStore.create_reservation(tokenId);
          console.log('nftReservation result::', result);
        });
      }
    };

    const getReservation = async () => {
      console.log('getReservation');
      if (authStore.isSignIn) {
        const tokenId = getTokenId();
        const result = await authStore.get_reservation();
        if (result !== undefined && result !== null) {
          const reservations = [];
          for (const obj of result) {
            reservations.push(obj.token_id);
            // console.log(obj.token_id)
          }
          makerStore.reservations = reservations;
        } else {
          makerStore.reservations = [];
          console.log('getReservation.. ?? else ?? 1234');
        }
      } else {
        console.log('getReservation.. ?? else ??');
      }
    };

    const nftMint = async (token_id) => {
      try {
        const choiceStr = makerStore.getTestnetChoiceStr(token_id);
        if (choiceStr === undefined) {
          throw new Error('nftMint choiceStr is undefined');
        }
        const choiceObj = JSON.parse(choiceStr);
        const account_id = authStore.accountId;
        const data = {
          account_id,
          token_id,
          coordination: choiceObj
        };

        const notif = $q.notify({
          type: 'ongoing',
          message: 'Creating NFTs.'
        });

        api.post('/getnft', data).then(response => {
          console.log(response.data);
          console.log(response.data.transaction_hash);
          console.log(`token_id:${response.data.token_id}`);

          notif({
            type: 'positive',
            message: `Check out the NFT. tx_id:${response.data.transaction_hash}`,
            timeout: 1000
          });

          makerStore.reservations = [];
        });

      } catch (e) {
        console.error(`nftMint Error: ${e}`);
      }

    };
    //

    return {
      getPath,
      context1,
      context2,
      // ...toRef(state),
      getTokenId,
      signIn,
      signOut,
      getAccountId,
      // isSignedIn,
      authStore,
      makerStore,
      nftReservation,
      getReservation,
      nftMint,
      canvasRefresh1
    };
  }
});
</script>

<style scoped>

</style>
