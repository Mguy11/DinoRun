class StartScreen {

    private div: HTMLElement
    private game : Game

    constructor(g:Game) {
        this.game = g
        this.div = document.createElement("splash")
        document.body.appendChild(this.div)
        this.div.addEventListener("click", ()=>this.splashClicked())
        this.div.innerHTML = "Start DinoRun"
    }

    public update(){

    }

    private splashClicked() {
        
        this.game.showPlayScreen()
    }
}