/* =========================
   script.js
========================= */

/* =========================
   GLOBAL CONTROL
========================= */

let timer;
let timeLeft = 0;

let isRunning = false;
let isSpinning = false;

/* =========================
   RECIPES
========================= */

const recipes = [

  {
    name: "Chocolate Chip Muffins",

    image: "chocolate-chip-muffins.jpg",

    type: "Muffins",

    temp: "350°F",

    time: 18,

    ingredients: [
      "2 cups flour",
      "Chocolate chips",
      "Milk"
    ],

    steps: [
      "Preheat oven",
      "Mix ingredients",
      "Bake 18 minutes"
    ]
  },

  {
    name: "Brownies",

    image: "brownies.jpg",

    type: "Brownies",

    temp: "350°F",

    time: 25,

    ingredients: [
      "Chocolate",
      "Butter",
      "Sugar"
    ],

    steps: [
      "Mix ingredients",
      "Pour into pan",
      "Bake 25 minutes"
    ]
  },

  {
    name: "Chocolate Cake",

    image: "Chocolate-cake.jpg",

    type: "Cake",

    temp: "350°F",

    time: 30,

    ingredients: [
      "Flour",
      "Sugar",
      "Cocoa Powder"
    ],

    steps: [
      "Mix ingredients",
      "Pour into pan",
      "Bake 30 minutes"
    ]
  },

  {
    name: "Chocolate Cupcakes",

    image: "chocolate-cupcake.jpg",

    type: "Cupcakes",

    temp: "350°F",

    time: 18,

    ingredients: [
      "Flour",
      "Chocolate",
      "Sugar"
    ],

    steps: [
      "Mix ingredients",
      "Fill cupcake liners",
      "Bake 18 minutes"
    ]
  },

  {
    name: "Vanilla Cake",

    image: "vanilla-cake.jpg",

    type: "Cake",

    temp: "350°F",

    time: 30,

    ingredients: [
      "Flour",
      "Vanilla",
      "Sugar"
    ],

    steps: [
      "Mix ingredients",
      "Bake 30 minutes"
    ]
  },

  {
    name: "Vanilla Cupcakes",

    image: "vanilla-cupcakes.jpg",

    type: "Cupcakes",

    temp: "350°F",

    time: 18,

    ingredients: [
      "Flour",
      "Vanilla",
      "Butter"
    ],

    steps: [
      "Mix ingredients",
      "Bake 18 minutes"
    ]
  },

  {
    name: "Blueberry Muffins",

    image: "blueberry-muffins.jpg",

    type: "Muffins",

    temp: "350°F",

    time: 20,

    ingredients: [
      "Blueberries",
      "Flour",
      "Sugar"
    ],

    steps: [
      "Mix ingredients",
      "Pour into muffin tray",
      "Bake 20 minutes"
    ]
  },

  {
    name: "Red Velvet Cupcakes",

    image: "red-velvet-cupcakes.jpg",

    type: "Cupcakes",

    temp: "350°F",

    time: 20,

    ingredients: [
      "Cocoa powder",
      "Sugar",
      "Food coloring"
    ],

    steps: [
      "Mix ingredients",
      "Fill cupcake liners",
      "Bake 20 minutes"
    ]
  }

];

/* =========================
   TIMER DISPLAY
========================= */

function updateTimerDisplay() {

  const minutes =
    Math.floor(timeLeft / 60);

  const seconds =
    timeLeft % 60;

  document.getElementById("timer-display")
  .textContent =

  `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;

}

/* =========================
   START TIMER
========================= */

function startTimer() {

  if (isRunning) return;

  isRunning = true;

  timer = setInterval(() => {

    if (timeLeft > 0) {

      timeLeft--;

      updateTimerDisplay();

    } else {

      clearInterval(timer);

      isRunning = false;

      alert("⏰ Baking Complete!");

    }

  }, 1000);

}

/* =========================
   PAUSE TIMER
========================= */

function pauseTimer() {

  clearInterval(timer);

  isRunning = false;

}

/* =========================
   RESET TIMER
========================= */

function resetTimer() {

  clearInterval(timer);

  isRunning = false;

  updateTimerDisplay();

}

/* =========================
   SHOW RECIPE
========================= */

function showRecipe(recipe) {

  document.getElementById("recipe-name")
  .textContent = recipe.name;

  document.getElementById("recipe-type")
  .textContent = recipe.type;

  document.getElementById("recipe-temp")
  .textContent =
  "Bake at: " + recipe.temp;

  document.getElementById("recipe-time")
  .textContent =
  "Bake Time: " + recipe.time + " min";

  const img =
    document.getElementById("recipe-image");

  img.style.opacity = 0;

  setTimeout(() => {

    img.src = recipe.image;

    img.style.opacity = 1;

  }, 200);

  /* INGREDIENTS */

  const ingredientsList =
    document.getElementById("ingredients-list");

  ingredientsList.innerHTML = "";

  recipe.ingredients.forEach(item => {

    const li =
      document.createElement("li");

    li.textContent = item;

    ingredientsList.appendChild(li);

  });

  /* STEPS */

  const stepsList =
    document.getElementById("steps-list");

  stepsList.innerHTML = "";

  recipe.steps.forEach(step => {

    const li =
      document.createElement("li");

    li.textContent = step;

    stepsList.appendChild(li);

  });

  /* TIMER */

  timeLeft = recipe.time * 60;

  updateTimerDisplay();

}

/* =========================
   SPIN ROULETTE
========================= */

function spinRoulette() {

  if (isSpinning) return;

  isSpinning = true;

  const wheel =
    document.getElementById("wheel");

  const card =
    document.querySelector(".card");

  const sound =
    document.getElementById("spin-sound");

  /* PLAY SOUND */

  sound.pause();

  sound.currentTime = 0;

  sound.play();

  /* ROTATE WHEEL */

  const rotation =
    3600 + Math.floor(Math.random() * 360);

  wheel.style.transform =
    `rotate(${rotation}deg)`;

  /* RANDOM RECIPE */

  const selected =
    recipes[Math.floor(Math.random() * recipes.length)];

  /* WAIT FOR SPIN */

  setTimeout(() => {

    showRecipe(selected);

    /* WIN GLOW */

    card.classList.add("win");

    setTimeout(() => {

      card.classList.remove("win");

    }, 1000);

    /* STOP SOUND */

    sound.pause();

    sound.currentTime = 0;

    isSpinning = false;

  }, 4000);

}

/* =========================
   LAST UPDATED
========================= */

const today = new Date();

document.getElementById("last-updated")
.innerHTML =

`
🍪 Baking Roulette v2.0<br>
Last Updated:
${today.toLocaleDateString()}
`;

/* =========================
   START DISPLAY
========================= */

updateTimerDisplay();