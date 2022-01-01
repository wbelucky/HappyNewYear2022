import * as PIXI from 'pixi.js'
import { Scene, SceneProps, ImplementedScene } from './scene';
import { gameWidth, gameHeight } from './settings';

export class ClearScene extends Scene {
    public nextScene: ImplementedScene | null = null
    constructor(props: SceneProps) {
        super(props)
        const elapsedSecond = (new Date().getTime() - props.startTime.getTime()) / 1000
        const clear = new PIXI.Text(`すべてのあちーぶめんとをたっせいしました!!\n  ことしもよろしく!!🏆 \n\nプレイじかん: ${elapsedSecond}s`, new PIXI.TextStyle({
            fontFamily: 'Nico Moji',
            fontSize: 60
        }))
        clear.anchor.set(0.5)
        clear.position.set(gameWidth / 2, gameHeight / 3)
        this.addChild(clear)

        const tweet = new PIXI.Text('ついーとする', new PIXI.TextStyle({
            fontFamily: 'Nico Moji',
            fontSize: 40
        }))
        tweet.interactive = true
        tweet.on('pointertap', () => {
            const baseUrl = 'https://twitter.com/intent/tweet?';
            const text = ['text', `年賀状2022ですべてのアチーブメントを達成しました!\nプレイ時間: ${elapsedSecond}s\n`];
            const hashtags = ['hashtags', ['wbelucky年賀状2022'].join(',')];
            const url = ['url', location.href];
            const query = new URLSearchParams([text, hashtags, url]).toString();
            const shareUrl = `${baseUrl}${query}`;
            window.open(shareUrl, '_blank')
        })
        tweet.anchor.set(0.5)
        tweet.position.set(gameWidth / 2, gameHeight * 2 / 3)
        this.addChild(tweet)

        const writer = "Percentsley"
        const thanks = new PIXI.Text(`うさぎのえ: @${writer}`, new PIXI.TextStyle({
            fontFamily: 'Nico Moji',
            fontSize: 20
        }))
        thanks.interactive = true
        thanks.on('pointertap', () => {
            window.open(`https://twitter.com/${writer}`, '_blank')
        })
        thanks.anchor.set(0.5)
        thanks.position.set(gameWidth * 3 / 4, gameHeight * 3 / 4)
        this.addChild(thanks)

    }
    public update(): void {

    }

}