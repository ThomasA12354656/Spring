const canvas = document.getElementById("springCanvas");
const ctx = canvas.getContext("2d");

let mass = 5;
let k = 20;
let damping = 0.05;
let gravityEnabled = true;

let y = 200;
let v = 0;
let a = 0;
const anchorY = 50;
let restLength = 150;

const g = 9.8;
const massSlider = document.getElementById("massSlider");
const stiffnessSlider = document.getElementById("stiffnessSlider");
const dampingSlider = document.getElementById("dampingSlider");
const gravityToggle = document.getElementById("gravityToggle");

const massValue = document.getElementById("massValue");
const stiffnessValue = document.getElementById("stiffnessValue");
const dampingValue = document.getElementById("dampingValue");
const statsDisplay = document.getElementById("statsDisplay");

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
  y = 200;
  v = 0;
  a = 0;
}

function updatePhysics() {
  let springForce = -k * (y - anchorY - restLength);
  let gravityForce = gravityEnabled ? mass * g : 0;
  let dampingForce = -damping * v;

  let netForce = springForce + gravityForce + dampingForce;
  a = netForce / mass;
  v += a;
  y += v;

  // Basic bounds
  if (y > canvas.height - 40) {
    y = canvas.height - 40;
    v *= -0.4;
  }
}

function drawSpring() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Spring coil
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, anchorY);
  ctx.lineTo(canvas.width / 2, y);
  ctx.strokeStyle = "#00ffe0";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Mass block
  ctx.fillStyle = "#00ffe0";
  ctx.fillRect(canvas.width / 2 - 30, y, 60, 30);
}

function updateStats() {
  statsDisplay.innerHTML = `
    Position: ${y.toFixed(1)} px<br>
    Velocity: ${v.toFixed(2)} px/frame<br>
    Acceleration: ${a.toFixed(2)} px/frame²
  `;
}

function animate() {
  updatePhysics();
  drawSpring();
  updateStats();
  requestAnimationFrame(animate);
}

animate();
