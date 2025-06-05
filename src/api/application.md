# Ilova API {#application-api}

## createApp() {#createapp}

Ilova instansiyasini yaratadi.

- **Turi**

  ```ts
  function createApp(rootComponent: Component, rootProps?: object): App
  ```

- **Tafsilotlar**

  Birinchi argument ildiz komponentidir. Ixtiyoriy ikkinchi argument ildiz komponentiga uzatiladigan propslardir.

- **Misol**

  Inline ildiz komponenti bilan:

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* root component options */
  })
  ```

  Import qilingan komponent bilan:

  ```js
  import { createApp } from 'vue'
  import App from './App.vue'

  const app = createApp(App)
  ```

- **Qarang** [Qo'llanma - Vue ilovasini yaratish](/guide/essentials/application)

## createSSRApp() {#createssrapp}

[SSR hidratsiyasi](/guide/scaling-up/ssr#client-hydration) rejimida ilova instansiyasini yaratadi. Foydalanish `createApp()` bilan aynan bir xil.

## app.mount() {#app-mount}

Ilova instansiyasini konteyner elementiga o'rnatadi.

- **Turi**

  ```ts
  interface App {
    mount(rootContainer: Element | string): ComponentPublicInstance
  }
  ```

- **Tafsilotlar**

  Argument haqiqiy DOM elementi yoki CSS selektori bo'lishi mumkin (birinchi mos keladigan element ishlatiladi). Ildiz komponent instansiyasini qaytaradi.

  Agar komponentda shablon yoki render funksiyasi aniqlangan bo'lsa, konteynerdagi mavjud DOM tugunlarini almashtiradi. Aks holda, agar runtime kompilyatori mavjud bo'lsa, konteynerning `innerHTML` shablon sifatida ishlatiladi.

  SSR hidratsiyasi rejimida u konteynerdagi mavjud DOM tugunlarini hidratsiya qiladi. Agar [mos kelmasliklar](/guide/scaling-up/ssr#hydration-mismatch) bo'lsa, mavjud DOM tugunlari kutilgan chiqishga mos ravishda o'zgartiriladi.

  Har bir ilova instansiyasi uchun `mount()` faqat bir marta chaqirilishi mumkin.

- **Misol**

  ```js
  import { createApp } from 'vue'
  const app = createApp(/* ... */)

  app.mount('#app')
  ```

  Haqiqiy DOM elementiga ham o'rnatish mumkin:

  ```js
  app.mount(document.body.firstChild)
  ```

## app.unmount() {#app-unmount}

O'rnatilgan ilova instansiyasini olib tashlaydi va ilovaning komponent daraxtidagi barcha komponentlar uchun unmount hayot tsikli hooklarini ishga tushiradi.

- **Turi**

  ```ts
  interface App {
    unmount(): void
  }
  ```

## app.onUnmount() <sup class="vt-badge" data-text="3.5+" /> {#app-onunmount}

Ilova o'rnatilganidan so'ng chaqiriladigan qayta chaqiruv funksiyasini ro'yxatga oladi.

- **Turi**

  ```ts
  interface App {
    onUnmount(callback: () => any): void
  }
  ```

## app.component() {#app-component}

Agar nom satri va komponent ta'rifi berilsa, global komponentni ro'yxatga oladi yoki faqat nom berilsa, allaqachon ro'yxatga olingan komponentni oladi.

- **Turi**

  ```ts
  interface App {
    component(name: string): Component | undefined
    component(name: string, component: Component): this
  }
  ```

- **Misol**

  ```js
  import { createApp } from 'vue'

  const app = createApp({})

  // opsiyalar ob'ektini ro'yxatga olish
  app.component('MyComponent', {
    /* ... */
  })

  // ro'yxatga olingan komponentni olish
  const MyComponent = app.component('MyComponent')
  ```

- **Qarang** [Komponentni ro'yxatga olish](/guide/components/registration)

## app.directive() {#app-directive}

Agar nom satri va direktiva ta'rifi berilsa, global maxsus direktivani ro'yxatga oladi yoki faqat nom berilsa, allaqachon ro'yxatga olingan direktivani oladi.

- **Turi**

  ```ts
  interface App {
    directive(name: string): Directive | undefined
    directive(name: string, directive: Directive): this
  }
  ```

- **Misol**

  ```js
  import { createApp } from 'vue'

  const app = createApp({
    /* ... */
  })

  // ob'ekt direktivasini ro'yxatga olish
  app.directive('myDirective', {
    /* custom directive hooks */
  })

  // funksiya direktivasi qisqartmasini ro'yxatga olish
  app.directive('myDirective', () => {
    /* ... */
  })

  // ro'yxatga olingan direktivani olish
  const myDirective = app.directive('myDirective')
  ```

- **Qarang** [Maxsus direktivalar](/guide/reusability/custom-directives)

## app.use() {#app-use}

[Plaginni](/guide/reusability/plugins) o'rnatadi.

- **Turi**

  ```ts
  interface App {
    use(plugin: Plugin, ...options: any[]): this
  }
  ```

- **Tafsilotlar**

  Birinchi argument sifatida plagin kutiladi, ikkinchi argument sifatida esa ixtiyoriy plagin opsiyalari.

  Plagin `install()` metodiga ega ob'ekt yoki faqat `install()` metodi sifatida ishlatiladigan funksiya bo'lishi mumkin. Opsiyalar (`app.use()` ning ikkinchi argumenti) plaginning `install()` metodiga uzatiladi.

  Agar `app.use()` bir xil plagin uchun bir necha marta chaqirilsa, plagin faqat bir marta o'rnatiladi.

- **Misol**

  ```js
  import { createApp } from 'vue'
  import MyPlugin from './plugins/MyPlugin'

  const app = createApp({
    /* ... */
  })

  app.use(MyPlugin)
  ```

- **Qarang** [Plaginlar](/guide/reusability/plugins)

## app.mixin() {#app-mixin}

Ilovaga xos global miksinni qo'llaydi. Global miksin ilovadagi har bir komponent instansiyasiga o'z ichiga olgan opsiyalarni qo'llaydi.

:::warning Tavsiya etilmaydi
Miksinlar Vue 3-da asosan orqaga moslik uchun qo'llab-quvvatlanadi, chunki ular ekotizim kutubxonalarida keng qo'llaniladi. Miksinlardan, ayniqsa global miksinlardan, ilova kodida foydalanishdan qochish kerak.

Mantiqni qayta ishlatish uchun [Kompozables](/guide/reusability/composables) ni afzal ko'ring.
:::

- **Turi**

  ```ts
  interface App {
    mixin(mixin: ComponentOptions): this
  }
  ```

## app.provide() {#app-provide}

Ilova ichidagi barcha avlod komponentlarda injeksiya qilinishi mumkin bo'lgan qiymatni ta'minlaydi.

- **Turi**

  ```ts
  interface App {
    provide<T>(key: InjectionKey<T> | symbol | string, value: T): this
  }
  ```

- **Tafsilotlar**

  Birinchi argument sifatida injeksiya kaliti, ikkinchi argument sifatida esa ta'minlangan qiymat kutiladi. Ilova instansiyasining o'zini qaytaradi.

- **Misol**

  ```js
  import { createApp } from 'vue'

  const app = createApp(/* ... */)

  app.provide('message', 'hello')
  ```

  Ilova ichidagi komponentda:

  <div class="composition-api">

  ```js
  import { inject } from 'vue'

  export default {
    setup() {
      console.log(inject('message')) // 'hello'
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  export default {
    inject: ['message'],
    created() {
      console.log(this.message) // 'hello'
    }
  }
  ```

  </div>

- **Qarang**
  - [Ta'minlash / Injektsiya](/guide/components/provide-inject)
  - [Ilova darajasidagi ta'minlash](/guide/components/provide-inject#app-level-provide)
  - [app.runWithContext()](#app-runwithcontext)

## app.runWithContext() {#app-runwithcontext}

- Faqat 3.3+ da qo'llab-quvvatlanadi

Joriy ilova sifatida injeksiya konteksti bilan qayta chaqiruv funksiyasini bajaradi.

- **Turi**

  ```ts
  interface App {
    runWithContext<T>(fn: () => T): T
  }
  ```

- **Tafsilotlar**

  Qayta chaqiruv funksiyasini kutadi va qayta chaqiruvni darhol bajaradi. Qayta chaqiruvning sinxron chaqiruvi davomida `inject()` chaqiruvlari joriy ilova tomonidan ta'minlangan qiymatlardan injektsiyalarni qidirishi mumkin, hatto joriy faol komponent instansiyasi bo'lmasa ham. Qayta chaqiruvning qaytarilgan qiymati ham qaytariladi.

- **Misol**

  ```js
  import { inject } from 'vue'

  app.provide('id', 1)

  const injected = app.runWithContext(() => {
    return inject('id')
  })

  console.log(injected) // 1
  ```

## app.version {#app-version}

Ilova yaratilgan Vue versiyasini ta'minlaydi. Bu [plaginlarda](/guide/reusability/plugins) foydali bo'lib, unda turli Vue versiyalariga asoslangan shartli mantiq kerak bo'lishi mumkin.

- **Turi**

  ```ts
  interface App {
    version: string
  }
  ```

- **Misol**

  Plagin ichida versiya tekshiruvi amalga oshirilmoqda:

  ```js
  export default {
    install(app) {
      const version = Number(app.version.split('.')[0])
      if (version < 3) {
        console.warn('This plugin requires Vue 3')
      }
    }
  }
  ```

- **Qarang** [Global API - version](/api/general#version)

## app.config {#app-config}

Har bir ilova instansiyasi ilova uchun sozlash sozlamalarini o'z ichiga olgan `config` ob'ektini ochib beradi. Ilovangizni o'rnatishdan oldin uning xususiyatlarini (quyida hujjatlashtirilgan) o'zgartirishingiz mumkin.

```js
import { createApp } from 'vue'

const app = createApp(/* ... */)

console.log(app.config)
```

## app.config.errorHandler {#app-config-errorhandler}

Ilova ichidan tarqalgan ushlanmagan xatolarni boshqarish uchun global ishlov beruvchini belgilaydi.

- **Turi**

  ```ts
  interface AppConfig {
    errorHandler?: (
      err: unknown,
      instance: ComponentPublicInstance | null,
      // `info` Vue-ga xos xato ma'lumoti,
      // masalan, xato qaysi hayot tsikli hookida yuzaga kelgan
      info: string
    ) => void
  }
  ```

- **Tafsilotlar**

  Xato ishlov beruvchisi uchta argumentni qabul qiladi: xato, xatoni keltirib chiqargan komponent instansiyasi va xato manbai turini ko'rsatuvchi ma'lumot satri.

  Quyidagi manbalardan xatolarni ushlashi mumkin:

  - Komponent renderlari
  - Tadbir ishlov beruvchilari
  - Hayot tsikli hooklari
  - `setup()` funksiyasi
  - Kuzatuvchilar
  - Maxsus direktiva hooklari
  - O'tish hooklari

  :::tip
  Ishlab chiqarishda uchinchi argument (`info`) to'liq ma'lumot satri o'rniga qisqa kod bo'ladi. Kodni satrga moslashtirishni [Ishlab chiqarish xato kodi ma'lumotnomasida](/error-reference/#runtime-errors) topishingiz mumkin.
  :::

- **Misol**

  ```js
  app.config.errorHandler = (err, instance, info) => {
    // xatoni boshqarish, masalan, xizmatga xabar berish
  }
  ```

## app.config.warnHandler {#app-config-warnhandler}

Vue-dan keladigan runtime ogohlantirishlari uchun maxsus ishlov beruvchini belgilaydi.

- **Turi**

  ```ts
  interface AppConfig {
    warnHandler?: (
      msg: string,
      instance: ComponentPublicInstance | null,
      trace: string
    ) => void
  }
  ```

- **Tafsilotlar**

  Ogohlantirish ishlov beruvchisi ogohlantirish xabarini birinchi argument sifatida, manba komponent instansiyasini ikkinchi argument sifatida va komponent ierarxiyasi izini uchinchi argument sifatida qabul qiladi.

  U konsolning ko'p so'zliligini kamaytirish uchun muayyan ogohlantirishlarni filtrlaydi. Vue ogohlantirishlarining barchasi ishlab chiqarish paytida hal qilinishi kerak, shuning uchun bu faqat disk raskadrovka sessiyalari paytida ko'p ogohlantirishlar orasida muayyanlarga e'tibor qaratish uchun tavsiya etiladi va disk raskadrovka tugagach olib tashlanishi kerak.

  :::tip
  Ogohlantirishlar faqat ishlab chiqarish paytida ishlaydi, shuning uchun bu sozlama ishlab chiqarish rejimida e'tiborga olinmaydi.
  :::

- **Misol**

  ```js
  app.config.warnHandler = (msg, instance, trace) => {
    // `trace` komponent ierarxiyasi izidir
  }
  ```

## app.config.performance {#app-config-performance}

Buni `true` ga o'rnatish brauzer devtool ishlash/vaqt chizig'i panelida komponentni ishga tushirish, kompilyatsiya, render va yamoq ishlashini kuzatishni yoqadi. Faqat ishlab chiqarish rejimida va [performance.mark](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark) API-ni qo'llab-quvvatlaydigan brauzerlarda ishlaydi.

- **Turi:** `boolean`

- **Qarang** [Qo'llanma - Ishlash](/guide/best-practices/performance)

## app.config.compilerOptions {#app-config-compileroptions}

Runtime kompilyator opsiyalarini sozlash. Ushbu ob'ektda o'rnatilgan qiymatlar brauzerdagi shablon kompilyatoriga uzatiladi va sozlangan ilovadagi har bir komponentga ta'sir qiladi. E'tibor bering, siz bu opsiyalarni har bir komponent asosida [`compilerOptions` opsiyasi](/api/options-rendering#compileroptions) yordamida ham bekor qilishingiz mumkin.

::: warning Muhim
Bu sozlash opsiyasi faqat to'liq qurilishda (ya'ni brauzerda shablonlarni kompilyatsiya qila oladigan mustaqil `vue.js`) hurmat qilinadi. Agar siz qurilish sozlamasi bilan runtime-faqat qurilishdan foydalanayotgan bo'lsangiz, kompilyator opsiyalari `@vue/compiler-dom` ga qurilish vositasi sozlamalari orqali uzatilishi kerak.

- `vue-loader` uchun: [loader opsiyasi orqali uzatish](https://vue-loader.vuejs.org/options.html#compileroptions). Shuningdek, [`vue-cli` da qanday sozlash haqida](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader) qarang.

- `vite` uchun: [`@vitejs/plugin-vue` opsiyalari orqali uzatish](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#options).
  :::

### app.config.compilerOptions.isCustomElement {#app-config-compileroptions-iscustomelement}

Tabiiy maxsus elementlarni aniqlash uchun tekshirish usulini belgilaydi.

- **Turi:** `(tag: string) => boolean`

- **Tafsilotlar**

  Agar tegga tabiiy maxsus element sifatida qaralishi kerak bo'lsa, `true` qaytarishi kerak. Mos keladigan tegga Vue uni Vue komponenti sifatida hal qilishga urinmasdan, tabiiy element sifatida render qiladi.

  Tabiiy HTML va SVG teglari ushbu funksiyada moslashtirilishi shart emas - Vue parseri ularni avtomatik ravishda taniydi.

- **Misol**

  ```js
  // 'ion-' bilan boshlanadigan barcha teglarni maxsus elementlar sifatida qabul qilish
  app.config.compilerOptions.isCustomElement = (tag) => {
    return tag.startsWith('ion-')
  }
  ```

- **Qarang** [Vue va Veb-komponentlar](/guide/extras/web-components)

### app.config.compilerOptions.whitespace {#app-config-compileroptions-whitespace}

Shablon bo'shliqlarini boshqarish xatti-harakatlarini sozlaydi.

- **Turi:** `'condense' | 'preserve'`

- **Standart:** `'condense'`

- **Tafsilotlar**

  Vue shablonlarda bo'shliq belgilarini olib tashlaydi/yig'adi, bu esa samaraliroq kompilyatsiya qilingan chiqish hosil qiladi. Standart strategiya "condense" bo'lib, quyidagi xatti-harakatga ega:

  1. Element ichidagi boshlang'ich/oxirgi bo'shliq belgilari bitta bo'shliqqa yig'iladi.
  2. Yangi qatorlarni o'z ichiga olgan elementlar orasidagi bo'shliq belgilari olib tashlanadi.
  3. Matn tugunlaridagi ketma-ket bo'shliq belgilari bitta bo'shliqqa yig'iladi.

  Ushbu opsiyani `'preserve'` ga o'rnatish (2) va (3) ni o'chiradi.

- **Misol**

  ```js
  app.config.compilerOptions.whitespace = 'preserve'
  ```

### app.config.compilerOptions.delimiters {#app-config-compileroptions-delimiters}

Shablon ichidagi matn interpolatsiyasi uchun ishlatiladigan delimitatorlarni sozlaydi.

- **Turi:** `[string, string]`

- **Standart:** `{{ "['\u007b\u007b', '\u007d\u007d']" }}`

- **Tafsilotlar**

  Bu odatda mustache sintaksisidan foydalanadigan server tomonidagi frameworklar bilan ziddiyatlardan qochish uchun ishlatiladi.

- **Misol**

  ```js
  // Delimitatorlarni ES6 shablon satri uslubiga o'zgartirish
  app.config.compilerOptions.delimiters = ['${', '}']
  ```

### app.config.compilerOptions.comments {#app-config-compileroptions-comments}

Shablonlardagi HTML izohlarini qayta ishlashni sozlaydi.

- **Turi:** `boolean`

- **Standart:** `false`

- **Tafsilotlar**

  Standart bo'yicha Vue ishlab chiqarishda izohlarni olib tashlaydi. Ushbu opsiyani `true` ga o'rnatish Vue-ni ishlab chiqarishda ham izohlarni saqlashga majbur qiladi. Izohlar har doim ishlab chiqarish paytida saqlanadi. Bu opsiya odatda Vue HTML izohlariga tayanadigan boshqa kutubxonalar bilan birgalikda ishlatilganda qo'llaniladi.

- **Misol**

  ```js
  app.config.compilerOptions.comments = true
  ```

## app.config.globalProperties {#app-config-globalproperties}

Ilova ichidagi har qanday komponent instansiyasida foydalanilishi mumkin bo'lgan global xususiyatlarni ro'yxatga olish uchun ishlatilishi mumkin bo'lgan ob'ekt.

- **Turi**

  ```ts
  interface AppConfig {
    globalProperties: Record<string, any>
  }
  ```

- **Tafsilotlar**

  Bu Vue 2-ning `Vue.prototype` o'rnini bosadi, bu Vue 3-da endi mavjud emas. Har qanday global narsa singari, bu kamdan-kam ishlatilishi kerak.

  Agar global xususiyat komponentning o'z xususiyati bilan ziddiyatga tushsa, komponentning o'z xususiyati yuqoriroq ustuvorlikka ega bo'ladi.

- **Foydalanish**

  ```js
  app.config.globalProperties.msg = 'hello'
  ```

  Bu `msg` ni ilovadagi har qanday komponent shablonida va har qanday komponent instansiyasining `this` da mavjud qiladi:

  ```js
  export default {
    mounted() {
      console.log(this.msg) // 'hello'
    }
  }
  ```

- **Qarang** [Qo'llanma - Global xususiyatlarni kengaytirish](/guide/typescript/options-api#augmenting-global-properties) <sup class="vt-badge ts" />

## app.config.optionMergeStrategies {#app-config-optionmergestrategies}

Maxsus komponent opsiyalari uchun birlashtirish strategiyalarini aniqlash uchun ob'ekt.

- **Turi**

  ```ts
  interface AppConfig {
    optionMergeStrategies: Record<string, OptionMergeFunction>
  }

  type OptionMergeFunction = (to: unknown, from: unknown) => any
  ```

- **Tafsilotlar**

  Ba'zi plaginlar/kutubxonalar global miksinlar orqali maxsus komponent opsiyalarini qo'shadi. Bu opsiyalar bir nechta manbalardan (masalan, miksinlar yoki komponent merosi) "birlashtirilishi" kerak bo'lganda maxsus birlashtirish mantiqini talab qilishi mumkin.

  Maxsus opsiya uchun birlashtirish strategiyasi funksiyasi `app.config.optionMergeStrategies` ob'ektida opsiya nomini kalit sifatida ishlatib ro'yxatga olinishi mumkin.

  Birlashtirish strategiyasi funksiyasi ota va bola instansiyalarida aniqlangan opsiya qiymatini mos ravishda birinchi va ikkinchi argument sifatida qabul qiladi.

- **Misol**

  ```js
  const app = createApp({
    // o'zidan opsiya
    msg: 'Vue',
    // miksindan opsiya
    mixins: [
      {
        msg: 'Hello '
      }
    ],
    mounted() {
      // birlashtirilgan opsiyalar this.$options da ochiladi
      console.log(this.$options.msg)
    }
  })

  // `msg` uchun maxsus birlashtirish strategiyasini aniqlash
  app.config.optionMergeStrategies.msg = (parent, child) => {
    return (parent || '') + (child || '')
  }

  app.mount('#app')
  // logs 'Hello Vue'
  ```

- **Qarang** [Komponent instansiyasi - `$options`](/api/component-instance#options)

## app.config.idPrefix <sup class="vt-badge" data-text="3.5+" /> {#app-config-idprefix}

Ushbu ilova ichida [useId()](/api/composition-api-helpers.html#useid) orqali ishlab chiqarilgan barcha ID'lar uchun prefiksni sozlaydi.

- **Turi:** `string`

- **Standart:** `undefined`

- **Misol**

  ```js
  app.config.idPrefix = 'myApp'
  ```

  ```js
  // in a component:
  const id1 = useId() // 'myApp:0'
  const id2 = useId() // 'myApp:1'
  ```

## app.config.throwUnhandledErrorInProduction <sup class="vt-badge" data-text="3.5+" /> {#app-config-throwunhandlederrorinproduction}

Ishlab chiqarish rejimida ushlanmagan xatolarni majburlab chiqarish.

- **Turi:** `boolean`

- **Standart:** `false`

- **Tafsilotlar**

  Standart bo'yicha Vue ilovasida ushlanmagan xatolar ishlab chiqarish va rivojlanish rejimlarida turli xatti-harakatlarga ega:

  - Rivojlanishda xato chiqariladi va ilova ishdan chiqishi mumkin. Bu xatoni sezilarli qilish va rivojlanish paytida tuzatish uchun qilingan.

  - Ishlab chiqarishda xato faqat konsolga yoziladi, bu oxirgi foydalanuvchilarga ta'sirni minimallashtiradi. Biroq, bu faqat ishlab chiqarishda yuzaga keladigan xatolarni xato monitoring xizmatlari tomonidan ushlanishini oldini olishi mumkin.

  `app.config.throwUnhandledErrorInProduction` ni `true` ga o'rnatish orqali ushlanmagan xatolar ishlab chiqarish rejimida ham chiqariladi.
