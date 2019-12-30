import { GameScene } from "./game_scene"
import { Scene } from "./scene"
import { FrameInfo } from "./scene"
import { SceneProps } from "./scene"

export class SceneManager {
    private nowScene: Scene
    constructor(private readonly stage: PIXI.Container, private props: SceneProps) {
        this.nowScene = new GameScene(this.props)
        this.stage.addChild(this.nowScene)
    }
    public update(frameInfo: FrameInfo): void {
        this.nowScene.update(frameInfo)
        const next = this.nowScene.nextScene
        if (this.nowScene.nextScene !== null) {
            this.stage.children.forEach((c) => {
                if (c instanceof PIXI.Container) {
                    c.destroy({children: true})
                } else {
                    c.destroy()
                }
            })
            
            this.stage.removeChildren()
            this.nowScene = new next(this.props)
            this.stage.addChild(this.nowScene)
        }
    }
}