import * as PIXI from 'pixi.js'
import { Achievements } from './achievement';
import { ClearScene } from './clear_scene';
import { Scene, FrameInfo } from "./scene";
import { SceneProps } from "./scene";
import { gameWidth, gameHeight } from './settings';
import { TitleScene } from './title_scene';

export class GameScene implements Scene {
    public c: PIXI.Container = new PIXI.Container();
    public nextScene: Scene | null = null;
    private state: 'rotate' | 'move_up' = "rotate"
    private animals: PIXI.Sprite
    private achievements: Achievements
    private rabbitSize = 0.11
    private rabbitClickCount = 0
    private rabbit: PIXI.Sprite | null = null;

    constructor(private props: SceneProps) {
        this.c.interactive = true
        this.c.sortableChildren = true

        this.achievements = new Achievements(props)
        this.c.addChild(this.achievements.sprite)

        this.animals = new PIXI.Sprite(props.resources["resources/animal_dance.png"])
        this.animals.interactive = true
        this.animals.scale.set(200 / this.animals.width)
        this.animals.position.set(gameWidth / 2, gameHeight / 2)
        this.animals.anchor.set(0.5)
        this.animals.on("pointerdown", () => {
            this.achievements.handleClear("gameClear", "裏面発見", "2019年からここに作られるはずだった楽しいミニゲームの進捗はないです....")
            this.state = "move_up"
        })
        this.c.addChild(this.animals)

        const mijissou = new PIXI.Text('ここはウラめんです', new PIXI.TextStyle({
            fontFamily: 'Nico Moji',
            fontSize: 40
        }))
        mijissou.anchor.set(0.5)
        mijissou.position.set(gameWidth / 2, gameHeight / 3)
        this.c.addChild(mijissou)

        const hint = new PIXI.Text('さいしょのがめんのポインターでまわりのトラを......すると...?', new PIXI.TextStyle({
            fontFamily: 'Nico Moji',
            fontSize: 15
        }))
        hint.anchor.set(0.5, 1)
        hint.position.set(gameWidth / 2, gameHeight)
        this.c.addChild(hint)

        const back = new PIXI.Text('おもてへ', new PIXI.TextStyle({
            fontFamily: 'Nico Moji',
            fontSize: 40
        }))
        back.anchor.set(0.5)
        back.position.set(gameWidth / 2, gameHeight * 2 / 3)
        back.interactive = true
        back.on('pointertap', () => {
            this.nextScene = new TitleScene(this.props)
        })
        this.c.addChild(back)

        if (props.achievement.excludeAll) {
            this.rabbit = new PIXI.Sprite(props.resources["resources/rabbit-vim.png"])
            this.rabbit.interactive = true
            this.rabbit.on('pointerdown', () => {
                this.rabbitSize += this.rabbitSize * 0.015
                this.rabbitClickCount++
                this.rabbit.scale.set(this.rabbitSize)
                if (this.rabbitClickCount == 50) {
                    this.achievements.handleClear("findRabbit", "トラの威を借る", "'怖いトラ'の正体を暴きました!")
                }
            })
            this.rabbit.anchor.set(0.5)
            this.rabbit.position.set(1 * gameWidth / 4, gameHeight * 3 / 4 + 40)
            this.rabbit.zIndex = 40
            this.rabbit.scale.set(this.rabbitSize)
            this.rabbit.anchor.set(0.5, 1)
            this.c.addChild(this.rabbit)
        }


        const tiger = new PIXI.Sprite(props.resources["resources/animal_tora.png"])
        // tiger.interactive = true tiger.on('pointerdown', () => { // this.achievements.handleClear("gameClear", "TODO:", "")
        //     // this.rabbitSize += this.rabbitSize * 0.1
        //     console.log("tiger")
        // })
        tiger.anchor.set(0.5)
        tiger.position.set(1 * gameWidth / 4, gameHeight * 3 / 4)
        tiger.zIndex = 50
        tiger.scale.set(0.5)
        this.c.addChild(tiger)


        const miniRabbit = new PIXI.Sprite(this.props.resources["resources/rabbit-mini.png"])
        miniRabbit.interactive = true
        miniRabbit.on('pointerdown', () => {
        })
        miniRabbit.anchor.set(0.5)
        miniRabbit.position.set(3 * gameWidth / 4, gameHeight / 2)
        miniRabbit.zIndex = - 50
        miniRabbit.alpha = 0.5
        this.c.addChild(miniRabbit)
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

        if (Object.values(this.props.achievement).every((b) => b)) {
            this.nextScene = new ClearScene(this.props)
        }
    }
}
