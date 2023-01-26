class Projectile{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.spritesheet = assetMangager.getAsset("./sprites/blackFireball.png");
        this.speed = 200;
        this.animations = [];
        this.dead = false;
        this.animations.push(new Animator(this.spritesheet, 0, 0, 15, 15, 4, 0.3, 7, 0, false, true, false));
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x, this.y, 30, 30);
        
    };
    update(){
        // if(this.dead){
        //     this.removeFromWorld = true;
        // }
        this.x += this.speed * this.game.clockTick;
        this.updateBB();
        // var that = this;
        // this.game.entities.forEach(function (entity) {
        //     if (entity.BB && that.BB.collide(entity.BB)) {
        //         if ((entity instanceof Fruit) && that.BB.collide(entity.BB)) {
        //            that.dead = true;
        //            entity.removeFromWorld = true;
        //         }
        //             }
        //     });
    };

    draw(ctx){
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, 2);
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };
};