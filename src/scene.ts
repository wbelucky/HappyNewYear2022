import * as PIXI from 'pixi.js'

export interface FrameInfo {
    readonly deltaTimeMS: number
    readonly frameCount: number
}

export type ImplementedScene = typeof Scene & (new(...args: never[]) => Scene)

export interface SceneProps {
    readonly resources: PIXI.IResourceDictionary
    achivement: {
        excludeAll: boolean;
        gatherAll: boolean;
        twitter: boolean;
        gameClear: boolean
    }
}

export abstract class Scene extends PIXI.Container {
    constructor(props: SceneProps) {
        super()
    }
    public abstract nextScene: ImplementedScene | null
    public abstract update(frameInfo: FrameInfo): void
}
