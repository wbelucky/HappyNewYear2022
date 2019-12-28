import * as PIXI from 'pixi.js'

export interface FrameInfo {
    readonly deltaTimeMS: number
    readonly frameCount: number
}

export type ImplementedScene = typeof Scene & (new(...args: never[]) => Scene)

export interface SceneProps {
    readonly resources: PIXI.IResourceDictionary
}

export abstract class Scene extends PIXI.Container {
    protected props: SceneProps
    constructor(props: SceneProps) {
        super()
        this.props = props
    }
    public abstract nextScene: ImplementedScene | null
    public abstract update(frameInfo: FrameInfo): void
}
