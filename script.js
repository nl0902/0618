let scene, camera, renderer, mouth;
let visemeIndex = 0;

function init3D() {
  const container = document.getElementById("canvasContainer");

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(400, 400);
  container.appendChild(renderer.domElement);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 1, 2);
  scene.add(light);

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xdddddd })
  );
  head.position.y = 0;
  scene.add(head);

  mouth = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.1, 0.05),
    new THREE.MeshStandardMaterial({ color: 0xff3333 })
  );
  mouth.position.set(0, -0.5, 1.0);
  scene.add(mouth);

  camera.position.z = 3;
}

function updateMouth(viseme) {
  document.getElementById("visemeLabel").textContent = `当前口型：${viseme}`;
  const scale = {
    A: 0.4,
    O: 0.3,
    E: 0.2,
    U: 0.25,
    M: 0.05,
    F: 0.15,
  }[viseme] || 0.1;

  mouth.scale.y = scale * 5;
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function startVisemeAnimation() {
  visemeIndex = 0;
  const interval = setInterval(() => {
    if (visemeIndex >= visemeSequence.length) {
      clearInterval(interval);
      return;
    }
    const viseme = visemeSequence[visemeIndex].viseme;
    updateMouth(viseme);
    visemeIndex++;
  }, 500);
}

document.getElementById("playBtn").addEventListener("click", () => {
  const audio = new Audio("https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav");
  audio.play();
  startVisemeAnimation();
});

init3D();
animate();