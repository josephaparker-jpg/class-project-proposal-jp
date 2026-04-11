// ================= GLOBAL CONTROL =================
let spinInterval;
let floatInterval;
let isSpinning = false;

// ================= RECIPES =================
const recipes = [
  {
    name: "Chocolate Chip Cookies",
    image: "chocolate-chip-muffins.jpg",
    type: "Cookies",
    temp: "350°F",
    time: 12,
    ingredients: ["2 cups flour","1 cup sugar","1 cup chocolate chips"],
    steps: ["Preheat oven to 350°F","Mix ingredients","Bake 10–12 min"]
  },
  {
    name: "Brownies",
    image: "brownies.jpg",
    type: "Brownies",
    temp: "350°F",
    time: 25,
    ingredients: ["1 cup sugar","1/2 cup butter","2 eggs"],
    steps: ["Preheat oven","Mix","Bake 20–25 min"]
  },
  {
    name: "Vanilla Cake",
    image: "vanilla-cake.jpg",
    type: "Cakes",
    temp: "350°F",
    time: 30,
    ingredients: ["2 cups flour","1 cup sugar"],
    steps: ["Preheat oven","Mix","Bake 25–30 min"]
  }
];

// ================= TIMER =================
let timer;
let timeLeft = 0;
let isRunning = false;

function updateTimerDisplay() {
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;

  document.getElementById("timer-display").textContent =
    `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      alert("⏰ Done!");
      isRunning = false;
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  updateTimerDisplay();
}

// ================= FLOAT =================
function randomizeIcons() {
  document.querySelectorAll(".icon").forEach(icon => {
    icon.style.left = Math.random()*180 + "px";
    icon.style.top = Math.random()*180 + "px";
  });
}

// ================= SPIN =================
function spinRoulette() {

  if (isSpinning) return;
  isSpinning = true;

  clearInterval(spinInterval);
  clearInterval(floatInterval);

  const sound = document.getElementById("spin-sound");
  sound.currentTime = 0;
  sound.play();

  document.getElementById("ingredients-list").innerHTML = "";
  document.getElementById("steps-list").innerHTML = "";

  let count = 0;
  let selected;
  const img = document.getElementById("recipe-image");

  floatInterval = setInterval(randomizeIcons, 100);

  spinInterval = setInterval(() => {

    selected = recipes[Math.floor(Math.random()*recipes.length)];

    document.getElementById("recipe-name").textContent = selected.name;
    document.getElementById("recipe-type").textContent = selected.type;
    document.getElementById("recipe-temp").textContent = "Bake at: " + selected.temp;
    document.getElementById("recipe-time").textContent = "Bake Time: " + selected.time + " min";

    img.style.opacity = 0;
    setTimeout(() => {
      img.src = selected.image;
      img.style.opacity = 1;
    }, 100);

    count++;

    if (count > 12) {
      clearInterval(spinInterval);
      clearInterval(floatInterval);

      // load timer
      timeLeft = selected.time * 60;
      updateTimerDisplay();

      showRecipe(selected);
      selectIcon();

      isSpinning = false;
    }

  }, 100);
}

// ================= DISPLAY =================
function showRecipe(recipe) {
  const ing = document.getElementById("ingredients-list");
  const steps = document.getElementById("steps-list");

  ing.innerHTML = "";
  steps.innerHTML = "";

  recipe.ingredients.forEach(i => {
    const li = document.createElement("li");
    li.textContent = i;
    ing.appendChild(li);
  });

  recipe.steps.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    steps.appendChild(li);
  });
}

// ================= ICON SELECT =================
function selectIcon() {
  const icons = document.querySelectorAll(".icon");

  icons.forEach(i => i.classList.remove("selected"));

  const chosen = icons[Math.floor(Math.random()*icons.length)];
  chosen.classList.add("selected");

  setTimeout(() => {
    chosen.classList.remove("selected");
    randomizeIcons();
  }, 2000);
}