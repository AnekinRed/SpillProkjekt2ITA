const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './Media/Background/background.png'
});

const player = new Fighter({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
    offset: 0,
    x: 0,
    y: 0
  },                                                                              
  imageSrc: './Media/Player/Colour2/Outline/120x80_PNGSheets/_Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    idle: {
      imageSrc: './Media/Player/Color1/Outline/120x80_PNGSheets/_Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './Media/Player/Color1/Outline/120x80_PNGSheets/_Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './Media/Player/Color1/Outline/120x80_PNGSheets/_Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './Media/Player/Color1/Outline/120x80_PNGSheets/_Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './Media/Player/Color1/Outline/120x80_PNGSheets/_Attack.png',
      framesMax: 6
    },
    takeHit: {
      imageSrc: './Media/Player/Color1/Outline/120x80_PNGSheets/_Hit.png',
      framesMax: 4
    },
    death: {
      imageSrc: './Media/Player/Color1/Outline/120x80_PNGSheets/_Death.png',
      framesMax: 6
    }
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }
});

console.log(player);

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  }
};

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  c.fillStyle = 'rgba(255, 255, 255, 0.15)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player movement

  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5;
    player.switchSprite('run');
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5;
    player.switchSprite('run');
  } else {
    player.switchSprite('idle');
  }

  // jumping
  if (player.velocity.y < 0) {
    player.switchSprite('jump');
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall');
  }

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5;
    enemy.switchSprite('run');
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5;
    enemy.switchSprite('run');
  } else {
    enemy.switchSprite('idle');
  }

  // jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump');
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall');
  }
}