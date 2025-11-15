const player = document.getElementById('player');
const enemy = document.getElementById('enemy');

const jumpSound = document.getElementById('jumpSound');
const hitSound = document.getElementById('hitSound');

let playerY = 50;
let isJumping = false;
let enemyX = window.innerWidth - 150;

document.addEventListener('keydown', e => {
    if(e.code === 'Space' && !isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    jumpSound.play();
    let upInterval = setInterval(() => {
        if(playerY >= 200) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if(playerY <= 50) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                playerY -= 10;
                player.style.bottom = playerY + 'px';
            }, 20);
        }
        playerY += 10;
        player.style.bottom = playerY + 'px';
    }, 20);
}

// Enemy движение
function moveEnemy() {
    enemyX -= 5;
    if(enemyX < -50) enemyX = window.innerWidth;
    enemy.style.right = enemyX + 'px';

    // проверка столкновения
    let playerRect = player.getBoundingClientRect();
    let enemyRect = enemy.getBoundingClientRect();

    if(
        playerRect.x < enemyRect.x + enemyRect.width &&
        playerRect.x + playerRect.width > enemyRect.x &&
        playerRect.y < enemyRect.y + enemyRect.height &&
        playerRect.y + playerRect.height > enemyRect.y
    ) {
        hitSound.play();
        alert('Ты пойман! Начни заново 😈');
        enemyX = window.innerWidth;
    }

    requestAnimationFrame(moveEnemy);
}

moveEnemy();
