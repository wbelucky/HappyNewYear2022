import * as PIXI from 'pixi.js'
import { Scene, FrameInfo, ImplementedScene } from "./scene";
import { SceneProps } from "./scene";
import { gameWidth, gameHeight } from './settings';
import { TitleScene } from './title_scene';

export class GameScene extends Scene {
    public nextScene: ImplementedScene | null = null;
    private state: 'rotate' | 'move_up' = "rotate"
    private animals: PIXI.Sprite

    constructor(private props: SceneProps) {
       super(props);
       this.animals = new PIXI.Sprite(props.resources["resources/animal_dance.png"].texture)
       this.animals.interactive = true
       this.animals.scale.set(200 / this.animals.width)
       this.animals.position.set(gameWidth / 2, gameHeight / 2)
       this.animals.anchor.set(0.5)
       this.animals.on("pointerdown", () => {
           this.props.achivement.gameClear = true
           alert('[実績解除] ゲームクリアだ やったねー')
           this.state = "move_up"
       })
       this.addChild(this.animals)

       const mijissou = new PIXI.Text('これが, みじっそうってやつですね...', new PIXI.TextStyle({
           fontFamily: 'Nico Moji',
           fontSize: 40
       }))
       mijissou.anchor.set(0.5)
       mijissou.position.set(gameWidth / 2, gameHeight / 3)
       this.addChild(mijissou)
       
       const hint = new PIXI.Text('たいとるがめんのちーずとねこをつかってねずみを......すると...?', new PIXI.TextStyle({
           fontFamily: 'Nico Moji',
           fontSize: 15
       }))
       hint.anchor.set(0.5, 1)
       hint.position.set(gameWidth / 2, gameHeight)
       this.addChild(hint)

       const back = new PIXI.Text('もどる', new PIXI.TextStyle({
           fontFamily: 'Nico Moji',
           fontSize: 40
       }))
       back.anchor.set(0.5)
       back.position.set(gameWidth / 2, gameHeight * 2 / 3)
       back.interactive = true
       back.on('pointertap', () => {
           this.nextScene = TitleScene
       })
       this.addChild(back)

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
