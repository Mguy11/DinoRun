class Platforms{
    private div: HTMLElement
    private ground: HTMLElement

    private x: number 
    private y: number 

    private gravity     : number = 5

    private innerWidth: number
    private innerHeight: number

    constructor(){
        
        this.div = document.createElement("platform1")
        document.body.appendChild(this.div)

        this.innerWidth = innerWidth - 650
        this.innerHeight = innerHeight - 170
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight


    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }
    
    public update() : void {

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
       
    }
}