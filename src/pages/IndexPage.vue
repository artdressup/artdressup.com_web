<template>
  <div>
    <div class='lt-sm'>
      <!--      작은화면-->
      <!--      <video autoplay loop style='position: relative'>-->
      <!--        <source src='https://cdn.artdressup.com/web/main.mp4' type='video/mp4'>-->
      <!--      </video>-->
      <!--      Hello-->
    </div>

    <div class='q-py-lg' />
    <div class='row'>
      <div class='gt-sm col-2' />
      <div class='col q-pa-md'>
        <p class='adu-fs3 q-ma-none adu-ta-center adu-ff'><span style='color: #e7e772'>Art</span> Dress <span style='color: #48b2d0'>Up</span></p>
        <p class='adu-fs1 adu-ta-center adu-ff'>
          <img src='icons/near_icon.png' style='width: 1vw; height: 1vw; margin-top: 4px'/>
          DApp
        </p>
        <div class='q-py-lg' />
        <div class='adu-fs2 q-ma-none q-pa-none adu-ta-center adu-ff' style='margin:0; padding: 0'>Make the fashion you want.</div>
        <div class='q-py-lg' />


        <p class='adu-fs2 q-ma-none q-pa-none adu-ta-center adu-ff' style='margin:0; padding: 0'>
          This project is still under development, so many contents can be changed, including docs. The functionality currently implemented only works on TestNet. If you want, test it according to the contents below.
        </p>

      </div>
      <div class='col fit'>
          <div class='video-container'>
            <!--      큰화면-->
            <video autoplay loop muted>
              <source src='https://cdn.artdressup.com/web/main.mp4' type='video/mp4'>
            </video>
          </div>
        <p class='adu-fs1 adu-ta-center adu-ff'>She is very innocent and likes to draw cute pictures.</p>

<!--        <div class='video-container'>-->
<!--          &lt;!&ndash;      큰화면&ndash;&gt;-->
<!--          <video autoplay loop>-->
<!--            <source src='https://cdn.artdressup.com/web/main.mp4' type='video/mp4'>-->
<!--          </video>-->
<!--          <p style='color: white'>She is very innocent and likes to draw cute pictures.</p>-->

<!--          <div class='overlay-text adu-fw-bold adu-fs2'>-->
<!--            She is very innocent and likes to draw cute pictures.-->
<!--          </div>-->

<!--        </div>-->
      </div>

      <div class='gt-sm col-2' />
    </div>


    <div class='q-py-lg' />
    <div class='row'>
      <div class='gt-sm col-2' />
      <div class='col adu-ta-center adu-fs3 adu-fw-bold adu-ff'>How to Mint an <span style='color: #48b2d0'>NFT</span></div>
      <div class='gt-sm col-2' />
    </div>
    <div class='row'>
      <div class='gt-sm col-2' />
      <div class='col'>
        <div data-aos='fade-down' class='adu-fs2 how-to-box q-my-md adu-ff' style='width: 80%;'>
          <div class='how-to-box-title'>
            1. Click the play button in the upper right.
          </div>
          <div class='how-to-box-content'>
            You can dress the doll by pressing the play button to go to the maker page.
          </div>
        </div>

        <div data-aos='fade-down' class='adu-fs2 how-to-box q-my-md adu-ff' style='width: 80%; margin-left: 20%'>
          <div class='how-to-box-title'>
            2. Click the signIn button to log in to mynearwallet.
          </div>
          <div class='how-to-box-content'>
            If your near wallet does not exist, you must create one.
          </div>
        </div>

        <div data-aos='fade-down' class='adu-fs2 how-to-box q-my-md adu-ff' style='width: 80%;'>
          <div class='how-to-box-title'>
            3. Make your favorite fashion.
          </div>
          <div class='how-to-box-content'>
            Please enjoy wearing your favorite clothes. TestNet allows NFTs of the same fashion.
          </div>
        </div>

        <div data-aos='fade-down' class='adu-fs2 how-to-box q-my-md adu-ff' style='width: 80%; margin-left: 20%'>
          <div class='how-to-box-title'>
            4. Press the nft reservation button.
          </div>
          <div class='how-to-box-content'>
            You have to pay with near coin. This is actually a mint cost.
          </div>
        </div>

        <div data-aos='fade-down' class='adu-fs2 how-to-box q-my-md adu-ff' style='width: 80%;'>
          <div class='how-to-box-title'>
            5. Click the Mint button.
          </div>
          <div class='how-to-box-content'>
            The server processes the image and mint an NFT.
          </div>
        </div>

      </div>


      <div class='gt-sm col-2' />
    </div>

<!--    <div style='height: 80vh' />-->

    <!--    <div data-aos='fade-up' data-aos-anchor-placement='top-center'-->
    <!--         style='height: 300px; width: 300px; background-color: red'>-->
    <!--      aaaaaaaaaaaaaaaaaaaaaaa-->
    <!--    </div>-->

    <!--    <div data-aos='fade-up' data-aos-anchor-placement='top-center'-->
    <!--         style='height: 300px; width: 300px; background-color: red'>-->
    <!--      aaaaaaaaaaaaaaaaaaaaaaa-->
    <!--    </div>-->

    <!--    <div data-aos='fade-up' data-aos-anchor-placement='top-center'-->
    <!--         style='height: 300px; width: 300px; background-color: red'>-->
    <!--      aaaaaaaaaaaaaaaaaaaaaaa-->
    <!--    </div>-->

    <!--    <div data-aos='fade-up' data-aos-anchor-placement='top-center'-->
    <!--         style='height: 300px; width: 300px; background-color: red'>-->
    <!--      aaaaaaaaaaaaaaaaaaaaaaa-->
    <!--    </div>-->

    <!--    <div data-aos='fade-up' data-aos-anchor-placement='top-center'-->
    <!--         style='height: 300px; width: 300px; background-color: red'>-->
    <!--      aaaaaaaaaaaaaaaaaaaaaaa-->
    <!--    </div>-->


  </div>
</template>

<script lang='ts'>
import { Todo, Meta } from 'components/models';
// import ExampleComponent from 'components/ExampleComponent.vue';
import { useMakerStore } from 'stores/maker';
import { defineComponent, ref } from 'vue';
// import * as BABYLON from 'babylonjs';
// import 'babylonjs-loaders';

export default defineComponent({
  name: 'IndexPage',
  mounted() {
    // const canvas = this.$refs.renderCanvas;
    // const engine = new BABYLON.Engine(canvas, true);
    // const createScene = () => {
    //   const scene = new BABYLON.Scene(engine);
    //   // 렌더링할 모델 등을 추가하는 코드 작성
    //   return scene;
    // };
    // const scene = createScene();
    // BABYLON.SceneLoader.ImportMesh(
    //   '', // rootUrl
    //   '', // 파일 경로
    //   '3d/abc/abc.dae',
    //   scene, // scene
    //   function(meshes) {
    //     // 모델 로드가 완료되었을 때 실행될 콜백 함수
    //     console.log('모델 로드 완료');
    //     // 새로운 카메라 추가
    //     const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), scene);
    //     camera.setTarget(BABYLON.Vector3.Zero());
    //     scene.activeCamera = camera;
    //   }
    // );
    // engine.runRenderLoop(() => {
    //   if (scene.activeCamera) {
    //     scene.render();
    //   }
    // });
    // window.addEventListener('resize', () => {
    //   engine.resize();
    // });
  },
  setup() {
    const $makerStore = useMakerStore();
    const getPath = (name: string) => {
      return $makerStore.getPath(name);
    };
    const todos = ref<Todo[]>([
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ]);
    const meta = ref<Meta>({
      totalCount: 1200
    });

    return { todos, meta, getPath };
  }
});
</script>

<style lang='sass'>
//.main
  // height: 99vh
  //background: rgb(2,0,36)
  //background: linear-gradient(144deg, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 77%, rgba(0,212,255,1) 100%)
  //background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAAF5JREFUGFdjbE2p+V89p4VRIy3u/41ZixgZGBgYwMQn6U//+Z7yMcp+uPL/sYAOA5iRUbKCoXpOC4PshysMIDYjTBVI+6mtUxj4nvIxMELNZNBIi2OI/SfHsJjpEQMAxZYqUyeejskAAAAASUVORK5CYII=") repeat

  //background-color: #31e297
  //background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40' width='80' height='40'%3E%3Cpath fill='%236200ff' fill-opacity='0.4' d='M0 40a19.96 19.96 0 0 1 5.9-14.11 20.17 20.17 0 0 1 19.44-5.2A20 20 0 0 1 20.2 40H0zM65.32.75A20.02 20.02 0 0 1 40.8 25.26 20.02 20.02 0 0 1 65.32.76zM.07 0h20.1l-.08.07A20.02 20.02 0 0 1 .75 5.25 20.08 20.08 0 0 1 .07 0zm1.94 40h2.53l4.26-4.24v-9.78A17.96 17.96 0 0 0 2 40zm5.38 0h9.8a17.98 17.98 0 0 0 6.67-16.42L7.4 40zm3.43-15.42v9.17l11.62-11.59c-3.97-.5-8.08.3-11.62 2.42zm32.86-.78A18 18 0 0 0 63.85 3.63L43.68 23.8zm7.2-19.17v9.15L62.43 2.22c-3.96-.5-8.05.3-11.57 2.4zm-3.49 2.72c-4.1 4.1-5.81 9.69-5.13 15.03l6.61-6.6V6.02c-.51.41-1 .85-1.48 1.33zM17.18 0H7.42L3.64 3.78A18 18 0 0 0 17.18 0zM2.08 0c-.01.8.04 1.58.14 2.37L4.59 0H2.07z'%3E%3C/path%3E%3C/svg%3E")
  //background-image: repeating-linear-gradient(135deg, rgb(0,0,0) 0px, rgb(0,0,0) 10px,transparent 10px, transparent 11px),repeating-linear-gradient(22.5deg, rgb(0,0,0) 0px, rgb(0,0,0) 10px,transparent 10px, transparent 11px),linear-gradient(90deg, hsl(194,74%,56%),hsl(266,74%,56%),hsl(338,74%,56%),hsl(50,74%,56%),hsl(122,74%,56%))

  //background: rgb(0,0,0)
  //background: linear-gradient(152deg, rgba(0,0,0,1) 0%, rgba(17,6,46,1) 88%, rgba(34,0,106,1) 100%)

.video-container
  position: relative
  display: inline-block
  /* 또는 'block'을 사용해 전체 너비를 사용하도록 설정 */
  width: 100%
  max-width: 960px
  /* 원하는 최대 너비를 설정 */
  height: 0
  padding-bottom: 90%
  /* 비디오의 가로세로비에 따라 변경 (예: 16:9 = 56.25%) */
  overflow: hidden

video
  position: absolute
  //top: 0
  //left: 0
  //width: 100%
  //height: 100%
  //object-fit: cover
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  width: 100%
  height: 100%
  object-fit: cover
  z-index: 1

.overlay-text
  position: absolute
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  color: white
  font-size: 24px
  text-align: center
  /* 추가적인 스타일 (예: 텍스트 그림자) */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5)
  z-index: 2

.how-to-box
  border-radius: 100px 15px 66px 29px
  -moz-border-radius: 100px 15px 66px 29px
  -webkit-border-radius: 100px 15px 66px 29px
  border: 15px dashed #1F015E
  padding: 10px 10px 10px 60px // 위, 오른쪽, 아래, 왼쪽
  margin-top: 50px

.how-to-box-title
  font-width: bold
  font-size: 2rem
  margin-bottom: 10px
  color: #48b2d0

.how-to-box-content
  font-width: bold
  font-size: 1.5rem


</style>
