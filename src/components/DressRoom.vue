<template>
  <div class='divround1'>
<!--    {{JSON.stringify(meta)}}-->
<!--    {{items.body}}-->
    <div class='row'>
      <div class='col-2' style='border: 1px solid'>
<!--        // https://d2licbkztr442e.cloudfront.net/resource/-->
        <img src='https://cdn.artdressup.com/menu/dressroom/menu_body.webp' @click='category=0' style='width: 80px; height: 80px'/>
        <img src='https://cdn.artdressup.com/menu/dressroom/menu_hat.webp' @click='category=1' style='width: 80px; height: 80px'/>
        <img src='https://cdn.artdressup.com/menu/dressroom/menu_hair.webp' @click='category=2' style='width: 80px; height: 80px'/>
        <img src='https://cdn.artdressup.com/menu/dressroom/menu_eyes.webp' @click='category=3' style='width: 80px; height: 80px'/>
        <img src='https://cdn.artdressup.com/menu/dressroom/menu_glasses.webp' @click='category=4' style='width: 80px; height: 80px'/>
        <img src='https://cdn.artdressup.com/menu/dressroom/menu_flush.webp' @click='category=5' style='width: 80px; height: 80px'/>
        <img src='https://cdn.artdressup.com/menu/dressroom/menu_mouth.webp' @click='category=6' style='width: 80px; height: 80px'/>
        <img src='https://cdn.artdressup.com/menu/dressroom/menu_shirts.webp' @click='category=7' style='width: 80px; height: 80px'/>
        <img src='https://cdn.artdressup.com/menu/dressroom/menu_pants.webp' @click='category=8' style='width: 80px; height: 80px'/>
        <img src='https://cdn.artdressup.com/menu/dressroom/menu_onePiece.webp' @click='category=9' style='width: 80px; height: 80px'/>
        <img src='https://cdn.artdressup.com/menu/dressroom/menu_lHand.webp' @click='category=10' style='width: 80px; height: 80px'/>
        <img src='https://cdn.artdressup.com/menu/dressroom/menu_rHand.webp' @click='category=11' style='width: 80px; height: 80px'/>
        <img src='https://cdn.artdressup.com/menu/dressroom/menu_shoes.webp' @click='category=12' style='width: 80px; height: 80px'/>
        <img src='https://cdn.artdressup.com/menu/dressroom/menu_wing.webp' @click='category=13' style='width: 80px; height: 80px'/>
        <img src='https://cdn.artdressup.com/menu/dressroom/menu_background.webp' @click='category=14' style='width: 80px; height: 80px'/>

<!--        <q-btn label='body' @click='category=0' style='display: block'/>-->
<!--        <q-btn label='hat' @click='category=1' style='display: block'/>-->
<!--        <q-btn label='hair' @click='category=2' style='display: block'/>-->


<!--        <q-btn label='eyes' @click='category=3' style='display: block'/>-->
<!--        <q-btn label='glasess' @click='category=4' style='display: block'/>-->
<!--        <q-btn label='flush' @click='category=5' style='display: block'/>-->
<!--        <q-btn label='mouth' @click='category=6' style='display: block'/>-->
<!--        <q-btn label='shirts' @click='category=7' style='display: block'/>-->
<!--        <q-btn label='pants' @click='category=8' style='display: block'/>-->
<!--        <q-btn label='onePiece' @click='category=9' style='display: block'/>-->
<!--        <q-btn label='lHand' @click='category=10' style='display: block'/>-->
<!--        <q-btn label='rHand' @click='category=11' style='display: block'/>-->
<!--        <q-btn label='shoes' @click='category=12' style='display: block'/>-->
<!--        <q-btn label='wing' @click='category=13' style='display: block'/>-->
<!--        <q-btn label='background' @click='category=14' style='display: block'/>-->

<!--        카테고리 수만큼 반복-->
      </div>
      <div class='col-10 row'>
<!--        해당 카테고리의 아이템 수 만큼 반복-->
        <div v-if='category===0'>
          <DressRoomItems :urls='items.body'/>
        </div>
        <div v-else-if='category===1'>
          <DressRoomItems :urls='items.hat'/>
        </div>
        <div v-else-if='category===2'>
          <DressRoomItems :urls='items.hair'/>
        </div>
        <div v-else-if='category===3'>
          <DressRoomItems :urls='items.eyes'/>
        </div>
        <div v-else-if='category===4'>
          <DressRoomItems :urls='items.glasses'/>
        </div>
        <div v-else-if='category===5'>
          <DressRoomItems :urls='items.flush'/>
        </div>
        <div v-else-if='category===6'>
          <DressRoomItems :urls='items.mouth'/>
        </div>
        <div v-else-if='category===7'>
          <DressRoomItems :urls='items.shirts'/>
        </div>
        <div v-else-if='category===8'>
          <DressRoomItems :urls='items.pants'/>
        </div>
        <div v-else-if='category===9'>
          <DressRoomItems :urls='items.onePiece'/>
        </div>
        <div v-else-if='category===10'>
          <DressRoomItems :urls='items.lHand'/>
        </div>
        <div v-else-if='category===11'>
          <DressRoomItems :urls='items.rHand'/>
        </div>
        <div v-else-if='category===12'>
          <DressRoomItems :urls='items.shoes'/>
        </div>
        <div v-else-if='category===13'>
          <DressRoomItems :urls='items.wing'/>
        </div>
        <div v-else-if='category===14'>
          <DressRoomItems :urls='items.background'/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, computed, toRefs } from 'vue';
import { useMakerStore } from 'stores/maker';
import DressRoomItems from 'components/DressRoomItems.vue';

export default defineComponent({
  name: 'DressRoom',
  components: {DressRoomItems},
  props: {
    width: {
      type: String,
      required: true
    },

    height: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  },
  setup() {
    const $makerStore = useMakerStore()
    const state = reactive({
      category: 2,
      items: computed(()=> $makerStore.dressroomItems)
    })

    return {
      ...toRefs(state)
    }
  }
});
</script>

<style lang='sass'>
.divround1
  border-radius: 1.5em
  //overflow: hidden
  cursor: pointer
  position: relative
  margin-top: 2px
  margin-left: 5px
  margin-right: 5px
  overflow-y: scroll
  border: 1px solid
  border-color: red


</style>

{"body": 5, "hat": 0, "hair": 6, "eyes": 2, "glasses": 1, "flush": 1, "mouth": 1, "shirts": 4, "pants": 5, "one-piece": 1, "lHand": 1, "rHand": 1, "shoes": 1, "wing": 0, "background": 0}
