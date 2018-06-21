///<reference path="gameObject.ts"/>

class FallingGameObject{

    protected _speed:number = 0;            
    private x:number          
    private y:number          
    private htmlElement:HTMLElement;  

        
    public constructor(tag:string) {

        this.htmlElement = document.createElement(tag)
    	document.body.appendChild(this.htmlElement)
        
        this.x = Math.random() * (window.innerWidth)
        this.y = -400 - (Math.random() * 450) 

        this.update()
        
    }

    public update():void {
        this.y += this._speed
        this.htmlElement.style.transform = `translate(${this.x}px, ${this.y}px)`
        
        if (this.y + this.htmlElement.clientHeight > window.innerHeight){
            this.reset()
        }
    }

    public getRectangle():any {
        return this.htmlElement.getBoundingClientRect()
    }

    public reset(){
        console.log('reset')
        this.x = Math.random() * (window.innerWidth - 200)
        this.y = -400 - (Math.random() * 450) 
        
    }


}