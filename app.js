document.addEventListener("DOMContentLoaded", () => {
  // Elden Ring iconic boss fight quotes
  const quotes = [
    `"AAAAAAAAAAAAAAAAAHHHHHHHHHHH" - Godrick the Grafted`,
    `Have it writ upon thy meager grave, felled by King Morgott!`,
    `I dreamt for so long. My flesh was dull gold...and my blood, rotted. As I awaited... his return. Heed my words. I am Malenia, Blade Of Miquella. And I have never known defeat.`,
    `The rot is a scourge on this land.`,
    `Destined death is thine, tarnished.`,
    `We are born of the Elden Ring, and to it, we return.`,
    `Someone must extinguish thy flame, let it be Margit The Fell.`,
    `Forefathers, one and all, bear witness!`,
    `"The fear simply assures me the ordeal is worth undertaking" - Iron Fist Alexander`,
    `Axe of Godfrey, once first Elden Lord.`
  ];

  const quoteContainer = document.getElementById("quote-container");
  let quoteIndex = 0;

  function showNextQuote() {
    quoteContainer.style.opacity = 0;
    setTimeout(() => {
      quoteContainer.textContent = quotes[quoteIndex];
      quoteContainer.style.opacity = 1;
      quoteIndex = (quoteIndex + 1) % quotes.length;
    }, 800);
  }

  showNextQuote();
  setInterval(showNextQuote, 5000);

  // GSAP animations for tiles
  gsap.from(".tile", {
    opacity: 0,
    y: 100,
    stagger: 0.3,
    duration: 1.5,
    ease: "power4.out"
  });

  gsap.to(".tile", {
    y: "+=10",
    repeat: -1,
    yoyo: true,
    duration: 4,
    ease: "sine.inOut"
  });

  // Three.js Setup
  const container = document.getElementById("three-bg");
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 40;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x1a1a1a, 0);
  container.appendChild(renderer.domElement);

  scene.fog = new THREE.FogExp2(0x1a1a1a, 0.04);

  const ambientLight = new THREE.AmbientLight(0xd3c490, 0.7);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xd3c490, 1);
  pointLight.position.set(0, 30, 30);
  scene.add(pointLight);

  const ringGeometry = new THREE.TorusGeometry(10, 0.5, 16, 100);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xd3c490,
    transparent: true,
    opacity: 0.15,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  scene.add(ring);

  function animate() {
    requestAnimationFrame(animate);
    ring.rotation.x += 0.001;
    ring.rotation.y += 0.002;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Music toggle
  const bgMusic = document.getElementById("bg-music");
  const toggleBtn = document.getElementById("music-toggle");

  bgMusic.muted = true;
  toggleBtn.textContent = "Play Music";

  toggleBtn.addEventListener("click", () => {
    if (bgMusic.paused || bgMusic.muted) {
      bgMusic.muted = false;
      bgMusic.play();
      toggleBtn.textContent = "Pause Music";
    } else {
      bgMusic.pause();
      toggleBtn.textContent = "Play Music";
    }
  });
});
