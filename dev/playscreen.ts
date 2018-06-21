class PlayScreen {

    public game:Game

    private eggCount: number = 0.01
    private eggs: Array<FallingGameObject> = []
    private gameOver: boolean = false
   

    constructor(g:Game) {
        console.log("Game created!")
        this.game = g
        
        this.update()
       

    }
    
    public update(): void {

         

            if( Math.random() < this.eggCount)
            {
                this.eggs.push(new Egg())
            }
       
        
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)

            console.log(this.checkCollision)
            
    }


}