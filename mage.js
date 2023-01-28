class Mage {

    constructor(game, x, y){
        Object.assign(this, { game, x, y });
        this.game.mage = this;
        this.velocity = { x: 0, y: 0 };
        this.spritesheet = assetMangager.getAsset("./mage.png");
        this.spritesheetLeft = assetMangager.getAsset("./mageLeft.png");
        // this.animator = new Animator(assetMangager.getAsset("./megamanfull.png"), 0, 0, 49, 49, 8, 0.10, 0);
        this.speed = 200;
        this.fallAcc = 200;
        this.facing = 1; 
        this.state = 5;
        this.playerJump = false;
        this.shoot = false;
        this.elapsedTime = 0;
        this.dead = false;
        // this.updateBB();
        this.animations = [];
        this.loadAnimations();
    };
    loadAnimations() {
        for (var i = 0; i < 6; i++) { 
            this.animations.push([]);
            for (var j = 0; j < 2; j++) { // directions
                this.animations[i].push([]);
            }
        }

        // right idle
        this.animations[0][0] = new Animator(this.spritesheet, 61, 15, 45, 105, 8, 0.20, 115, false, true);
        // right run
        this.animations[1][0] = new Animator(this.spritesheet, 65, 150, 39, 105, 8, 0.20, 121, false, true);
        // right attack
        this.animations[2][0] = new Animator(this.spritesheet, 61, 269, 70, 105, 13, 0.10, 90, false, true); 
        // skull attack
        this.animations[3][0] = new Animator(this.spritesheet, 57, 527, 50, 105, 17, 0.10, 110, false, true);
        // hit
        this.animations[4][0] = new Animator(this.spritesheet, 57, 655, 50, 105, 5, 0.20, 110, false, true);
        // death
        this.animations[5][0] = new Animator(this.spritesheet, 57, 789, 50, 105, 9, 0.20, 110, false, true);


        // left idle
        this.animations[0][1] = new Animator(this.spritesheetLeft, 1495, 15, 45, 105, 8, 0.20, 115, true, true);

        // left run
        this.animations[1][1] = new Animator(this.spritesheetLeft, 1495, 150, 39, 105, 8, 0.20, 121, true, true);

        // left attack
        this.animations[2][1] = new Animator(this.spritesheetLeft, 666, 269, 70, 105, 13, 0.10, 90, true, true);

        // left skull attack
        this.animations[3][1] = new Animator(this.spritesheetLeft, 55, 527, 50, 105, 17, 0.10, 110, true, true);

        // left hit
        this.animations[4][1] = new Animator(this.spritesheetLeft, 1976, 655, 50, 105, 5, 0.20, 110, true, true);
        // left death
        this.animations[5][1] = new Animator(this.spritesheetLeft, 1336, 789, 50, 105, 9, 0.20, 110, true, true);
        // this.shootAnim = new Animator(this.spritesheetMage, 1205, 1051, 60, 52, 4, 0.05, 84, false, true);

        


    };
<<<<<<< Updated upstream
    // updateBB() {
    //     this.lastBB = this.BB;
    //     this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKHEIGHT);
=======
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y+110, PARAMS.PLAYERWIDTH, PARAMS.PLAYERHEIGHT);
>>>>>>> Stashed changes
        
    // };
    
    update() {
        this.elapsedTime += this.game.clockTick;
        const TICK = this.game.clockTick;
        
        const RUN = 153;


        const MAXFALL = 270;

            // this.velocity.y += this.fallAcc * TICK;
            // if(this.shoot){
            //     this.velocity.x = 0;
            //     if(this.elapsedTime > 0.3 && this.shootAnim.isAlmostDone(TICK)){
            //         this.game.addEntityToBegin(new Projectile(this.game, this.x, this.y));
            //         this.elapsedTime = 0;
            //         this.shoot = false;
            //     }
                
            // }
            //  else {        
                    if (this.game.left) {
                        this.facing = 1;
                        this.state = 1;
                        this.velocity.x -= RUN;
                    }
                    if (this.game.right) {
                        this.facing = 0;
                        this.state = 1;
                        this.velocity.x += RUN;
                    }  
                    if(!this.game.left && !this.game.right){
                        this.velocity.x = 0;
                    }     
                if(this.game.E){
                    this.shoot = true;
<<<<<<< Updated upstream
                 }
=======
                }
                
                if(this.game.jump && this.playerJump){
                    this.state = 6;
                    this.velocity.y = -150;
                    this.playerJump = false;
                }
            }
            
        }
             else {       
                if(this.animations[this.state][this.facing].isAlmostDone(TICK)){
                this.state = 0;

                }
                // if (this.game.right && !this.game.left) {
                //     this.velocity.x = RUN;
                // } 
                // else if (this.game.left && !this.game.right) {
                //     this.velocity.x -= RUN;
                // } 
                // else {
                //     // do nothing
                // }
                
>>>>>>> Stashed changes
                 
            // }
            // if (this.velocity.y >= MAXFALL) this.velocity.y = MAXFALL;
            // if (this.velocity.y <= -200) this.velocity.y = -200;

            if (this.velocity.x >= RUN) this.velocity.x = RUN;
            if (this.velocity.x <= -RUN) this.velocity.x = -RUN;
            
            // update position
            this.x += this.velocity.x * TICK * PARAMS.SCALE;
            // this.y += this.velocity.y * TICK * PARAMS.SCALE;
            // this.updateBB();

<<<<<<< Updated upstream
                if(this.velocity.x === 0){
=======
            var that = this;
            this.game.entities.forEach(function (entity) {
                if (entity.BB && that.BB.collide(entity.BB)) {
                    if (that.velocity.y > 0) { // falling
                        if ((entity instanceof Ground) && (that.lastBB.bottom) <= entity.BB.top) {
                            that.playerJump = true;
                            that.y = entity.BB.top - PARAMS.PLAYERHEIGHT - 110;
                            that.velocity.y === 0;
                            that.updateBB();
                            }
                            
                        }
                    }
                });

                if(this.velocity.x === 0 && !this.shoot){
>>>>>>> Stashed changes
                    this.state = 0;
                }
                else if(this.velocity.x < 0){
                    this.facing = 1;
                }
                else if(this.velocity.x > 0){
                    this.facing = 0;
                }
                // else{
                //     this.state = 0;
                // }
            // } else {
            //     this.state = 1;
            //     this.facing = 2;
            // }
            if(this.x < -20){
                this.x = -20;
            }
<<<<<<< Updated upstream
            if(this.x >= 750){
                this.x = 750;
            }
            if(this.y <= 0){
                this.y = 0;
            }
=======

>>>>>>> Stashed changes
            // update direction
            if (this.velocity.x < 0) this.facing = 1;
            if (this.velocity.x > 0) this.facing = 0;
            
            
    };

    draw(ctx) {
        // if(this.shoot){
        //     // this.animations[1][2].drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);
        //     this.shootAnim.drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);
        // }
        //  else {
            this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.x , this.y, PARAMS.SCALE);

            // this.animations[2][0].drawFrame(this.game.clockTick, ctx, this.x + 200 , this.y, PARAMS.SCALE);
        // }
            // ctx.strokeStyle = 'Red';
            // ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };


};