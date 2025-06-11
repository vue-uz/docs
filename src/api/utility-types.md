# Utility Types {#utility-types}

:::info
Bu sahifa faqat ularning ishlatilishi tushuntirilishi kerak bo'lgan bir nechta keng tarqalgan utility tiplarini ro'yxatlaydi. Eksport qilingan tiplarning to'liq ro'yxati uchun [source code](https://github.com/vuejs/core/blob/main/packages/runtime-core/src/index.ts#L131)ni tekshiring.
:::

## PropType\<T> {#proptype-t}

Runtime props e'lonlarini ishlatganda, prop'ni yanada rivojlangan tiplar bilan belgilash uchun ishlatiladi.

- **Misol**

  ```ts
  import type { PropType } from 'vue'

  interface Book {
    title: string
    author: string
    year: number
  }

  export default {
    props: {
      book: {
        // `Object`ga aniqroq tip ta'minlash
        type: Object as PropType<Book>,
        required: true
      }
    }
  }
  ```

- **Qarang** [Guide - Typing Component Props](/guide/typescript/options-api#typing-component-props)

## MaybeRef\<T> {#mayberef}

- Faqat 3.3+ versiyasida qo'llab-quvvatlanadi

`T | Ref<T>` uchun taxallus. [Composables](/guide/reusability/composables.html) argumentlarini belgilash uchun foydali.

## MaybeRefOrGetter\<T> {#maybereforgetter}

- Faqat 3.3+ versiyasida qo'llab-quvvatlanadi

`T | Ref<T> | (() => T)` uchun taxallus. [Composables](/guide/reusability/composables.html) argumentlarini belgilash uchun foydali.

## ExtractPropTypes\<T> {#extractproptypes}

Runtime props opsiyalari ob'ektidan prop tiplarini ajratib oladi. Ajratilgan tiplar ichki tomonga yo'naltirilgan - ya'ni komponent tomonidan qabul qilingan hal qilingan propslar. Bu shuni anglatadiki, boolean propslar va default qiymatlarga ega propslar har doim aniqlangan, hatto ular talab qilinmasa ham.

Ota-ona o'tkazishga ruxsat berilgan public propslarni ajratib olish uchun [`ExtractPublicPropTypes`](#extractpublicproptypes)ni ishlating.

- **Misol**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar: boolean,
  //   baz: number,
  //   qux: number
  // }
  ```

## ExtractPublicPropTypes\<T> {#extractpublicproptypes}

- Faqat 3.3+ versiyasida qo'llab-quvvatlanadi

Runtime props opsiyalari ob'ektidan prop tiplarini ajratib oladi. Ajratilgan tiplar public tomonga yo'naltirilgan - ya'ni ota-ona o'tkazishga ruxsat berilgan propslar.

- **Misol**

  ```ts
  const propsOptions = {
    foo: String,
    bar: Boolean,
    baz: {
      type: Number,
      required: true
    },
    qux: {
      type: Number,
      default: 1
    }
  } as const

  type Props = ExtractPublicPropTypes<typeof propsOptions>
  // {
  //   foo?: string,
  //   bar?: boolean,
  //   baz: number,
  //   qux?: number
  // }
  ```

## ComponentCustomProperties {#componentcustomproperties}

Komponent instansiyasi tipini maxsus global xususiyatlarni qo'llab-quvvatlash uchun kengaytirish uchun ishlatiladi.

- **Misol**

  ```ts
  import axios from 'axios'

  declare module 'vue' {
    interface ComponentCustomProperties {
      $http: typeof axios
      $translate: (key: string) => string
    }
  }
  ```

  :::tip
  Kengaytirishlar `.ts` yoki `.d.ts` modul faylida joylashgan bo'lishi kerak. Batafsil ma'lumot uchun [Type Augmentation Placement](/guide/typescript/options-api#augmenting-global-properties)ni tekshiring.
  :::

- **Qarang** [Guide - Augmenting Global Properties](/guide/typescript/options-api#augmenting-global-properties)

## ComponentCustomOptions {#componentcustomoptions}

Komponent opsiyalari tipini maxsus opsiyalarni qo'llab-quvvatlash uchun kengaytirish uchun ishlatiladi.

- **Misol**

  ```ts
  import { Route } from 'vue-router'

  declare module 'vue' {
    interface ComponentCustomOptions {
      beforeRouteEnter?(to: any, from: any, next: () => void): void
    }
  }
  ```

  :::tip
  Kengaytirishlar `.ts` yoki `.d.ts` modul faylida joylashgan bo'lishi kerak. Batafsil ma'lumot uchun [Type Augmentation Placement](/guide/typescript/options-api#augmenting-global-properties)ni tekshiring.
  :::

- **Qarang** [Guide - Augmenting Custom Options](/guide/typescript/options-api#augmenting-custom-options)

## ComponentCustomProps {#componentcustomprops}

TSX elementlarida e'lon qilinmagan propslarni ishlatish uchun ruxsat berilgan TSX propslarini kengaytirish uchun ishlatiladi.

- **Misol**

  ```ts
  declare module 'vue' {
    interface ComponentCustomProps {
      hello?: string
    }
  }

  export {}
  ```

  ```tsx
  // endi hello e'lon qilinmagan prop bo'lsa ham ishlaydi
  <MyComponent hello="world" />
  ```

  :::tip
  Kengaytirishlar `.ts` yoki `.d.ts` modul faylida joylashgan bo'lishi kerak. Batafsil ma'lumot uchun [Type Augmentation Placement](/guide/typescript/options-api#augmenting-global-properties)ni tekshiring.
  :::

## CSSProperties {#cssproperties}

Style xususiyati bog'lanishlarida ruxsat berilgan qiymatlarni kengaytirish uchun ishlatiladi.

- **Misol**

  Har qanday maxsus CSS xususiyatiga ruxsat berish

  ```ts
  declare module 'vue' {
    interface CSSProperties {
      [key: `--${string}`]: string
    }
  }
  ```

  ```tsx
  <div style={ { '--bg-color': 'blue' } }>
  ```

  ```html
  <div :style="{ '--bg-color': 'blue' }"></div>
  ```

:::tip
Kengaytirishlar `.ts` yoki `.d.ts` modul faylida joylashgan bo'lishi kerak. Batafsil ma'lumot uchun [Type Augmentation Placement](/guide/typescript/options-api#augmenting-global-properties)ni tekshiring.
:::

:::info Qarang
SFC `<style>` teglari `v-bind` CSS funksiyasidan foydalanib, CSS qiymatlarini dinamik komponent holatiga bog'lashni qo'llab-quvvatlaydi. Bu tip kengaytirishisiz maxsus xususiyatlarni imkonini beradi.

- [v-bind() in CSS](/api/sfc-css-features#v-bind-in-css)
  :::
