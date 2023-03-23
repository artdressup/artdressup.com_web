<template>
  <div>
    <canvas ref='canvas'>

    </canvas>
  </div>
</template>

<script>
import * as BABYLON from 'babylonjs'
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BabylonTest',
  mounted() {
    // canvas 요소 가져오기
    const canvas = this.$refs.canvas;

    // 엔진 생성
    const engine = new BABYLON.Engine(canvas, true);

    // 씬 생성
    const scene = new BABYLON.Scene(engine);

    // 카메라 추가
    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, false);

    // 라이트 추가
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

    // 큐브 추가
    const box = BABYLON.MeshBuilder.CreateBox('box', { size: 2 }, scene);

    // 큐브에 텍스쳐 추가
    const material = new BABYLON.StandardMaterial('material', scene);
    material.diffuseColor = new BABYLON.Color3(1, 0, 0);
    box.material = material;

    // 렌더링 루프 시작
    engine.runRenderLoop(() => {
      scene.render();
    });
  },

});
</script>

<style scoped>

</style>
