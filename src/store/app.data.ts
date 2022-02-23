import { Text, Work } from "./app.config"

export class Data {
  public static texts: Text[] = [
    {
      title: "RYOH KUROKI",
      name: "top",
      desc: "Web Design & Engineering"
    },
    {
      title: "About",
      name: "about",
      desc: "経歴・資格・受賞歴"
    },
    {
      title: "Skill",
      name: "skill",
      desc: "コーディング&デザイン"
    },
    {
      title: "Work",
      name: "work",
      desc: "製作した作品"
    },
    {
      title: "Contact",
      name: 'contact',
      desc: "hello@kurokiryoh.com"
    },
  ]

  public static works: Work[] = [
    {
      title: 'Portfolio(ver.2)',
      dl:[
        { 
          dt: '開発言語',
          dd: 'Vue.js / TypeScript'
        },
        {
          dt: '外部ライブラリ',
          dd: 'GSAP / Three.js'
        },
        {
          dt: 'イラスト / 画像',
          dd: 'Illustrator / Photoshop'
        },
        {
          dt: '説明',
          dd: '既存版をVue.jsでリファクタリング'
        }
      ],
      imgLarge: '../images/portofolio.jpg',
      imgSmall: '../images/portofolio-sm.jpg'
    },
    {
      title: 'Portfolio(ver.1)',
      dl:[
        { 
          dt: '開発言語',
          dd: 'HTML5 / Sass / TypeScript'
        },
        {
          dt: '外部ライブラリ',
          dd: 'Barba.js / GSAP'
        },
        {
          dt: 'イラスト / 画像',
          dd: 'Illustrator / Photoshop'
        }
      ],
      imgLarge: '../images/portofolio.jpg',
      imgSmall: '../images/portofolio-sm.jpg'
    },
    {
      title: '個人ブログ',
      dl:[
        { 
          dt: 'URL',
          dd:  'https://tekrog.com',
          url: 'https://tekrog.com'
        },
        { 
          dt: '開発言語',
          dd: 'HTML5 / Sass / JavaScript'
        },
        {
          dt: 'CMS',
          dd: 'WordPress'
        },
        {
          dt: 'イラスト / 画像',
          dd: 'Illustrator / Photoshop'
        },
        {
          dt: '説明',
          dd: '自分のブログ。デザイン、コーディング、CMS化まで全て0から作成。'
        }
      ],
      imgLarge: '../images/tekrog.jpg',
      imgSmall: '../images/tekrog.jpg'
    }
  ]
  public static gearsSpeed = [48, -72, 96, 40, -10]
}