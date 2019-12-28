import * as PIXI from 'pixi.js'
import { Scene, FrameInfo, ImplementedScene } from "./scene";
import { SceneProps } from "../scene";
import { gameWidth, gameHeight } from './settings';

export class GameScene extends Scene {
    public nextScene: ImplementedScene | null = null;
    private state: 'rotate' | 'move_up' = "rotate"
    private animals: PIXI.Sprite

    constructor(props: SceneProps) {
       super(props);
       this.animals = new PIXI.Sprite(props.resources["resources/animal_dance.png"].texture)
       this.animals.interactive = true
       this.animals.scale.set(200 / this.animals.width)
       this.animals.position.set(0, 0)
       this.animals.anchor.set(0.5)
       this.animals.on("pointerdown", () => {
            this.state = "move_up"
       })
       const g = new PIXI.Graphics()
       g.beginFill(0xff0000)
       g.drawCircle(gameWidth / 3, gameHeight / 3, 100)
       g.drawCircle(gameWidth / 2, gameHeight / 2, 100)
       g.drawCircle(3 * gameWidth / 4, 3 * gameHeight / 4, 100)
       this.addChild(this.animals)
       this.addChild(g)
    }
    public update(frameInfo: FrameInfo): void {
        switch (this.state) {
            case "move_up":
                this.animals.rotation += 0.5 * frameInfo.deltaTimeMS
                this.animals.position.y -= 5 * 0.5 * frameInfo.deltaTimeMS
                break;
            default:
                this.animals.rotation += 0.1 * 0.5 * frameInfo.deltaTimeMS
                break;
        }
    }
}
