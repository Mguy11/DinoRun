///<reference path="fallingGameObject.ts"/> 

class Egg extends FallingGameObject {

    private static eggSpeed:number = 5

    constructor()
    {
        let x = Math.random() * (window.innerWidth - 40)
        let y = -22

        let fallingSpeed = Math.random() * (Egg.eggSpeed - 1) + 1
        let gravity = 0.01

        super([x,y], "egg", [0, fallingSpeed], gravity)
        this.update()
    }

}