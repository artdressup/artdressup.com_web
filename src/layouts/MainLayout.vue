<template>
  <q-layout view='hHh Lpr lff'>
    <q-header elevated>
      <q-toolbar>
        <img src='icons/icon.png' style='width: 40px; height: 40px'/>

        <q-toolbar-title>
          <b>Art Dress Up</b>
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon='menu'
          aria-label='Menu'
          @click='toggleLeftDrawer'
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      side='right'
      v-model='leftDrawerOpen'
      :breakpoint='0'
      show-if-above
      bordered
      overlay
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for='link in essentialLinks'
          :key='link.title'
          v-bind='link'
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'maker',
    caption: '',
    icon: 'home',
    link: '/#/maker'
  }
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  }
});
</script>
