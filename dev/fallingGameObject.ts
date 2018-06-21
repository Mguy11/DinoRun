///<reference path="gameObject.ts"/>

class FallingGameObject extends gameObject{


    private fallingSpeed: [number, number]
    private gravitly: number


    constructor(pos:[number, number], tag:string, initialSpeed: [number, number], gravity:number)
    {   
        super(pos,tag)
        this.fallingSpeed = initialSpeed
        this.gravitly = gravity
        this.update()
    }

    public update()
    {
        this.fallingSpeed[1] += this.gravitly

        this.shift([this.fallingSpeed[0], this.fallingSpeed[1]])
        console.log("update")

    }


}