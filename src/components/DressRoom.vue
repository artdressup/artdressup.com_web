<template>
  <div class='gt-sm'>
    <!--    가로-->
    <div class='container row'>
      <div class='col-2' style='display: inline-block'>
        <q-scroll-area ref='scrollArea' style='width:100px; height: 100vh;' :visible=false>
          <div style='height: 100px; background-color: #eee;'
               @mousedown='onMouseDown'
               @mousemove='onMouseMove'
               @mouseup='onMouseUp'
               @mouseleave='onMouseUp'
               :style='{ transform: `translateY(${translateY}px)` }'>

            <img src='https://cdn.artdressup.com/menu/dressroom/menu_body.webp' @click='category=0'
                 style='width: 10vh; height: 10vh' :class='{"red": category === 0}' />
            <img src='https://cdn.artdressup.com/menu/dressroom/menu_eyes.webp' @click='category=3'
                 style='width: 10vh; height: 10vh' :class='{"red": category === 3}' />
            <img src='https://cdn.artdressup.com/menu/dressroom/menu_mouth.webp' @click='category=6'
                 style='width: 10vh; height: 10vh' :class='{"red": category === 6}' />
            <img src='https://cdn.artdressup.com/menu/dressroom/menu_flush.webp' @click='category=5'
                 style='width: 10vh; height: 10vh' :class='{"red": category === 5}' />
            <img src='https://cdn.artdressup.com/menu/dressroom/menu_hair.webp' @click='category=2'
                 style='width: 10vh; height: 10vh' :class='{"red": category === 2}' />
            <img src='https://cdn.artdressup.com/menu/dressroom/menu_shirts.webp' @click='category=7'
                 style='width: 10vh; height: 10vh' :class='{"red": category === 7}' />
            <img src='https://cdn.artdressup.com/menu/dressroom/menu_pants.webp' @click='category=8'
                 style='width: 10vh; height: 10vh' :class='{"red": category === 8}' />
            <img src='https://cdn.artdressup.com/menu/dressroom/menu_onePiece.webp' @click='category=9'
                 style='width: 10vh; height: 10vh' :class='{"red": category === 9}' />
            <img src='https://cdn.artdressup.com/menu/dressroom/menu_shoes.webp' @click='category=12'
                 style='width: 10vh; height: 10vh' :class='{"red": category === 12}' />
            <img src='https://cdn.artdressup.com/menu/dressroom/menu_wing.webp' @click='category=13'
                 style='width: 10vh; height: 10vh' :class='{"red": category === 13}' />
            <img src='https://cdn.artdressup.com/menu/dressroom/menu_hat.webp' @click='category=1'
                 style='width: 10vh; height: 10vh' :class='{"red": category === 1}' />
            <img src='https://cdn.artdressup.com/menu/dressroom/menu_glasses.webp' @click='category=4'
                 style='width: 10vh; height: 10vh' :class='{"red": category === 4}' />
            <img src='https://cdn.artdressup.com/menu/dressroom/menu_lHand.webp' @click='category=10'
                 style='width: 10vh; height: 10vh' :class='{"red": category === 10}' />
            <img src='https://cdn.artdressup.com/menu/dressroom/menu_rHand.webp' @click='category=11'
                 style='width: 10vh; height: 10vh' :class='{"red": category === 11}' />
            <img src='https://cdn.artdressup.com/menu/dressroom/menu_background.webp' @click='category=14'
                 style='width: 10vh; height: 10vh' :class='{"red": category === 14}' />

          </div>
        </q-scroll-area>

      </div>


      <!--      <div class='col-10 row'>-->
      <div class='col-10' style='display: inline-block'>
        <!--        해당 카테고리의 아이템 수 만큼 반복-->
        <div v-if='category===0'>
          <DressRoomItems :urls='items.body' />
        </div>
        <div v-else-if='category===1'>
          <DressRoomItems :urls='items.hat' />
        </div>
        <div v-else-if='category===2'>
          <DressRoomItems :urls='items.hair' />
        </div>
        <div v-else-if='category===3'>
          <DressRoomItems :urls='items.eyes' />
        </div>
        <div v-else-if='category===4'>
          <DressRoomItems :urls='items.glasses' />
        </div>
        <div v-else-if='category===5'>
          <DressRoomItems :urls='items.flush' />
        </div>
        <div v-else-if='category===6'>
          <DressRoomItems :urls='items.mouth' />
        </div>
        <div v-else-if='category===7'>
          <DressRoomItems :urls='items.shirts' />
        </div>
        <div v-else-if='category===8'>
          <DressRoomItems :urls='items.pants' />
        </div>
        <div v-else-if='category===9'>
          <DressRoomItems :urls='items.onePiece' />
        </div>
        <div v-else-if='category===10'>
          <DressRoomItems :urls='items.lHand' />
        </div>
        <div v-else-if='category===11'>
          <DressRoomItems :urls='items.rHand' />
        </div>
        <div v-else-if='category===12'>
          <DressRoomItems :urls='items.shoes' />
        </div>
        <div v-else-if='category===13'>
          <DressRoomItems :urls='items.wing' />
        </div>
        <div v-else-if='category===14'>
          <DressRoomItems :urls='items.background' />
        </div>

      </div>
    </div>

  </div>

  <div class='lt-md'>
    <!--    세로-->
    <div class='containerX row'>
      <q-scroll-area ref='scrollArea' style='width: 100vw; height: 15vw; overflow-x: hidden' :visible=false>
        <div class='scroll-content' style='height: 15vw; background-color: #eee; overflow-x: hidden'
             @mousedown='onMouseDown'
             @mousemove='onMouseMove'
             @mouseup='onMouseUp'
             @mouseleave='onMouseUp'
             :style='{ transform: `translateX(${translateX}px)` }'>

          <img src='https://cdn.artdressup.com/menu/dressroom/menu_body.webp' @click='category=0'
               style='width: 15vw; height: 15vw' :class='{"red": category === 0}' />
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_eyes.webp' @click='category=3'
               style='width: 15vw; height: 15vw' :class='{"red": category === 3}' />
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_mouth.webp' @click='category=6'
               style='width: 15vw; height: 15vw' :class='{"red": category === 6}' />
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_flush.webp' @click='category=5'
               style='width: 15vw; height: 15vw' :class='{"red": category === 5}' />
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_hair.webp' @click='category=2'
               style='width: 15vw; height: 15vw' :class='{"red": category === 2}' />
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_shirts.webp' @click='category=7'
               style='width: 15vw; height: 15vw' :class='{"red": category === 7}' />
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_pants.webp' @click='category=8'
               style='width: 15vw; height: 15vw' :class='{"red": category === 8}' />
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_onePiece.webp' @click='category=9'
               style='width: 15vw; height: 15vw' :class='{"red": category === 9}' />
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_shoes.webp' @click='category=12'
               style='width: 15vw; height: 15vw' :class='{"red": category === 12}' />
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_wing.webp' @click='category=13'
               style='width: 15vw; height: 15vw' :class='{"red": category === 13}' />
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_hat.webp' @click='category=1'
               style='width: 15vw; height: 15vw' :class='{"red": category === 1}' />
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_glasses.webp' @click='category=4'
               style='width: 15vw; height: 15vw' :class='{"red": category === 4}' />
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_lHand.webp' @click='category=10'
               style='width: 15vw; height: 15vw' :class='{"red": category === 10}' />
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_rHand.webp' @click='category=11'
               style='width: 15vw; height: 15vw' :class='{"red": category === 11}' />
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_background.webp' @click='category=14'
               style='width: 15vw; height: 15vw' :class='{"red": category === 14}' />

        </div>
      </q-scroll-area>

      <div class='' style='display: inline-block'>
        <!--        해당 카테고리의 아이템 수 만큼 반복-->
        <div v-if='category===0'>
          <DressRoomItems :urls='items.body' />
        </div>
        <div v-else-if='category===1'>
          <DressRoomItems :urls='items.hat' />
        </div>
        <div v-else-if='category===2'>
          <DressRoomItems :urls='items.hair' />
        </div>
        <div v-else-if='category===3'>
          <DressRoomItems :urls='items.eyes' />
        </div>
        <div v-else-if='category===4'>
          <DressRoomItems :urls='items.glasses' />
        </div>
        <div v-else-if='category===5'>
          <DressRoomItems :urls='items.flush' />
        </div>
        <div v-else-if='category===6'>
          <DressRoomItems :urls='items.mouth' />
        </div>
        <div v-else-if='category===7'>
          <DressRoomItems :urls='items.shirts' />
        </div>
        <div v-else-if='category===8'>
          <DressRoomItems :urls='items.pants' />
        </div>
        <div v-else-if='category===9'>
          <DressRoomItems :urls='items.onePiece' />
        </div>
        <div v-else-if='category===10'>
          <DressRoomItems :urls='items.lHand' />
        </div>
        <div v-else-if='category===11'>
          <DressRoomItems :urls='items.rHand' />
        </div>
        <div v-else-if='category===12'>
          <DressRoomItems :urls='items.shoes' />
        </div>
        <div v-else-if='category===13'>
          <DressRoomItems :urls='items.wing' />
        </div>
        <div v-else-if='category===14'>
          <DressRoomItems :urls='items.background' />
        </div>

      </div>
    </div>
  </div>


</template>

<script>
import { defineComponent, reactive, computed, toRefs, ref, nextTick } from 'vue';
import { useMakerStore } from 'stores/maker';
import DressRoomItems from 'components/DressRoomItems.vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'DressRoom',
  components: { DressRoomItems },
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
    const $makerStore = useMakerStore();
    const $q = useQuasar();
    const state = reactive({
      category: 2,
      items: computed(() => $makerStore.dressroomItems),
      isRed: true
    });

    const translateY = ref(0);
    const translateX = ref(0);

    let startY = 0;
    let startX = 0;
    let isDragging = false;

    const onMouseDown = (event) => {
      startY = event.clientY;
      startX = event.clientX;
      isDragging = true;
    };

    const onMouseMove = (event) => {
      if (!isDragging) {
        return;
      }

      const deltaY = event.clientY - startY;
      const deltaX = event.clientX - startX;

      translateY.value += deltaY;
      translateX.value += deltaX;

      if (translateY.value > 0)
        translateY.value = 0;

      if (translateX.value > 0)
        translateX.value = 0;

      const ylimit = $q.screen.height * -0.66;
      if (translateY.value < ylimit)
        translateY.value = ylimit;

      const xlimit = $q.screen.width * -1.31;
      if (translateX.value < xlimit)
        translateX.value = xlimit;

      console.log(`$q.screen.height: ${$q.screen.height}`);

      console.log(`translateY.value: ${translateY.value}`);
      startY = event.clientY;
      startX = event.clientX;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    return {
      ...toRefs(state),
      translateY,
      translateX,
      onMouseDown,
      onMouseMove,
      onMouseUp
    };
  }
});
</script>

<style lang='sass'>
.red
  color: red
  border: 1px solid red

img
  display: block
  -webkit-user-drag: none

.container
  position: relative
  height: 85vh
  border: 1px solid #ccc
  overflow: hidden

.containerX
  width: 94vw
  position: relative
  border: 1px solid #ccc
  overflow: hidden

  img
    flex: none
    width: 100px
    height: 100px
    display: flex
    align-items: center
    justify-content: center
    -webkit-user-drag: none

.scroll-content
  display: flex
  white-space: nowrap
  overflow: hidden

</style>
