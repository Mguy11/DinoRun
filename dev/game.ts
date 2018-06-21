

class Game {

    private screen:any
    private gameOver:any

    constructor()
    {

        this.screen = new StartScreen(this);
       
        this.gameLoop()
    }
    
    private gameLoop():void{
        
        this.screen.update()
        requestAnimationFrame(() => this.gameLoop())
    }

    public showPlayScreen()
    {
        document.body.innerHTML = ""
        this.screen = new PlayScreen(this)
    }

    public showStartScreen()
    {
        document.body.innerHTML = ""
        this.screen = new StartScreen(this)
    }

    public showGameOverScreen()
    {
        document.body.innerHTML = ""
        document.body.innerHTML = ""
        this.screen = new GameOverScreen(this)
       
        
    }
  
} 

window.addEventListener("load", () => new Game())