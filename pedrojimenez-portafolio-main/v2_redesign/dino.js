
(function () {
    const canvas = document.getElementById('dino-runner');
    const ctx = canvas.getContext('2d');

    // --- Configuration ---
    const scale = 2; // Size of one "pixel" in screen pixels

    function isDarkMode() {
        const style = getComputedStyle(document.body);
        const bg = style.getPropertyValue('--bg-color').trim();
        return bg === '#0d0d0d' || bg === 'black';
    }

    function resizeCanvas() {
        if (canvas.parentElement) {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = 150;
        }
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // --- Sprite Bitmaps (1 = Pixel, 0 = Empty) ---
    // Accurate 8-bit representations of the Original Chrome Dino Assets

    // Dino: 20x21 grid (approx)
    const dinoStand = [
        "00000000000111111100",
        "00000000001111111110",
        "00000000001111111111",
        "00000000001111111111",
        "00000000001111111111",
        "00000000001111111111",
        "00000000001111111100",
        "00000000001111111000", /* Eye hole would happen here if detailed */
        "00000011001111111000",
        "00000111001111111000",
        "00001111111111111000",
        "00011111111111111000",
        "00111111111111111000",
        "01111111111111111000",
        "11111111111111111000",
        "00111111111111111000",
        "00111111111111111000",
        "00011111110000000000",
        "00011100110000000000",
        "00011000110000000000",
        "00110000110000000000"
    ];

    const dinoRun1 = [...dinoStand];
    dinoRun1[18] = "00011100110000000000"; // Body
    dinoRun1[19] = "00011000110000000000"; // Left leg up
    dinoRun1[20] = "00110000000000000000"; // Left foot

    const dinoRun2 = [...dinoStand];
    dinoRun2[19] = "00000000110000000000"; // Right leg up
    dinoRun2[20] = "00000000110000000000"; // Right foot

    const cactusSmall = [
        "0000110000",
        "0001110000",
        "0001110000",
        "1101110011",
        "1101110011",
        "1111111111",
        "1111111111",
        "0111111110",
        "0011111100",
        "0011111100",
        "0011111100",
        "0011111100"
    ];

    const birdDown = [
        "000000000011000000", // Wing up
        "000000001111000000",
        "110000111111000000",
        "111001111111000000",
        "111111111111000000",
        "011111111111001111",
        "001111111111111110",
        "000111111111011111"
    ];

    // Helper: Draw Bitmap
    function drawBitmap(ctx, map, x, y, color) {
        ctx.fillStyle = color;
        for (let r = 0; r < map.length; r++) {
            const row = map[r];
            for (let c = 0; c < row.length; c++) {
                if (row[c] === '1') {
                    ctx.fillRect(x + c * scale, y + r * scale, scale, scale);
                }
            }
        }
    }

    // --- Entidades ---
    const dino = {
        x: 50,
        y: 0,
        w: 20 * scale,
        h: 21 * scale,
        dy: 0,
        jumpForce: 10,
        gravity: 0.6,
        isJumping: false,
        groundY: 130, // Pixel position of ground

        draw(ctx, color) {
            let sprite = dinoStand;
            if (this.isJumping) {
                sprite = dinoStand; // Jump pose uses stand mostly
            } else {
                // Run anim
                if (Math.floor(Date.now() / 100) % 2 === 0) {
                    sprite = dinoRun1;
                } else {
                    sprite = dinoRun2;
                }
            }
            drawBitmap(ctx, sprite, this.x, this.y, color);
        },

        update() {
            if (this.isJumping) {
                this.y -= this.dy;
                this.dy -= this.gravity;
            } else {
                this.y = this.groundY - this.h;
                this.dy = 0;
            }

            // Floor collision
            if (this.y > this.groundY - this.h) {
                this.isJumping = false;
                this.y = this.groundY - this.h;
                this.dy = 0;
            }
        },

        jump() {
            if (!this.isJumping) {
                this.isJumping = true;
                this.dy = this.jumpForce;
            }
        }
    };

    let obstacles = [];
    const obstacleSpeed = 6;
    let frame = 0;

    class Obstacle {
        constructor(x, type) {
            this.x = x;
            this.type = type;
            if (type === 'cactus') {
                this.map = cactusSmall;
                this.w = 10 * scale;
                this.h = 12 * scale;
            } else {
                // Large Cactus/Bird placeholder, reuse small for stability
                this.map = cactusSmall;
                this.w = 10 * scale;
                this.h = 12 * scale;
            }
            this.y = 130 - this.h;
            this.markedForDeletion = false;
        }

        update() {
            this.x -= obstacleSpeed;
            if (this.x < -50) this.markedForDeletion = true;
        }

        draw(ctx, color) {
            drawBitmap(ctx, this.map, this.x, this.y, color);
        }
    }

    function logic() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const color = isDarkMode() ? '#FFFFFF' : '#000000';

        const groundY = 130;
        dino.groundY = groundY;

        // Ground Line
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(canvas.width, groundY);
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.stroke();

        // Spawn
        if (frame % 100 === 0 || (Math.random() < 0.015 && frame > 50 && obstacles.length === 0)) {
            let lastX = obstacles.length > 0 ? obstacles[obstacles.length - 1].x : 0;
            if (canvas.width - lastX > 300) {
                obstacles.push(new Obstacle(canvas.width, 'cactus'));
            }
        }

        // AI
        let closest = null;
        for (let obs of obstacles) {
            if (obs.x > dino.x) {
                closest = obs;
                break;
            }
        }
        if (closest) {
            const dist = closest.x - (dino.x + dino.w);
            if (dist < 100 && dist > 0 && !dino.isJumping) {
                dino.jump();
            }
        }

        obstacles.forEach(o => { o.update(); o.draw(ctx, color); });
        obstacles = obstacles.filter(o => !o.markedForDeletion);

        dino.update();
        dino.draw(ctx, color);

        frame++;
        requestAnimationFrame(logic);
    }

    logic();

})();
