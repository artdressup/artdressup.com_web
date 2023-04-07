import { boot } from 'quasar/wrappers'
import AOS from 'aos'
import 'aos/dist/aos.js'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({app}/* { app, router, ... } */) => {
  // something to do
  console.log("?????????????")
  AOS.init();
  // app.setup = () => {
  //   console.log("?????????????app.setup??")
  //   AOS.init();
  // }
})
