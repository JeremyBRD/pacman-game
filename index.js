const width = 28;
const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const endMessage = document.getElementById('message');
const callToAction = document.querySelector('.call-to-action')
const overlay = document.querySelector('.overlay');
let stopGame = false;
let startGameExecuted = false;
let currentKeyCode;
let squares = [];
let score = 0;
// let powerPeletTimer = 0;
// Codes for map-items position
// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,2,1,2,2,1,2,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,2,1,1,1,1,2,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,2,1,1,1,1,2,1,4,1,1,0,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,1,1,0,1,
  1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

//create board
function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
    squares.push(square)

    if (layout[i] === 0) {
      squares[i].classList.add('pac-dot')
    } else if (layout[i] === 1) {
      squares[i].classList.add('wall')
    } else if (layout[i] === 2) {
      squares[i].classList.add('ghost-lair')
    } else if (layout[i] === 3) {
      squares[i].classList.add('power-pellet')
    } else if (layout[i] === 4) {
      squares[i].classList.add('.empty-space')
    }
  }
}
createBoard()

//starting position of pacman 
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pacman')

// function startGame() {
//   if (startGameExecuted === true) return
//   overlay.style.transform = 'translateY(0)'
//   endMessage.innerHTML = 'Welcome !'
//   stopGame = true
//   document.addEventListener('keyup', (e) => {
//     if (e.keyCode === 13) {
//       startGameExecuted = true
//       stopGame = false
//       overlay.style.transform = 'translateY(-100%)'
//     }
//   })
// }
// startGame()
// const decrementPowerPeletTimer = () => {
//   if (powerPeletTimer >= 1) {
//     powerPeletTimer - 1000
//   }
// }
// decrementPowerPeletTimer();
// console.log(powerPeletTimer);

function control(e) {
  if (stopGame === true) return
  const pacman = document.querySelector('.pacman');
  console.log(pacman);
  currentKeyCode = e.keyCode
  squares[pacmanCurrentIndex].classList.remove('pacman')
  switch(e.keyCode) {
    case 40:
    // if ( currentKeyCode === 40 ) { pacman.style.transform = 'rotate(90deg)' }
    if (
      !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
      !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
      pacmanCurrentIndex + width < width * width
      ) 
      pacmanCurrentIndex += width
    break
    case 38:
    if (
      !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair') &&
      !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
      pacmanCurrentIndex - width >=0
      ) 
      pacmanCurrentIndex -= width
    break
    case 37: 
    if( 
      !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair') &&
      !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
      pacmanCurrentIndex % width !==0
      ) 
      pacmanCurrentIndex -=1
      if (pacmanCurrentIndex === 364) {
        pacmanCurrentIndex = 391
      }
    break
    case 39:
    if(
      !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair') &&
      !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
      pacmanCurrentIndex % width < width -1
      ) 
      pacmanCurrentIndex +=1
      if (pacmanCurrentIndex === 391) {
        pacmanCurrentIndex = 364
      }
    break
  }
  squares[pacmanCurrentIndex].classList.add('pacman')
  pacDotEaten()
  powerPelletEaten()
  checkForWin()
  checkForGameOver()
  scoreDisplay.innerHTML = score
}
document.addEventListener('keydown', control)

function pacDotEaten() {
  if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
    squares[pacmanCurrentIndex].classList.remove('pac-dot')
    score++
  }
}

function powerPelletEaten() {
  if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
    // setInterval(decrementPowerPeletTimer, 1000);
    // if (powerPeletTimer >= 1) {
    //   squares[pacmanCurrentIndex].classList.remove('power-pellet')
    //   powerPeletTimer += 10000
    //   score +=10
    //   ghosts.forEach(ghost => ghost.isScared = true)  
    //   setTimeout(unScareGhosts, powerPeletTimer)
    // } 
      squares[pacmanCurrentIndex].classList.remove('power-pellet')
      // powerPeletTimer += 10000
      score +=10
      ghosts.forEach(ghost => ghost.isScared = true)  
      setTimeout(unScareGhosts, 10000)
  }
  // console.log(powerPeletTimer);
}

function unScareGhosts() {
  ghosts.forEach(ghost => ghost.isScared = false)
  powerPelotTimer = 0;
}


class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className
    this.startIndex = startIndex
    this.speed = speed
    this.currentIndex = startIndex
    this.isScared = false
    this.timerId = NaN
  }
}

const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500)
]

//draw the ghosts into the grid
ghosts.forEach(ghost => {
  squares[ghost.currentIndex].classList.add(ghost.className)
  squares[ghost.currentIndex].classList.add('ghost')
})

//move the ghosts
ghosts.forEach(ghost => moveGhost(ghost))

function moveGhost(ghost) {
  if (stopGame === true) return
  const directions = [-1, +1, -width, +width]
  let direction = directions[Math.floor(Math.random() * directions.length)]
  
  ghost.timerId = setInterval(function() {
      if (
        !squares[ghost.currentIndex + direction].classList.contains('wall') &&
        !squares[ghost.currentIndex + direction].classList.contains('ghost')
      ) {
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        ghost.currentIndex += direction
        squares[ghost.currentIndex].classList.add(ghost.className)  
        squares[ghost.currentIndex].classList.add('ghost')  
      } else {
        direction = directions[Math.floor(Math.random() * directions.length)]
      }

      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost')
      }
      
      if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex
        score +=100
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      }

      checkForGameOver()

  }, ghost.speed )
}

//check for game over
function checkForGameOver() {
    if (
      squares[pacmanCurrentIndex].classList.contains('ghost') && 
      !squares[pacmanCurrentIndex].classList.contains('scared-ghost') 
     ) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', control)
      overlay.style.transform = 'translateY(0)'
      endMessage.innerHTML = 'GAME OVER'
      callToAction.innerHTML = 'Try Again'
      stopGame = true
     }
}

//check for win
function checkForWin() {
    if (score >= 278) {
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      document.removeEventListener('keyup', control)
      overlay.style.transform = 'translateY(0)'
      endMessage.innerHTML = 'You WON! 🎉'
      callToAction.style.display = 'bloc'
      callToAction.innerHTML = 'Play Again'
      stopGame = true
    }
}

// callToAction.addEventListener('click', (e, ghost) => {
//   overlay.style.transform = 'translateY(-100%)';
//   createBoard();
//   control(e);
//   moveGhost(ghost);
//   stopGame = false;
// });