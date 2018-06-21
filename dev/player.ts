/// <reference path="playscreen.ts"/>

class Player {
    private div: HTMLElement
 
    private x: number 
    private y: number 

    private upkey       : number
    private leftkey     : number
    private rightkey    : number

    private upSpeed     : number = 0
    private leftSpeed   : number = 0
    private rightSpeed  : number = 0
    private gravity     : number = 5
    private jumpforce   : number = 5

    public grounded: boolean = true

    private innerWidth = window.innerWidth - 173
    private innerHeight = window.innerHeight - 207

    constructor(){

        this.div = document.createElement("player")
        document.body.appendChild(this.div)

        this.upkey   = 17
        this.leftkey = 30
        this.rightkey = 32
        
        this.x      = 25
        this.y      = 600
        
       let keypressup = window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
       let keypressdown = window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));

       console.log(keypressup);
       console.log(keypressdown);


    }

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }

    private onKeyDown(e: KeyboardEvent): void {
        switch (e.key) {
            case "w":
                this.jump()
                break
            case "a":
                this.leftSpeed = 5
                break
            case "d":
                this.rightSpeed = 5
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key) {
            case "w":
                this.upSpeed = 0
                this.gravity = 9
                break
            case "a":
                this.leftSpeed = 0
                break
            case "d":
                this.rightSpeed = 0
                break
        }
    }
    private jump()
    {   
            this.upSpeed = 10
            this.gravity = 4
            this.grounded = false
        
    }
    public hitPlatform()
    {
        this.gravity = 0
        
    }

    public update(){

        let newX = this.x - this.leftSpeed + this.rightSpeed
        let newY = this.y - this.upSpeed + this.gravity
        
        
        if (newX > 0 && newX + 100 < innerWidth) this.x = newX
        if (newY > 0 && newY + 100 < innerHeight) this.y = newY
        

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
         

    }
}