class Ground{

    private ground: HTMLElement



    constructor(playscreen:PlayScreen)
    {
        this.ground = document.createElement("ground");
        document.body.appendChild(this.ground);

    }
}