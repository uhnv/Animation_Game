class Knight {

    constructor(game) {

        this.game = game;
        this.x = 200;
        this.y = 200;
        this.state = 0;
        this.facing = 0;
        this.speed = 200;
        this.velocity = { x: 0, y: 0 };
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/knightright.png");
        this.spritesheetLeft = ASSET_MANAGER.getAsset("./sprites/knightsleft.png");


        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 7; i++) { 
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { // directions
                this.animations[i].push([]);
            }
        }

        // attack animation for state = 0
        this.animations[0][0] = new Animator(this.spritesheet, 30, 12, 120, 40, 22, 0.10, 24, false, true);
        this.animations[0][1] = new Animator(this.spritesheetLeft, 30, 12, 100, 40, 22, 0.10, 44, true, true);
        // dead animation
        this.animations[1][0] = new Animator(this.spritesheet, 30, 66, 70, 40, 15, 0.10, 26, false, true);
        this.animations[1][1] = new Animator(this.spritesheetLeft, 1734, 66, 70, 40, 15, 0.10, 26, true, true);
        // idle
        this.animations[2][0] = new Animator(this.spritesheet, 30, 120, 70, 40, 15, 0.10, -6, false, true);
        this.animations[2][1] = new Animator(this.spritesheetLeft, 2185, 120, 70, 40, 15, 0.10, -6, true, true);
        // jump
        this.animations[3][0] = new Animator(this.spritesheet, 30, 179, 70, 35, 12, .10, -6, false, true);
        this.animations[3][1] = new Animator(this.spritesheetLeft, 2385, 179, 60, 35, 12, .10, 3, true, true);
        //roll
        this.animations[4][0] = new Animator(this.spritesheet, 40, 230, 150, 50, 15, 0.10, 30, false, true);
        this.animations[4][1] = new Animator(this.spritesheetLeft, 482, 230, 150, 50, 15, 0.10, 30, true, true);
        // run
        this.animations[5][0] = new Animator(this.spritesheet, 40, 291, 40, 35, 8, .10, 56, false, true);
        this.animations[5][1] = new Animator(this.spritesheetLeft, 2420, 291, 40, 35, 8, 0.10, 56, true, true);
        //shield
        this.animations[6][0] = new Animator(this.spritesheet, 30, 344, 100, 45, 7, 0.10, -3, false, true);
        this.animations[6][1] = new Animator(this.spritesheetLeft, 2512, 344, 100, 45, 7, 0.10, -4, true, true);

    };

    update() {
        this.velocity.y += this.speed * this.game.clockTick;
        if (this.game.keys["d"]) {
            this.x += this.speed * this.game.clockTick;
            this.state = 5;
            this.facing = 0;
        } 
         else if (this.game.keys["a"]) {
            this.x -= this.speed * this.game.clockTick;
            this.state = 5;
            this.facing = 1;
        } 
          else if (this.game.keys["x"] && this.ground()) {
            this.velocity.y = -this.speed;
            this.state = 3;
        }
        //  if (this.game.keys["z"]) {
        //     this.state = 1;
        // }
        else {
            this.state = 2;
        }
        if(this.x > 740) {
            this.x = 740;
        }

        if(this.x < 0) {
            this.x = 0;
        }
        if(this.y > 700) {
            this.y = 700;
        }

        if(this.y < 0) {
            this.y = 0;
        }
        if (this.velocity.x >= this.speed) this.velocity.x = this.speed;
        if (this.velocity.x <= -this.speed) this.velocity.x = -this.speed;

        if (this.velocity.y >= this.speed) this.velocity.y = this.speed;
        if (this.velocity.y <= -this.speed) this.velocity.y = -this.speed;
        this.y += this.velocity.y * this.game.clockTick * 2;
    };

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x, this.y);
    };
    ground(){
        return this.y >= 700;
    }
}
