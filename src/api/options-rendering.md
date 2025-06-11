# Options: Renderlash {#options-rendering}

## template {#template}

Komponent uchun string shablon.

- **Turi**

  ```ts
  interface ComponentOptions {
    template?: string
  }
  ```

- **Tafsilotlar**

  `template` opsiyasi orqali ta'minlangan shablon runtime paytida on-the-fly kompilyatsiya qilinadi. Bu faqat shablon kompilyatorini o'z ichiga olgan Vue build'ini ishlatganda qo'llab-quvvatlanadi. Shablon kompilyatori nomida `runtime` so'zi bo'lgan Vue build'larida **YO'Q**, masalan `vue.runtime.esm-bundler.js`. Turli xil build'lar haqida batafsil ma'lumot uchun [dist fayl qo'llanmasi](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use) ga qarang.

  Agar string `#` bilan boshlansa, u `querySelector` sifatida ishlatiladi va tanlangan elementning `innerHTML` ni shablon string sifatida ishlatadi. Bu manba shablonini native `<template>` elementlaridan foydalangan holda yaratishga imkon beradi.

  Agar bir xil komponentda `render` opsiyasi ham mavjud bo'lsa, `template` e'tiborga olinmaydi.

  Agar ilovangizning ildiz komponentida `template` yoki `render` opsiyasi ko'rsatilmagan bo'lsa, Vue o'rnatilgan elementning `innerHTML` ni shablon sifatida ishlatishga harakat qiladi.

  :::warning Xavfsizlik Eslatmasi
  Faqat ishonchli shablon manbalaridan foydalaning. Foydalanuvchi tomonidan ta'minlangan kontentni shablon sifatida ishlatmang. Batafsil ma'lumot uchun [Xavfsizlik Qo'llanmasi](/guide/best-practices/security#rule-no-1-never-use-non-trusted-templates) ga qarang.
  :::

## render {#render}

Komponentning virtual DOM daraxtini dasturli ravishda qaytaradigan funksiya.

- **Turi**

  ```ts
  interface ComponentOptions {
    render?(this: ComponentPublicInstance) => VNodeChild
  }

  type VNodeChild = VNodeChildAtom | VNodeArrayChildren

  type VNodeChildAtom =
    | VNode
    | string
    | number
    | boolean
    | null
    | undefined
    | void

  type VNodeArrayChildren = (VNodeArrayChildren | VNodeChildAtom)[]
  ```

- **Tafsilotlar**

  `render` string shablonlariga alternativa bo'lib, komponentning render chiqishini e'lon qilish uchun JavaScript'ning to'liq dasturli kuchidan foydalanish imkonini beradi.

  Pre-kompilyatsiya qilingan shablonlar, masalan Single-File Components dagilari, build vaqtida `render` opsiyasiga kompilyatsiya qilinadi. Agar komponentda `render` va `template` ikkalasi ham mavjud bo'lsa, `render` yuqoriroq ustuvorlikka ega bo'ladi.

- **Qarang**
  - [Renderlash Mexanizmi](/guide/extras/rendering-mechanism)
  - [Render Funksiyalari](/guide/extras/render-function)

## compilerOptions {#compileroptions}

Komponent shablonining runtime kompilyator opsiyalarini sozlash.

- **Turi**

  ```ts
  interface ComponentOptions {
    compilerOptions?: {
      isCustomElement?: (tag: string) => boolean
      whitespace?: 'condense' | 'preserve' // default: 'condense'
      delimiters?: [string, string] // default: ['{{', '}}']
      comments?: boolean // default: false
    }
  }
  ```

- **Tafsilotlar**

  Bu sozlash opsiyasi faqat to'liq build ishlatilganda (ya'ni brauzerda shablonlarni kompilyatsiya qila oladigan mustaqil `vue.js`) hurmat qilinadi. U ilova darajasidagi [app.config.compilerOptions](/api/application#app-config-compileroptions) bilan bir xil opsiyalarni qo'llab-quvvatlaydi va joriy komponent uchun yuqoriroq ustuvorlikka ega.

- **Qarang** [app.config.compilerOptions](/api/application#app-config-compileroptions)

## slots<sup class="vt-badge ts"/> {#slots}

- Faqat 3.3+ da qo'llab-quvvatlanadi

Render funksiyalarida slotlardan dasturli ravishda foydalanishda tur aniqlamasiga yordam beradigan opsiya.

- **Tafsilotlar**

  Bu opsiyaning runtime qiymati ishlatilmaydi. Haqiqiy turlar `SlotsType` tur yordamchisidan foydalangan holda tur konvertatsiyasi orqali e'lon qilinishi kerak:

  ```ts
  import { SlotsType } from 'vue'

  defineComponent({
    slots: Object as SlotsType<{
      default: { foo: string; bar: number }
      item: { data: number }
    }>,
    setup(props, { slots }) {
      expectType<
        undefined | ((scope: { foo: string; bar: number }) => any)
      >(slots.default)
      expectType<undefined | ((scope: { data: number }) => any)>(
        slots.item
      )
    }
  })
  ```
