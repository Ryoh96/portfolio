/**
 * Gearを管理するクラス
 */
export default class Gear {
  static dir = 1
  static deg = 1

  /**
   * 
   * @param verocity ギアの回転速度
   * @param dom ギアのDOM
   * @param rot ギアの回転角度
   */
  constructor(
    private verocity: number,
    private dom: HTMLElement | null,
    public rot = 0
  ){}

  /**
   * ギアの回転方向の計算
   * @param isIntersecting 
   */
  static calcDir(isIntersecting = true) {
    Gear.dir = isIntersecting ? -1 : 1
  }

  /**
   * ギアの回転角の大きさ
   * @returns 
   */
  private calcRotationDeg() {
    this.rot += Gear.deg * Gear.dir
    return `rotate(${this.verocity * this.rot}deg)`
  }

  /**
   * ギアを回転させる
   * @returns 
   */
  public rotateGear() {
    if (!this.dom) return
    this.dom.style.transform = this.calcRotationDeg()
  }
}