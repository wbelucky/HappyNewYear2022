import * as PIXI from 'pixi.js'

export interface FrameInfo {
    readonly deltaTimeMS: number
    readonly frameCount: number
}

export interface SceneProps {
    readonly startTime: Date;
    readonly resources: Record<string, PIXI.Texture>;
    achievement: {
        excludeAll: boolean;
        gatherAll: boolean;
        twitter: boolean;
        gameClear: boolean;
        findRabbit: boolean;
    }
}

// export abstract class Scene extends PIXI.Container {
//     constructor(props: SceneProps) {
//         super()
//     }
//     public abstract nextScene: ImplementedScene | null
//     public abstract update(frameInfo: FrameInfo): void
// }

export interface Scene {
  c: PIXI.Container;
  readonly nextScene: Scene | null;
  update(frameInfo: FrameInfo): void;
  onpointermove?: (evt: PIXI.FederatedPointerEvent) => void;
}
