import * as PIXI from 'pixi.js'
import { SceneManager } from './scene_manager'
import { gameHeight, gameWidth } from './settings'

const main = () => {
    
    const app = new PIXI.Application({
        width: 1200,
        height: 900,
        backgroundColor: 0x00000,
        resolution: window.devicePixelRatio,
    })
    app.renderer.view.style.position = "absolute"
    const resize = () => {
        const ratio = Math.min(window.innerWidth / gameWidth,
            window.innerHeight / gameHeight)
        app.renderer.resize(Math.ceil(gameWidth * ratio), Math.ceil(gameHeight * ratio))
        app.stage.scale.set(ratio)
        console.log("window:   w h", window.innerWidth, window.innerHeight)
        console.log("renderer: w h", app.renderer.width, app.renderer.height)
        // if (window.innerWidth / gameWidth < window.innerHeight / gameHeight) {
        //     app.renderer.view.style.top = `${(window.innerHeight - app.renderer.height) / 2}px`
        //     app.renderer.view.style.left = "0px"
        // } else {
        //     app.renderer.view.style.left = `${(window.innerWidth - app.renderer.width) / 2}px`
        //     app.renderer.view.style.top = "0px"
        // }
    }
    document.body.appendChild(app.view)
    window.addEventListener("resize", resize)
    resize()

    app.loader.add("resources/animal_dance.png")
        .load(() => {
            const sceneManager = new SceneManager(app.stage, {
                resources: app.loader.resources
            })
            let frameCount = 0
            app.ticker.add((deltaTimeMS: number) => {
                sceneManager.update({deltaTimeMS, frameCount})
                frameCount ++
            })
        })
}

main()