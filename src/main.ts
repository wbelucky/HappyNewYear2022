import * as PIXI from 'pixi.js'
import { SceneManager } from './scene_manager'
import { gameHeight, gameWidth } from './settings'

const main = () => {
    
    const app = new PIXI.Application({
        width: gameWidth,
        height: gameHeight,
        backgroundColor: 0xFFFFFF,
        resolution: window.devicePixelRatio,
    })
    
    console.log(app.renderer.resolution)

    app.renderer.view.id = "pixi-canvas"
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    const resize = () => {

        console.log(app.renderer.resolution)
        console.log(window.innerWidth)
        console.log(window.innerHeight)
        console.log(screen.width)
        console.log(screen.height)

        const p = app.view.parentElement
        const ratio = Math.min(
            p.clientWidth / gameWidth,
            p.clientHeight  / gameHeight
        )

        const newWidth = Math.ceil(gameWidth * ratio)
        const newHeight = Math.ceil(gameHeight * ratio)
        console.log(newWidth)
        console.log(newHeight)

        app.view.style.width = `${newWidth}px`
        app.view.style.height = `${newHeight}px`

        app.renderer.resize(newWidth, newHeight)
        app.stage.scale.set(ratio)

        // if (window.innerWidth / gameWidth < window.innerHeight / gameHeight) {
        //     app.renderer.view.style.top = `${(window.innerHeight - app.renderer.height) / 2}px`
        //     app.renderer.view.style.left = "0px"
        // } else {
        //     app.renderer.view.style.left = `${(window.innerWidth - app.renderer.width) / 2}px`
        //     app.renderer.view.style.top = "0px"
        // }
    }
    document.body.appendChild(app.view)
    window.addEventListener("resize", resize, false)
        resize()
    app.stage.addChild(new PIXI.Graphics().beginFill(0x00ff00).drawCircle(app.screen.width, app.screen.height, 50))

    app.loader.add("resources/animal_dance.png")
        .load((_, resources) => {
            const sceneManager = new SceneManager(app.stage, {
                resources,
            })
            let frameCount = 0
            app.ticker.add((deltaTimeMS: number) => {
                sceneManager.update({deltaTimeMS, frameCount})
                frameCount ++
            })
        })
}

main()