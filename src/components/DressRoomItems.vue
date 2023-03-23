<template>
  <template v-for='url in urls' :key='url'>
    <div class='box'>
      <img class='fit' :src='url' @click='choice(url)' />
    </div>
  </template>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useMakerStore } from 'stores/maker';
import { createCanvas, loadImage } from 'canvas';

export default defineComponent({
  name: 'DressRoomItems',
  props: {
    category: {
      type: Number,
      required: true
    },
    urls: {
      type: Array,
      required: true
    }
  },
  setup() {
    const $makerStore = useMakerStore();

    const choice = (url) => {
      $makerStore.choiceDress(url)
    }

    return {
      choice,
    }
  }
});
</script>

<style lang='sass'>
.box
  width: 33%
  border: solid 1px
  border-color: red
  display: inline-block
  box-shadow: 0 25px 30px #00000029

</style>
