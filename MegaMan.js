class MegaMan {

    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.game.knight = this;
        this.velocity = { x: 0, y: 0 };
        this.spritesheet = assetMangager.getAsset("./knightright.png");
        this.spritesheetLeft = assetMangager.getAsset("./knightsleft.png");
        this.spritesheetMage = assetMangager.getAsset("./wizard.png");
        // this.animator = new Animator(assetMangager.getAsset("./megamanfull.png"), 0, 0, 49, 49, 8, 0.10, 0);
        this.speed = 200;
        this.fallAcc = 200;
        this.facing = 2; 
        this.state = 0;
        this.playerJump = false;
        this.dead = false;
        this.updateBB();
        this.animations = [];
        this.loadAnimations();
    };
    loadAnimations() {
        for (var i = 0; i < 7; i++) { 
            this.animations.push([]);
            for (var j = 0; j < 4; j++) { // directions
                this.animations[i].push([]);
            }
        }

        // right
        this.animations[0][0] = new Animator(this.spritesheetMage, 630, 335, 60, 52, 8, 0.20, 84, false, true);
        // left
        this.animations[0][1] = new Animator(this.spritesheetMage, 613, 190, 60, 52, 8, 0.20, 84, false, true);
        // up
        this.animations[0][2] = new Animator(this.spritesheetMage, 629, 1055, 60, 52, 1, 0.20, 84, false, true);
        // up attack
        this.animations[1][2] = new Animator(this.spritesheetMage, 1205, 1051, 60, 52, 4, 0.20, 84, false, true);
        // dead down
        this.animations[2][3] = new Animator(this.spritesheetMage, 1765, 630, 70, 52, 1, 0.10, 0, false, true);

        


    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKHEIGHT);
        
    };
    
    update() {

        const TICK = this.game.clockTick;

        // // I used this page to approximate my constants
        // // https://web.archive.org/web/20130807122227/http://i276.photobucket.com/albums/kk21/jdaster64/smb_playerphysics.png
        // // I converted these values from hex and into units of pixels and seconds.
        
        const MIN_WALK = 4.453125;
        const MAX_RUN = 153.75;
        const ACC_RUN = 200.390625;


        const MAX_FALL = 270;


        // if (this.dead) {
        //     this.velocity.y += RUN_FALL * TICK;
        //     this.y += this.velocity.y * TICK * PARAMS.SCALE;
        // } else {


            // update velocity
            this.velocity.y += this.fallAcc * TICK;
                // ground physics
                if (Math.abs(this.velocity.x) < MIN_WALK) {  // slower than a walk // starting, stopping or turning around
                    this.velocity.x = 0;
                    this.state = 0;
                    if (this.game.left) {
                        this.velocity.x -= ACC_RUN;
                    }
                    if (this.game.right) {
                        this.velocity.x += ACC_RUN;
                    }
                }
                else if (Math.abs(this.velocity.x) >= MIN_WALK) {  // faster than a walk // accelerating or decelerating
                    if (this.facing === 0) {
                        if (this.game.right) {
                            this.velocity.x += ACC_RUN;
                        } else {
                            this.velocity.x = 0;
                        }
                    }
                    if (this.facing === 1) {
                        if (this.game.left) {
                            this.velocity.x -= ACC_RUN;
                        } else {
                            this.velocity.x = 0;
                        }
                    }
                }
            if (this.velocity.y >= MAX_FALL) this.velocity.y = MAX_FALL;
            if (this.velocity.y <= -200) this.velocity.y = -200;

            if (this.velocity.x >= MAX_RUN) this.velocity.x = MAX_RUN;
            if (this.velocity.x <= -MAX_RUN) this.velocity.x = -MAX_RUN;
            
            // update position
            this.x += this.velocity.x * TICK * PARAMS.SCALE;
            this.y += this.velocity.y * TICK * PARAMS.SCALE;
            this.updateBB();

            var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (that.velocity.y > 0) { // falling
                        if ((entity instanceof Ground) && (that.lastBB.bottom) >= entity.BB.top) {
                            that.playerJump = true;
                            that.y = entity.BB.top - PARAMS.BLOCKHEIGHT;
                            that.velocity.y === 0;
                            }
                            that.updateBB();
                        }
                    }
                });


            // update state
            if (this.state !== 3) {
                
             if (Math.abs(this.velocity.x) >= MIN_WALK){
                this.state = 0;
             } 
            else{
                this.state = 0;
                this.facing = 2;
            } 
            } else {

            }
            if(this.x < -20){
                this.x = -20;
            }
            if(this.x >= 750){
                this.x = 750;
            }
            if(this.y <= 0){
                this.y = 0;
            }
            // update direction
            if (this.velocity.x < 0) this.facing = 1;
            if (this.velocity.x > 0) this.facing = 0;

            
    };

    draw(ctx) {
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };


}