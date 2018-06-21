class PlayScreen {

    game:Game
    
    private player: Player
    private platform: Platforms[] = []
    private ground: Ground[] = []
   

    constructor(g:Game) {
        
        this.game = g
        this.player = new Player()

        for (let i = 0; i < 5; i++) {
            this.platform.push(new Platforms())
        }

        for (let i = 0; i < 5; i++) {
            this.ground.push(new Ground())
            
            
        }

    }
    
    public update(): void {

        for (let p of this.platform) {
            if (this.checkCollision(p.getRectangle(), this.player.getRectangle()))
            {
                    this.player.hitPlatform()
                   
            }

            p.update()

            
        }

        for (let g of this.ground) {
            if (this.checkCollision(g.getRectangle(), this.player.getRectangle()))
            {
                    this.player.hitPlatform()
                   
            }
            g.update()
            
        }

        this.player.update()
       
        
    }

    private checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)

            console.log(this.checkCollision)
            
    }


}