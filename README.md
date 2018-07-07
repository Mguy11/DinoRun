DinoRun
===

De Game is speelbaar op https://dinorun.bear-media.nl/ .

Uitleg
---

DinoRun is een Game waar kleine Dino op avontuur is. Tijdens zijn avontuur raakt hij de weg kwijt en beland hij in een betoverd huis. Hier krijgt hij de opdracht zoveel mogelijk eieren te vangen, maar hij moet tegelijkertijd ook alle stenen ontwijken. Wanneer hij 3x geraakt wordt is hij dood en zal hij het huis nooit meer kunnen verlaten!

**Solo:**
Je speelt als Dino in een endless game waar het doel is zoveel mogelijk eieren te vangen zonder dood te gaan.

**Versus:** 
Je speelt hier local multiplayer tegen iemand anders. De opdracht is proberen meer eieren te vangen dan de ander. Je moet wel nog steeds uitkijken voor de meteorieten, want als jij Game Over gaat wint de ander.

Checklist
---

- [x] De code van het individuele project staat op GitHub.
- [x] De game is online speelbaar.
- [x] De game bevat minimaal één van de onderstaande extra uitdagingen.
- [x] De game heeft een startscherm en een eindscherm.
- [x] Er zijn geen bugs.
- [x] Het project maakt gebruik van deze OOP principes.
    - [x] Classes
    - [x] Encapsulation
    - [x] Composition
    - [x] Inheritance
- [x] De GitHub pagina bevat een ReadMe bestand. Dit bestand bevat:
    - [x] Per bovengenoemd OOP principe een uitleg: waar is het toegepast, en waarom is het op die plek toegepast. De uitleg is inclusief code voorbeelden.
    - [x] Een klassendiagram van de game.
    - [x] Een link naar de peer review die in week 6 is gedaan (staat onder aan de ReadMe)
    
**Extra opdrachten**

- [x] De game ziet er zeer verzorgd uit dankzij goed uitgewerkt UI design en artwork.
- [ ] De game bevat een hiscore lijst. Scores worden bewaard nadat de game is afgesloten.
- [ ] De game werkt met Canvas in plaats van DOM elementen
- [x] De game bevat local of online multiplayer.
- [ ] De game werkt op mobiele schermen en ondersteunt touchscreen controls.
- [ ] De game maakt gebruik van device api's zoals de camera, microfoon, gyroscoop of GPS.
- [ ] De game gebruikt een externe library uit de lijst in deze modulewijzer. (Helaas niet gelukt, geprobeerd met Howler)

Klassendiagram
---
![dinorunnew](https://user-images.githubusercontent.com/15998532/42412293-cec438fa-8209-11e8-88fe-e2d748db9cf0.png)


OOP principes
===

Classes
---
De Playscreen class fungeert als de game, hetzelfde geldt ook voor de multiplayerScreen class. In mijn Playscreen class worden de benodigde objecten aangemaakt. Alle objecten hebben ook hun benodigde classes met daarin hun eigen constructor en update functie.

```
class PlayScreen {
    private eggs:Array<Egg> = []
    private meteorites:Array<Meteorite> = []
    private player1:Player1
    
    private maxEggs:number = 8
    private maxMeteorites:number = 4
    private scoreElement:HTMLElement;
    private score:number = 0;
    private lifeElement:HTMLElement;
    private lives:number = 0;
    private game: Game
    private ground: Ground
```


Encapsulation
---
Omdat in mijn code niet alle classes zomaar bij alle properties mogen komen heb ik er voor gekozen deze vaalal op **private** te zetten. Alleen wanneer een andere class, die niet extend, toegang moet hebben tot een bepaalde property heb ik hem op **public** gezet. Ditzelfde geldt ook voor de methodes die gebruikt zijn in dit project. Ik heb ook een aantal properties **protected** gemaakt, zodat alleen de class zelf en de extended/subclasses gebruik kunnen maken van deze properties.

```
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

```
```
class Player1 extends Player{

    private leftkey     : number
    private rightkey    : number
   
    private leftSpeed   : number = 0
    private rightSpeed  : number = 0
   
    public grounded: boolean = true
...
    private onKeyDown(e: KeyboardEvent): void {
        switch (e.key) {
            case "a":
                this.leftSpeed = 15
                break
            case "d":
                this.rightSpeed = 15
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key) {
            case "a":
                this.leftSpeed = 0
                break
            case "d":
                this.rightSpeed = 0
                break
        }
    }

    public update(){

        let newX = this.x - this.leftSpeed + this.rightSpeed
        let newY = this.y 
             
        if (newX > 0 && newX + 100 < innerWidth) this.x = newX
        if (newY > 0 && newY + 100 < innerHeight) this.y = newY

        this.htmlElement.style.transform = `translate(${this.x}px, ${this.y}px)`   

    }
}
```

Composition
---
Composition is eigenlijk hoe classes samenwerken en met elkaar verbonden zijn om, in dit geval, de game te kunnen laten werken.

Zo heb ik in mijn game de class Game, die centraal staat die de Game start. Vervolgens nemen de andere screen classes het over met regelen. Zo zorgt de Game class er voor dat er een Startscreen class wordt geladen, deze class kan dan weer zorgen dat er een Playscreen of een multiplayerScreen class geladen wordt. En in beide gevallen wordt er als laatst een Game Over screen class aangeroepen. Vanuit dit laatste begin je dan opnieuw in de Startscreen class. Zo blijft de game altijd draaien en hoef je niet elke keer als je Game Over bent de pagina/applicatie opnieuw te laden.

De functionaliteit en structuut staan ook visueel gemaakt in mijn klassendiagram hierboven.


Inheritence
---
In mijn game heb ik meerdere malen gebruik gemaakt van inheritence. Inheritence is het aanmaken van een parent class met child classes waardoor je dubbele code kunt voorkomen. Zo heb ik een class FallingGameObject (parent class) aangemaakt die extend wordt door de Egg en Meteorite classes. Hierdoor heb ik 1 class waar ik alle code in heb gezet die de functionaliteit van een FallingGameObject beschrijft en in de Egg en Meteorite classes heb ik toegang tot deze informatie door middel van inheritence. Nu kan ik in de Egg en Meteorite classes wat dingen aanpassen of toevoegen om ze toch iets anders te maken en/of andere dingen laten doen, maar het blijven nog steeds FallingGameObjects.

```
class FallingGameObject{

    protected _speed:number = 0;            
    private x:number          
    private y:number          
    private htmlElement:HTMLElement;  
 
    public constructor(tag:string) {

        this.htmlElement = document.createElement(tag)
    	document.body.appendChild(this.htmlElement)
        
        this.x = Math.random() * (window.innerWidth)
        this.y = -400 - (Math.random() * 450) 

        this.update()
        
    }

    public update():void {
        this.y += this._speed
        this.htmlElement.style.transform = `translate(${this.x}px, ${this.y}px)`
        
        if (this.y + this.htmlElement.clientHeight > window.innerHeight){
            this.reset()
        }
    }

    public getRectangle():any {
        return this.htmlElement.getBoundingClientRect()
    }

    public reset(){
        console.log('reset')
        this.x = Math.random() * (window.innerWidth - 200)
        this.y = -400 - (Math.random() * 450) 
        
    }
}
```
```
///<reference path="fallingGameObject.ts"/> 
class Egg extends FallingGameObject
{

    public constructor() {
        super("egg")
        
        this._speed = 3  
    }   

}
```
```
///<reference path="fallingGameObject.ts"/>
class Meteorite extends FallingGameObject
{
    public constructor() {
        super("meteorite")
        
        this._speed = 12   
    }   

}

```

Peer review Dion
===

Review Game
---

Ik heb monkaS de game gespeeld en ik heb hiervan de broncode in mogen zien. De game is simpel opgezet en het idee is snel duidelijk. In deze game gaat het er om dat twee spelers tegen elkaar spelen en moeten proberen de ander te vinden in een veld van vijanden. Elke vijand beweegt op een bepaalde manier, deze manier kan je als speler proberen na te bootsen of je gaat voor een directe aanval. Wanneer je denkt een speler gevonden te hebben kan je proberen hem aan te vallen, mocht het een speler zijn gaat hij dood anders verdwijnt de vijand en kan de andere speler zien waar jij je bevindt. Er zit ook nog een random feature in de game waarbij je als speler een bom kunt aanroepen die een bepaalde ontploffings grootte heeft en deze zal alle spelers en/of vijanden uitschakelen. Deze manier van spelen is erg spanend en daarom in mijn ogen ook leuk. Vooral het gevoel wanneer je je tegenspeler pakt en hij/zij dit totaal niet zag aankomen is geniaal. Kortom erg verslavend en leuk spelletje!

Review Code
---
Ik heb ook de code kunnen inzien. Dit was zeker een aardige uitdaging om twee redenen. Ten eerste kan ik gewoon zien dat dit al gevorderde code is. Alles staat netjes volgens de OOP principes geschreven en heeft duidelijk benamingen etc. In de code wordt ook al wat wiskunde gebruikt en dat werpt zeker zijn vruchten af in de gameplay. Zoals uitgelegd tijdens de game test zie je wel degelijk het verschil qua movements van de spelers en vijanden. Omdat ik sommige stukken in de code nog niet helemaal begrijp wordt het soms wat moeilijker om te lezen. Dat brengt mij bij het tweede punt namelijk dat er geen comments in de code staan. om het allemaal wat beter leesbaar te maken had dit zeker een optie geweest, ik snap wel dat dat hier niet gedaan is aangezien de game zelf gemaakt moest worden. Toch is het dan aan te raden comments te gebruiken, omdat je zelfs soms ook even wat ondersteuning kan gebruiken als je je code terug leest. Zelf moet ik hier ook hard aan werken, daarom noem ik dit punt. 

Verder heb ik niets op of aan te merken en kan ik alleen maar hopen dat deze "LIDL"-game uit mag groeien tot een echte game die door meer mensen gespeeld kan worden, want dit is een geniaal spel.

- [x] De code van het individuele project staat op GitHub.
- [x] De game is online speelbaar.
- [x] De game bevat minimaal één van de onderstaande extra uitdagingen.
- [x] De game heeft een startscherm en een eindscherm.
- [x] Er zijn geen bugs.
- [x] Het project maakt gebruik van deze OOP principes.
    - [x] Classes
    - [x] Encapsulation
    - [x] Composition
    - [x] Inheritance
- [x] De GitHub pagina bevat een ReadMe bestand. Dit bestand bevat:
    - [x] Per bovengenoemd OOP principe een uitleg: waar is het toegepast, en waarom is het op die plek toegepast. De uitleg is inclusief code voorbeelden.
    - [x] Een klassendiagram van de game.
    - [x] Een link naar de peer review die in week 6 is gedaan
    
**Extra opdrachten**

- [x] De game ziet er zeer verzorgd uit dankzij goed uitgewerkt UI design en artwork. (Zeer passend bij deze vorm van de game)
- [ ] De game bevat een hiscore lijst. Scores worden bewaard nadat de game is afgesloten.
- [x] De game werkt met Canvas in plaats van DOM elementen
- [x] De game bevat local of online multiplayer.
- [ ] De game werkt op mobiele schermen en ondersteunt touchscreen controls.
- [ ] De game maakt gebruik van device api's zoals de camera, microfoon, gyroscoop of GPS.
- [ ] De game gebruikt een externe library uit de lijst in deze modulewijzer. 

