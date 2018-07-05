///<reference path="gameObject.ts"/>

class Ground extends GameObject{

   

    constructor(playscreen:PlayScreen)
    {
        
        let x = 0
        let y = innerHeight -70

        super([x,y],"ground")


    }

    update()
    {
        
    }

}