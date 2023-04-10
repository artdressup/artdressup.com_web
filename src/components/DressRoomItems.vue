<template>
  <template v-for='url in urls' :key='url'>
    <div class='gt-sm dressroom-items-md'>
      <img class='fit' :src='url' @click='choice(url)' style='padding: 0; margin: 0'/>
    </div>
    <div class='lt-md dressroom-items-sm'>
      <img class='fit' :src='url' @click='choice(url)' style='padding: 0; margin: 0'/>
    </div>
  </template>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { useMakerStore } from 'stores/maker';

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
.dressroom-items-sm
  width: 20%
  //border: solid 1px
  //border-color: red
  display: inline-block
  padding: 0
  margin: 0


.dressroom-items-md
  width: 25%
  //border: solid 1px
  //border-color: red
  display: inline-block
  padding: 0
  margin: 0

.box
  width: 33%
  //border: solid 1px
  //border-color: red
  display: inline-block
  padding: 0
  margin: 0

.blue
  border: 1px solid blue

</style>
