<template>
  <div class='container row'>
    <!--    {{JSON.stringify(meta)}}-->
    <!--    {{items.body}}-->
    <!--    <div class='row content-wrapper'>-->
    <div class='col-2' style='display: inline-block'>
      <q-scroll-area  ref='scrollArea' style='width:100px; height: 100vh;'>
        <div style='height: 100px; background-color: #eee;'
             @mousedown='onMouseDown'
             @mousemove='onMouseMove'
             @mouseup='onMouseUp'
             @mouseleave='onMouseUp'
             :style='{ transform: `translateY(${translateY}px)` }'>

          <img src='https://cdn.artdressup.com/menu/dressroom/menu_body.webp' @click='category=0'
               style='width: 10vh; height: 10vh' :class='{"red": category === 0}' />
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_hat.webp' @click='category=1'
               style='width: 10vh; height: 10vh' :class='{"red": category === 1}'/>
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_hair.webp' @click='category=2'
               style='width: 10vh; height: 10vh' :class='{"red": category === 2}'/>
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_eyes.webp' @click='category=3'
               style='width: 10vh; height: 10vh' :class='{"red": category === 3}'/>
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_glasses.webp' @click='category=4'
               style='width: 10vh; height: 10vh' :class='{"red": category === 4}'/>
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_flush.webp' @click='category=5'
               style='width: 10vh; height: 10vh' :class='{"red": category === 5}'/>
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_mouth.webp' @click='category=6'
               style='width: 10vh; height: 10vh' :class='{"red": category === 6}'/>
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_shirts.webp' @click='category=7'
               style='width: 10vh; height: 10vh' :class='{"red": category === 7}'/>
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_pants.webp' @click='category=8'
               style='width: 10vh; height: 10vh' :class='{"red": category === 8}'/>
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_onePiece.webp' @click='category=9'
               style='width: 10vh; height: 10vh' :class='{"red": category === 9}'/>
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_lHand.webp' @click='category=10'
               style='width: 10vh; height: 10vh' :class='{"red": category === 10}'/>
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_rHand.webp' @click='category=11'
               style='width: 10vh; height: 10vh' :class='{"red": category === 11}'/>
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_shoes.webp' @click='category=12'
               style='width: 10vh; height: 10vh' :class='{"red": category === 12}'/>
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_wing.webp' @click='category=13'
               style='width: 10vh; height: 10vh' :class='{"red": category === 13}'/>
          <img src='https://cdn.artdressup.com/menu/dressroom/menu_background.webp' @click='category=14'
               style='width: 10vh; height: 10vh' :class='{"red": category === 14}'/>

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
      isRed: true,
    });

    const translateY = ref(0);
    let startY = 0;
    let isDragging = false;

    const onMouseDown = (event) => {
      startY = event.clientY;
      isDragging = true;
    };

    const onMouseMove = (event) => {
      if (!isDragging) {
        return;
      }

      const deltaY = event.clientY - startY;
      translateY.value += deltaY;

      if (translateY.value > 0)
        translateY.value = 0

      const ylimit = $q.screen.height * -0.66;
      if (translateY.value < ylimit)
        translateY.value = ylimit
      console.log(`$q.screen.height: ${$q.screen.height}`)

      console.log(`translateY.value: ${translateY.value}`)
      startY = event.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    return {
      ...toRefs(state),
      translateY,
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

//overflow: hidden
//cursor: pointer
//position: relative
//margin-top: 2px
//margin-left: 5px
//margin-right: 5px
//overflow-y: scroll
//border: 1px solid
//border-color: red
//width: 33vw
//height: 80vh
//a
//  -webkit-user-drag: none

img
  display: block
  -webkit-user-drag: none

.container
  position: relative
  height: 100vh

//.content-wrapper
//  position: absolute
//  top: 60px
//  bottom: 0
//  left: 0
//  right: 0
//  overflow-y: scroll

.container
  position: relative
  height: 85vh
  border: 1px solid #ccc
  overflow: hidden

//.left-content
//  display: inline-block
//  vertical-align: top
//  height: 100%
//  overflow-y: scroll
//  width: 50%
//  -webkit-user-drag: none
//  // 스크롤바 스타일링
//  &::-webkit-scrollbar
//    width: 0
//    height: 0
//  // 스크롤바 숨기기
//  &::-webkit-scrollbar-thumb
//    display: none
//
//  -webkit-overflow-scrolling: touch
//  // 아이패드에서 터치&드래그 스크롤 사용
//  img
//    pointer-events: none
//  // 이벤트가 이미지를 거치지 않도록 설정
//  .image-area
//    overflow-y: scroll
//    -webkit-overflow-scrolling: touch

//.right-content
//  display: inline-block
//  vertical-align: top
//  height: 100%
//  overflow-y: scroll
//  width: 50%
//  -webkit-user-drag: none
//  // 스크롤바 스타일링
//  &::-webkit-scrollbar
//    width: 0
//    height: 0
//  // 스크롤바 숨기기
//  &::-webkit-scrollbar-thumb
//    display: none

//.image-area
//  overflow-y: scroll
//  -webkit-overflow-scrolling: touch

//.scroll-container
//  width: 400px
//  height: 200px
//  overflow-x: scroll
//  -webkit-overflow-scrolling: touch
//  border: 1px solid #ddd
//  position: relative

//.content
//  width: 2000px
//  height: 100%
//  white-space: nowrap
//  font-size: 20px

</style>
