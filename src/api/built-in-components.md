---
pageClass: api
---

# O'rnatilgan Komponentlar {#built-in-components}

:::info Ro'yxatdan o'tkazish va foydalanish
O'rnatilgan komponentlar ro'yxatdan o'tkazishni talab qilmasdan to'g'ridan-to'g'ri shablonlarda ishlatilishi mumkin. Ular ham daraxt-shakeable: ular faqat ishlatilganda qurilishga kiritiladi.

Ularni [render funksiyalari](/guide/extras/render-function)da ishlatganda, ularni aniq import qilish kerak. Masalan:

```js
import { h, Transition } from 'vue'

h(Transition, {
  /* props */
})
```

:::

## `<Transition>` {#transition}

Bitta element yoki komponentga animatsion o'tish effektlarini ta'minlaydi.

- **Props**

  ```ts
  interface TransitionProps {
    /**
     * O'tish CSS sinf nomlarini avtomatik ravishda yaratish uchun ishlatiladi.
     * masalan. `name: 'fade'` avtomatik ravishda `.fade-enter`,
     * `.fade-enter-active`, va boshqalarga kengaytiriladi.
     */
    name?: string
    /**
     * CSS o'tish sinflarini qo'llash kerakmi.
     * Default: true
     */
    css?: boolean
    /**
     * O'tish tugash vaqtini aniqlash uchun kutish kerak bo'lgan o'tish hodisalarining turini belgilaydi.
     * Default xatti-harakat - bu uzoqroq davom etadigan turini avtomatik aniqlash.
     */
    type?: 'transition' | 'animation'
    /**
     * O'tishning aniq davomiyligini belgilaydi.
     * Default xatti-harakat - bu ildiz o'tish elementidagi birinchi `transitionend`
     * yoki `animationend` hodisasini kutish.
     */
    duration?: number | { enter: number; leave: number }
    /**
     * Chiqish/kirish o'tishlarining vaqt ketma-ketligini boshqaradi.
     * Default xatti-harakat - bu bir vaqtning o'zida.
     */
    mode?: 'in-out' | 'out-in' | 'default'
    /**
     * Dastlabki renderda o'tishni qo'llash kerakmi.
     * Default: false
     */
    appear?: boolean

    /**
     * O'tish sinflarini sozlash uchun props.
     * Shablonlarda kebab-case ishlatiladi, masalan. enter-from-class="xxx"
     */
    enterFromClass?: string
    enterActiveClass?: string
    enterToClass?: string
    appearFromClass?: string
    appearActiveClass?: string
    appearToClass?: string
    leaveFromClass?: string
    leaveActiveClass?: string
    leaveToClass?: string
  }
  ```

- **Hodisalar**

  - `@before-enter`
  - `@before-leave`
  - `@enter`
  - `@leave`
  - `@appear`
  - `@after-enter`
  - `@after-leave`
  - `@after-appear`
  - `@enter-cancelled`
  - `@leave-cancelled` (`v-show` faqat)
  - `@appear-cancelled`

- **Misol**

  Oddiy element:

  ```vue-html
  <Transition>
    <div v-if="ok">toggled content</div>
  </Transition>
  ```

  `key` atributini o'zgartirish orqali o'tishni majburlash:

  ```vue-html
  <Transition>
    <div :key="text">{{ text }}</div>
  </Transition>
  ```

  Dinamik komponent, o'tish rejimi + paydo bo'lishda animatsiya:

  ```vue-html
  <Transition name="fade" mode="out-in" appear>
    <component :is="view"></component>
  </Transition>
  ```

  O'tish hodisalarini tinglash:

  ```vue-html
  <Transition @after-enter="onTransitionComplete">
    <div v-show="ok">toggled content</div>
  </Transition>
  ```

- **Qarang** [Guide - Transition](/guide/built-ins/transition)

## `<TransitionGroup>` {#transitiongroup}

Ro'yxatdagi bir nechta elementlar yoki komponentlar uchun o'tish effektlarini ta'minlaydi.

- **Props**

  `<TransitionGroup>` `mode` dan tashqari `<Transition>` bilan bir xil propslarni qabul qiladi, shuningdek ikkita qo'shimcha prop:

  ```ts
  interface TransitionGroupProps extends Omit<TransitionProps, 'mode'> {
    /**
     * Agar belgilanmagan bo'lsa, fragment sifatida render qilinadi.
     */
    tag?: string
    /**
     * Harakat o'tishlari paytida qo'llaniladigan CSS sinfini sozlash uchun.
     * Shablonlarda kebab-case ishlatiladi, masalan. move-class="xxx"
     */
    moveClass?: string
  }
  ```

- **Hodisalar**

  `<TransitionGroup>` `<Transition>` bilan bir xil hodisalarni chiqaradi.

- **Tafsilotlar**

  By default, `<TransitionGroup>` o'rab turuvchi DOM elementini render qilmaydi, lekin `tag` prop orqali bitta aniqlanishi mumkin.

  Eslatma: `<transition-group>` ichidagi har bir bola animatsiyalar to'g'ri ishlashi uchun [**noyob kalitlangan**](/guide/essentials/list#maintaining-state-with-key) bo'lishi kerak.

  `<TransitionGroup>` CSS transform orqali harakat o'tishlarini qo'llab-quvvatlaydi. Yangilanishdan keyin ekrandagi bolaning o'rni o'zgarganda, u harakatlanuvchi CSS sinfini oladi (`name` atributidan avtomatik yaratilgan yoki `move-class` prop bilan sozlangan). Agar CSS `transform` xususiyati harakatlanuvchi sinf qo'llanilganda "o'tish-mumkin" bo'lsa, element [FLIP texnikasi](https://aerotwist.com/blog/flip-your-animations/) yordamida uning manziliga silliq animatsiya qilinadi.

- **Misol**

  ```vue-html
  <TransitionGroup tag="ul" name="slide">
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </TransitionGroup>
  ```

- **Qarang** [Guide - TransitionGroup](/guide/built-ins/transition-group)

## `<KeepAlive>` {#keepalive}

Ichida o'ralgan dinamik komponentlarni keshlashtiradi.

- **Props**

  ```ts
  interface KeepAliveProps {
    /**
     * Agar belgilanmagan bo'lsa, faqat `include` tomonidan mos keladigan nomlarga ega komponentlar keshlashtiriladi.
     */
    include?: MatchPattern
    /**
     * `exclude` tomonidan mos keladigan nomga ega har qanday komponent keshlashtirilmaydi.
     */
    exclude?: MatchPattern
    /**
     * Keshlashtiriladigan komponent namunalarining maksimal soni.
     */
    max?: number | string
  }

  type MatchPattern = string | RegExp | (string | RegExp)[]
  ```

- **Tafsilotlar**

  Dinamik komponent atrofida o'ralganda, `<KeepAlive>` ularni yo'q qilmasdan, faol bo'lmagan komponent namunalarini keshlashtiradi.

  Har qanday vaqtda `<KeepAlive>` ning to'g'ridan-to'g'ri farzandiga sifatida faqat bitta faol komponent namunasi bo'lishi mumkin.

  `<KeepAlive>` ichidagi komponent almashtirilganda, uning `activated` va `deactivated` hayot aylanish kancalari shunga mos ravishda chaqiriladi, bu `mounted` va `unmounted` ga alternativa bo'lib, ular chaqirilmaydi. Bu `<KeepAlive>` ning to'g'ridan-to'g'ri farzandiga ham, uning barcha avlodlariga ham tegishli.

- **Misol**

  Asosiy foydalanish:

  ```vue-html
  <KeepAlive>
    <component :is="view"></component>
  </KeepAlive>
  ```

  `v-if` / `v-else` tarmoqlari bilan ishlatilganda, bir vaqtning o'zida faqat bitta komponent render qilinishi kerak:

  ```vue-html
  <KeepAlive>
    <comp-a v-if="a > 1"></comp-a>
    <comp-b v-else></comp-b>
  </KeepAlive>
  ```

  `<Transition>` bilan birga ishlatilganda:

  ```vue-html
  <Transition>
    <KeepAlive>
      <component :is="view"></component>
    </KeepAlive>
  </Transition>
  ```

  `include` / `exclude` ishlatilganda:

  ```vue-html
  <!-- vergul bilan ajratilgan string -->
  <KeepAlive include="a,b">
    <component :is="view"></component>
  </KeepAlive>

  <!-- regex (use `v-bind`) -->
  <KeepAlive :include="/a|b/">
    <component :is="view"></component>
  </KeepAlive>

  <!-- Array (use `v-bind`) -->
  <KeepAlive :include="['a', 'b']">
    <component :is="view"></component>
  </KeepAlive>
  ```

  `max` bilan ishlatilganda:

  ```vue-html
  <KeepAlive :max="10">
    <component :is="view"></component>
  </KeepAlive>
  ```

- **Qarang** [Guide - KeepAlive](/guide/built-ins/keep-alive)

## `<Teleport>` {#teleport}

Uning slot mazmunini DOMning boshqa qismiga render qiladi.

- **Props**

  ```ts
  interface TeleportProps {
    /**
     * Majburiy. Maqsadli konteynerni belgilang.
     * Bu selektor yoki haqiqiy element bo'lishi mumkin.
     */
    to: string | HTMLElement
    /**
     * `true` bo'lganda, mazmun o'zining asl joyida qoladi
     * maqsadli konteynerga ko'chirilish o'rniga.
     * Dinamik ravishda o'zgartirilishi mumkin.
     */
    disabled?: boolean
    /**
     * `true` bo'lganda, Teleport boshqa
     * ilovaning qismlari o'rnatilguncha o'zining maqsadini hal qilishni kechiktirib qo'yadi. (3.5+)
     */
    defer?: boolean
  }
  ```

- **Misol**

  Maqsadli konteynerni belgilash:

  ```vue-html
  <Teleport to="#some-id" />
  <Teleport to=".some-class" />
  <Teleport to="[data-teleport]" />
  ```

  Shartli ravishda o'chirish:

  ```vue-html
  <Teleport to="#popup" :disabled="displayVideoInline">
    <video src="./my-movie.mp4">
  </Teleport>
  ```

  Maqsadni hal qilishni kechiktirish <sup class="vt-badge" data-text="3.5+" />:

  ```vue-html
  <Teleport defer to="#late-div">...</Teleport>

  <!-- shablonning keyingi qismida biror joyda -->
  <div id="late-div"></div>
  ```

- **Qarang** [Guide - Teleport](/guide/built-ins/teleport)

## `<Suspense>` <sup class="vt-badge experimental" /> {#suspense}

Komponent daraxtidagi ichki asinxron bog'liqliklarni boshqarish uchun ishlatiladi.

- **Props**

  ```ts
  interface SuspenseProps {
    timeout?: string | number
    suspensible?: boolean
  }
  ```

- **Hodisalar**

  - `@resolve`
  - `@pending`
  - `@fallback`

- **Tafsilotlar**

  `<Suspense>` ikkita slotni qabul qiladi: `#default` slot va `#fallback` slot. U xotiraga default slotni render qilish paytida fallback slot mazmunini ko'rsatadi.

  Agar u default slotni render qilish paytida asinxron bog'liqliklarni ([Async Components](/guide/components/async) va [`async setup()`](/guide/built-ins/suspense#async-setup) ga ega komponentlar) uchratsa, u default slotni ko'rsatishdan oldin ularning barchasi hal qilinmaguncha kutadi.

  Suspense ni `suspensible` sifatida o'rnatish orqali, barcha asinxron bog'liqlik boshqaruvi ota-ona Suspense tomonidan boshqariladi. Qarang [implementation details](https://github.com/vuejs/core/pull/6736)

- **Qarang** [Guide - Suspense](/guide/built-ins/suspense)
