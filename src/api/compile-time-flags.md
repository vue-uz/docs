---
outline: deep
---

# Kompilyatsiya Vaqti Bayroqlari {#compile-time-flags}

:::tip
Kompilyatsiya vaqti bayroqlari faqat Vue'ning `esm-bundler` buildini ishlatganda qo'llaniladi (ya'ni `vue/dist/vue.esm-bundler.js`).
:::

Vue'ni build qadamida ishlatganda, ma'lum xususiyatlarni yoqish/o'chirish uchun bir qator kompilyatsiya vaqti bayroqlarini sozlash mumkin. Kompilyatsiya vaqti bayroqlaridan foydalanishning afzalligi shundaki, shu tarzda o'chirilgan xususiyatlar yakuniy bundle'dan tree-shaking orqali olib tashlanishi mumkin.

Vue bu bayroqlar aniq sozlanmasa ham ishlaydi. Biroq, tegishli xususiyatlarni iloji boricha to'g'ri olib tashlash uchun ularni har doim sozlash tavsiya etiladi.

Ularni build vositangizga qarab qanday sozlash haqida [Configuration Guides](#configuration-guides)ni tekshiring.

## `__VUE_OPTIONS_API__` {#VUE_OPTIONS_API}

- **Default:** `true`

  Options API qo'llab-quvvatlashni yoqish/o'chirish. Buni o'chirish kichikroq bundle'larga olib keladi, lekin uchinchi tomon kutubxonalari Options API'ga tayanadigan bo'lsa, moslikni ta'sir qilishi mumkin.

## `__VUE_PROD_DEVTOOLS__` {#VUE_PROD_DEVTOOLS}

- **Default:** `false`

  Production build'larida devtools qo'llab-quvvatlashni yoqish/o'chirish. Bu bundle'ga ko'proq kod kiritilishiga olib keladi, shuning uchun uni faqat debug maqsadlarida yoqish tavsiya etiladi.

## `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` {#VUE_PROD_HYDRATION_MISMATCH_DETAILS}

- **Default:** `false`

  Production build'larida hydration nomuvofiqliklari uchun batafsil ogohlantirishlarni yoqish/o'chirish. Bu bundle'ga ko'proq kod kiritilishiga olib keladi, shuning uchun uni faqat debug maqsadlarida yoqish tavsiya etiladi.

- Faqat 3.4+ versiyasida mavjud

## Sozlash Yo'riqnomalari {#configuration-guides}

### Vite {#vite}

`@vitejs/plugin-vue` bu bayroqlar uchun default qiymatlarni avtomatik ravishda ta'minlaydi. Default qiymatlarni o'zgartirish uchun Vite'ning [`define` config opsiyasidan](https://vitejs.dev/config/shared-options.html#define) foydalaning:

```js
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    // production build'da hydration nomuvofiqliklari tafsilotlarini yoqish
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true'
  }
})
```

### vue-cli {#vue-cli}

`@vue/cli-service` bu bayroqlarning ba'zilari uchun default qiymatlarni avtomatik ravishda ta'minlaydi. Qiymatlarni sozlash/o'zgartirish uchun:

```js
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })
      return definitions
    })
  }
}
```

### webpack {#webpack}

Bayroqlar webpack'ning [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)idan foydalanib aniqlanishi kerak:

```js
// webpack.config.js
module.exports = {
  // ...
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
    })
  ]
}
```

### Rollup {#rollup}

Bayroqlar [@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace)dan foydalanib aniqlanishi kerak:

```js
// rollup.config.js
import replace from '@rollup/plugin-replace'

export default {
  plugins: [
    replace({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
    })
  ]
}
```
