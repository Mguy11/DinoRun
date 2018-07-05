class Player1 extends Player{



    private leftkey     : number
    private rightkey    : number
   
    private leftSpeed   : number = 0
    private rightSpeed  : number = 0
   

    public grounded: boolean = true




    constructor(){
        
        super("player1")

        this.leftkey = 30
        this.rightkey = 32
        
        this.x      = 25
        this.y      = 800
         
        let keypressup = window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        let keypressdown = window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

        console.log(keypressup)
        console.log(keypressdown)


    }
    
    private onKeyDown(e: KeyboardEvent): void {
        switch (e.key) {
            case "a":
                this.leftSpeed = 15
                break
            case "d":
                this.rightSpeed = 15
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key) {
            case "a":
                this.leftSpeed = 0
                break
            case "d":
                this.rightSpeed = 0
                break
        }
    }

    public update(){

        let newX = this.x - this.leftSpeed + this.rightSpeed
        let newY = this.y 
        
        
        if (newX > 0 && newX + 100 < innerWidth) this.x = newX
        if (newY > 0 && newY + 100 < innerHeight) this.y = newY

        this.htmlElement.style.transform = `translate(${this.x}px, ${this.y}px)`
        

         

    }


   

}