class Ground{

    private ground: HTMLElement

    private x: number
    private y: number

    private innerHeight: number

    constructor(playscreen:PlayScreen)
    {
        this.ground = document.createElement("ground");
        document.body.appendChild(this.ground);

        this.innerHeight = innerHeight - 70
        this.x = 0
        this.y = this.innerHeight


    }

    update()
    {
        this.ground.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
}