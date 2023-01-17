class BackGround{
    constructor(game) {
        this.layer1 = ASSET_MANAGER.getAsset("./sprites/layer-1.png");
        this.layer2 = ASSET_MANAGER.getAsset("./sprites/layer-2.png");
        this.layer3 = ASSET_MANAGER.getAsset("./sprites/layer-3.png");
        this.layer4 = ASSET_MANAGER.getAsset("./sprites/layer-4.png");
        this.layer5 = ASSET_MANAGER.getAsset("./sprites/layer-5.png");
    }
    update(){

    };

    draw(ctx){
        ctx.drawImage(this.layer1, 0, 0, 800, 800);
        ctx.drawImage(this.layer2, 0, 0, 800, 800);
        ctx.drawImage(this.layer3, 0, 0, 800, 800);
        ctx.drawImage(this.layer4, 0, 0, 800, 800);
        ctx.drawImage(this.layer5, 0, 750, 1400, 800);
    }
}