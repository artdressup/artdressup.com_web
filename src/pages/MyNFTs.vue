<template>
  <div>
    <template v-for='token in token_ids' :key='token'>
      {{token}}
    </template>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, toRefs } from 'vue';
import { useAuthStore } from '../stores/auth';

export default defineComponent({
  name: 'MyNFTs',
  async mounted() {
    console.log('mounted')
    const aa = await this.authStore.get_my_token_ids()
    this.token_ids = aa
    console.log(aa[0])
  },
  setup() {
    const authStore = useAuthStore();
    const state = reactive({
      token_ids:[]
    })
    // const token_ids = ref([])
    // const get_my_tokens_ids = async () => {
    //   const aa = authStore.get_my_token_ids()
    //   console.log(aa)
    //   return aa;
    // };
    return {
      // get_my_tokens_ids,
      // token_ids,
      ...toRefs(state),
      authStore
    };
  }
});
</script>

<style scoped>

</style>
