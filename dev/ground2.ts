///<reference path="gameObject.ts"/>

class Ground2 extends GameObject{

   

    constructor(multiplayerScreen:MultiplayerScreen)
    {
        
        let x = 0
        let y = innerHeight -70

        super([x,y],"ground")


    }

    update()
    {
        
    }

}