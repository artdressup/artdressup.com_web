<template>
  <div>
    Hmm..
    <div class='lt-sm'>
      lt-sm
    </div>
    <div class='gt-xs'>
      gt-xs
    </div>
    <div class='row'>
      <div class='col'></div>
      <div class='col'></div>
      <div class='col'>
<!--        <DressRoom width='10px' height='10px'/>-->
      </div>
    </div>
<!--    <div ref='canvasContainer'>-->
<!--      <canvas ref='renderCanvas'></canvas>-->
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
