class Projectile{
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.spritesheet = assetMangager.getAsset("./mageBall.png");
        this.speed = 200;
        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 175, 255, 6, 6, 1, 0.1, 0, false, true));
        this.updateBB();
    };
    updateBB() {
        this.lastBB = this.BB;
        this.BB = new BoundingBox(this.x+5, this.y+5, 20, 20);
        
    };
    update(){
        // this.game.entities.forEach(function (entity) {
        //     if (entity.BB && that.BB.collide(entity.BB)) {
        //             if ((entity instanceof Ground) && (that.lastBB.bottom) >= entity.BB.top) {
        //                     that.dead = true;
        //                 }
        //                 that.updateBB();
        //             }
        //     });
        this.y -= this.speed * this.game.clockTick;
        this.updateBB();
    };

    draw(ctx){
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x, this.y, 4);
        ctx.strokeStyle = 'Red';
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    };
};