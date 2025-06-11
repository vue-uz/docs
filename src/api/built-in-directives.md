# O'rnatilgan Direktivalar {#built-in-directives}

## v-text {#v-text}

Elementning matn mazmunini yangilaydi.

- **Kutiladi:** `string`

- **Tafsilotlar**

  `v-text` elementning [textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent) xususiyatini o'rnatish orqali ishlaydi, shuning uchun u element ichidagi mavjud mazmunni yozib o'chirib tashlaydi. Agar `textContent`ning bir qismini yangilash kerak bo'lsa, o'rniga [mustache interpolatsiyalarini](/guide/essentials/template-syntax#text-interpolation) ishlatish kerak.

- **Misol**

  ```vue-html
  <span v-text="msg"></span>
  <!-- same as -->
  <span>{{msg}}</span>
  ```

- **Qarang** [Template Syntax - Text Interpolation](/guide/essentials/template-syntax#text-interpolation)

## v-html {#v-html}

Elementning [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)ini yangilaydi.

- **Kutiladi:** `string`

- **Tafsilotlar**

  `v-html` mazmuni oddiy HTML sifatida kiritiladi - Vue shablon sintaksisi qayta ishlanmaydi. Agar o'zingizni `v-html` yordamida shablonlarni tuzishga harakat qilyotganingizni topsangiz, o'rniga komponentlardan foydalanish orqali yechimni qayta o'ylab ko'ring.

  ::: warning Xavfsizlik Eslatmasi
  Veb-saytingizda ixtiyoriy HTMLni dinamik ravishda render qilish juda xavfli bo'lishi mumkin, chunki bu osonlik bilan [XSS hujumlariga](https://en.wikipedia.org/wiki/Cross-site_scripting) olib kelishi mumkin. `v-html`ni faqat ishonchli mazmunda ishlating va **hech qachon** foydalanuvchi tomonidan taqdim etilgan mazmunda ishlatmang.
  :::

  [Single-File Components](/guide/scaling-up/sfc)da, `scoped` stillar `v-html` ichidagi mazmunga qo'llanilmaydi, chunki bu HTML Vue shablon kompilyatori tomonidan qayta ishlanmaydi. Agar `v-html` mazmunini scoped CSS bilan nishonlashni xohlasangiz, o'rniga [CSS modullarini](./sfc-css-features#css-modules) yoki qo'shimcha, global `<style>` elementini BEM kabi qo'lda scoping strategiyasi bilan ishlatishingiz mumkin.

- **Misol**

  ```vue-html
  <div v-html="html"></div>
  ```

- **Qarang** [Template Syntax - Raw HTML](/guide/essentials/template-syntax#raw-html)

## v-show {#v-show}

Ifoda qiymatining to'g'riligiga asoslanib elementning ko'rinishini almashtiradi.

- **Kutiladi:** `any`

- **Tafsilotlar**

  `v-show` elementning `display` CSS xususiyatini inline stillar orqali o'rnatish orqali ishlaydi va element ko'rinadigan bo'lganda dastlabki `display` qiymatini hurmat qilishga harakat qiladi. U shuningdek, uning sharoiti o'zgarganda o'tishlarni ishga tushiradi.

- **Qarang** [Conditional Rendering - v-show](/guide/essentials/conditional#v-show)

## v-if {#v-if}

Ifoda qiymatining to'g'riligiga asoslanib element yoki shablon fragmentini shartli ravishda render qiladi.

- **Kutiladi:** `any`

- **Tafsilotlar**

  `v-if` elementi almashtirilganda, element va uning ichidagi direktivalar / komponentlar yo'q qilinadi va qayta quriladi. Agar dastlabki shart noto'g'ri bo'lsa, ichki mazmun umuman render qilinmaydi.

  Faqat matn yoki bir nechta elementlarni o'z ichiga olgan shartli blokni belgilash uchun `<template>`da ishlatilishi mumkin.

  Bu direktiva uning sharoiti o'zgarganda o'tishlarni ishga tushiradi.

  Birga ishlatilganda, `v-if` `v-for`dan yuqori ustuvorlikka ega. Biz bu ikkita direktivani bir elementda birga ishlatishni tavsiya qilmaymiz - tafsilotlar uchun [list rendering guide](/guide/essentials/list#v-for-with-v-if)ga qarang.

- **Qarang** [Conditional Rendering - v-if](/guide/essentials/conditional#v-if)

## v-else {#v-else}

`v-if` yoki `v-if` / `v-else-if` zanjiri uchun "else blokini" belgilaydi.

- **Ifoda kutilmaydi**

- **Tafsilotlar**

  - Cheklov: oldingi qardosh element `v-if` yoki `v-else-if`ga ega bo'lishi kerak.

  - Faqat matn yoki bir nechta elementlarni o'z ichiga olgan shartli blokni belgilash uchun `<template>`da ishlatilishi mumkin.

- **Misol**

  ```vue-html
  <div v-if="Math.random() > 0.5">
    Now you see me
  </div>
  <div v-else>
    Now you don't
  </div>
  ```

- **Qarang** [Conditional Rendering - v-else](/guide/essentials/conditional#v-else)

## v-else-if {#v-else-if}

`v-if` uchun "else if blokini" belgilaydi. Zanjirlash mumkin.

- **Kutiladi:** `any`

- **Tafsilotlar**

  - Cheklov: oldingi qardosh element `v-if` yoki `v-else-if`ga ega bo'lishi kerak.

  - Faqat matn yoki bir nechta elementlarni o'z ichiga olgan shartli blokni belgilash uchun `<template>`da ishlatilishi mumkin.

- **Misol**

  ```vue-html
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
  ```

- **Qarang** [Conditional Rendering - v-else-if](/guide/essentials/conditional#v-else-if)

## v-for {#v-for}

Element yoki shablon blokini manba ma'lumotlariga asoslanib bir necha marta render qiladi.

- **Kutiladi:** `Array | Object | number | string | Iterable`

- **Tafsilotlar**

  Direktivaning qiymati takrorlanayotgan joriy element uchun taxallus ta'minlash uchun maxsus sintaksis `alias in expression`ni ishlatishi kerak:

  ```vue-html
  <div v-for="item in items">
    {{ item.text }}
  </div>
  ```

  Alternativ ravishda, indeks uchun taxallusni (yoki Objectda ishlatilganda kalit) ham belgilashingiz mumkin:

  ```vue-html
  <div v-for="(item, index) in items"></div>
  <div v-for="(value, key) in object"></div>
  <div v-for="(value, name, index) in object"></div>
  ```

  `v-for`ning default xatti-harakati elementlarni ularni ko'chirmasdan joyida yamashga harakat qiladi. Elementlarni qayta tartiblashni majburlash uchun, `key` maxsus atributi bilan tartiblashni belgilash kerak:

  ```vue-html
  <div v-for="item in items" :key="item.id">
    {{ item.text }}
  </div>
  ```

  `v-for` shuningdek, [Iterable Protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol)ni amalga oshiradigan qiymatlarda, shu jumladan native `Map` va `Set`da ishlashi mumkin.

- **Qarang**
  - [List Rendering](/guide/essentials/list)

## v-on {#v-on}

Elementga hodisa tinglovchisini biriktirish.

- **Qisqartma:** `@`

- **Kutiladi:** `Function | Inline Statement | Object (without argument)`

- **Argument:** `event` (Object sintaksisi ishlatilganda ixtiyoriy)

- **Modifikatorlar**

  - `.stop` - `event.stopPropagation()`ni chaqirish.
  - `.prevent` - `event.preventDefault()`ni chaqirish.
  - `.capture` - hodisa tinglovchisini capture rejimida qo'shish.
  - `.self` - hodisa faqat bu elementdan yuborilganda ishlovchini ishga tushirish.
  - `.{keyAlias}` - faqat ma'lum kalitlarda ishlovchini ishga tushirish.
  - `.once` - ishlovchini ko'pi bilan bir marta ishga tushirish.
  - `.left` - faqat chap tugma sichqoncha hodisalari uchun ishlovchini ishga tushirish.
  - `.right` - faqat o'ng tugma sichqoncha hodisalari uchun ishlovchini ishga tushirish.
  - `.middle` - faqat o'rta tugma sichqoncha hodisalari uchun ishlovchini ishga tushirish.
  - `.passive` - `{ passive: true }` bilan DOM hodisasini biriktirish.

- **Tafsilotlar**

  Hodisa turi argument bilan belgilanadi. Ifoda metod nomi, inline statement yoki modifikatorlar mavjud bo'lsa, tashlab ketilishi mumkin.

  Oddiy elementda ishlatilganda, u faqat [**native DOM hodisalarini**](https://developer.mozilla.org/en-US/docs/Web/Events) tinglaydi. Maxsus element komponentida ishlatilganda, u o'sha bola komponentida chiqarilgan **maxsus hodisalarni** tinglaydi.

  Native DOM hodisalarini tinglashda, metod native hodisani yagona argument sifatida oladi. Agar inline statement ishlatilsa, statement maxsus `$event` xususiyatiga kirish huquqiga ega: `v-on:click="handle('ok', $event)"`.

  `v-on` shuningdek, argument bo'lmagan holda hodisa / tinglovchi juftliklarining ob'ektiga bog'lashni qo'llab-quvvatlaydi. Eslatma: ob'ekt sintaksisi ishlatilganda, u hech qanday modifikatorlarni qo'llab-quvvatlamaydi.

- **Misol**

  ```vue-html
  <!-- method handler -->
  <button v-on:click="doThis"></button>

  <!-- dynamic event -->
  <button v-on:[event]="doThis"></button>

  <!-- inline statement -->
  <button v-on:click="doThat('hello', $event)"></button>

  <!-- shorthand -->
  <button @click="doThis"></button>

  <!-- shorthand dynamic event -->
  <button @[event]="doThis"></button>

  <!-- stop propagation -->
  <button @click.stop="doThis"></button>

  <!-- prevent default -->
  <button @click.prevent="doThis"></button>

  <!-- prevent default without expression -->
  <form @submit.prevent></form>

  <!-- chain modifiers -->
  <button @click.stop.prevent="doThis"></button>

  <!-- key modifier using keyAlias -->
  <input @keyup.enter="onEnter" />

  <!-- the click event will be triggered at most once -->
  <button v-on:click.once="doThis"></button>

  <!-- object syntax -->
  <button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
  ```

  Bola komponentida maxsus hodisalarni tinglash (ishlovchi bola komponentida "my-event" chiqarilganda chaqiriladi):

  ```vue-html
  <MyComponent @my-event="handleThis" />

  <!-- inline statement -->
  <MyComponent @my-event="handleThis(123, $event)" />
  ```

- **Qarang**
  - [Event Handling](/guide/essentials/event-handling)
  - [Components - Custom Events](/guide/essentials/component-basics#listening-to-events)

## v-bind {#v-bind}

Bir yoki bir nechta atributlarni yoki komponent propini ifodaga dinamik ravishda bog'lash.

- **Qisqartma:**
  - `:` yoki `.` (`.prop` modifikatori ishlatilganda)
  - Qiymatni tashlab ketish (atribut va bog'langan qiymat bir xil nomga ega bo'lganda, 3.4+ talab qilinadi)

- **Kutiladi:** `any (with argument) | Object (without argument)`

- **Argument:** `attrOrProp (optional)`

- **Modifikatorlar**

  - `.camel` - kebab-case atribut nomini camelCase ga o'zgartirish.
  - `.prop` - bog'lanishni DOM xususiyati sifatida o'rnatishni majburlash (3.2+).
  - `.attr` - bog'lanishni DOM atributi sifatida o'rnatishni majburlash (3.2+).

- **Foydalanish**

  `class` yoki `style` atributini bog'lash uchun ishlatilganda, `v-bind` Array yoki Objects kabi qo'shimcha qiymat turlarini qo'llab-quvvatlaydi. Batafsil ma'lumot uchun quyidagi bog'langan qo'llanma bo'limiga qarang.

  Elementda bog'lanishni o'rnatganda, Vue default ravishda element `in` operator tekshiruvi yordamida kalitni xususiyat sifatida aniqlanganligini tekshiradi. Agar xususiyat aniqlangan bo'lsa, Vue qiymatni atribut o'rniga DOM xususiyati sifatida o'rnatadi. Bu ko'p hollarda ishlashi kerak, lekin siz bu xatti-harakati `.prop` yoki `.attr` modifikatorlarini aniq ishlatish orqali bekor qilishingiz mumkin. Bu ba'zan zarur, ayniqsa [maxsus elementlar bilan ishlashda](/guide/extras/web-components#passing-dom-properties).

  Komponent prop bog'lash uchun ishlatilganda, prop bola komponentida to'g'ri e'lon qilinishi kerak.

  Argument bo'lmagan holda ishlatilganda, atribut nom-qiymat juftliklarini o'z ichiga olgan ob'ektni bog'lash uchun ishlatilishi mumkin.

- **Misol**

  ```vue-html
  <!-- bind an attribute -->
  <img v-bind:src="imageSrc" />

  <!-- dynamic attribute name -->
  <button v-bind:[key]="value"></button>

  <!-- shorthand -->
  <img :src="imageSrc" />

  <!-- same-name shorthand (3.4+), expands to :src="src" -->
  <img :src />

  <!-- shorthand dynamic attribute name -->
  <button :[key]="value"></button>

  <!-- with inline string concatenation -->
  <img :src="'/path/to/images/' + fileName" />

  <!-- class binding -->
  <div :class="{ red: isRed }"></div>
  <div :class="[classA, classB]"></div>
  <div :class="[classA, { classB: isB, classC: isC }]"></div>

  <!-- style binding -->
  <div :style="{ fontSize: size + 'px' }"></div>
  <div :style="[styleObjectA, styleObjectB]"></div>

  <!-- binding an object of attributes -->
  <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

  <!-- prop binding. "prop" must be declared in the child component. -->
  <MyComponent :prop="someThing" />

  <!-- pass down parent props in common with a child component -->
  <MyComponent v-bind="$props" />

  <!-- XLink -->
  <svg><a :xlink:special="foo"></a></svg>
  ```

  `.prop` modifikatori ham maxsus qisqartmaga ega, `.`:

  ```vue-html
  <div :someProperty.prop="someObject"></div>

  <!-- equivalent to -->
  <div .someProperty="someObject"></div>
  ```

  `.camel` modifikatori in-DOM shablonlarida ishlatilganda `v-bind` atribut nomini camelizing imkonini beradi, masalan. SVG `viewBox` atributi:

  ```vue-html
  <svg :view-box.camel="viewBox"></svg>
  ```

  `.camel` string shablonlarini ishlatayotganingizda yoki shablonni build qadami bilan oldindan kompilyatsiya qilayotganingizda kerak emas.

- **Qarang**
  - [Class and Style Bindings](/guide/essentials/class-and-style)
  - [Components - Prop Passing Details](/guide/components/props#prop-passing-details)

## v-model {#v-model}

Forma kiritish elementi yoki komponentda ikki tomonlama bog'lanish yaratish.

- **Kutiladi:** forma kiritish elementining qiymatiga yoki komponentlarning chiqishiga qarab o'zgaradi

- **Cheklangan:**

  - `<input>`
  - `<select>`
  - `<textarea>`
  - components

- **Modifikatorlar**

  - [`.lazy`](/guide/essentials/forms#lazy) - `input` o'rniga `change` hodisalarini tinglash
  - [`.number`](/guide/essentials/forms#number) - to'g'ri kiritish stringini raqamlarga o'tkazish
  - [`.trim`](/guide/essentials/forms#trim) - kiritishni trim qilish

- **Qarang**

  - [Form Input Bindings](/guide/essentials/forms)
  - [Component Events - Usage with `v-model`](/guide/components/v-model)

## v-slot {#v-slot}

Propslarni olishni kutayotgan nomlangan slotlar yoki scoped slotlarni belgilash.

- **Qisqartma:** `#`

- **Kutiladi:** funksiya argument o'rnida yaroqli JavaScript ifodasi, destructuring qo'llab-quvvatlashni o'z ichiga oladi. Ixtiyoriy - faqat slotga propslarni uzatishni kutayotgan bo'lsangiz kerak.

- **Argument:** slot nomi (ixtiyoriy, default `default`)

- **Cheklangan:**

  - `<template>`
  - [components](/guide/components/slots#scoped-slots) (propslar bilan yolg'iz default slot uchun)

- **Misol**

  ```vue-html
  <!-- Named slots -->
  <BaseLayout>
    <template v-slot:header>
      Header content
    </template>

    <template v-slot:default>
      Default slot content
    </template>

    <template v-slot:footer>
      Footer content
    </template>
  </BaseLayout>

  <!-- Named slot that receives props -->
  <InfiniteScroll>
    <template v-slot:item="slotProps">
      <div class="item">
        {{ slotProps.item.text }}
      </div>
    </template>
  </InfiniteScroll>

  <!-- Default slot that receive props, with destructuring -->
  <Mouse v-slot="{ x, y }">
    Mouse position: {{ x }}, {{ y }}
  </Mouse>
  ```

- **Qarang**
  - [Components - Slots](/guide/components/slots)

## v-pre {#v-pre}

Bu element va uning barcha farzandlari uchun kompilyatsiyani o'tkazib yuborish.

- **Ifoda kutilmaydi**

- **Tafsilotlar**

  `v-pre` bilan element ichida, barcha Vue shablon sintaksisi saqlanadi va o'z holatida render qilinadi. Buning eng keng tarqalgan ishlatilishi - xom mustache teglarini ko'rsatish.

- **Misol**

  ```vue-html
  <span v-pre>{{ this will not be compiled }}</span>
  ```

## v-once {#v-once}

Element va komponentni faqat bir marta render qilish va kelajakdagi yangilanishlarni o'tkazib yuborish.

- **Ifoda kutilmaydi**

- **Tafsilotlar**

  Keyingi qayta renderlarda, element/komponent va uning barcha farzandlari statik mazmun sifatida ko'rib chiqiladi va o'tkazib yuboriladi. Bu yangilash ishlashini optimallashtirish uchun ishlatilishi mumkin.

  ```vue-html
  <!-- single element -->
  <span v-once>This will never change: {{msg}}</span>
  <!-- the element have children -->
  <div v-once>
    <h1>Comment</h1>
    <p>{{msg}}</p>
  </div>
  <!-- component -->
  <MyComponent v-once :comment="msg"></MyComponent>
  <!-- `v-for` directive -->
  <ul>
    <li v-for="i in list" v-once>{{i}}</li>
  </ul>
  ```

  3.2 dan beri, siz shuningdek [`v-memo`](#v-memo) yordamida invalidation shartlari bilan shablonning bir qismini memoize qilishingiz mumkin.

- **Qarang**
  - [Data Binding Syntax - interpolations](/guide/essentials/template-syntax#text-interpolation)
  - [v-memo](#v-memo)

## v-memo {#v-memo}

- Faqat 3.2+ da qo'llab-quvvatlanadi

- **Kutiladi:** `any[]`

- **Tafsilotlar**

  Shablonning pastki daraxtini memoize qilish. Elementlar va komponentlarda ishlatilishi mumkin. Direktiva memoization uchun taqqoslash uchun bog'liqlik qiymatlarining qat'iy uzunlikdagi massivini kutadi. Agar massivdagi har bir qiymat oxirgi render bilan bir xil bo'lsa, butun pastki daraxt uchun yangilanishlar o'tkazib yuboriladi. Masalan:

  ```vue-html
  <div v-memo="[valueA, valueB]">
    ...
  </div>
  ```

  Komponent qayta render qilinganda, agar `valueA` va `valueB` bir xil bo'lsa, bu `<div>` va uning farzandlari uchun barcha yangilanishlar o'tkazib yuboriladi. Aslida, memoized nusxasi qayta ishlatilishi mumkin bo'lgani uchun Virtual DOM VNode yaratish ham o'tkazib yuboriladi.

  Memoization massivini to'g'ri belgilash muhim, aks holda biz haqiqatan ham qo'llanilishi kerak bo'lgan yangilanishlarni o'tkazib yubormaslik uchun to'g'ri bog'liqlik massivlarini belgilash kerak. Bo'sh bog'liqlik massivi (`v-memo="[]"`) bilan `v-memo` funksional jihatdan `v-once` ga teng bo'ladi.

  **`v-for` bilan ishlatish**

  `v-memo` faqat ishlash kritik holatlarda mikro optimizatsiyalar uchun taqdim etiladi va kamdan-kam kerak bo'lishi kerak. Bu foydali bo'lishi mumkin bo'lgan eng keng tarqalgan holat - katta `v-for` ro'yxatlarini render qilishda (bu yerda `length > 1000`):

  ```vue-html
  <div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
    <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
    <p>...more child nodes</p>
  </div>
  ```

  Komponentning `selected` holati o'zgarganda, ko'p elementlar aynan bir xil bo'lsa ham, ko'p miqdordagi VNode'lar yaratiladi. Bu yerda `v-memo` ishlatilishi asosan "faqat bu element tanlanmaganidan tanlanganiga yoki aksincha o'zgarganda yangilang" degan ma'noni anglatadi. Bu har bir ta'sirlanmagan elementga o'zining oldingi VNode'ini qayta ishlatish va diffingni butunlay o'tkazib yuborish imkonini beradi. Eslatma: bu yerda `item.id`ni memo bog'liqlik massiviga kiritishimiz shart emas, chunki Vue uni elementning `:key`idan avtomatik ravishda aniqlaydi.

  :::warning
  `v-for` bilan `v-memo`ni ishlatganda, ular bir xil elementda ishlatilganligiga ishonch hosil qiling. **`v-memo` `v-for` ichida ishlamaydi.**
  :::

  `v-memo` shuningdek, bola komponenti yangilanish tekshiruvi de-optimize qilingan ma'lum chekka holatlarda istalmagan yangilanishlarni qo'lda oldini olish uchun komponentlarda ishlatilishi mumkin. Lekin yana bir bor, kerakli yangilanishlarni o'tkazib yubormaslik uchun to'g'ri bog'liqlik massivlarini belgilash - bu ishlab chiquvchining mas'uliyatidir.

- **Qarang**
  - [v-once](#v-once)

## v-cloak {#v-cloak}

Tayyor bo'lgunga qadar kompilyatsiya qilinmagan shablonni yashirish uchun ishlatiladi.

- **Ifoda kutilmaydi**

- **Tafsilotlar**

  **Bu direktiva faqat no-build-step sozlamalarida kerak.**

  in-DOM shablonlarini ishlatganda, "kompilyatsiya qilinmagan shablonlar chaqnashi" bo'lishi mumkin: foydalanuvchi komponent o'rnatilgunga qadar xom mustache teglarini ko'rishi mumkin.

  `v-cloak` tegishli komponent instansiyasi o'rnatilgunga qadar elementda qoladi. `[v-cloak] { display: none }` kabi CSS qoidalari bilan birgalikda, komponent tayyor bo'lgunga qadar xom shablonlarni yashirish uchun ishlatilishi mumkin.

- **Misol**

  ```css
  [v-cloak] {
    display: none;
  }
  ```

  ```vue-html
  <div v-cloak>
    {{ message }}
  </div>
  ```

  `<div>` kompilyatsiya tugagunga qadar ko'rinmaydi.
