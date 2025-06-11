# SFC Sintaksis Spetsifikatsiyasi {#sfc-syntax-specification}

## Umumiy ma'lumot {#overview}

Vue Single-File Component (SFC), odatda `*.vue` fayl kengaytmasidan foydalanadi, Vue komponentini tasvirlash uchun HTML-ga o'xshash sintaksisdan foydalanadigan maxsus fayl formatidir. Vue SFC sintaktik jihatdan HTML bilan mos keladi.

Har bir `*.vue` fayli uch turdagi yuqori darajadagi til bloklaridan iborat: `<template>`, `<script>` va `<style>`, va ixtiyoriy ravishda qo'shimcha maxsus bloklar:

```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
  Bu, masalan, komponent uchun hujjat bo'lishi mumkin.
</custom1>
```

## Til Bloklari {#language-blocks}

### `<template>` {#template}

- Har bir `*.vue` fayli ko'pi bilan bitta yuqori darajadagi `<template>` blokini o'z ichiga olishi mumkin.

- Mazmun `@vue/compiler-dom`ga o'tkaziladi, JavaScript render funksiyalariga oldindan kompilyatsiya qilinadi va eksport qilingan komponentga uning `render` opsiyasi sifatida biriktiriladi.

### `<script>` {#script}

- Har bir `*.vue` fayli ko'pi bilan bitta `<script>` blokini o'z ichiga olishi mumkin ([`<script setup>`](/api/sfc-script-setup)dan tashqari).

- Skript ES Module sifatida bajariladi.

- **Default eksport** Vue komponent opsiyalari ob'ekti bo'lishi kerak, oddiy ob'ekt yoki [defineComponent](/api/general#definecomponent)ning qaytarilgan qiymati sifatida.

### `<script setup>` {#script-setup}

- Har bir `*.vue` fayli ko'pi bilan bitta `<script setup>` blokini o'z ichiga olishi mumkin (oddiy `<script>`dan tashqari).

- Skript oldindan qayta ishlanadi va komponentning `setup()` funksiyasi sifatida ishlatiladi, ya'ni u **komponentning har bir instansiyasi uchun** bajariladi. `<script setup>`dagi yuqori darajadagi bog'lanishlar avtomatik ravishda shablonga ochiladi. Batafsil ma'lumot uchun [`<script setup>` haqidagi maxsus hujjatga](/api/sfc-script-setup) qarang.

### `<style>` {#style}

- Bitta `*.vue` fayli bir nechta `<style>` teglarini o'z ichiga olishi mumkin.

- `<style>` tegi joriy komponentga stillarni kapsulalash uchun `scoped` yoki `module` atributlariga ega bo'lishi mumkin (batafsil ma'lumot uchun [SFC Style Features](/api/sfc-css-features)ga qarang). Turli kapsulalash rejimlariga ega bir nechta `<style>` teglari bir xil komponentda aralashishi mumkin.

### Maxsus Bloklar {#custom-blocks}

Qo'shimcha maxsus bloklar har qanday loyiha-spetsifik ehtiyojlar uchun `*.vue` faylida kiritilishi mumkin, masalan `<docs>` bloki. Maxsus bloklarning haqiqiy dunyo misollari:

- [Gridsome: `<page-query>`](https://gridsome.org/docs/querying-data/)
- [vite-plugin-vue-gql: `<gql>`](https://github.com/wheatjs/vite-plugin-vue-gql)
- [vue-i18n: `<i18n>`](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n#i18n-custom-block)

Maxsus Bloklarni qayta ishlash vositalarga bog'liq bo'ladi - agar o'zingizning maxsus blok integratsiyalaringizni qurmoqchi bo'lsangiz, batafsil ma'lumot uchun [SFC custom block integrations tooling section](/guide/scaling-up/tooling#sfc-custom-block-integrations)ga qarang.

## Avtomatik Nom Aniqlash {#automatic-name-inference}

SFC quyidagi holatlarda komponentning nomini uning **fayl nomidan** avtomatik ravishda aniqlaydi:

- Dev ogohlantirish formatlash
- DevTools tekshirish
- Rekursiv o'z-o'ziga havola, masalan `FooBar.vue` nomli fayl o'z shablonida `<FooBar/>` sifatida o'ziga havola qilishi mumkin. Bu aniq ro'yxatdan o'tkazilgan/import qilingan komponentlardan pastroq ustuvorlikka ega.

## Oldindan Protsessorlar {#pre-processors}

Bloklar `lang` atributidan foydalanib oldindan protsessor tillarini e'lon qilishi mumkin. Eng keng tarqalgan holat - `<script>` bloki uchun TypeScript ishlatish:

```vue-html
<script lang="ts">
  // TypeScript ishlatish
</script>
```

`lang` har qanday blokka qo'llanilishi mumkin - masalan biz `<style>` bilan [Sass](https://sass-lang.com/) va `<template>` bilan [Pug](https://pugjs.org/api/getting-started.html) ishlatishimiz mumkin:

```vue-html
<template lang="pug">
p {{ msg }}
</template>

<style lang="scss">
  $primary-color: #333;
  body {
    color: $primary-color;
  }
</style>
```

Eslatma: turli oldindan protsessorlar bilan integratsiya vositalar zanjiriga qarab farq qilishi mumkin. Misollar uchun tegishli hujjatlarni tekshiring:

- [Vite](https://vitejs.dev/guide/features.html#css-pre-processors)
- [Vue CLI](https://cli.vuejs.org/guide/css.html#pre-processors)
- [webpack + vue-loader](https://vue-loader.vuejs.org/guide/pre-processors.html#using-pre-processors)

## `src` Importlar {#src-imports}

Agar `*.vue` komponentlaringizni bir nechta fayllarga bo'lishni afzal ko'rsangiz, til bloki uchun tashqi faylni import qilish uchun `src` atributidan foydalanishingiz mumkin:

```vue
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

Eslatma: `src` importlar webpack modul so'rovlari bilan bir xil yo'l hal qilish qoidalariga amal qiladi, ya'ni:

- Nisbiy yo'llar `./` bilan boshlanishi kerak
- npm bog'liqliklaridan resurslarni import qilishingiz mumkin:

```vue
<!-- o'rnatilgan "todomvc-app-css" npm paketidan faylni import qilish -->
<style src="todomvc-app-css/index.css" />
```

`src` importlar maxsus bloklar bilan ham ishlaydi, masalan:

```vue
<unit-test src="./unit-test.js">
</unit-test>
```

:::warning Eslatma
`src`da taxalluslardan foydalanganda, `~` bilan boshlang, undan keyingi har bir narsa modul so'rovi sifatida talqin qilinadi. Bu siz node modullari ichidagi resurslarga havola qilishingiz mumkinligini anglatadi:
```vue
<img src="~some-npm-package/foo.png">
```
:::

## Izohlar {#comments}

Har bir blok ichida siz ishlatilayotgan tilning izoh sintaksisidan foydalanishingiz kerak (HTML, CSS, JavaScript, Pug, va boshqalar). Yuqori darajadagi izohlar uchun HTML izoh sintaksisidan foydalaning: `<!-- izoh mazmuni bu yerda -->`
