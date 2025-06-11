# O'rnatilgan Maxsus Atributlar {#built-in-special-attributes}

## key {#key}

`key` maxsus atributi asosan Vue'ning virtual DOM algoritmi uchun eski tugunlar ro'yxatini yangi tugunlar ro'yxati bilan solishtirganda vnode'larni aniqlash uchun maslahat sifatida ishlatiladi.

- **Kutiladi:** `number | string | symbol`

- **Tafsilotlar**

  Kalitlarsiz, Vue elementlarning harakatini minimallashtiradigan va bir xil turdagi elementlarni iloji boricha joyida yamalash/qayta ishlatishga harakat qiladigan algoritmdan foydalanadi. Kalitlar bilan, u elementlarni kalitlarning tartib o'zgarishi asosida qayta tartiblaydi va endi mavjud bo'lmagan kalitlarga ega elementlar har doim olib tashlanadi/yemiriladi.

  Bir xil umumiy ota-onaning farzandlari **nozik kalitlarga** ega bo'lishi kerak. Takrorlanuvchi kalitlar render xatolariga olib keladi.

  Eng keng tarqalgan ishlatilish holati `v-for` bilan birgalikda:

  ```vue-html
  <ul>
    <li v-for="item in items" :key="item.id">...</li>
  </ul>
  ```

  U element/komponentni qayta ishlatish o'rniga almashtirishni majburlash uchun ham ishlatilishi mumkin. Bu quyidagi holatlarda foydali bo'lishi mumkin:

  - Komponentning hayot aylanishi hook'larini to'g'ri ishga tushirish
  - O'tishlarni ishga tushirish

  Masalan:

  ```vue-html
  <transition>
    <span :key="text">{{ text }}</span>
  </transition>
  ```

  `text` o'zgarganda, `<span>` har doim yamalanadi o'rniga almashtiriladi, shuning uchun o'tish ishga tushadi.

- **Qarang** [Guide - List Rendering - Maintaining State with `key`](/guide/essentials/list#maintaining-state-with-key)

## ref {#ref}

[Template ref](/guide/essentials/template-refs)ni belgilaydi.

- **Kutiladi:** `string | Function`

- **Tafsilotlar**

  `ref` element yoki farzand komponentga havolani ro'yxatdan o'tkazish uchun ishlatiladi.

  Options API'da, havola komponentning `this.$refs` ob'ekti ostida ro'yxatdan o'tkaziladi:

  ```vue-html
  <!-- this.$refs.p sifatida saqlanadi -->
  <p ref="p">hello</p>
  ```

  Composition API'da, havola mos keladigan nomdagi ref'da saqlanadi:

  ```vue
  <script setup>
  import { useTemplateRef } from 'vue'

  const pRef = useTemplateRef('p')
  </script>

  <template>
    <p ref="p">hello</p>
  </template>
  ```

  Agar oddiy DOM elementida ishlatilsa, havola o'sha element bo'ladi; agar farzand komponentida ishlatilsa, havola farzand komponenti instansiyasi bo'ladi.

  Alternativ ravishda `ref` havolani qayerda saqlashni to'liq nazorat qilish imkonini beruvchi funksiya qiymatini qabul qilishi mumkin:

  ```vue-html
  <ChildComponent :ref="(el) => child = el" />
  ```

  Ref ro'yxatdan o'tkazish vaqti haqida muhim eslatma: ref'lar o'zlari render funksiyasi natijasi sifatida yaratilgani uchun, ularga kirishdan oldin komponent mount qilinganini kutishingiz kerak.

  `this.$refs` ham reaktiv emas, shuning uchun uni ma'lumotlar bog'lash uchun shablonlarda ishlatishga harakat qilmang.

- **Qarang**
  - [Guide - Template Refs](/guide/essentials/template-refs)
  - [Guide - Typing Template Refs](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />
  - [Guide - Typing Component Template Refs](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />

## is {#is}

[Dinamik komponentlar](/guide/essentials/component-basics#dynamic-components)ni bog'lash uchun ishlatiladi.

- **Kutiladi:** `string | Component`

- **Asosiy elementlarda ishlatish**
 
  - Faqat 3.1+ versiyasida qo'llab-quvvatlanadi

  `is` atributi asosiy HTML elementida ishlatilganda, u [Customized built-in element](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-customized-builtin-example) sifatida talqin qilinadi, bu asosiy web platforma xususiyati.

  Biroq, [in-DOM Template Parsing Caveats](/guide/essentials/component-basics#in-dom-template-parsing-caveats)da tushuntirilganidek, Vue'ning asosiy elementni Vue komponenti bilan almashtirishi kerak bo'lgan holat mavjud. `is` atributining qiymatini `vue:` bilan boshlashingiz mumkin, shunda Vue elementni Vue komponenti sifatida render qiladi:

  ```vue-html
  <table>
    <tr is="vue:my-row-component"></tr>
  </table>
  ```

- **Qarang**

  - [Built-in Special Element - `<component>`](/api/built-in-special-elements#component)
  - [Dynamic Components](/guide/essentials/component-basics#dynamic-components)
