/// <reference path="playscreen.ts"/>
/// <reference path="gameObject.ts"/>

class Player {

    protected htmlElement:HTMLElement; 

    protected x: number 
    protected y: number 

   

    public grounded: boolean = true

    private innerWidth = window.innerWidth - 173
    private innerHeight = window.innerHeight - 207

    constructor(tag:string){
        
        this.htmlElement = document.createElement(tag)
    	document.body.appendChild(this.htmlElement)

        this.x = 25
        this.y = 800
       


    }


    public getRectangle(){
        return this.htmlElement.getBoundingClientRect()
    }

   

   
}