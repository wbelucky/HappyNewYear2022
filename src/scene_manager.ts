import * as PIXI from 'pixi.js'
import { Scene } from "./scene"
import { FrameInfo } from "./scene"
import { SceneProps } from "./scene"
import { TitleScene } from "./title_scene"

export class SceneManager {
    private nowScene: Scene
    constructor(private readonly stage: PIXI.Container, private props: SceneProps) {
        this.nowScene = new TitleScene(this.props)
        this.startScene();
    }
    public update(frameInfo: FrameInfo): void {
        this.nowScene.update(frameInfo)
        const next = this.nowScene.nextScene
        if (next !== null) {
            this.destroyScene();
            this.nowScene = next;
            this.startScene();
        }
    }
    private startScene(): void {
      this.stage.addChild(this.nowScene.c)
      if (this.nowScene.onpointermove) {
        this.stage.on('pointermove', this.nowScene.onpointermove)
      }
    }
    private destroyScene(): void {
        this.stage.children.forEach((c) => {
            if (c instanceof PIXI.Container) {
                c.destroy({children: true})
            } else {
                c.destroy()
            }
        })
        this.stage.removeChildren()
        this.stage.off('pointermove')
    }
}
