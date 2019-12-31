import * as PIXI from 'pixi.js'
import { SceneManager } from './scene_manager'
import { gameHeight, gameWidth } from './settings'

const main = () => {
    
    const app = new PIXI.Application({
        width: gameWidth,
        height: gameHeight,
        backgroundColor: 0xffffff,
        resolution: window.devicePixelRatio,
    })
    
    console.log(app.renderer.resolution)

    app.renderer.view.id = "pixi-canvas"
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    const resize = () => {

        // const p = app.view.parentElement
        console.log(innerWidth)
        console.log(innerHeight)

        const ratio = Math.min(
            window.innerWidth / gameWidth,
            window.innerHeight/ gameHeight
        )

        const newWidth = Math.ceil(gameWidth * ratio)
        const newHeight = Math.ceil(gameHeight * ratio)

        app.view.style.width = `${newWidth}px`
        app.view.style.height = `${newHeight}px`

        app.renderer.resize(newWidth, newHeight)
        app.stage.scale.set(ratio)

        if (window.innerWidth / gameWidth < window.innerHeight / gameHeight) {
            app.view.style.top = `${(window.innerHeight - app.renderer.height) / 2}px`
            app.view.style.left = "0px"
        } else {
            app.view.style.left = `${(window.innerWidth - app.renderer.width) / 2}px`
            app.view.style.top = "0px"
        }
    }
    document.getElementById("game").appendChild(app.view)
    window.addEventListener("resize", resize, false)
    resize()

    app.loader.add([
            "resources/animal_dance.png",
            "resources/animalface_nezumi.png",
            'resources/kunsei_cheese.png',
            'resources/cat_boss_gang.png',
            'resources/profile.png'
        ])
        .load((_, resources) => {
            const sceneManager = new SceneManager(app.stage, {
                resources,
                achivement: {
                    excludeAll: false,
                    gatherAll: false,
                }
            })
            let frameCount = 0
            app.ticker.add((deltaTimeMS: number) => {
                sceneManager.update({deltaTimeMS, frameCount})
                frameCount ++
            })
        })
}

(window as any).WebFontConfig = {
    custom: { families: ['Nico Moji'],
                urls: [ 'https://fonts.googleapis.com/earlyaccess/nicomoji.css' ] },

    active() {
        main();
    },
};

/* eslint-disable */
// include the web-font loader script
(function() {
    const wf = document.createElement('script');
    wf.src = `${document.location.protocol === 'https:' ? 'https' : 'http'
    }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
    wf.type = 'text/javascript';
    (wf as any).async = 'true';
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
}());