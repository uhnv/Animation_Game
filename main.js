const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./sprites/knightright.png");
ASSET_MANAGER.queueDownload("./sprites/knightsleft.png");
ASSET_MANAGER.queueDownload("./sprites/layer-1.png");
ASSET_MANAGER.queueDownload("./sprites/layer-2.png");
ASSET_MANAGER.queueDownload("./sprites/layer-3.png");
ASSET_MANAGER.queueDownload("./sprites/layer-4.png");
ASSET_MANAGER.queueDownload("./sprites/layer-5.png");
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	gameEngine.addEntity(new Knight(gameEngine));
	gameEngine.addEntity(new BackGround(gameEngine));
	gameEngine.init(ctx);

	gameEngine.start();
});
