class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.elapsedTime = 0;
        this.mage = new Mage(this.game, 100, 100); 
        this.game.addEntity(this.mage);
<<<<<<< Updated upstream
=======
        this.game.addEntity(new Ground(this.game, 0, 750, 1400, 50));

>>>>>>> Stashed changes
    };

    

    update() {
    
    };



    draw(ctx) {
    };
    
};