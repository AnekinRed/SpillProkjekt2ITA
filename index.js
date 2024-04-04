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
    imageSrc: './img/background.png'
});

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 10,
    scale: 2,
    offset: {
        x: 70,
        y: 10,
    },
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 10
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 10
        },
        runBack: {
            imageSrc: './img/samuraiMack/RunBack.png',
            framesMax: 10
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 3
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 3
        },
        attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4
        },
        death: {
            imageSrc: './img/samuraiMack/Death.png',
            framesMax: 10
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

let lastJumpTime = 0; // Variable to track the time of the last jump

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    c.fillStyle = 'rgba(255, 255, 255, 0.15)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();

    player.velocity.x = 0;

    // player movement

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -3;
        player.switchSprite('runBack');
    } else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 3;
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
}

animate();

window.addEventListener('keydown', (event) => {
    if (!player.dead) {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true;
                player.lastKey = 'd';
                break;
            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
                break;
            case 'w':
                const currentTime = new Date().getTime();
                if ((currentTime - lastJumpTime) >= 400) { // Check if at least one second has passed since the last jump
                    player.velocity.y = -15;
                    lastJumpTime = currentTime; // Update the last jump time
                }
                break;
            case ' ':
                player.attack();
                break;
        }
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }
});