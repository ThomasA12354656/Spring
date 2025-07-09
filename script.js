const canvas = document.getElementById("springCanvas");
const ctx = canvas.getContext("2d");

// Constants and Initial State
let mass = 5;
let k = 20;
let damping = 0.05;
let gravityEnabled = true;
const gravity = 9.8;

const anchorY = 50;
const restLength = 150;

let y = anchorY + restLength + 30;
let v = 0;
let a = 0;

// DOM Elements
const massSlider = document.getElementById("massSlider");
const stiffnessSlider = document.getElementById("stiffnessSlider");
const dampingSlider = document.getElementById("dampingSlider");
const gravityToggle = document.getElementById("gravityToggle");

const massValue = document.getElementById("massValue");
const stiffnessValue = document.getElementById("stiffnessValue");
const dampingValue = document.getElementById("dampingValue");
const statsDisplay = document.getElementById("statsDisplay");

// Event Listeners
massSlider.oninput = () => {
  mass = parseFloat(massSlider.value);
  massValue.textContent = `${mass} kg`;
};

stiffnessSlider.oninput = () => {
  k = parseFloat(stiffnessSlider.value);
  stiffnessValue.textContent = `${k}`;
};

dampingSlider.oninput = () => {
  damping = parseFloat(dampingSlider.value);
  dampingValue.textContent = `${damping}`;
};

gravityToggle.onchange = () => {
  gravityEnabled = gravityToggle.checked;
};

function resetSpring() {
  y = anchorY + restLength + 30;
  v = 0;
  a = 0;
}

// Physics Update
function updatePhysics() {
  const springDisplacement = y - anchorY - restLength;
  const springForce = -k * springDisplacement;
  const dampingForce = -damping * v;
  const gravityForce = gravityEnabled ? mass * gravity : 0;

  const netForce = springForce + gravityForce + dampingForce;

  a = netForce / mass;
  v += a;
  y += v;

  // Optional floor bounce
  const floorY = canvas.height - 40;
  if (y > floorY) {
    y = floorY;
    v *= -0.5; // bounce back
  }
}

// Drawing
function drawSpring() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Spring coil
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, anchorY);
  ctx.lineTo(canvas.width / 2, y);
  ctx.strokeStyle = "#00ffe0";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Mass
  ctx.fillStyle = "#00ffe0";
  ctx.fillRect(canvas.width / 2 - 30, y, 60, 30);
}

// Stats
function updateStats() {
  statsDisplay.innerHTML = `
    Position: ${y.toFixed(1)} px<br>
    Velocity: ${v.toFixed(2)} px/frame<br>
    Acceleration: ${a.toFixed(2)} px/frame²
  `;
}

// Loop
function animate() {
  updatePhysics();
  drawSpring();
  updateStats();
  requestAnimationFrame(animate);
}

animate();
