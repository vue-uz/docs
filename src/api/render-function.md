# Render Funksiyasi API'lari {#render-function-apis}

## h() {#h}

Virtual DOM tugunlarini (vnodes) yaratadi.

- **Turi**

  ```ts
  // to'liq imzo
  function h(
    type: string | Component,
    props?: object | null,
    children?: Children | Slot | Slots
  ): VNode

  // props'ni tashlab ketish
  function h(type: string | Component, children?: Children | Slot): VNode

  type Children = string | number | boolean | VNode | null | Children[]

  type Slot = () => Children

  type Slots = { [name: string]: Slot }
  ```

  > Turlar o'qilishni osonlashtirish uchun soddalashtirilgan.

- **Tafsilotlar**

  Birinchi argument string (mahalliy elementlar uchun) yoki Vue komponenti ta'rifi bo'lishi mumkin. Ikkinchi argument uzatiladigan prop'lar, uchinchi argument esa farzand elementlar.

  Komponent vnode yaratishda, farzand elementlar slot funksiyalari sifatida uzatilishi kerak. Agar komponent faqat default slot kutayotgan bo'lsa, bitta slot funksiyasi uzatilishi mumkin. Aks holda, slotlar slot funksiyalari ob'ekti sifatida uzatilishi kerak.

  Qulaylik uchun, farzand elementlar slot ob'ekti bo'lmaganda props argumenti tashlab ketilishi mumkin.

- **Misol**

  Mahalliy elementlarni yaratish:

  ```js
  import { h } from 'vue'

  // type'dan tashqari barcha argumentlar ixtiyoriy
  h('div')
  h('div', { id: 'foo' })

  // prop'larda ham atributlar, ham xususiyatlar ishlatilishi mumkin
  // Vue uni tayinlashning to'g'ri usulini avtomatik tanlaydi
  h('div', { class: 'bar', innerHTML: 'hello' })

  // class va style shablonlardagi kabi ob'ekt / massiv
  // qiymat qo'llab-quvvatlashiga ega
  h('div', { class: [foo, { bar }], style: { color: 'red' } })

  // hodisa tinglovchilari onXxx sifatida uzatilishi kerak
  h('div', { onClick: () => {} })

  // farzand elementlar string bo'lishi mumkin
  h('div', { id: 'foo' }, 'hello')

  // prop'lar bo'lmasa, ular tashlab ketilishi mumkin
  h('div', 'hello')
  h('div', [h('span', 'hello')])

  // farzand elementlar massivi aralash vnode va string'larni o'z ichiga olishi mumkin
  h('div', ['hello', h('span', 'hello')])
  ```

  Komponentlarni yaratish:

  ```js
  import Foo from './Foo.vue'

  // prop'larni uzatish
  h(Foo, {
    // some-prop="hello" bilan ekvivalent
    someProp: 'hello',
    // @update="() => {}" bilan ekvivalent
    onUpdate: () => {}
  })

  // bitta default slot uzatish
  h(Foo, () => 'default slot')

  // nomlangan slotlarni uzatish
  // e'tibor bering, `null` kerak
  // slot ob'ekti prop'lar sifatida ko'rilishini oldini olish uchun
  h(MyComponent, null, {
    default: () => 'default slot',
    foo: () => h('div', 'foo'),
    bar: () => [h('span', 'one'), h('span', 'two')]
  })
  ```

- **Qarang** [Qo'llanma - Render Funksiyalari - VNode'lar Yaratish](/guide/extras/render-function#creating-vnodes)

## mergeProps() {#mergeprops}

Maxsus prop'lar uchun maxsus ishlov berish bilan bir nechta prop ob'ektlarini birlashtiradi.

- **Turi**

  ```ts
  function mergeProps(...args: object[]): object
  ```

- **Tafsilotlar**

  `mergeProps()` quyidagi prop'lar uchun maxsus ishlov berish bilan bir nechta prop ob'ektlarini birlashtirishni qo'llab-quvvatlaydi:

  - `class`
  - `style`
  - `onXxx` hodisa tinglovchilari - bir xil nomga ega bir nechta tinglovchilar massivga birlashtiriladi.

  Agar siz birlashtirish xatti-harakatini kerak bo'lmasa va oddiy yozib o'chirishni xohlasangiz, o'rniga mahalliy ob'ekt tarqatishidan foydalanish mumkin.

- **Misol**

  ```js
  import { mergeProps } from 'vue'

  const one = {
    class: 'foo',
    onClick: handlerA
  }

  const two = {
    class: { bar: true },
    onClick: handlerB
  }

  const merged = mergeProps(one, two)
  /**
   {
     class: 'foo bar',
     onClick: [handlerA, handlerB]
   }
   */
  ```

## cloneVNode() {#clonevnode}

Vnode'ni klonlaydi.

- **Turi**

  ```ts
  function cloneVNode(vnode: VNode, extraProps?: object): VNode
  ```

- **Tafsilotlar**

  Ixtiyoriy ravishda original bilan birlashtirish uchun qo'shimcha prop'lar bilan klonlangan vnode'ni qaytaradi.

  Vnode'lar yaratilgandan keyin o'zgarmas deb hisoblanishi kerak va mavjud vnode'ning prop'larini o'zgartirishga urinmasligingiz kerak. O'rniga, uni boshqa / qo'shimcha prop'lar bilan klonlang.

  Vnode'lar maxsus ichki xususiyatlarga ega, shuning uchun ularni klonlash ob'ekt tarqatish kabi oddiy emas. `cloneVNode()` ichki mantiqning ko'p qismini boshqaradi.

- **Misol**

  ```js
  import { h, cloneVNode } from 'vue'

  const original = h('div')
  const cloned = cloneVNode(original, { id: 'foo' })
  ```

## isVNode() {#isvnode}

Qiymat vnode ekanligini tekshiradi.

- **Turi**

  ```ts
  function isVNode(value: unknown): boolean
  ```

## resolveComponent() {#resolvecomponent}

Ro'yxatdan o'tkazilgan komponentni nomi bo'yicha qo'lda aniqlash uchun.

- **Turi**

  ```ts
  function resolveComponent(name: string): Component | string
  ```

- **Tafsilotlar**

  **Eslatma: agar siz komponentni to'g'ridan-to'g'ri import qila olsangiz, sizga bu kerak emas.**

  `resolveComponent()` to'g'ri komponent kontekstidan aniqlash uchun<span class="composition-api"> `setup()` yoki</span> render funksiyasi ichida chaqirilishi kerak.

  Agar komponent topilmasa, runtime ogohlantirish chiqariladi va nom string'i qaytariladi.

- **Misol**

  <div class="composition-api">

  ```js
  import { h, resolveComponent } from 'vue'

  export default {
    setup() {
      const ButtonCounter = resolveComponent('ButtonCounter')

      return () => {
        return h(ButtonCounter)
      }
    }
  }
  ```

  </div>
  <div class="options-api">

  ```js
  import { h, resolveComponent } from 'vue'

  export default {
    render() {
      const ButtonCounter = resolveComponent('ButtonCounter')
      return h(ButtonCounter)
    }
  }
  ```

  </div>

- **Qarang** [Qo'llanma - Render Funksiyalari - Komponentlar](/guide/extras/render-function#components)

## resolveDirective() {#resolvedirective}

Ro'yxatdan o'tkazilgan direktivani nomi bo'yicha qo'lda aniqlash uchun.

- **Turi**

  ```ts
  function resolveDirective(name: string): Directive | undefined
  ```

- **Tafsilotlar**

  **Eslatma: agar siz direktivani to'g'ridan-to'g'ri import qila olsangiz, sizga bu kerak emas.**

  `resolveDirective()` to'g'ri komponent kontekstidan aniqlash uchun<span class="composition-api"> `setup()` yoki</span> render funksiyasi ichida chaqirilishi kerak.

  Agar direktiva topilmasa, runtime ogohlantirish chiqariladi va funksiya `undefined` qaytaradi.

- **Qarang** [Qo'llanma - Render Funksiyalari - Maxsus Direktivalar](/guide/extras/render-function#custom-directives)

## withDirectives() {#withdirectives}

Vnode'larga maxsus direktivalar qo'shish uchun.

- **Turi**

  ```ts
  function withDirectives(
    vnode: VNode,
    directives: DirectiveArguments
  ): VNode

  // [Directive, value, argument, modifiers]
  type DirectiveArguments = Array<
    | [Directive]
    | [Directive, any]
    | [Directive, any, string]
    | [Directive, any, string, DirectiveModifiers]
  >
  ```

- **Tafsilotlar**

  Mavjud vnode'ni maxsus direktivalar bilan o'raydi. Ikkinchi argument maxsus direktivalar massivi. Har bir maxsus direktiva ham `[Directive, value, argument, modifiers]` ko'rinishidagi massiv sifatida ifodalanadi. Massivning oxirgi elementlari kerak bo'lmasa tashlab ketilishi mumkin.

- **Misol**

  ```js
  import { h, withDirectives } from 'vue'

  // maxsus direktiva
  const pin = {
    mounted() {
      /* ... */
    },
    updated() {
      /* ... */
    }
  }

  // <div v-pin:top.animate="200"></div>
  const vnode = withDirectives(h('div'), [
    [pin, 200, 'top', { animate: true }]
  ])
  ```

- **Qarang** [Qo'llanma - Render Funksiyalari - Maxsus Direktivalar](/guide/extras/render-function#custom-directives)

## withModifiers() {#withmodifiers}

Hodisa boshqaruvchi funksiyasiga mahalliy [`v-on` modifikatorlarini](/guide/essentials/event-handling#event-modifiers) qo'shish uchun.

- **Turi**

  ```ts
  function withModifiers(fn: Function, modifiers: ModifierGuardsKeys[]): Function
  ```

- **Misol**

  ```js
  import { h, withModifiers } from 'vue'

  const vnode = h('button', {
    // v-on:click.stop.prevent bilan ekvivalent
    onClick: withModifiers(() => {
      // ...
    }, ['stop', 'prevent'])
  })
  ```

- **Qarang** [Qo'llanma - Render Funksiyalari - Hodisa Modifikatorlari](/guide/extras/render-function#event-modifiers)
