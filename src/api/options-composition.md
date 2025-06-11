# Options: Kompozitsiya {#options-composition}

## provide {#provide}

Avlod komponentlari tomonidan in'ektsiya qilish mumkin bo'lgan qiymatlarni ta'minlaydi.

- **Turi**

  ```ts
  interface ComponentOptions {
    provide?: object | ((this: ComponentPublicInstance) => object)
  }
  ```

- **Tafsilotlar**

  `provide` va [`inject`](#inject) birgalikda ishlatiladi, bu esa ajdod komponentiga uning barcha avlodlari uchun bog'liqlik in'ektsiyasi sifatida xizmat qilish imkonini beradi, ular bir xil ota-ona zanjirida bo'lsa, komponent ierarxiyasi qanchalik chuqur bo'lishidan qat'i nazar.

  `provide` opsiyasi ob'ekt yoki ob'ekt qaytaradigan funksiya bo'lishi kerak. Bu ob'ekt uning avlodlariga in'ektsiya qilish uchun mavjud bo'lgan xususiyatlarni o'z ichiga oladi. Bu ob'ektda kalitlar sifatida Symbol'lardan foydalanishingiz mumkin.

- **Misol**

  Asosiy foydalanish:

  ```js
  const s = Symbol()

  export default {
    provide: {
      foo: 'foo',
      [s]: 'bar'
    }
  }
  ```

  Har bir komponent holatini ta'minlash uchun funksiyadan foydalanish:

  ```js
  export default {
    data() {
      return {
        msg: 'foo'
      }
    }
    provide() {
      return {
        msg: this.msg
      }
    }
  }
  ```

  Yuqoridagi misolda, ta'minlangan `msg` reaktiv bo'lmaydi. Batafsil ma'lumot uchun [Reaktivlik bilan ishlash](/guide/components/provide-inject#working-with-reactivity) ga qarang.

- **Qarang** [Provide / Inject](/guide/components/provide-inject)

## inject {#inject}

Ajdod provayderlaridan topish orqali joriy komponentga in'ektsiya qilish uchun xususiyatlarni e'lon qiladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    inject?: ArrayInjectOptions | ObjectInjectOptions
  }

  type ArrayInjectOptions = string[]

  type ObjectInjectOptions = {
    [key: string | symbol]:
      | string
      | symbol
      | { from?: string | symbol; default?: any }
  }
  ```

- **Tafsilotlar**

  `inject` opsiyasi quyidagilardan biri bo'lishi kerak:

  - Stringlar massivi, yoki
  - Kalitlar mahalliy bog'lash nomi va qiymat quyidagilardan biri bo'lgan ob'ekt:
    - Mavjud in'ektsiyalarda qidirish uchun kalit (string yoki Symbol), yoki
    - Quyidagilarni o'z ichiga olgan ob'ekt:
      - `from` xususiyati mavjud in'ektsiyalarda qidirish uchun kalit (string yoki Symbol), va
      - `default` xususiyati zaxira qiymati sifatida ishlatiladi. Props default qiymatlariga o'xshab, ob'ekt turlari uchun qiymatni bir nechta komponent instansiyalari o'rtasida baham ko'rishdan saqlash uchun fabrika funksiyasi kerak.

  Agar mos keladigan xususiyat yoki default qiymat ta'minlanmagan bo'lsa, in'ektsiya qilingan xususiyat `undefined` bo'ladi.

  E'tibor bering, in'ektsiya qilingan bog'lamalar reaktiv EMAS. Bu atayin qilingan. Biroq, agar in'ektsiya qilingan qiymat reaktiv ob'ekt bo'lsa, o'sha ob'ektning xususiyatlari reaktiv bo'lib qoladi. Batafsil ma'lumot uchun [Reaktivlik bilan ishlash](/guide/components/provide-inject#working-with-reactivity) ga qarang.

- **Misol**

  Asosiy foydalanish:

  ```js
  export default {
    inject: ['foo'],
    created() {
      console.log(this.foo)
    }
  }
  ```

  In'ektsiya qilingan qiymatni prop uchun default sifatida ishlatish:

  ```js
  const Child = {
    inject: ['foo'],
    props: {
      bar: {
        default() {
          return this.foo
        }
      }
    }
  }
  ```

  In'ektsiya qilingan qiymatni ma'lumotlar kirishi sifatida ishlatish:

  ```js
  const Child = {
    inject: ['foo'],
    data() {
      return {
        bar: this.foo
      }
    }
  }
  ```

  In'ektsiyalar default qiymat bilan ixtiyoriy bo'lishi mumkin:

  ```js
  const Child = {
    inject: {
      foo: { default: 'foo' }
    }
  }
  ```

  Agar u boshqa nomli xususiyatdan in'ektsiya qilish kerak bo'lsa, manba xususiyatini belgilash uchun `from` dan foydalaning:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: 'foo'
      }
    }
  }
  ```

  Prop defaultlariga o'xshab, primitiv bo'lmagan qiymatlar uchun fabrika funksiyasidan foydalanish kerak:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: () => [1, 2, 3]
      }
    }
  }
  ```

- **Qarang** [Provide / Inject](/guide/components/provide-inject)

## mixins {#mixins}

Joriy komponentga aralashish uchun opsiya ob'ektlari massivi.

- **Turi**

  ```ts
  interface ComponentOptions {
    mixins?: ComponentOptions[]
  }
  ```

- **Tafsilotlar**

  `mixins` opsiyasi mixin ob'ektlari massivini qabul qiladi. Bu mixin ob'ektlari oddiy instansiya ob'ektlari kabi instansiya opsiyalarini o'z ichiga olishi mumkin va ular ma'lum bir opsiya birlashtirish mantiqidan foydalangan holda yakuniy opsiyalarga qarshi birlashtiriladi. Masalan, agar sizning mixiningiz `created` hook'ini o'z ichiga olsa va komponentning o'zida ham bitta bo'lsa, ikkala funksiya ham chaqiriladi.

  Mixin hook'lari ular ta'minlangan tartibda chaqiriladi va komponentning o'z hook'laridan oldin chaqiriladi.

  :::warning Endi Tavsiya Etilmaydi
  Vue 2 da mixinlar komponent mantiqining qayta ishlatiladigan qismlarini yaratishning asosiy mexanizmi edi. Vue 3 da mixinlar qo'llab-quvvatlansa-da, [Composition API yordamida Composable funksiyalar](/guide/reusability/composables) endi komponentlar o'rtasida kodni qayta ishlatish uchun afzal usul hisoblanadi.
  :::

- **Misol**

  ```js
  const mixin = {
    created() {
      console.log(1)
    }
  }

  createApp({
    created() {
      console.log(2)
    },
    mixins: [mixin]
  })

  // => 1
  // => 2
  ```

## extends {#extends}

Kengaytirish uchun "asosiy sinf" komponenti.

- **Turi**

  ```ts
  interface ComponentOptions {
    extends?: ComponentOptions
  }
  ```

- **Tafsilotlar**

  Bir komponentga boshqasini kengaytirish va uning komponent opsiyalarini meros olish imkonini beradi.

  Amalga oshirish nuqtai nazaridan, `extends` deyarli `mixins` bilan bir xil. `extends` tomonidan ko'rsatilgan komponent birinchi mixin bo'lgandek muomala qilinadi.

  Biroq, `extends` va `mixins` turli xil maqsadlarni ifodalaydi. `mixins` opsiyasi asosan funksionallik qismlarini tuzish uchun ishlatiladi, `extends` esa asosan meros olish bilan bog'liq.

  `mixins` bilan bir xil, har qanday opsiyalar (`setup()` dan tashqari) tegishli birlashtirish strategiyasidan foydalangan holda birlashtiriladi.

- **Misol**

  ```js
  const CompA = { ... }

  const CompB = {
    extends: CompA,
    ...
  }
  ```

  :::warning Composition API uchun Tavsiya Etilmaydi
  `extends` Options API uchun mo'ljallangan va `setup()` hook'ini birlashtirishni boshqarmaydi.

  Composition API da mantiqni qayta ishlatish uchun afzal model "meros" emas, balki "kompozitsiya" hisoblanadi. Agar sizda bir komponentdan boshqasida qayta ishlatilishi kerak bo'lgan mantiq bo'lsa, tegishli mantiqni [Composable](/guide/reusability/composables#composables) ga ajratishni ko'rib chiqing.

  Agar siz hali ham Composition API yordamida komponentni "kengaytirish" niyatida bo'lsangiz, kengaytiruvchi komponentning `setup()` da asosiy komponentning `setup()` ni chaqirishingiz mumkin:

  ```js
  import Base from './Base.js'
  export default {
    extends: Base,
    setup(props, ctx) {
      return {
        ...Base.setup(props, ctx),
        // mahalliy bog'lamalar
      }
    }
  }
  ```
  :::
