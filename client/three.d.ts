declare module 'three';

declare module 'three/addons/controls/OrbitControls.js' {
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  export { OrbitControls };
}

declare module 'three/addons/loaders/FBXLoader.js' {
  import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
  export { FBXLoader };
}
