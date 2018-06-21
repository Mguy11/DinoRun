class gameObject{

    private htmlElement: HTMLElement

    private position: [number, number] = [0, 0]

    private lastMove: [number, number] = [0, 0]


    constructor(pos:[number, number], tag:string)
    {
        this.htmlElement = document.createElement(tag)
        document.body.appendChild(this.htmlElement)

    }

    public spawn(pos:[number, number])
    {
        this.position = pos

        this.htmlElement.style.transform = "translate("+this.position[0]+"px, "+this.position[1]+"px"
    }

    public shift(pos:[number, number] | null)
    {
        if(pos == null)
        {
            pos = this.lastMove
        }
        this.lastMove = pos
        this.position [this.position[0] + pos[0], this.position[1] + pos[1]]
        this.htmlElement.style.transform = "translate("+this.position[0]+"px, "+this.position[1]+"px"
    }

    public remove()
    {
        this.htmlElement.parentElement!.removeChild(this.htmlElement)
    }

    public getRectangle()
    {
        return this.htmlElement.getBoundingClientRect
    }


}