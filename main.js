import * as THREE from 'three';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // 引入 OrbitControls

// 建立場景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); // 設置淺灰色背景

// 建立相機
const camera = new THREE.PerspectiveCamera(
  45, // 視角改小一點，讓視野更寬
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 5, 10); // 調整相機位置

// 建立渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// 添加 OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 添加慣性
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 3; // 最小縮放距離
controls.maxDistance = 20; // 最大縮放距離
controls.maxPolarAngle = Math.PI / 2; // 限制相機仰角

// 添加光源
// 環境光 - 提高強度，使用更亮的顏色
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // 增加亮度到 0.6
scene.add(ambientLight);

// 主要方向光 - 從前上方照射
const mainLight = new THREE.DirectionalLight(0xffffff, 1.0); // 白光，強度 1.0
mainLight.position.set(0, 10, 10);
scene.add(mainLight);

// 填充光 - 從左側照射
const fillLight = new THREE.DirectionalLight(0xffffff, 0.8); // 白光，強度 0.8
fillLight.position.set(-10, 5, 0);
scene.add(fillLight);

// 背光 - 從後方照射，增加輪廓感
const backLight = new THREE.DirectionalLight(0xffffff, 0.5); // 白光，強度 0.5
backLight.position.set(0, 5, -10);
scene.add(backLight);

// 載入管理器
const loadingManager = new THREE.LoadingManager();
const loadingElement = document.getElementById('loading');

loadingManager.onStart = () => {
  loadingElement.style.display = 'block';
};

loadingManager.onProgress = (url, loaded, total) => {
  console.log(`Loading file: ${url}\nLoaded: ${loaded}/${total}`);
};

loadingManager.onLoad = () => {
  loadingElement.style.display = 'none';
};

loadingManager.onError = (url) => {
  console.error('載入時發生錯誤:', url);
  loadingElement.textContent = 'Error loading model';
};

// 載入材質和模型
const mtlLoader = new MTLLoader(loadingManager);
mtlLoader.setPath('model/');
mtlLoader.load(
  'model.mtl',
  (materials) => {
    materials.preload();

    const objLoader = new OBJLoader(loadingManager);
    objLoader.setMaterials(materials);
    objLoader.setPath('model/');
    objLoader.load(
      'model.obj',
      (object) => {
        // 自動調整模型大小和位置
        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 4 / maxDim; // 預設大小調大一點
        object.scale.multiplyScalar(scale);

        object.position.sub(center.multiplyScalar(scale));

        scene.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('模型載入錯誤:', error);
        loadingElement.textContent = 'Error loading model';
      },
    );
  },
  undefined,
  (error) => {
    console.error('材質載入錯誤:', error);
    loadingElement.textContent = 'Error loading materials';
  },
);

// 處理視窗大小改變
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// 動畫循環
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // 更新控制器
  renderer.render(scene, camera);
}

animate();
