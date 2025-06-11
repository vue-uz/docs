# Options: Holat {#options-state}

## data {#data}

Komponent instansiyasi uchun boshlang'ich reaktiv holatni qaytaradigan funksiya.

- **Turi**

  ```ts
  interface ComponentOptions {
    data?(
      this: ComponentPublicInstance,
      vm: ComponentPublicInstance
    ): object
  }
  ```

- **Tafsilotlar**

  Funksiya oddiy JavaScript obyektini qaytarishi kutiladi, u Vue tomonidan reaktiv qilinadi. Instansiya yaratilgandan so'ng, reaktiv ma'lumotlar obyektiga `this.$data` orqali kirish mumkin. Komponent instansiyasi, shuningdek, ma'lumotlar obyektida topilgan barcha xususiyatlarni proxy qiladi, shuning uchun `this.a` `this.$data.a`ga ekvivalent bo'ladi.

  Barcha yuqori darajadagi ma'lumotlar xususiyatlari qaytarilgan ma'lumotlar obyektida kiritilishi kerak. `this.$data`ga yangi xususiyatlarni qo'shish mumkin, lekin bu **tavsiya etilmaydi**. Agar xususiyatning kerakli qiymati hali mavjud bo'lmasa, u holda `undefined` yoki `null` kabi bo'sh qiymat Vue xususiyat mavjudligini bilishi uchun placeholder sifatida kiritilishi kerak.

  `_` yoki `$` bilan boshlanadigan xususiyatlar komponent instansiyasida **proxy qilinmaydi**, chunki ular Vue'ning ichki xususiyatlari va API metodlari bilan to'qnashishi mumkin. Ularga `this.$data._property` orqali kirish kerak bo'ladi.

  Brauzer API obyektlari va prototip xususiyatlari kabi o'zining holatli xatti-harakati bo'lgan obyektlarni qaytarish **tavsiya etilmaydi**. Qaytarilgan obyekt ideal holda faqat komponentning holatini ifodalovchi oddiy obyekt bo'lishi kerak.

- **Misol**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    created() {
      console.log(this.a) // 1
      console.log(this.$data) // { a: 1 }
    }
  }
  ```

  E'tibor bering, agar siz `data` xususiyati bilan o'q funksiyasini ishlatsangiz, `this` komponentning instansiyasi bo'lmaydi, lekin siz hali ham instansiyaga funksiyaning birinchi argumenti sifatida kirishingiz mumkin:

  ```js
  data: (vm) => ({ a: vm.myProp })
  ```

- **Qarang** [Reaktivlik Chuqurligi](/guide/extras/reactivity-in-depth)

## props {#props}

Komponentning props'larini e'lon qiladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    props?: ArrayPropsOptions | ObjectPropsOptions
  }

  type ArrayPropsOptions = string[]

  type ObjectPropsOptions = { [key: string]: Prop }

  type Prop<T = any> = PropOptions<T> | PropType<T> | null

  interface PropOptions<T> {
    type?: PropType<T>
    required?: boolean
    default?: T | ((rawProps: object) => T)
    validator?: (value: unknown, rawProps: object) => boolean
  }

  type PropType<T> = { new (): T } | { new (): T }[]
  ```

  > O'qish osonligi uchun turlar soddalashtirilgan.

- **Tafsilotlar**

  Vue'da barcha komponent props'lari aniq e'lon qilinishi kerak. Komponent props'lari ikki formada e'lon qilinishi mumkin:

  - String massividan foydalangan holda oddiy forma
  - Har bir xususiyat kaliti prop nomi va qiymati prop turi (konstruktor funksiyasi) yoki rivojlangan opsiyalar bo'lgan obyekt yordamida to'liq forma.

  Obyektga asoslangan sintaksis bilan, har bir prop quyidagi opsiyalarni qo'shimcha aniqlashi mumkin:

  - **`type`**: Quyidagi mahalliy konstruktorlardan biri bo'lishi mumkin: `String`, `Number`, `Boolean`, `Array`, `Object`, `Date`, `Function`, `Symbol`, har qanday maxsus konstruktor funksiyasi yoki ularning massivi. Ishlab chiqish rejimida, Vue prop qiymati e'lon qilingan turga mos kelishini tekshiradi va mos kelmasa ogohlantirish chiqaradi. Batafsil ma'lumot uchun [Prop Tekshiruvi](/guide/components/props#prop-validation)ni ko'ring.

    Shuningdek, `Boolean` turidagi prop ham ishlab chiqish, ham ishlab chiqarish rejimlarida uning qiymat konvertatsiya xatti-harakatiga ta'sir qilishini unutmang. Batafsil ma'lumot uchun [Boolean Konvertatsiyasi](/guide/components/props#boolean-casting)ni ko'ring.

  - **`default`**: Prop ota-onadan o'tkazilmaganda yoki `undefined` qiymatga ega bo'lganda uning standart qiymatini belgilaydi. Obyekt yoki massiv standartlari fabrika funksiyasi yordamida qaytarilishi kerak. Fabrika funksiyasi ham xom props obyektini argument sifatida oladi.

  - **`required`**: Prop talab qilinishini aniqlaydi. Ishlab chiqarish bo'lmagan muhitda, agar bu qiymat rost bo'lsa va prop o'tkazilmasa, konsol ogohlantirishi chiqariladi.

  - **`validator`**: Prop qiymati va props obyektini argumentlar sifatida oladigan maxsus validator funksiyasi. Ishlab chiqish rejimida, agar bu funksiya noto'g'ri qiymat qaytarsa (ya'ni tekshiruv muvaffaqiyatsiz bo'lsa), konsol ogohlantirishi chiqariladi.

- **Misol**

  Oddiy e'lon:

  ```js
  export default {
    props: ['size', 'myMessage']
  }
  ```

  Tekshiruvlar bilan obyekt e'lon:

  ```js
  export default {
    props: {
      // tur tekshiruvi
      height: Number,
      // tur tekshiruvi va boshqa tekshiruvlar
      age: {
        type: Number,
        default: 0,
        required: true,
        validator: (value) => {
          return value >= 0
        }
      }
    }
  }
  ```

- **Qarang**
  - [Guide - Props](/guide/components/props)
  - [Guide - Komponent Props'larini Tiplash](/guide/typescript/options-api#typing-component-props) <sup class="vt-badge ts" />

## computed {#computed}

Komponent instansiyasida taqdim etiladigan hisoblangan xususiyatlarni e'lon qiladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    computed?: {
      [key: string]: ComputedGetter<any> | WritableComputedOptions<any>
    }
  }

  type ComputedGetter<T> = (
    this: ComponentPublicInstance,
    vm: ComponentPublicInstance
  ) => T

  type ComputedSetter<T> = (
    this: ComponentPublicInstance,
    value: T
  ) => void

  type WritableComputedOptions<T> = {
    get: ComputedGetter<T>
    set: ComputedSetter<T>
  }
  ```

- **Tafsilotlar**

  Opsiya kaliti hisoblangan xususiyat nomi va qiymati hisoblangan getter yoki `get` va `set` metodlariga ega obyektni qabul qiladi.

  Barcha getter va setter'lar o'zlarining `this` kontekstini avtomatik ravishda komponent instansiyasiga bog'laydi.

  E'tibor bering, agar siz hisoblangan xususiyat bilan o'q funksiyasini ishlatsangiz, `this` komponentning instansiyasiga ishora qilmaydi, lekin siz hali ham instansiyaga funksiyaning birinchi argumenti sifatida kirishingiz mumkin:

  ```js
  export default {
    computed: {
      aDouble: (vm) => vm.a * 2
    }
  }
  ```

- **Misol**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    computed: {
      // faqat o'qish uchun
      aDouble() {
        return this.a * 2
      },
      // yozish mumkin
      aPlus: {
        get() {
          return this.a + 1
        },
        set(v) {
          this.a = v - 1
        }
      }
    },
    created() {
      console.log(this.aDouble) // => 2
      console.log(this.aPlus) // => 2

      this.aPlus = 3
      console.log(this.a) // => 2
      console.log(this.aDouble) // => 4
    }
  }
  ```

- **Qarang**
  - [Guide - Hisoblangan Xususiyatlar](/guide/essentials/computed)
  - [Guide - Hisoblangan Xususiyatlarni Tiplash](/guide/typescript/options-api#typing-computed-properties) <sup class="vt-badge ts" />

## methods {#methods}

Komponent instansiyasiga aralashadigan metodlarni e'lon qiladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    methods?: {
      [key: string]: (this: ComponentPublicInstance, ...args: any[]) => any
    }
  }
  ```

- **Tafsilotlar**

  E'lon qilingan metodlarga komponent instansiyasida to'g'ridan-to'g'ri kirish yoki shablon ifodalarida ishlatish mumkin. Barcha metodlar o'zlarining `this` kontekstini avtomatik ravishda komponent instansiyasiga bog'laydi, hatto ular o'tkazilganda ham.

  Metodlarni e'lon qilishda o'q funksiyalarini ishlatishdan saqlaning, chunki ular `this` orqali komponent instansiyasiga kirish imkoniyatiga ega bo'lmaydi.

- **Misol**

  ```js
  export default {
    data() {
      return { a: 1 }
    },
    methods: {
      plus() {
        this.a++
      }
    },
    created() {
      this.plus()
      console.log(this.a) // => 2
    }
  }
  ```

## watch {#watch}

Ma'lumotlar o'zgarganda chaqiriladigan kuzatuv callback'larini e'lon qiladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    watch?: {
      [key: string]: WatchOptionItem | WatchOptionItem[]
    }
  }

  type WatchOptionItem = string | WatchCallback | ObjectWatchOptionItem

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type ObjectWatchOptionItem = {
    handler: WatchCallback | string
    immediate?: boolean // default: false
    deep?: boolean // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }
  ```

  > O'qish osonligi uchun turlar soddalashtirilgan.

- **Tafsilotlar**

  `watch` opsiyasi kalitlari kuzatiladigan reaktiv komponent instansiya xususiyatlari (masalan, `data` yoki `computed` orqali e'lon qilingan xususiyatlar) va qiymatlari mos keladigan callback'lar bo'lgan obyektni kutadi. Callback kuzatilayotgan manbaning yangi qiymati va eski qiymatini oladi.

  Yuqori darajadagi xususiyatdan tashqari, kalit oddiy nuqta bilan ajratilgan yo'l ham bo'lishi mumkin, masalan `a.b.c`. E'tibor bering, bu ishlatish **murakkab ifodalarni** qo'llab-quvvatlamaydi - faqat nuqta bilan ajratilgan yo'llar qo'llab-quvvatlanadi. Agar siz murakkab ma'lumotlar manbalarini kuzatishni xohlasangiz, buning o'rniga buyruq beruvchi [`$watch()`](/api/component-instance#watch) API'ni ishlating.

  Qiymat `methods` orqali e'lon qilingan metod nomi string'i yoki qo'shimcha opsiyalarni o'z ichiga olgan obyekt ham bo'lishi mumkin. Obyekt sintaksisini ishlatganda, callback `handler` maydoni ostida e'lon qilinishi kerak. Qo'shimcha opsiyalar quyidagilarni o'z ichiga oladi:

  - **`immediate`**: kuzatuvchi yaratilganda callback'ni darhol ishga tushirish. Birinchi chaqiruvda eski qiymat `undefined` bo'ladi.
  - **`deep`**: agar manba obyekt yoki massiv bo'lsa, uning chuqur ko'rib chiqilishini majburlash, shunda callback chuqur o'zgarishlarda ishga tushadi. [Chuqur Kuzatuvchilar](/guide/essentials/watchers#deep-watchers)ni ko'ring.
  - **`flush`**: callback'ning flush vaqtini sozlash. [Callback Flush Vaqti](/guide/essentials/watchers#callback-flush-timing) va [`watchEffect()`](/api/reactivity-core#watcheffect)ni ko'ring.
  - **`onTrack / onTrigger`**: kuzatuvchining bog'liqliklarini debug qilish. [Kuzatuvchi Debugging](/guide/extras/reactivity-in-depth#watcher-debugging)ni ko'ring.

  Kuzatuv callback'larini e'lon qilishda o'q funksiyalarini ishlatishdan saqlaning, chunki ular `this` orqali komponent instansiyasiga kirish imkoniyatiga ega bo'lmaydi.

- **Misol**

  ```js
  export default {
    data() {
      return {
        a: 1,
        b: 2,
        c: {
          d: 4
        },
        e: 5,
        f: 6
      }
    },
    watch: {
      // yuqori darajadagi xususiyatni kuzatish
      a(val, oldVal) {
        console.log(`new: ${val}, old: ${oldVal}`)
      },
      // string metod nomi
      b: 'someMethod',
      // callback kuzatilayotgan obyektning har qanday xususiyati o'zgarganda, ularning ichki chuqurligidan qat'i nazar, chaqiriladi
      c: {
        handler(val, oldVal) {
          console.log('c changed')
        },
        deep: true
      },
      // bitta ichki xususiyatni kuzatish:
      'c.d': function (val, oldVal) {
        // biror narsa qilish
      },
      // callback kuzatish boshlangandan keyin darhol chaqiriladi
      e: {
        handler(val, oldVal) {
          console.log('e changed')
        },
        immediate: true
      },
      // callback'lar massivini o'tkazishingiz mumkin, ular birma-bir chaqiriladi
      f: [
        'handle1',
        function handle2(val, oldVal) {
          console.log('handle2 triggered')
        },
        {
          handler: function handle3(val, oldVal) {
            console.log('handle3 triggered')
          }
          /* ... */
        }
      ]
    },
    methods: {
      someMethod() {
        console.log('b changed')
      },
      handle1() {
        console.log('handle 1 triggered')
      }
    },
    created() {
      this.a = 3 // => new: 3, old: 1
    }
  }
  ```

- **Qarang** [Kuzatuvchilar](/guide/essentials/watchers)

## emits {#emits}

Komponent tomonidan chiqariladigan maxsus hodisalarni e'lon qiladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    emits?: ArrayEmitsOptions | ObjectEmitsOptions
  }

  type ArrayEmitsOptions = string[]

  type ObjectEmitsOptions = { [key: string]: EmitValidator | null }

  type EmitValidator = (...args: unknown[]) => boolean
  ```

- **Tafsilotlar**

  Chiqarilgan hodisalar ikki formada e'lon qilinishi mumkin:

  - String massividan foydalangan holda oddiy forma
  - Har bir xususiyat kaliti hodisa nomi va qiymati `null` yoki validator funksiyasi bo'lgan obyekt yordamida to'liq forma.

  Tekshiruv funksiyasi komponentning `$emit` chaqiruviga o'tkazilgan qo'shimcha argumentlarni oladi. Masalan, agar `this.$emit('foo', 1)` chaqirilsa, `foo` uchun mos keladigan validator `1` argumentini oladi. Validator funksiyasi hodisa argumentlari to'g'ri ekanligini ko'rsatish uchun boolean qaytarishi kerak.

  E'tibor bering, `emits` opsiyasi qaysi hodisa tinglovchilari komponent hodisa tinglovchilari hisoblanishini ta'sir qiladi, mahalliy DOM hodisa tinglovchilari emas. E'lon qilingan hodisalar uchun tinglovchilar komponentning `$attrs` obyektidan olib tashlanadi, shuning uchun ular komponentning root elementi orqali o'tkazilmaydi. Batafsil ma'lumot uchun [Fallthrough Xususiyatlar](/guide/components/attrs)ni ko'ring.

- **Misol**

  Massiv sintaksisi:

  ```js
  export default {
    emits: ['check'],
    created() {
      this.$emit('check')
    }
  }
  ```

  Obyekt sintaksisi:

  ```js
  export default {
    emits: {
      // tekshiruv yo'q
      click: null,

      // tekshiruv bilan
      submit: (payload) => {
        if (payload.email && payload.password) {
          return true
        } else {
          console.warn(`Invalid submit event payload!`)
          return false
        }
      }
    }
  }
  ```

- **Qarang**
  - [Guide - Fallthrough Xususiyatlar](/guide/components/attrs)
  - [Guide - Komponent Emits'larini Tiplash](/guide/typescript/options-api#typing-component-emits) <sup class="vt-badge ts" />

## expose {#expose}

Komponent instansiyasiga ota-onadan template refs orqali kirilganda taqdim etiladigan ommaviy xususiyatlarni e'lon qiladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    expose?: string[]
  }
  ```

- **Tafsilotlar**

  Standart bo'yicha, komponent instansiyasi `$parent`, `$root` yoki template refs orqali kirilganda barcha instansiya xususiyatlarini ota-onaga taqdim etadi. Bu istalmagan bo'lishi mumkin, chunki komponent ko'pincha qattiq bog'lanishni oldini olish uchun maxfiy saqlanishi kerak bo'lgan ichki holat yoki metodlarga ega.

  `expose` opsiyasi xususiyat nomlari string'larining ro'yxatini kutadi. `expose` ishlatilganda, faqat aniq ro'yxatga kiritilgan xususiyatlar komponentning ommaviy instansiyasida taqdim etiladi.

  `expose` faqat foydalanuvchi tomonidan aniqlangan xususiyatlarni ta'sir qiladi - u o'rnatilgan komponent instansiya xususiyatlarini filtrlashni amalga oshirmaydi.

- **Misol**

  ```js
  export default {
    // faqat `publicMethod` ommaviy instansiyada mavjud bo'ladi
    expose: ['publicMethod'],
    methods: {
      publicMethod() {
        // ...
      },
      privateMethod() {
        // ...
      }
    }
  }
  ```
