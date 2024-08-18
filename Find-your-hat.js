const readline = require('readline');

class Field {
  constructor(field) {
    this.field = field;
    this.playerPosition = { x: 0, y: 0 };
  }

  print() {
    this.field.forEach(row => console.log(row.join('')));
  }

  movePlayer(direction) {
    let { x, y } = this.playerPosition;

    switch (direction) {
      case 'w':
        y -= 1;
        break;
      case 's':
        y += 1;
        break;
      case 'a':
        x -= 1;
        break;
      case 'd':
        x += 1;
        break;
      default:
        console.log('Invalid input. Use w (up), s (down), a (left), d (right).');
        return;
    }

    // Check if the move is outside the field boundaries
    if (y < 0 || y >= this.field.length || x < 0 || x >= this.field[0].length) {
      console.log('You moved outside the field. Game over!');
      process.exit();
    }

    // Check if player found the hat
    if (this.field[y][x] === '^') {
      console.log('Congratulations! You found the hat! You win!');
      process.exit();
    }

    // Check if player fell into a hole
    if (this.field[y][x] === 'O') {
      console.log('Oh no! You fell into a hole! Game over!');
      process.exit();
    }

    // Mark the player's path
    this.field[y][x] = '*';
    this.playerPosition = { x, y };
  }

  static generateField(height, width, holePercentage = 20) {
    const field = new Array(height).fill(0).map(() => new Array(width).fill('░'));

    // Place the hat at a random position
    const hatPosition = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height)
    };
    field[hatPosition.y][hatPosition.x] = '^';

    // Place holes based on the holePercentage
    const totalHoles = Math.floor((height * width) * (holePercentage / 100));

    for (let i = 0; i < totalHoles; i++) {
      let holeX, holeY;
      do {
        holeX = Math.floor(Math.random() * width);
        holeY = Math.floor(Math.random() * height);
      } while (field[holeY][holeX] !== '░' || (holeX === 0 && holeY === 0)); // Avoid placing a hole where the player starts or on the hat
      field[holeY][holeX] = 'O';
    }

    return field;
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function playGame() {
  const myField = new Field(Field.generateField(10, 10, 30));
  
  myField.print();

  let playing = true;

  while (playing) {
    const direction = await askQuestion('Which way? (w: up, s: down, a: left, d: right): ');
    myField.movePlayer(direction);
    myField.print();
  }

  rl.close();
}

playGame();