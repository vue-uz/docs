import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme, type HeadConfig, type Plugin } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import llmstxt from 'vitepress-plugin-llms'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
// import { textAdPlugin } from './textAdMdPlugin'

const nav: ThemeConfig['nav'] = [
  {
    text: 'Hujjatlar',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
    items: [
      { text: 'Qo‘llanma', link: '/guide/introduction' },
      { text: 'Darslik', link: '/tutorial/' },
      { text: 'Misollar', link: '/examples/' },
      { text: 'Tez boshlash', link: '/guide/quick-start' },
      // { text: 'Style Guide', link: '/style-guide/' },
      { text: 'Atamalar lug‘ati', link: '/glossary/' },
      { text: 'Xatoliklar ro‘yxati', link: '/error-reference/' },
      {
        text: 'Vue 2 hujjatlari',
        link: 'https://v2.vuejs.org'
      },
      {
        text: 'Vue 2 dan migratsiya',
        link: 'https://v3-migration.vuejs.org/'
      }
    ]
  },
  {
    text: 'API',
    activeMatch: `^/api/`,
    link: '/api/'
  },
  {
    text: 'Tajriba maydonchasi',
    link: 'https://play.vuejs.org'
  },
  {
    text: 'Ekosistema',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'Resurslar',
        items: [
          { text: 'Hamkorlar', link: '/partners/' },
          { text: 'Dasturchilar\n', link: '/developers/' },
          { text: 'Mavzular (Themes)', link: '/ecosystem/themes' },
          { text: 'UI komponentlari', link: 'https://ui-libs.vercel.app/' },
          {
            text: 'Sertifikatlash',
            link: 'https://certificates.dev/vuejs/?ref=vuejs-nav'
          },
          { text: 'Ish o‘rinlari', link: 'https://vuejobs.com/?ref=vuejs' },
          { text: 'Futbolka do‘koni', link: 'https://vue.threadless.com/' }
        ]
      },
      {
        text: 'Rasmiy kutubxonalar',
        items: [
          { text: 'Vue Router', link: 'https://router.vuejs.org/' },
          { text: 'Pinia', link: 'https://pinia.vuejs.org/' },
          { text: 'Asboblar qo‘llanmasi', link: '/guide/scaling-up/tooling.html' }
        ]
      },
      {
        text: 'Video kurslar',
        items: [
          {
            text: 'Vue Mastery',
            link: 'https://www.vuemastery.com/courses/'
          },
          {
            text: 'Vue School',
            link: 'https://vueschool.io/?friend=vuejs&utm_source=Vuejs.org&utm_medium=Link&utm_content=Navbar%20Dropdown'
          }
        ]
      },
      {
        text: 'Yordam',
        items: [
          {
            text: 'Discord chati',
            link: 'https://discord.com/invite/HBherRA'
          },
          {
            text: 'GitHub muhokamalari',
            link: 'https://github.com/vuejs/core/discussions'
          },
          { text: 'DEV hamjamiyati', link: 'https://dev.to/t/vue' }
        ]
      },
      {
        text: 'Yangiliklar',
        items: [
          { text: 'Blog', link: 'https://blog.vuejs.org/' },
          { text: 'X (Twitter)', link: 'https://x.com/vuejs' },
          { text: 'Tadbirlar', link: 'https://events.vuejs.org/' },
          { text: 'Yangiliklar byulleteni', link: '/ecosystem/newsletters' }
        ]
      }
    ]
  },
  {
    text: 'Haqida',
    activeMatch: `^/about/`,
    items: [
      { text: 'Tez-tez so‘raladigan savollar (FAQ)', link: '/about/faq' },
      { text: 'Jamoa', link: '/about/team' },
      { text: 'Chiqarilishlar', link: '/about/releases' },
      {
        text: 'Jamiyat uchun qo‘llanma',
        link: '/about/community-guide'
      },
      { text: 'Xulq-atvor qoidalari', link: '/about/coc' },
      { text: 'Maxfiylik siyosati', link: '/about/privacy' },
      {
        text: 'Hujjatli film',
        link: 'https://www.youtube.com/watch?v=OrxmtDw4pVI'
      }
    ]
  },
  {
    text: 'Homiy',
    link: '/sponsor/'
  },
  {
    text: 'Mutaxassislar',
    badge: { text: 'YANGI' },
    activeMatch: `^/(partners|developers)/`,
    items: [
      { text: 'Hamkorlar', link: '/partners/' },
      { text: 'Dasturchilar', link: '/developers/', badge: { text: 'YANGI' } }
    ]
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/guide/': [
    {
      text: 'Boshlash',
      items: [
        { text: 'Kirish', link: '/guide/introduction' },
        {
          text: 'Tez boshlash',
          link: '/guide/quick-start'
        }
      ]
    },
    {
      text: 'Asosiy tushunchalar',
      items: [
        {
          text: 'Ilova yaratish',
          link: '/guide/essentials/application'
        },
        {
          text: 'Shablon sintaksisi',
          link: '/guide/essentials/template-syntax'
        },
        {
          text: 'Reaktivlik asoslari',
          link: '/guide/essentials/reactivity-fundamentals'
        },
        {
          text: 'Hisoblangan xususiyatlar',
          link: '/guide/essentials/computed'
        },
        {
          text: 'Sinflar va uslublarga bog‘lash',
          link: '/guide/essentials/class-and-style'
        },
        {
          text: 'Shartli renderlash',
          link: '/guide/essentials/conditional'
        },
        { text: 'Ro‘yxatni renderlash', link: '/guide/essentials/list' },
        {
          text: 'Voqealarni boshqarish',
          link: '/guide/essentials/event-handling'
        },
        { text: 'Forma kirishlarini bog‘lash', link: '/guide/essentials/forms' },
        { text: 'Kuzatuvchilar', link: '/guide/essentials/watchers' },
        { text: 'Shablon referenslari', link: '/guide/essentials/template-refs' },
        {
          text: 'Komponentlar asoslari',
          link: '/guide/essentials/component-basics'
        },
        {
          text: 'Hayotiy tsikl kancalari',
          link: '/guide/essentials/lifecycle'
        }
      ]
    },
    {
      text: 'Komponentlarni chuqur o‘rganish',
      items: [
        {
          text: 'Ro‘yxatga olish',
          link: '/guide/components/registration'
        },
        { text: 'Props', link: '/guide/components/props' },
        { text: 'Voqealar (Events)', link: '/guide/components/events' },
        { text: 'Komponent v-model', link: '/guide/components/v-model' },
        {
          text: 'Fallthrough atributlari',
          link: '/guide/components/attrs'
        },
        { text: 'Slotlar (Slots)', link: '/guide/components/slots' },
        {
          text: 'Provide / inject',
          link: '/guide/components/provide-inject'
        },
        {
          text: 'Asinxron komponentlar',
          link: '/guide/components/async'
        }
      ]
    },
    {
      text: 'Qayta foydalanish',
      items: [
        {
          text: 'Kompozitsiyalar',
          link: '/guide/reusability/composables'
        },
        {
          text: 'Maxsus direktivalar',
          link: '/guide/reusability/custom-directives'
        },
        { text: 'Plaginlar', link: '/guide/reusability/plugins' }
      ]
    },
    {
      text: 'Ichki komponentlar',
      items: [
        { text: 'O‘tish animatsiyasi (Transition)', link: '/guide/built-ins/transition' },
        {
          text: 'O‘tish guruhlari (TransitionGroup)',
          link: '/guide/built-ins/transition-group'
        },
        { text: 'KeepAlive (Saqlab turish)', link: '/guide/built-ins/keep-alive' },
        { text: 'Teleport (Teleport)', link: '/guide/built-ins/teleport' },
        { text: 'Suspense (Kutish)', link: '/guide/built-ins/suspense' }
      ]
    },
    {
      text: 'Kengaytirish',
      items: [
        { text: 'Yagona faylli komponentlar', link: '/guide/scaling-up/sfc' },
        { text: 'Asboblar', link: '/guide/scaling-up/tooling' },
        { text: 'Yo‘naltirish', link: '/guide/scaling-up/routing' },
        {
          text: 'Holat boshqaruvi',
          link: '/guide/scaling-up/state-management'
        },
        { text: 'Testlash', link: '/guide/scaling-up/testing' },
        {
          text: 'Server tomonida renderlash (SSR)',
          link: '/guide/scaling-up/ssr'
        }
      ]
    },
    {
      text: 'Eng yaxshi amaliyotlar',
      items: [
        {
          text: 'Ishlab chiqarishga joylashtirish',
          link: '/guide/best-practices/production-deployment'
        },
        {
          text: 'Ishlash samaradorligi',
          link: '/guide/best-practices/performance'
        },
        {
          text: 'Kirish imkoniyati',
          link: '/guide/best-practices/accessibility'
        },
        {
          text: 'Xavfsizlik',
          link: '/guide/best-practices/security'
        }
      ]
    },
    {
      text: 'TypeScript',
      items: [
        { text: 'Umumiy ko‘rinish', link: '/guide/typescript/overview' },
        {
          text: 'Composition API bilan TypeScript',
          link: '/guide/typescript/composition-api'
        },
        {
          text: 'Options API bilan TypeScript',
          link: '/guide/typescript/options-api'
        }
      ]
    },
    {
      text: 'Qo‘shimcha mavzular',
      items: [
        {
          text: 'Vue’dan foydalanish usullari',
          link: '/guide/extras/ways-of-using-vue'
        },
        {
          text: 'Composition API bo‘yicha FAQ',
          link: '/guide/extras/composition-api-faq'
        },
        {
          text: 'Reaktivlikning chuqur tahlili',
          link: '/guide/extras/reactivity-in-depth'
        },
        {
          text: 'Renderlash mexanizmi',
          link: '/guide/extras/rendering-mechanism'
        },
        {
          text: 'Render funksiyalar va JSX',
          link: '/guide/extras/render-function'
        },
        {
          text: 'Vue va Web-komponentlar',
          link: '/guide/extras/web-components'
        },
        {
          text: 'Animatsiya usullari',
          link: '/guide/extras/animation'
        }
        // {
        //   text: 'Building a Library for Vue',
        //   link: '/guide/extras/building-a-library'
        // },
        // {
        //   text: 'Vue for React Devs',
        //   link: '/guide/extras/vue-for-react-devs'
        // }
      ]
    }
  ],
  '/api/': [
    {
      text: 'Global API',
      items: [
        { text: 'Ilova', link: '/api/application' },
        {
          text: 'Umumiy',
          link: '/api/general'
        }
      ]
    },
    {
      text: 'Composition API',
      items: [
        { text: 'setup()', link: '/api/composition-api-setup' },
        {
          text: 'Reaktivlik: Asosiy',
          link: '/api/reactivity-core'
        },
        {
          text: 'Reaktivlik: Yordamchi funksiyalar ',
          link: '/api/reactivity-utilities'
        },
        {
          text: 'Reaktivlik: Ilg‘or',
          link: '/api/reactivity-advanced'
        },
        {
          text: 'Hayotiy tsikl kancalari',
          link: '/api/composition-api-lifecycle'
        },
        {
          text: 'Bog‘liqlikni inʼektsiya qilish',
          link: '/api/composition-api-dependency-injection'
        },
        {
          text: 'Yordamchilar',
          link: '/api/composition-api-helpers'
        }
      ]
    },
    {
      text: 'Options API',
      items: [
        { text: 'Options: Holat (State)', link: '/api/options-state' },
        { text: 'Options: Renderlash', link: '/api/options-rendering' },
        {
          text: 'Options: Hayotiy tsikl',
          link: '/api/options-lifecycle'
        },
        {
          text: 'Options: Kompozitsiya',
          link: '/api/options-composition'
        },
        { text: 'Options: Boshqalar', link: '/api/options-misc' },
        {
          text: 'Komponent instansiyasi',
          link: '/api/component-instance'
        }
      ]
    },
    {
      text: 'Ichki funksiyalar',
      items: [
        { text: 'Direktivlar', link: '/api/built-in-directives' },
        { text: 'Komponentlar', link: '/api/built-in-components' },
        {
          text: 'Maxsus elementlar',
          link: '/api/built-in-special-elements'
        },
        {
          text: 'Maxsus atributlar',
          link: '/api/built-in-special-attributes'
        }
      ]
    },
    {
      text: 'Yagona faylli komponent (Single-File Component)',
      items: [
        { text: 'Sintaksis spetsifikatsiyasi', link: '/api/sfc-spec' },
        { text: '<script setup>', link: '/api/sfc-script-setup' },
        { text: 'CSS xususiyatlari', link: '/api/sfc-css-features' }
      ]
    },
    {
      text: 'Ilg‘or API lar',
      items: [
        { text: 'Maxsus elementlar', link: '/api/custom-elements' },
        { text: 'Render funksiyasi', link: '/api/render-function' },
        { text: 'Server tomonida renderlash (Server-Side Rendering)', link: '/api/ssr' },
        { text: 'TypeScript yordamchi turlari', link: '/api/utility-types' },
        { text: 'Maxsus renderer', link: '/api/custom-renderer' },
        { text: 'Kompilyatsiya vaqtidagi flaglar', link: '/api/compile-time-flags' }
      ]
    }
  ],
  '/examples/': [
    {
      text: 'Asosiy',
      items: [
        {
          text: 'Salom, Dunyo',
          link: '/examples/#hello-world'
        },
        {
          text: 'Foydalanuvchi kiritmalarini qayta ishlash',
          link: '/examples/#handling-input'
        },
        {
          text: 'Atributlarga bog‘lash',
          link: '/examples/#attribute-bindings'
        },
        {
          text: 'Shartlar va sikllar',
          link: '/examples/#conditionals-and-loops'
        },
        {
          text: 'Formaga bog‘lash',
          link: '/examples/#form-bindings'
        },
        {
          text: 'Oddiy komponent',
          link: '/examples/#simple-component'
        }
      ]
    },
    {
      text: 'Amaliy',
      items: [
        {
          text: 'Markdown tahrirlovchi',
          link: '/examples/#markdown'
        },
        {
          text: 'Ma’lumotlarni olish (Fetching Data)',
          link: '/examples/#fetching-data'
        },
        {
          text: 'Saralash va filtr bilan jadval',
          link: '/examples/#grid'
        },
        {
          text: 'Daraxtli ko‘rinish (Tree View)',
          link: '/examples/#tree'
        },
        {
          text: 'SVG grafikasi',
          link: '/examples/#svg'
        },
        {
          text: 'O‘tish animatsiyasi bilan modal oynasi',
          link: '/examples/#modal'
        },
        {
          text: 'O‘tish animatsiyasi bilan ro‘yxat',
          link: '/examples/#list-transition'
        },
      ]
    },
    {
      // https://eugenkiss.github.io/7guis/
      text: '7 GUI Ilovalari',
      items: [
        {
          text: 'Hisoblagich',
          link: '/examples/#counter'
        },
        {
          text: 'Harorat konvertori',
          link: '/examples/#temperature-converter'
        },
        {
          text: 'Reys bron qilish',
          link: '/examples/#flight-booker'
        },
        {
          text: 'Taymer',
          link: '/examples/#timer'
        },
        {
          text: 'CRUD (Yaratish, O‘qish, Yangilash, O‘chirish)',
          link: '/examples/#crud'
        },
        {
          text: 'Doira chizuvchisi',
          link: '/examples/#circle-drawer'
        },
        {
          text: 'Kataklar (Cells)',
          link: '/examples/#cells'
        }
      ]
    }
  ],
  '/style-guide/': [
    {
      text: 'Uslub bo‘yicha qo‘llanma',
      items: [
        {
          text: 'Umumiy ko‘rinish',
          link: '/style-guide/'
        },
        {
          text: 'A – Muhim (Zarur)',
          link: '/style-guide/rules-essential'
        },
        {
          text: 'B – Kuchli tavsiya etiladi',
          link: '/style-guide/rules-strongly-recommended'
        },
        {
          text: 'C – Tavsiya etiladi',
          link: '/style-guide/rules-recommended'
        },
        {
          text: 'D – Ehtiyotkorlik bilan foydalaning',
          link: '/style-guide/rules-use-with-caution'
        }
      ]
    }
  ]
}

// Placeholder of the i18n config for @vuejs-translations.
const i18n: ThemeConfig['i18n'] = {
  search: 'Qidiruv',
  menu: 'Menyu',
  toc: 'Mundarija',
  returnToTop: 'Boshiga qaytish',
  appearance: 'Tashqi ko‘rinish',
  previous: 'Oldingi',
  next: 'Keyingi',
  pageNotFound: 'Sahifa topilmadi',
  deadLink: {
    before: 'Siz mavjud bo‘lmagan havolani bosdingiz: ',
    after: '.'
  },
  deadLinkReport: {
    before: 'Iltimos, ',
    link: 'bizga bu haqida xabar bering',
    after: ', shunda biz uni tuzatishimiz mumkin.'
  },
  footerLicense: {
    before: '',
    after: ''
  },

// aria labels
  ariaAnnouncer: {
    before: '',
    after: ' allaqachon yuklandi'
  },
  ariaDarkMode: 'Tungi rejimga o‘tish',
  ariaSkipToContent: 'Mundarijaga o‘tish',
  ariaTOC: 'Joriy sahifaning mundarijasi',
  ariaMainNav: 'Asosiy navigatsiya',
  ariaMobileNav: 'Mobil versiya navigatsiyasi',
  ariaSidebarNav: 'Yon panel navigatsiyasi',
}

function inlineScript(file: string): HeadConfig {
  return [
    'script',
    {},
    fs.readFileSync(
      path.resolve(__dirname, `./inlined-scripts/${file}`),
      'utf-8'
    )
  ]
}

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  sitemap: {
    hostname: 'https://vuejs.org'
  },

  lang: 'en-US',
  title: 'Vue.js',
  description: 'Vue.js - Progressive JavaScript Freymvorki',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { property: 'og:url', content: 'https://vuejs.org/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Vue.js' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'Vue.js - Progressive JavaScript Freymvorki'
      }
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://vuejs.org/images/logo.png'
      }
    ],
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://automation.vuejs.org'
      }
    ],
    inlineScript('restorePreference.js'),
    inlineScript('uwu.js'),
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'XNOLWPLB',
        'data-spa': 'auto',
        defer: ''
      }
    ],
    [
      'script',
      {
        src: 'https://vueschool.io/banner.js?affiliate=vuejs&type=top',
        async: 'true'
      }
    ],
    inlineScript('perfops.js')
  ],

  themeConfig: {
    nav,
    sidebar,
    i18n,

    localeLinks: [
      {
        link: 'https://vuejs.org',
        text: '简体中文',
        repo: 'https://github.com/vuejs-translations/docs-zh-cn'
      },
      {
        link: 'https://vuejs.org',
        text: 'English',
        repo: 'https://github.com/vuejs/docs'
      },
      {
        link: 'https://ja.vuejs.org',
        text: '日本語',
        repo: 'https://github.com/vuejs-translations/docs-ja'
      },
      {
        link: 'https://ua.vuejs.org',
        text: 'Українська',
        repo: 'https://github.com/vuejs-translations/docs-uk'
      },
      {
        link: 'https://fr.vuejs.org',
        text: 'Français',
        repo: 'https://github.com/vuejs-translations/docs-fr'
      },
      {
        link: 'https://ko.vuejs.org',
        text: '한국어',
        repo: 'https://github.com/vuejs-translations/docs-ko'
      },
      {
        link: 'https://pt.vuejs.org',
        text: 'Português',
        repo: 'https://github.com/vuejs-translations/docs-pt'
      },
      {
        link: 'https://bn.vuejs.org',
        text: 'বাংলা',
        repo: 'https://github.com/vuejs-translations/docs-bn'
      },
      {
        link: 'https://it.vuejs.org',
        text: 'Italiano',
        repo: 'https://github.com/vuejs-translations/docs-it'
      },
      {
        link: 'https://fa.vuejs.org',
        text: 'فارسی',
        repo: 'https://github.com/vuejs-translations/docs-fa'
      },
      {
        link: 'https://ru.vuejs.org',
        text: 'Русский',
        repo: 'https://github.com/vuejs-translations/docs-ru'
      },
      {
        link: 'https://cs.vuejs.org',
        text: 'Čeština',
        repo: 'https://github.com/vuejs-translations/docs-cs'
      },
      {
        link: 'https://zh-hk.vuejs.org',
        text: '繁體中文',
        repo: 'https://github.com/vuejs-translations/docs-zh-hk'
      },
      {
        link: 'https://pl.vuejs.org',
        text: 'Polski',
        repo: 'https://github.com/vuejs-translations/docs-pl',
      },
      {
        link: '/translations/',
        text: 'Tarjima Qilishga Yordam Bering!',
        isTranslationsDesc: true
      }
    ],

    algolia: {
      indexName: 'vuejs',
      appId: 'ML0LEBN7FQ',
      apiKey: '21cf9df0734770a2448a9da64a700c22',
      searchParameters: {
        facetFilters: ['version:v3']
      }
    },

    carbonAds: {
      code: 'CEBDT27Y',
      placement: 'vuejsorg'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/' },
      { icon: 'twitter', link: 'https://twitter.com/vuejs' },
      { icon: 'discord', link: 'https://discord.com/invite/vue' }
    ],

    editLink: {
      repo: 'vue-uz/docs',
      text: 'bu sahifani GitHub\'da tahrirlash'
    },

    footer: {
      license: {
        text: 'MIT litsenziyasi asosida chiqarilgan',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `Mualliflik huquqi © 2014-${new Date().getFullYear()} Evan You`
    }
  },

  markdown: {
    theme: 'github-dark',
    config(md) {
      md.use(headerPlugin)
      // .use(textAdPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    },
    plugins: [
      llmstxt({
        ignoreFiles: [
          'about/team/**/*',
          'about/team.md',
          'about/privacy.md',
          'about/coc.md',
          'developers/**/*',
          'ecosystem/themes.md',
          'examples/**/*',
          'partners/**/*',
          'sponsor/**/*',
          'index.md'
        ],
        customLLMsTxtTemplate: `\
# Vue.js

Vue.js - Progressiv JavaScript Freymvorki

## Table of Contents

{toc}`
      }) as Plugin
    ]
  }
})
