class PlayScreen {
    private eggs:Array<Egg> = []
    private meteorites:Array<Meteorite> = []
    private player:Player
    private maxEggs:number = 8
    private maxMeteorites:number = 4
    private scoreElement:HTMLElement;
    private score:number = 0;
    private liveElement:HTMLElement;
    private lives:number = 0;
    private game: Game
    private ground: Ground

    constructor(g:Game){
        this.game = g
        
        this.ground = new Ground(this)
        this.scoreElement = document.createElement("scores");
        document.body.appendChild(this.scoreElement);
        this.liveElement = document.createElement("lives");
        document.body.appendChild(this.liveElement);

        this.updateScore(0);

        this.updateLives(3)

        this.player = new Player()

        for(let i = 0; i < this.maxEggs; i++){
            this.eggs.push(new Egg())
        }
        for(let i = 0; i < this.maxMeteorites; i++){
            this.meteorites.push(new Meteorite())
        }
 
        
        
    }

    public update(){
        console.log('update')
        this.player.update()
        this.ground.update()
        
        for (var g of this.eggs) {
            g.update()
            if (this.checkCollision(g.getRectangle(), this.player.getRectangle())) {
                console.log('yum')
                this.updateScore(1)
                g.reset();
            }
        }

        for (var m of this.meteorites) {
            m.update()
            if (this.checkCollision(m.getRectangle(), this.player.getRectangle())) {
                console.log('hit')
                this.updateLives(-1)
                m.reset();
            }
        }


    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
    }

    private updateScore(points:number) {
        this.score = this.score + points;
        this.scoreElement.innerHTML = "Score: " + this.score;
    }

    private updateLives(points:number) {
        this.lives = this.lives + points;
        this.liveElement.innerHTML = "Levens: " + this.lives;
        if(this.lives <= 0){
            this.game.showGameOverScreen()
        }
    }
    


}