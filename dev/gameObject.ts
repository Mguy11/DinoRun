class GameObject{

    private htmlElement: HTMLElement

    private position: [number, number] = [0, 0];

    constructor(pos: [number, number], tag:string)
    {
        this.htmlElement = document.createElement(tag);
        document.body.appendChild(this.htmlElement);
        this.spawn(pos)
        
    }

    public getRectangle(){
        return this.htmlElement.getBoundingClientRect()
    }

    public spawn(pos:[number, number])
    {
        this.position = pos
        this.htmlElement.style.transform = "translate("+this.position[0]+"px, "+this.position[1]+"px)";
    }


}