<template>
  <!--  <q-layout view='hHh Lpr lff'>-->
  <q-layout view='hhh Lpr fFf' class='q-header-bg'>
    <div data-aos='fade-down'>
      <q-header elevated style='background: none'>
        <q-toolbar>
          <img src='icons/icon.png' style='width: 40px; height: 40px' @click='$router.push("/")'/>

          <q-toolbar-title>
            <!--          <b>Art Dress Up</b>-->
          </q-toolbar-title>

          <!--        <q-btn label='sign in' @click='signIn' />-->

          <q-btn class='adu-ff' label='play' to='/maker' />
          <q-btn class='adu-ff' label='github' @click='goToGitHub'/>
          <q-btn class='adu-ff' label='docs' @click='goToDocs'/>
          <!--        <q-btn-->
          <!--          flat-->
          <!--          dense-->
          <!--          round-->
          <!--          icon='menu'-->
          <!--          aria-label='Menu'-->
          <!--          @click='toggleLeftDrawer'-->
          <!--        />-->
        </q-toolbar>
      </q-header>
    </div>

    <!--    <q-drawer-->
    <!--      side='right'-->
    <!--      v-model='leftDrawerOpen'-->
    <!--      :breakpoint='0'-->
    <!--      show-if-above-->
    <!--      bordered-->
    <!--      overlay-->
    <!--    >-->
    <!--      <q-list>-->
    <!--        <q-item-label-->
    <!--          header-->
    <!--        >-->
    <!--          Essential Links-->
    <!--        </q-item-label>-->

    <!--        <EssentialLink-->
    <!--          v-for='link in essentialLinks'-->
    <!--          :key='link.title'-->
    <!--          v-bind='link'-->
    <!--        />-->
    <!--      </q-list>-->
    <!--    </q-drawer>-->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
// import EssentialLink from 'components/EssentialLink.vue';
import { useAuthStore } from 'stores/auth';

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

  // components: {
  //   EssentialLink
  // },

  setup() {
    const leftDrawerOpen = ref(false);
    const $authStore = useAuthStore();

    // const signIn = () => {
    //   $authStore.signIn()
    // }
    const goToGitHub = () => {
      window.open('https://github.com/artdressup', '_blank')
    }
    const goToDocs = () => {
      window.open('https://docs.artdressup.com/', '_blank')
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      goToGitHub,
      goToDocs
      // signIn,
    };
  }
});
</script>

<style lang='sass'>
.q-header-bg
  background: rgb(0, 0, 0)
  background: linear-gradient(152deg, rgba(0, 0, 0, 1) 0%, rgba(17, 6, 46, 1) 88%, rgba(34, 0, 106, 1) 100%)
</style>
