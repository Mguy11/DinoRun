///<reference path="gameObject.ts"/>

class Ground extends gameObject{

    private x: number 
    private y: number 

    
    private innerHeight: number


    constructor(pos:[number, number], tag:string)
    {
        super(pos,tag)
        this.innerHeight = innerHeight - 50
        
        this.x = 0
        this.y = this.innerHeight
        
    }

    public update()
    {
        
    }
    
}