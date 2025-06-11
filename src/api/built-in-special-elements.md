# O'rnatilgan Maxsus Elementlar {#built-in-special-elements}

:::info Komponentlar emas
`<component>`, `<slot>` va `<template>` komponentga o'xshash xususiyatlar va shablon sintaksisining bir qismidir. Ular haqiqiy komponentlar emas va shablon kompilyatsiyasi paytida yo'qoladi. Shuning uchun, ular odatda shablonlarda kichik harflar bilan yoziladi.
:::

## `<component>` {#component}

Dinamik komponentlar yoki elementlarni render qilish uchun "meta komponent".

- **Props**

  ```ts
  interface DynamicComponentProps {
    is: string | Component
  }
  ```

- **Tafsilotlar**

  Render qilinadigan haqiqiy komponent `is` prop'i orqali aniqlanadi.

  - `is` string bo'lganda, u HTML tegi nomi yoki komponentning ro'yxatdan o'tkazilgan nomi bo'lishi mumkin.

  - Alternativ ravishda, `is` to'g'ridan-to'g'ri komponent ta'rifiga bog'lanishi mumkin.

- **Misol**

  Ro'yxatdan o'tkazilgan nom bo'yicha komponentlarni render qilish (Options API):

  ```vue
  <script>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: { Foo, Bar },
    data() {
      return {
        view: 'Foo'
      }
    }
  }
  </script>

  <template>
    <component :is="view" />
  </template>
  ```

  Ta'rif bo'yicha komponentlarni render qilish (Composition API with `<script setup>`):

  ```vue
  <script setup>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'
  </script>

  <template>
    <component :is="Math.random() > 0.5 ? Foo : Bar" />
  </template>
  ```

  HTML elementlarini render qilish:

  ```vue-html
  <component :is="href ? 'a' : 'span'"></component>
  ```

  [O'rnatilgan komponentlar](./built-in-components)ning barchasi `is`ga o'tkazilishi mumkin, lekin ularni nomi bo'yicha o'tkazmoqchi bo'lsangiz, ularni ro'yxatdan o'tkazishingiz kerak. Masalan:

  ```vue
  <script>
  import { Transition, TransitionGroup } from 'vue'

  export default {
    components: {
      Transition,
      TransitionGroup
    }
  }
  </script>

  <template>
    <component :is="isGroup ? 'TransitionGroup' : 'Transition'">
      ...
    </component>
  </template>
  ```

  Agar komponentning o'zini uning nomi o'rniga `is`ga o'tkazsangiz, ro'yxatdan o'tkazish talab qilinmaydi, masalan `<script setup>`da.

  Agar `<component>` tegi ustida `v-model` ishlatilsa, shablon kompilyatori uni `modelValue` prop'i va `update:modelValue` hodisa tinglovchisiga kengaytiradi, xuddi boshqa komponentlar uchun bo'lgani kabi. Biroq, bu `<input>` yoki `<select>` kabi asosiy HTML elementlari bilan mos kelmaydi. Natijada, dinamik ravishda yaratilgan asosiy element bilan `v-model` ishlatish ishlamaydi:

  ```vue
  <script setup>
  import { ref } from 'vue'

  const tag = ref('input')
  const username = ref('')
  </script>

  <template>
    <!-- Bu ishlamaydi, chunki 'input' asosiy HTML elementi -->
    <component :is="tag" v-model="username" />
  </template>
  ```

  Amalda, bu chek holat keng tarqalgan emas, chunki asosiy form maydonlari odatda real ilovalarda komponentlar ichida o'ralgan. Agar siz asosiy elementni to'g'ridan-to'g'ri ishlatishingiz kerak bo'lsa, `v-model`ni xususiyat va hodisaga qo'lda ajratishingiz mumkin.

- **Qarang** [Dynamic Components](/guide/essentials/component-basics#dynamic-components)

## `<slot>` {#slot}

Shablonlardagi slot mazmuni chiqish nuqtalarini belgilaydi.

- **Props**

  ```ts
  interface SlotProps {
    /**
     * <slot>ga o'tkazilgan har qanday props scope'langan slotlar uchun
     * argumentlar sifatida o'tkaziladi
     */
    [key: string]: any
    /**
     * Slot nomini belgilash uchun ajratilgan.
     */
    name?: string
  }
  ```

- **Tafsilotlar**

  `<slot>` elementi `name` atributidan foydalanib slot nomini belgilashi mumkin. `name` belgilanmaganda, u default slotni render qiladi. Slot elementiga o'tkazilgan qo'shimcha atributlar ota-onada aniqlangan scope'langan slotga slot props'lari sifatida o'tkaziladi.

  Elementning o'zi uning mos kelgan slot mazmuni bilan almashtiriladi.

  Vue shablonlaridagi `<slot>` elementlari JavaScript'ga kompilyatsiya qilinadi, shuning uchun ularni [asosiy `<slot>` elementlari](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) bilan adashtirib yubormang.

- **Qarang** [Component - Slots](/guide/components/slots)

## `<template>` {#template}

`<template>` tegi DOM'da elementni render qilmasdan o'rnatilgan direktivani ishlatmoqchi bo'lganda placeholder sifatida ishlatiladi.

- **Tafsilotlar**

  `<template>` uchun maxsus ishlov berish faqat quyidagi direktivalardan biri bilan ishlatilganda ishga tushadi:

  - `v-if`, `v-else-if`, yoki `v-else`
  - `v-for`
  - `v-slot`

  Agar bu direktivalardan hech biri mavjud bo'lmasa, u [asosiy `<template>` elementi](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template) sifatida render qilinadi.

  `v-for` bilan `<template>` ham [`key` atributiga](/api/built-in-special-attributes#key) ega bo'lishi mumkin. Boshqa barcha atributlar va direktivalar bekor qilinadi, chunki ular mos keladigan elementsiz mantiqiy emas.

  Single-file komponentlar butun shablonni o'rash uchun [yuqori darajadagi `<template>` tegi](/api/sfc-spec#language-blocks)dan foydalanadi. Bu ishlatish yuqorida tasvirlangan `<template>` ishlatishidan alohida. Bu yuqori darajadagi teg shablonning o'zining bir qismi emas va direktivalar kabi shablon sintaksisini qo'llab-quvvatlamaydi.

- **Qarang**
  - [Guide - `v-if` on `<template>`](/guide/essentials/conditional#v-if-on-template)
  - [Guide - `v-for` on `<template>`](/guide/essentials/list#v-for-on-template)
  - [Guide - Named slots](/guide/components/slots#named-slots)
