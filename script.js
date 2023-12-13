let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let ground = canvas.height - 50;

const rectHeight = 50;
const rectWidth = 300;

const blockColor = ["#0077cc", "#aaff00", "#ff6600", "#ff0099", "#ffcc00", "#6600cc", "#ff0000", "#00cccc", "#ffff66", "#3333cc"];
let blockColorCount = 0;

const maxRectangles = 10; 
let rectangleCount = 0;

let speed = 10;

let directionY = 1;
let y = -50;
let x = 0;

let userPoints = 0;
let change;

const words = [
  "water", "tree", "sun", "wind", "moon", "bird", "cloud", "fire", "road", "book",
  "chair", "door", "lamp", "clock", "pen", "shoe", "hat", "star", "key", "box",
  "apple", "table", "shirt", "smile", "face", "cake", "river", "fish", "house", "car",
  "guitar", "ocean", "mount", "music", "friend", "piano", "garden", "phone", "city", "mirror",
  "pizza", "robot", "banana", "jungle", "lemon", "parrot", "rocket", "volcano", "zebra", "kite",
  "island", "candle", "eagle", "grape", "hammer", "jacket", "diamond", "fountain", "kangaroo", "puzzle",
  "globe", "camera", "glass", "umbrella", "dragon", "magnet", "butter", "pillow", "tunnel", "sphere",
  "honey", "rocket", "rocket", "square", "sphere", "turtle", "soccer", "jacket", "market", "coffee",
  "rabbit", "planet", "silver", "circle", "orange", "pencil", "giraffe", "rocket", "snail", "spider",
  "ticket", "bottle", "wallet", "silence", "stapler", "triangle", "library", "monster", "octopus", "cherry"
];

let wordAssignments;

function drawRect(color) {
  ctx.clearRect(0, 0, canvas.width, ground);

  // Draw rectangle
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.strokeRect(x, y, rectWidth, rectHeight);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.fillRect(x, y, rectWidth, rectHeight);

  // Draw text
  ctx.fillStyle = "white";
  if (color == "#aaff00" || color == "#ffff66") {
    ctx.fillStyle = "black";
  }

  ctx.font = "30px Arial";

  const word = wordAssignments[rectangleCount];

  // Centers text in rectangle
  const wordWidth = ctx.measureText(word).width;
  const wordHeight = parseInt(ctx.font);

  const centerX = x + (rectWidth - wordWidth) / 2;
  const centerY = y + (rectHeight + wordHeight) / 2;

  ctx.fillText(word, centerX, centerY);
}

function fallingBlocks() {
  const startButton = document.getElementById("start");
  startButton.disabled = true;
  const stopButton = document.getElementById("stop");
  stopButton.removeAttribute("disabled");
  const resetButton = document.getElementById("reset");
  resetButton.disabled = true;

  const userInput = document.getElementById("userInput");
  userInput.focus();

  document.getElementById("point").innerHTML = userPoints + " pts";

  y += directionY;
  
  if (rectangleCount < maxRectangles) {
    drawRect(blockColor[blockColorCount]);
  }

  // Allows rectangles to stuck on top of each other
  if (y >= ground) {
    directionY = 0;
    ground -= 50;
    rectangleCount++;
    document.getElementById("userInput").value = "";
    blockColorCount++


    if (rectangleCount < maxRectangles) {
      y = -rectHeight;
      directionY = 1;
    }
  }

  if (blockColorCount > blockColor.length - 1) {
    blockColorCount = 0;
  }

  //GameOver
  if (rectangleCount >= maxRectangles) {
    setTimeout(gameOver, 0);
    return;
  }

  if (rectangleCount < maxRectangles) {
    change = setTimeout(fallingBlocks, speed);
  }
}

function gameOver() {
  alert("GAME OVER YOUR HIGH SCORE IS: " + userPoints + " POINTS!");
  stopGame()
  resetGame();
}

function randomWord() {
  for (let i = words.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    
    // Swaps elements using a temporary variable
    const temp = words[i];
    words[i] = words[randomIndex];
    words[randomIndex] = temp;
  }

  wordAssignments = words.slice(0, maxRectangles);
}

function validateWord() {
  let user = document.getElementById("userInput").value;

    // If the user input === the word in rectangle, it moves the bottom of rectangle and word together
    if (user === wordAssignments[rectangleCount]) {
        wordAssignments.splice(rectangleCount, 1);

        document.getElementById("userInput").value = "";

        userPoints += 10;

        if (rectangleCount < maxRectangles - 1) {
    
            // Generates new word
            wordAssignments.push(words[Math.floor(Math.random() * words.length)]);
        }

        if (rectangleCount < maxRectangles) {
            y = -rectHeight;
        }

        directionY = 1;

        // Increases speed by 1 for every correct input
        speed -= 1;
    }
}

function stopGame() {
  const startButton = document.getElementById("start");
  startButton.removeAttribute("disabled");
  const stopButton = document.getElementById("stop");
  stopButton.disabled = true;
  const resetButton = document.getElementById("reset");
  resetButton.removeAttribute("disabled");

  clearTimeout(change);
}

function resetGame() {
  const startButton = document.getElementById("start");
  startButton.removeAttribute("disabled");
  const stopButton = document.getElementById("stop");
  stopButton.disabled = true;
  const resetButton = document.getElementById("reset");
  resetButton.disabled = true;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  clearTimeout(change);

  ground = canvas.height - 50;
  y = -50;
  directionY = 1;
  speed = 10;
  userPoints = 0;
  rectangleCount = 0;
  blockColorCount = 0;

  document.getElementById("point").innerHTML = userPoints + " pts";

}

function init() {
  randomWord();
  document.getElementById("point").innerHTML = userPoints + " pts";
  
  const startButton = document.getElementById("start");
  startButton.addEventListener("click", fallingBlocks, false);

  const stopButton = document.getElementById("stop");
  stopButton.addEventListener("click", stopGame, false);

  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("click", resetGame, false);

  const userInputBox = document.getElementById("userInput");
  userInputBox.addEventListener("keyup", validateWord, false);
}

document.addEventListener('DOMContentLoaded', init);
