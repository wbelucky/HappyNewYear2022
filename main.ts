import * as PIXI from 'pixi.js'

const main = () => {
    const gameWidth = 1200
    const gameHeight = 900

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
        if (window.innerWidth / gameWidth < window.innerHeight / gameHeight) {
            app.renderer.view.style.top = `${(window.innerHeight - app.renderer.height) / 2}px`
            app.renderer.view.style.left = "0px"
        } else {
            app.renderer.view.style.left = `${(window.innerWidth - app.renderer.width) / 2}px`
            app.renderer.view.style.top = "0px"
        }
        return [gameWidth * ratio, gameHeight * ratio]
    }
    resize()
    window.addEventListener("resize", resize)
    document.body.appendChild(app.view)

    app.loader.add("resources/animal_dance.png")
        .load(() => {
            const animals = new PIXI.Sprite(app.loader.resources["resources/animal_dance.png"].texture)
            animals.interactive = true
            animals.scale.set(200 / animals.width)
            animals.position.set(gameWidth / 2, gameHeight / 2)
            app.stage.addChild(animals)
            animals.anchor.set(0.5)
            let state: 'rotate' | 'move_up' = "rotate"
            animals.on("pointerdown", () => {
                state = "move_up"
            })
            app.ticker.add(() => {
                switch (state) {
                    case "move_up":
                        animals.rotation += 0.5
                        animals.position.y -= 5
                        break;
                    default:
                        animals.rotation += 0.1
                        break;
                }
            })
        })
}

main()