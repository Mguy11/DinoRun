class StartScreen {

    private div: HTMLElement
    private multi: HTMLElement
    private game : Game

    constructor(g:Game) {
        this.game = g

        this.div = document.createElement("splash")
        document.body.appendChild(this.div)

        this.multi = document.createElement("splash2")
        document.body.appendChild(this.multi)

        this.div.addEventListener("click", ()=>this.splashClicked())
        this.div.innerHTML = "Start DinoRun - Solo"

        this.multi.addEventListener("click", ()=>this.splashClicked2())
        this.multi.innerHTML = "Start DinoRun - Versus"
    }

    public update(){

    }

    private splashClicked() {
        
        this.game.showPlayScreen()
    }
    private splashClicked2() {
        
        this.game.showmultiplayerScreen()
    }
}