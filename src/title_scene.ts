import * as PIXI from 'pixi.js'
import { Scene, ImplementedScene, SceneProps, FrameInfo } from "./scene";
import { gameWidth, gameHeight } from "./settings";
import { GameScene } from "./game_scene";
import { ClearScene } from './clear_scene';

interface OptionParams {direction: number; };

export class TitleScene extends Scene {
    
    public nextScene: ImplementedScene | null = null;
    private particleContainer: PIXI.ParticleContainer
    private particles: Array<PIXI.Sprite &  OptionParams>
    private pointerPosition: PIXI.IPoint | null = null
    private pointerMode: 'cat' | 'cheeze' = 'cat'
    private pointer: PIXI.Sprite
    private achivements: PIXI.Text
    constructor(private props: SceneProps) {
        super(props)

        this.interactive = true
        this.sortableChildren = true
        this.on('pointermove', (evt: any) => {
                this.pointerPosition = this.toLocal((evt.data.global as PIXI.Point))
                this.pointerPosition.x -= 20
                this.pointerPosition.y -= 20
                this.pointer.visible = true
                this.pointer.position = this.pointerPosition
            })

        this.pointer = new PIXI.Sprite(this.props.resources['resources/cat_boss_gang.png'].texture)
        this.pointer.visible = false
        this.pointer.anchor.set(1)
        this.pointer.scale.set(gameWidth / 16 / this.pointer.width)
        this.pointer.alpha = 0.5
        this.pointer.zIndex = 100
        this.addChild(this.pointer)
        const modeSwitch = () => {
            switch (this.pointerMode) {
                case 'cat':
                    this.pointerMode = 'cheeze'
                    this.pointer.texture = this.props.resources['resources/kunsei_cheese.png'].texture
                    break;
                case 'cheeze': 
                    this.pointerMode = 'cat'
                    this.pointer.texture = this.props.resources['resources/cat_boss_gang.png'].texture
                    break;
                default:
                    break;
            }
        }
        document.body.addEventListener('pointerdown', modeSwitch)
        
        this.particleContainer = new PIXI.ParticleContainer(100, {
            position: true,
            rotation: true,
            uvs: true,
        })
        this.addChild(this.particleContainer)

        this.particles = new Array(100).fill(0).map((_) => {
            const spr = new PIXI.Sprite(this.props.resources['resources/animalface_nezumi.png'].texture)
            spr.anchor.set(0.5)
            spr.scale.set(Math.random() / 3)
            spr.x = Math.random() * gameWidth
            spr.y = Math.random() * gameHeight
            spr.rotation += 2 * Math.PI * Math.random()
            spr.blendMode = PIXI.BLEND_MODES.LIGHTEN
            spr.alpha = 0.1
            spr.tint = Math.random() * 0xFFFFFF
            this.particleContainer.addChild(spr);
            (spr as any).direction = Math.random() * 2 * Math.PI;
            return (spr as PIXI.Sprite & OptionParams)
        })

        const text = new PIXI.Text('あけまして  \n おめでとう \n  ございます', new PIXI.TextStyle({
            fontFamily: "Nico Moji",
            fontSize: 80
        }))
        text.anchor.set(0.5, 0.5)
        text.position.set(gameWidth / 3, gameHeight / 2)
        this.addChild(text)

        const text2 = new PIXI.Text('ことしも よろしく おねがいします', new PIXI.TextStyle({
            fontFamily: "Nico Moji",
            fontSize: 30
        }))
        text2.anchor.set(0.5, 1)
        text2.position.set(gameWidth / 2, gameHeight * 7 / 8)
        this.addChild(text2)

        const text3 = new PIXI.Text('がめんをタッチしてみて...', new PIXI.TextStyle({
            fontFamily: "Nico Moji",
            fontSize: 15
        }))
        text3.anchor.set(0.5, 1)
        text3.position.set(gameWidth / 2, gameHeight)
        this.addChild(text3)

        this.achivements = new PIXI.Text(this.getAchivementText(), new PIXI.TextStyle({
            fontFamily: "Nico Moji",
            fontSize: 15
        }))
        this.addChild(this.achivements)

        const toGame = new PIXI.Sprite(this.props.resources['resources/game_controller.png'].texture)
        toGame.anchor.set(0.5)
        toGame.scale.set(0.4)
        toGame.alpha = 0.5
        toGame.position.set(gameWidth / 2, gameHeight * 3 / 4)
        toGame.interactive = true
        toGame.on('pointertap', () => {
            document.body.removeEventListener('pointerdown', modeSwitch)
            this.nextScene = GameScene
        })
        this.addChild(toGame)
            

        const icon = new PIXI.Sprite(this.props.resources["resources/profile.png"].texture)
        icon.interactive = true
        icon.on('pointerdown', () => {
            window.open('https://twitter.com/biraki_prg', '_blank')
            this.props.achivement.twitter = true
            this.achivements.text = this.getAchivementText()
            alert('[実績解除] twitterアイコンを押しました.\nアチーブメントは全部で4つ')
        })
        icon.anchor.set(0.5)
        icon.position.set(3 * gameWidth / 4, gameHeight / 2)
        icon.zIndex = -100
        this.addChild(icon)

    }
    public update(frameInfo: FrameInfo): void {
        // pass
        this.particles.forEach((spr) => {
            spr.rotation += frameInfo.deltaTimeMS * 0.01
            spr.direction += 1 * 0.01
            spr.x += Math.cos(spr.direction) * 1
            spr.y += Math.sin(spr.direction) * 1
            if (this.pointerPosition === null ) {
                return
            }
            const toPointer = Math.sqrt((spr.x - this.pointerPosition.x) * (spr.x - this.pointerPosition.x) + (spr.y - this.pointerPosition.y) * (spr.y - this.pointerPosition.y))
            if (toPointer <= gameWidth / 8) {        this.on('pointerout', (evt: any) => {
                this.pointerPosition = null
            })
                switch (this.pointerMode) {
                    case 'cat':
                        spr.x -= (this.pointerPosition.x - spr.x) * 0.03
                        spr.y -= (this.pointerPosition.y - spr.y) * 0.03
                        break;
                    case 'cheeze':
                        spr.x += (this.pointerPosition.x - spr.x) * 0.03
                        spr.y += (this.pointerPosition.y - spr.y) * 0.03
                    default:
                        break;
                }
            }
        })

        const gather_all = this.particles.every((spr) => {
            if (this.pointerPosition === null ) {
                return false
            }
            const toPointer = Math.sqrt((spr.x - this.pointerPosition.x) * (spr.x - this.pointerPosition.x) + (spr.y - this.pointerPosition.y) * (spr.y - this.pointerPosition.y))
            if (toPointer <= gameWidth / 8) {
                return true
            }
        })
        if (gather_all && !this.props.achivement.gatherAll) {
            alert("[実績解放]タイトル画面のすべてのネズミを集めました")
            this.props.achivement.gatherAll = true
            this.achivements.text = this.getAchivementText()
        }

        const exclude_all = this.particles.every((spr) => {
            return (spr.x < 0 || gameWidth <= spr.x) || (spr.y < 0 || gameHeight <= spr.y)
        })
        if (exclude_all && !this.props.achivement.excludeAll) {
            alert("[実績解放]タイトル画面のすべてのネズミを画面外へ追い出しました")
            this.props.achivement.excludeAll = true
            this.achivements.text = this.getAchivementText()
        }

        if (Object.values(this.props.achivement).every((b) => b)) {
            this.nextScene = ClearScene
        }
    }

    private getAchivementText(): string {
        return "あちーぶめんと:" + Object.values(this.props.achivement).map((b) => b ? '🏆':'🕳').join("")
    }
}