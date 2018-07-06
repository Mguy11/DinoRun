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

Klassendiagram
---

OOP principes
===

Classes
---
In mijn Playscreen class worden de benodigde objecten aangemaakt. Alle objecten hebben ook hun benodigde classes met daarin hun eigen constructor en update functie.

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

Composition
---

inheritence
---

Peer review Dion
===

