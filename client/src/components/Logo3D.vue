<template>
  <canvas
    ref="logo3D"
    class="max-[950px]:mx-auto"
  ></canvas>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

const logo3D = ref<null | HTMLCanvasElement>(null);

const path = computed<Function>(() => {
  return (path: string) => new URL(path, import.meta.url).href;
});

onMounted(() => {
  const scene = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.8);
  scene.add(directionalLight);
  directionalLight.position.set(0, 2, 0);

  const pointLight = new THREE.PointLight(0xffffff, 1.8);
  pointLight.position.set(0, 2, 0);
  scene.add(pointLight);

  const fbxLoader = new FBXLoader();
  fbxLoader.load(path.value('../assets/logo-3D.fbx'), (mesh: any) => {
    mesh.children[0].material = new THREE.MeshStandardMaterial({ color: '#ffffff' });
    mesh.children[1].material = new THREE.MeshStandardMaterial({ color: '#1877F2' });
    scene.add(mesh);
  });

  const aspect = {
    width: innerWidth / 2,
    height: innerHeight - 50,
  };

  const camera = new THREE.PerspectiveCamera(75, aspect.width / aspect.height);
  camera.position.z = 2;
  scene.add(camera);

  const domElement = (logo3D.value as HTMLCanvasElement);
  const renderer = new THREE.WebGLRenderer({ canvas: domElement, alpha: true });
  renderer.setSize(aspect.width, aspect.height);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.physicallyCorrectLights = true;

  const controls = new OrbitControls(camera, domElement);
  controls.enableDamping = true;
  controls.autoRotate = true;

  const updateSize = () => {
    if (window.innerWidth <= 950) {
      aspect.width = 200;
      aspect.height = 200;
    } else {
      aspect.width = innerWidth / 2;
      aspect.height = innerHeight - 50;
    }

    camera.aspect = aspect.width / aspect.height;
    camera.updateProjectionMatrix();

    renderer.setSize(aspect.width, aspect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  window.addEventListener('resize', updateSize);
  updateSize();

  const animation = () => {
    requestAnimationFrame(animation);
    renderer.render(scene, camera);
    controls.update();
  };

  animation();
});
</script>
