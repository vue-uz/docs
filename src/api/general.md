# Global API: Umumiy {#global-api-general}

## version {#version}

Vue'ning joriy versiyasini taqdim etadi.

- **Turi:** `string`

- **Misol**

  ```js
  import { version } from 'vue'

  console.log(version)
  ```

## nextTick() {#nexttick}

Keyingi DOM yangilanishi to'liq bo'lishini kutish uchun utility.

- **Turi**

  ```ts
  function nextTick(callback?: () => void): Promise<void>
  ```

- **Tafsilotlar**

  Vue'da reaktiv holatni o'zgartirganingizda, natijada kelib chiqadigan DOM yangilanishlari sinxron ravishda qo'llanilmaydi. Buning o'rniga, Vue ularni "keyingi tick"gacha buferga oladi, har bir komponent faqat bir marta yangilanishini ta'minlash uchun, qancha holat o'zgarishlari qilganingizdan qat'i nazar.

  `nextTick()` holat o'zgarishidan keyin darhol DOM yangilanishlari tugashini kutish uchun ishlatilishi mumkin. Siz argument sifatida callback o'tkazishingiz yoki qaytarilgan Promise'ni kutishingiz mumkin.

- **Misol**

  <div class="composition-api">

  ```vue
  <script setup>
  import { ref, nextTick } from 'vue'

  const count = ref(0)

  async function increment() {
    count.value++

    // DOM hali yangilanmagan
    console.log(document.getElementById('counter').textContent) // 0

    await nextTick()
    // DOM endi yangilangan
    console.log(document.getElementById('counter').textContent) // 1
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>
  <div class="options-api">

  ```vue
  <script>
  import { nextTick } from 'vue'

  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      async increment() {
        this.count++

        // DOM hali yangilanmagan
        console.log(document.getElementById('counter').textContent) // 0

        await nextTick()
        // DOM endi yangilangan
        console.log(document.getElementById('counter').textContent) // 1
      }
    }
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>

- **Qarang** [`this.$nextTick()`](/api/component-instance#nexttick)

## defineComponent() {#definecomponent}

Tur aniqlash bilan Vue komponentini aniqlash uchun tur yordamchisi.

- **Turi**

  ```ts
  // options sintaksisi
  function defineComponent(
    component: ComponentOptions
  ): ComponentConstructor

  // funksiya sintaksisi (3.3+ versiyasidan talab qilinadi)
  function defineComponent(
    setup: ComponentOptions['setup'],
    extraOptions?: ComponentOptions
  ): () => any
  ```

  > O'qish osonligi uchun tur soddalashtirilgan.

- **Tafsilotlar**

  Birinchi argument komponent opsiyalari obyektini kutadi. Qaytarilgan qiymat xuddi shu opsiyalar obyekti bo'ladi, chunki funksiya asosan faqat tur aniqlash maqsadida runtime no-op hisoblanadi.

  E'tibor bering, qaytarilgan tur biroz maxsus: u konstruktor turi bo'ladi, uning instansiya turi opsiyalarga asoslangan aniqlangan komponent instansiya turi bo'ladi. Bu qaytarilgan tur TSX'da teglar sifatida ishlatilganda tur aniqlash uchun ishlatiladi.

  Siz komponentning instansiya turini (uning opsiyalaridagi `this` turiga ekvivalent) `defineComponent()`ning qaytarilgan turidan quyidagicha olishingiz mumkin:

  ```ts
  const Foo = defineComponent(/* ... */)

  type FooInstance = InstanceType<typeof Foo>
  ```

  ### Funksiya Imzosi {#function-signature}

  - Faqat 3.3+ versiyasida qo'llab-quvvatlanadi

  `defineComponent()` Composition API va [render funksiyalari yoki JSX](/guide/extras/render-function.html) bilan ishlatilishi uchun mo'ljallangan alternativ imzoga ham ega.

  Opsiyalar obyektini o'tkazish o'rniga, funksiya kutiladi. Bu funksiya Composition API [`setup()`](/api/composition-api-setup.html#composition-api-setup) funksiyasi bilan bir xil ishlaydi: u props va setup kontekstini oladi. Qaytarilgan qiymat render funksiyasi bo'lishi kerak - ham `h()`, ham JSX qo'llab-quvvatlanadi:

  ```js
  import { ref, h } from 'vue'

  const Comp = defineComponent(
    (props) => {
      // bu yerda <script setup>dagidek Composition API'ni ishlating
      const count = ref(0)

      return () => {
        // render funksiyasi yoki JSX
        return h('div', count.value)
      }
    },
    // qo'shimcha opsiyalar, masalan, props va emits'ni e'lon qilish
    {
      props: {
        /* ... */
      }
    }
  )
  ```

  Bu imzoning asosiy ishlatilish holati TypeScript (va xususan TSX) bilan, chunki u generik'larni qo'llab-quvvatlaydi:

  ```tsx
  const Comp = defineComponent(
    <T extends string | number>(props: { msg: T; list: T[] }) => {
      // bu yerda <script setup>dagidek Composition API'ni ishlating
      const count = ref(0)

      return () => {
        // render funksiyasi yoki JSX
        return <div>{count.value}</div>
      }
    },
    // hozircha runtime props'larini qo'lda e'lon qilish hali ham kerak.
    {
      props: ['msg', 'list']
    }
  )
  ```

  Kelajakda, biz runtime props'larini avtomatik aniqlash va kiritish uchun Babel plugin'ini taqdim etishni rejalashtirmoqdamiz (SFC'lardagi `defineProps` kabi), shunda runtime props e'lonini tashlab ketish mumkin bo'ladi.

  ### webpack Treeshaking haqida eslatma {#note-on-webpack-treeshaking}

  `defineComponent()` funksiya chaqiruvi bo'lgani uchun, u ba'zi build vositalariga, masalan webpack'ga, yon ta'sirsiz ekanligini aytish uchun kerak emas, chunki Rollup (Vite tomonidan ishlatiladigan asosiy production bundler) `defineComponent()` aslida yon ta'sirsiz ekanligini qo'lda izohlarsiz aniqlash uchun yetarli darajada aqlli.

- **Qarang** [Guide - TypeScript bilan Vue'ni ishlatish](/guide/typescript/overview#general-usage-notes)

## defineAsyncComponent() {#defineasynccomponent}

Faqat render qilinganda lazy load qilinadigan async komponentni aniqlaydi. Argument yuklash funksiyasi yoki yuklash xatti-harakatini yanada rivojlangan boshqarish uchun opsiyalar obyekti bo'lishi mumkin.

- **Turi**

  ```ts
  function defineAsyncComponent(
    source: AsyncComponentLoader | AsyncComponentOptions
  ): Component

  type AsyncComponentLoader = () => Promise<Component>

  interface AsyncComponentOptions {
    loader: AsyncComponentLoader
    loadingComponent?: Component
    errorComponent?: Component
    delay?: number
    timeout?: number
    suspensible?: boolean
    onError?: (
      error: Error,
      retry: () => void,
      fail: () => void,
      attempts: number
    ) => any
  }
  ```

- **Qarang** [Guide - Async Komponentlar](/guide/components/async)
