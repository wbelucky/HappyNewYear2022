import { SceneProps } from "./scene";
import * as PIXI from 'pixi.js'

export class Achievements {
  public readonly sprite: PIXI.Text

  constructor(private readonly props: SceneProps) {
    console.log(props.achievement)
    this.sprite = new PIXI.Text(this.getAchievementText(props.achievement), new PIXI.TextStyle({
      fontFamily: "Nico Moji",
      fontSize: 15
    }))
  }
  public handleClear(key: keyof SceneProps["achievement"], title: string, comment: string) {

    this.props.achievement[key] = true
    this.sprite.text = this.getAchievementText(this.props.achievement)
    alert(`[実績解除:${title}] ${comment}`)
  }

  private getAchievementText(achievement: SceneProps["achievement"]): string {
    return "あちーぶめんと:" + Object.values(achievement).map((b) => b ? '🏆' : '🕳').join("")
  }
}
