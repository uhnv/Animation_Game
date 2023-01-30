class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.elapsedTime = 0;
        this.mage = new Mage(this.game, 100, 100); 
        // this.game.addEntity(new Projectile(this.game, 100, 100));
        this.game.addEntity(this.mage);
        this.game.addEntity(new Ground(this.game, 0, 750, 1400, 50));
        this.game.addEntity(new Monster(this.game, 100, 100))
        this.game.addEntity(this.mage);
       this.enemy = new ChainBot(this.game, 170, 170); 
      // this.enemy = new ChainBot(this.game, 120, 120); 
        this.game.addEntity(this.enemy);
       // this.game.addEntity(this.monster);
        
           };

    

    update() {
    
    };



    draw(ctx) {
    };
    
};