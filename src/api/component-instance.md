# Komponent Instansi {#component-instance}

:::info
Bu sahifa komponentning ommaviy instansiyasida, ya'ni `this`da ochilgan o'rnatilgan xususiyatlar va metodlarni hujjatlashtiradi.

Bu sahifada ro'yxatdan o'tkazilgan barcha xususiyatlar faqat o'qish uchun (agar `$data` ichidagi ichki xususiyatlar bo'lmasa).
:::

## $data {#data}

[`data`](./options-state#data) opsiyasidan qaytarilgan ob'ekt, komponent tomonidan reaktiv qilingan. Komponent instansiyasi uning ma'lumotlar ob'ekti xususiyatlariga kirishni proxy qiladi.

- **Turi**

  ```ts
  interface ComponentPublicInstance {
    $data: object
  }
  ```

## $props {#props}

Komponentning joriy, hal qilingan props'larini ifodalovchi ob'ekt.

- **Turi**

  ```ts
  interface ComponentPublicInstance {
    $props: object
  }
  ```

- **Tafsilotlar**

  Faqat [`props`](./options-state#props) opsiyasi orqali e'lon qilingan props'lar kiritiladi. Komponent instansiyasi uning props ob'ekti xususiyatlariga kirishni proxy qiladi.

## $el {#el}

Komponent instansiyasi boshqarayotgan ildiz DOM tuguni.

- **Turi**

  ```ts
  interface ComponentPublicInstance {
    $el: any
  }
  ```

- **Tafsilotlar**

  `$el` komponent [mount](./options-lifecycle#mounted) qilinmaguncha `undefined` bo'ladi.

  - Bitta ildiz elementiga ega komponentlar uchun, `$el` o'sha elementga ishora qiladi.
  - Matn ildiziga ega komponentlar uchun, `$el` matn tuguniga ishora qiladi.
  - Bir nechta ildiz tugunlariga ega komponentlar uchun, `$el` Vue komponentning DOM'dagi o'rnini kuzatish uchun ishlatadigan placeholder DOM tuguni bo'ladi (matn tuguni yoki SSR hydration rejimida izoh tuguni).

  :::tip
  Izchillik uchun, elementlarga to'g'ridan-to'g'ri kirish uchun `$el`ga tayanmasdan [template refs](/guide/essentials/template-refs)dan foydalanish tavsiya etiladi.
  :::

## $options {#options}

Joriy komponent instansiyasini yaratish uchun ishlatilgan hal qilingan komponent opsiyalari.

- **Turi**

  ```ts
  interface ComponentPublicInstance {
    $options: ComponentOptions
  }
  ```

- **Tafsilotlar**

  `$options` ob'ekti joriy komponent uchun hal qilingan opsiyalarni ochadi va bu mumkin bo'lgan manbalarning birlashtirilgan natijasi:

  - Global mixinlar
  - Komponent `extends` bazasi
  - Komponent mixinlari

  U odatda maxsus komponent opsiyalarini qo'llab-quvvatlash uchun ishlatiladi:

  ```js
  const app = createApp({
    customOption: 'foo',
    created() {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

- **Qarang** [`app.config.optionMergeStrategies`](/api/application#app-config-optionmergestrategies)

## $parent {#parent}

Ota-ona instansiyasi, agar joriy instansiyaning biri bo'lsa. Bu ildiz instansiyasi uchun o'zida `null` bo'ladi.

- **Turi**

  ```ts
  interface ComponentPublicInstance {
    $parent: ComponentPublicInstance | null
  }
  ```

## $root {#root}

Joriy komponent daraxtining ildiz komponenti instansiyasi. Agar joriy instansiyaning ota-onalari bo'lmasa, bu qiymat o'zi bo'ladi.

- **Turi**

  ```ts
  interface ComponentPublicInstance {
    $root: ComponentPublicInstance
  }
  ```

## $slots {#slots}

Ota-ona komponent tomonidan o'tkazilgan [slots](/guide/components/slots)ni ifodalovchi ob'ekt.

- **Turi**

  ```ts
  interface ComponentPublicInstance {
    $slots: { [name: string]: Slot }
  }

  type Slot = (...args: any[]) => VNode[]
  ```

- **Tafsilotlar**

  Odatda [render funksiyalari](/guide/extras/render-function)ni qo'lda yozishda ishlatiladi, lekin slot mavjudligini aniqlash uchun ham ishlatilishi mumkin.

  Har bir slot `this.$slots`da o'sha slotning nomiga mos keladigan kalit ostida vnode'lar massivini qaytaruvchi funksiya sifatida ochiladi. Default slot `this.$slots.default` sifatida ochiladi.

  Agar slot [scoped slot](/guide/components/slots#scoped-slots) bo'lsa, slot funksiyalariga o'tkazilgan argumentlar slotga uning slot props'lari sifatida mavjud.

- **Qarang** [Render Functions - Rendering Slots](/guide/extras/render-function#rendering-slots)

## $refs {#refs}

[template refs](/guide/essentials/template-refs) orqali ro'yxatdan o'tkazilgan DOM elementlari va komponent instansiyalarining ob'ekti.

- **Turi**

  ```ts
  interface ComponentPublicInstance {
    $refs: { [name: string]: Element | ComponentPublicInstance | null }
  }
  ```

- **Qarang**

  - [Template refs](/guide/essentials/template-refs)
  - [Special Attributes - ref](./built-in-special-attributes.md#ref)

## $attrs {#attrs}

Komponentning fallthrough atributlarini o'z ichiga olgan ob'ekt.

- **Turi**

  ```ts
  interface ComponentPublicInstance {
    $attrs: object
  }
  ```

- **Tafsilotlar**

  [Fallthrough Attributes](/guide/components/attrs) ota-ona komponent tomonidan o'tkazilgan, lekin farzand tomonidan prop yoki chiqarilgan hodisa sifatida e'lon qilinmagan atributlar va hodisa ishlovchilari.

  Default bo'yicha, `$attrs`dagi hamma narsa agar faqat bitta ildiz elementi bo'lsa, komponentning ildiz elementida avtomatik ravishda meros qilinadi. Bu xatti-harakat komponent bir nechta ildiz tugunlariga ega bo'lsa o'chiriladi va [`inheritAttrs`](./options-misc#inheritattrs) opsiyasi bilan aniq o'chirilishi mumkin.

- **Qarang**

  - [Fallthrough Attributes](/guide/components/attrs)

## $watch() {#watch}

Kuzatuvchilarni yaratish uchun imperativ API.

- **Turi**

  ```ts
  interface ComponentPublicInstance {
    $watch(
      source: string | (() => any),
      callback: WatchCallback,
      options?: WatchOptions
    ): StopHandle
  }

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  interface WatchOptions {
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  type StopHandle = () => void
  ```

- **Tafsilotlar**

  Birinchi argument kuzatish manbai. Bu komponent xususiyati nomi stringi, oddiy nuqta bilan ajratilgan yo'l stringi yoki [getter funksiyasi](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description) bo'lishi mumkin.

  Ikkinchi argument callback funksiyasi. Callback kuzatilayotgan manbaning yangi qiymati va eski qiymatini oladi.

  - **`immediate`**: kuzatuvchi yaratilganda callbackni darhol ishga tushirish. Birinchi chaqiruvda eski qiymat `undefined` bo'ladi.
  - **`deep`**: agar ob'ekt bo'lsa, manbaning chuqur o'tishini majburlash, shunda callback chuqur o'zgarishlarda ishga tushadi. [Deep Watchers](/guide/essentials/watchers#deep-watchers)ni tekshiring.
  - **`flush`**: callback'ning flush vaqtini sozlash. [Callback Flush Timing](/guide/essentials/watchers#callback-flush-timing) va [`watchEffect()`](/api/reactivity-core#watcheffect)ni tekshiring.
  - **`onTrack / onTrigger`**: kuzatuvchining bog'liqliklarini debug qilish. [Watcher Debugging](/guide/extras/reactivity-in-depth#watcher-debugging)ni tekshiring.

- **Misol**

  Xususiyat nomini kuzatish:

  ```js
  this.$watch('a', (newVal, oldVal) => {})
  ```

  Nuqta bilan ajratilgan yo'lni kuzatish:

  ```js
  this.$watch('a.b', (newVal, oldVal) => {})
  ```

  Murakkab ifodalar uchun getter ishlatish:

  ```js
  this.$watch(
    // har safar `this.a + this.b` ifodasi
    // boshqa natija berganida, handler chaqiriladi.
    // Bu xuddi biz computed xususiyatni
    // computed xususiyatni o'zini aniqlamasdan kuzatayotgandek.
    () => this.a + this.b,
    (newVal, oldVal) => {}
  )
  ```

  Kuzatuvchini to'xtatish:

  ```js
  const unwatch = this.$watch('a', cb)

  // keyinroq...
  unwatch()
  ```

- **Qarang**
  - [Options - `watch`](/api/options-state#watch)
  - [Guide - Watchers](/guide/essentials/watchers)

## $emit() {#emit}

Joriy instansiyada maxsus hodisani ishga tushirish. Qo'shimcha argumentlar tinglovchining callback funksiyasiga o'tkaziladi.

- **Turi**

  ```ts
  interface ComponentPublicInstance {
    $emit(event: string, ...args: any[]): void
  }
  ```

- **Misol**

  ```js
  export default {
    created() {
      // faqat hodisa
      this.$emit('foo')
      // qo'shimcha argumentlar bilan
      this.$emit('bar', 1, 2, 3)
    }
  }
  ```

- **Qarang**

  - [Component - Events](/guide/components/events)
  - [`emits` option](./options-state#emits)

## $forceUpdate() {#forceupdate}

Komponent instansiyasini qayta render qilishni majburlash.

- **Turi**

  ```ts
  interface ComponentPublicInstance {
    $forceUpdate(): void
  }
  ```

- **Tafsilotlar**

  Vue'ning to'liq avtomatik reaktiv tizimi berilgani uchun, bunaqa narsa kamdan-kam kerak bo'ladi. Sizga bunaqa narsa kerak bo'lishi mumkin bo'lgan yagona holatlar - bu siz ilg'or reaktiv API'lardan foydalanib, aniq non-reaktiv komponent holatini yaratganingizda.

## $nextTick() {#nexttick}

Global [`nextTick()`](./general#nexttick)ning instansiyaga bog'langan versiyasi.

- **Turi**

  ```ts
  interface ComponentPublicInstance {
    $nextTick(callback?: (this: ComponentPublicInstance) => void): Promise<void>
  }
  ```

- **Tafsilotlar**

  Global versiyadan yagona farq shundaki, `this.$nextTick()`ga o'tkazilgan callback'ning `this` konteksti joriy komponent instansiyasiga bog'langan.

- **Qarang** [`nextTick()`](./general#nexttick)
