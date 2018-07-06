class MultiplayerScreen {

    private eggs:Array<Egg> = []
    private meteorites:Array<Meteorite> = []

    private player1:Player1
    private player2:Player2

    private maxEggs:number = 8
    private maxMeteorites:number = 4

    private scoreElement:HTMLElement;
    private score:number = 0;

    private lifeElement:HTMLElement;
    private lives:number = 0;

    private scoreElement2:HTMLElement;
    private score2:number = 0;

    private lifeElement2:HTMLElement;
    private lives2:number = 0;

    private game: Game
    private ground: Ground2
   
    constructor(g:Game){

        this.game = g
        
        this.ground = new Ground2(this)

        this.scoreElement = document.createElement("scores");
        document.body.appendChild(this.scoreElement);

        this.lifeElement = document.createElement("lives");
        document.body.appendChild(this.lifeElement);

        this.scoreElement2 = document.createElement("scores2");
        document.body.appendChild(this.scoreElement2);

        this.lifeElement2 = document.createElement("lives2");
        document.body.appendChild(this.lifeElement2);

        this.updateScore(0);
        this.updateScore2(0);

        this.updateLives(3)
        this.updateLives2(3)

        this.player1 = new Player1()

        this.player2 = new Player2()
        
       
        

        for(let i = 0; i < this.maxEggs; i++){
            this.eggs.push(new Egg())
        }
        for(let i = 0; i < this.maxMeteorites; i++){
            this.meteorites.push(new Meteorite())
        }
 
     
        
        
    }

    public update(){
        console.log('update')
        this.player1.update()
        this.player2.update()
        this.ground.update()
        
        for (var g of this.eggs) {
            g.update()
            if (this.checkCollision(g.getRectangle(), this.player1.getRectangle())) {
                console.log('yum')
                this.updateScore(1)
                g.reset();
               
            }
            if (this.checkCollision(g.getRectangle(), this.player2.getRectangle())) {
                console.log('yum')
                this.updateScore2(1)
                g.reset();
               
            }
        }


        for (var m of this.meteorites) {
            m.update()
            if (this.checkCollision(m.getRectangle(), this.player1.getRectangle())) {
                console.log('hit')
                this.updateLives(-1)
                m.reset();
            }
            if (this.checkCollision(m.getRectangle(), this.player2.getRectangle())) {
                console.log('hit')
                this.updateLives2(-1)
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
        this.scoreElement.innerHTML = "Score Player1: " + this.score;
    }

    private updateLives(points:number) {
        this.lives = this.lives + points;
        this.lifeElement.innerHTML = "Lives Player1: " + this.lives;
        if(this.lives <= 0){
            this.game.showGameOverScreen()
        }
    }

    private updateScore2(points:number) {
        this.score2 = this.score2 + points;
        this.scoreElement2.innerHTML = "Score Player2: " + this.score2;
    }

    private updateLives2(points:number) {
        this.lives2 = this.lives2 + points;
        this.lifeElement2.innerHTML = "Lives Player2: " + this.lives2;
        if(this.lives2 <= 0){
            this.game.showGameOverScreen()
        }
    }
    


}