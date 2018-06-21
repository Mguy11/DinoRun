class Ground{

    private ground: HTMLElement

    private x: number 
    private y: number 

    private innerHeight: number


    constructor()
    {
        this.ground = document.createElement("ground")
        document.body.appendChild(this.ground)

        this.innerHeight = innerHeight - 50
        this.x = 0
        this.y = this.innerHeight
        
    }


    public getRectangle() {
        return this.ground.getBoundingClientRect()
    }
    

    public update()
    {
        this.ground.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
    
}