export interface Text {
  title: string
  name :string
  desc: string,
}

export interface Skill {
  lang: string
  img: string
  percentage: number
}

export interface Skills {
  skill: Skill[]
}

interface Dl {
  dt: string
  dd: string
  url?: string
}

export interface Work {
  title: string
  dl: Dl[]
  imgLarge: string
  imgSmall: string
}