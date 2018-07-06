class StartScreen {

    private div: HTMLElement
    private multi: HTMLElement
    private title: HTMLElement
    private rules: HTMLElement
    private keys: HTMLElement
    private game : Game

    constructor(g:Game) {
        this.game = g

        this.div = document.createElement("splash")
        document.body.appendChild(this.div)

        this.multi = document.createElement("splash2")
        document.body.appendChild(this.multi)

        this.title = document.createElement("title")
        document.body.appendChild(this.title)

        this.keys = document.createElement("keys")
        document.body.appendChild(this.keys)

        this.rules = document.createElement("rules")
        document.body.appendChild(this.rules)

        
        this.title.innerHTML = "DinoRun"

        this.div.addEventListener("click", ()=>this.splashClicked())
        this.div.innerHTML = "Solo"

        this.multi.addEventListener("click", ()=>this.splashClicked2())
        this.multi.innerHTML = "Versus"

        this.keys.innerHTML = "Solo: A + D keys  Versus: player1 A + D keys, player2 J + L keys"

        this.rules.innerHTML = "Dodge the meteorites, catch the eggs!"
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