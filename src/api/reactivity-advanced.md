# Reactivity API: Kengaytirilgan {#reactivity-api-advanced}

## shallowRef() {#shallowref}

[`ref()`](./reactivity-core#ref) ning sathli versiyasi.

- **Turi**

  ```ts
  function shallowRef<T>(value: T): ShallowRef<T>

  interface ShallowRef<T> {
    value: T
  }
  ```

- **Tafsilotlar**

  `ref()` dan farqli ravishda, sathli ref'ning ichki qiymati o'z holatida saqlanadi va ko'rsatiladi va chuqur reaktiv qilinmaydi. Faqat `.value` ga kirish reaktiv hisoblanadi.

  `shallowRef()` odatda katta ma'lumotlar strukturalarining ishlashini optimallashtirish yoki tashqi holat boshqaruv tizimlari bilan integratsiya qilish uchun ishlatiladi.

- **Misol**

  ```js
  const state = shallowRef({ count: 1 })

  // o'zgarishni ishga tushirmaydi
  state.value.count = 2

  // o'zgarishni ishga tushiradi
  state.value = { count: 2 }
  ```

- **Qarang**
  - [Qo'llanma - Katta O'zgarmas Strukturalar uchun Reaktivlik Yukini Kamaytirish](/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures)
  - [Qo'llanma - Tashqi Holat Tizimlari bilan Integratsiya](/guide/extras/reactivity-in-depth#integration-with-external-state-systems)

## triggerRef() {#triggerref}

[shallow ref](#shallowref) ga bog'liq effektlarni majburiy ishga tushirish. Bu odatda sathli ref'ning ichki qiymatiga chuqur o'zgarishlar kiritgandan keyin ishlatiladi.

- **Turi**

  ```ts
  function triggerRef(ref: ShallowRef): void
  ```

- **Misol**

  ```js
  const shallow = shallowRef({
    greet: 'Hello, world'
  })

  // Birinchi marta "Hello, world" ni log qiladi
  watchEffect(() => {
    console.log(shallow.value.greet)
  })

  // Bu effektni ishga tushirmaydi, chunki ref sathli
  shallow.value.greet = 'Hello, universe'

  // "Hello, universe" ni log qiladi
  triggerRef(shallow)
  ```

## customRef() {#customref}

Uning bog'liqliklarini kuzatish va yangilanishlarni ishga tushirish ustidan aniq nazorat bilan maxsus ref yaratadi.

- **Turi**

  ```ts
  function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

  type CustomRefFactory<T> = (
    track: () => void,
    trigger: () => void
  ) => {
    get: () => T
    set: (value: T) => void
  }
  ```

- **Tafsilotlar**

  `customRef()` factory funksiyasini kutadi, u `track` va `trigger` funksiyalarini argument sifatida oladi va `get` va `set` metodlariga ega ob'ektni qaytarishi kerak.

  Umumiy holda, `track()` `get()` ichida chaqirilishi kerak va `trigger()` `set()` ichida chaqirilishi kerak. Biroq, ular qachon chaqirilishi kerakligi yoki umuman chaqirilishi kerakligi haqida to'liq nazoratga egasiz.

- **Misol**

  Oxirgi set chaqiruvidan keyin ma'lum vaqtdan keyin qiymatni yangilaydigan debounced ref yaratish:

  ```js
  import { customRef } from 'vue'

  export function useDebouncedRef(value, delay = 200) {
    let timeout
    return customRef((track, trigger) => {
      return {
        get() {
          track()
          return value
        },
        set(newValue) {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            value = newValue
            trigger()
          }, delay)
        }
      }
    })
  }
  ```

  Komponentda ishlatish:

  ```vue
  <script setup>
  import { useDebouncedRef } from './debouncedRef'
  const text = useDebouncedRef('hello')
  </script>

  <template>
    <input v-model="text" />
  </template>
  ```

  [Playground'da sinab ko'ring](https://play.vuejs.org/#eNplUkFugzAQ/MqKC1SiIekxIpEq9QVV1BMXCguhBdsyaxqE/PcuGAhNfYGd3Z0ZDwzeq1K7zqB39OI205UiaJGMOieiapTUBAOYFt/wUxqRYf6OBVgotGzA30X5Bt59tX4iMilaAsIbwelxMfCvWNfSD+Gw3++fEhFHTpLFuCBsVJ0ScgUQjw6Az+VatY5PiroHo3IeaeHANlkrh7Qg1NBL43cILUmlMAfqVSXK40QUOSYmHAZHZO0KVkIZgu65kTnWp8Qb+4kHEXfjaDXkhd7DTTmuNZ7MsGyzDYbz5CgSgbdppOBFqqT4l0eX1gZDYOm057heOBQYRl81coZVg9LQWGr+IlrchYKAdJp9h0C6KkvUT3A6u8V1dq4ASqRgZnVnWg04/QWYNyYzC2rD5Y3/hkDgz8fY/cOT1ZjqizMZzGY3rDPC12KGZYyd3J26M8ny1KKx7c3X25q1c1wrZN3L9LCMWs/+AmeG6xI=)

  :::warning Ehtiyotkorlik bilan ishlating
  customRef ishlatganda, uning getter'ining qaytarilgan qiymatiga ehtiyotkorlik bilan yondashishimiz kerak, ayniqsa getter har safar ishga tushirilganda yangi ob'ekt ma'lumotlar turini yaratganda. Bu ota-ona va farzand komponentlari o'rtasidagi munosabatlarga ta'sir qiladi, bunday customRef prop sifatida uzatilganda.

  Ota-ona komponentining render funksiyasi boshqa reaktiv holatga o'zgarishlar tufayli ishga tushirilishi mumkin. Qayta renderlash paytida bizning customRef'ning qiymati qayta baholanadi va farzand komponentiga prop sifatida yangi ob'ekt ma'lumotlar turini qaytaradi. Bu prop farzand komponentida uning oxirgi qiymati bilan taqqoslanadi va ular farq qilgani uchun customRef'ning reaktiv bog'liqliklari farzand komponentida ishga tushiriladi. Shu bilan birga, ota-ona komponentidagi reaktiv bog'liqliklar ishga tushirilmaydi, chunki customRef'ning setter'i chaqirilmadi va natijada uning bog'liqliklari ishga tushirilmadi.

  [Playground'da ko'ring](https://play.vuejs.org/#eNqFVEtP3DAQ/itTS9Vm1ZCt1J6WBZUiDvTQIsoNcwiOkzU4tmU7+9Aq/71jO1mCWuhlN/PyfPP45kAujCk2HSdLsnLMCuPBcd+Zc6pEa7T1cADWOa/bW17nYMPPtvRsDT3UVrcww+DZ0flStybpKSkWQQqPU0IVVUwr58FYvdvDWXgpu6ek1pqSHL0fS0vJw/z0xbN1jUPHY/Ys87Zkzzl4K5qG2zmcnUN2oAqg4T6bQ/wENKNXNk+CxWKsSlmLTSk7XlhedYxnWclYDiK+MkQCoK4wnVtnIiBJuuEJNA2qPof7hzkEoc8DXgg9yzYTBBFgNr4xyY4FbaK2p6qfI0iqFgtgulOe27HyQRy69Dk1JXY9C03JIeQ6wg4xWvJCqFpnlNytOcyC2wzYulQNr0Ao+Mhw0KnTTEttl/CIaIJiMz8NGBHFtYetVrPwa58/IL48Zag4N0ssquNYLYBoW16J0vOkC3VQtVqk7cG9QcHz1kj0QAlgVYkNMFk6d0bJ1pbGYKUkmtD42HmvFfi94WhOEiXwjUnBnlEz9OLTJwy5qCo44D4O7en71SIFjI/F9VuG4jEy/GHQKq5hQrJAKOc4uNVighBF5/cygS0GgOMoK+HQb7+EWvLdMM7weVIJy5kXWi0Rj+xaNRhLKRp1IvB9hxYegA6WJ1xkUe9PcF4e9a+suA3YwYiC5MQ79KlFUzw5rZCZEUtoRWuE5PaXCXmxtuWIkpJSSr39EXXHQcWYNWfP/9A/uV3QUXJjueN2E1ZhtPnSIqGS+er3T77D76Ox1VUn0fsd4y3HfewCxuT2vVMVwp74RbTX8WQI1dy5qx12xI1Fpa1K5AreeEHCCN8q/QXul+LrSC3s4nh93jltkVPDIYt5KJkcIKStCReo4rVQ/CZI6dyEzToCCJu7hAtry/1QH/qXncQB400KJwqPxZHxEyona0xS/E3rt1m9Ld1rZl+uhaxecRtP3EjtgddCyimtXyj9H/Ii3eId7uOGTkyk/wOEbQ9h)

  :::

## shallowReactive() {#shallowreactive}

[`reactive()`](./reactivity-core#ref) ning sathli versiyasi.

- **Turi**

  ```ts
  function shallowReactive<T extends object>(target: T): T
  ```

- **Tafsilotlar**

  `reactive()` dan farqli ravishda, chuqur konvertatsiya yo'q: faqat ildiz darajasidagi xususiyatlar sathli reaktiv ob'ekt uchun reaktiv hisoblanadi. Xususiyat qiymatlari o'z holatida saqlanadi va ko'rsatiladi - bu shuningdek ref qiymatlariga ega xususiyatlar avtomatik ravishda ochilmasligini anglatadi.

  :::warning Ehtiyotkorlik bilan ishlating
  Sathli ma'lumotlar strukturalari faqat komponentdagi ildiz darajasidagi holat uchun ishlatilishi kerak. Uni chuqur reaktiv ob'ekt ichida joylashtirishdan saqlaning, chunki bu tushunish va debug qilish qiyin bo'lgan izchil bo'lmagan reaktivlik xatti-harakatiga ega daraxt yaratadi.
  :::

- **Misol**

  ```js
  const state = shallowReactive({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // state'ning o'z xususiyatlarini o'zgartirish reaktiv
  state.foo++

  // ...lekin ichki ob'ektlarni konvertatsiya qilmaydi
  isReactive(state.nested) // false

  // reaktiv emas
  state.nested.bar++
  ```

## shallowReadonly() {#shallowreadonly}

[`readonly()`](./reactivity-core#readonly) ning sathli versiyasi.

- **Turi**

  ```ts
  function shallowReadonly<T extends object>(target: T): Readonly<T>
  ```

- **Tafsilotlar**

  `readonly()` dan farqli ravishda, chuqur konvertatsiya yo'q: faqat ildiz darajasidagi xususiyatlar faqat o'qish uchun qilinadi. Xususiyat qiymatlari o'z holatida saqlanadi va ko'rsatiladi - bu shuningdek ref qiymatlariga ega xususiyatlar avtomatik ravishda ochilmasligini anglatadi.

  :::warning Ehtiyotkorlik bilan ishlating
  Sathli ma'lumotlar strukturalari faqat komponentdagi ildiz darajasidagi holat uchun ishlatilishi kerak. Uni chuqur reaktiv ob'ekt ichida joylashtirishdan saqlaning, chunki bu tushunish va debug qilish qiyin bo'lgan izchil bo'lmagan reaktivlik xatti-harakatiga ega daraxt yaratadi.
  :::

- **Misol**

  ```js
  const state = shallowReadonly({
    foo: 1,
    nested: {
      bar: 2
    }
  })

  // state'ning o'z xususiyatlarini o'zgartirish xatolikni keltirib chiqaradi
  state.foo++

  // ...lekin ichki ob'ektlarda ishlaydi
  isReadonly(state.nested) // false

  // ishlaydi
  state.nested.bar++
  ```

## toRaw() {#toraw}

Vue tomonidan yaratilgan proxy'ning xom, original ob'ektini qaytaradi.

- **Turi**

  ```ts
  function toRaw<T>(proxy: T): T
  ```

- **Tafsilotlar**

  `toRaw()` [`reactive()`](./reactivity-core#reactive), [`readonly()`](./reactivity-core#readonly), [`shallowReactive()`](#shallowreactive) yoki [`shallowReadonly()`](#shallowreadonly) tomonidan yaratilgan proxy'lardan original ob'ektni qaytarishi mumkin.

  Bu proxy kirish / kuzatish yukini o'z ichiga olmasdan vaqtincha o'qish yoki o'zgarishlarni ishga tushirmasdan yozish uchun ishlatilishi mumkin bo'lgan qochish yo'li. Original ob'ektga doimiy havolani saqlash **tavsiya etilmaydi**. Ehtiyotkorlik bilan ishlating.

- **Misol**

  ```js
  const foo = {}
  const reactiveFoo = reactive(foo)

  console.log(toRaw(reactiveFoo) === foo) // true
  ```

## markRaw() {#markraw}

Ob'ektni hech qachon proxy'ga konvertatsiya qilinmasligi uchun belgilaydi. Ob'ektning o'zini qaytaradi.

- **Turi**

  ```ts
  function markRaw<T extends object>(value: T): T
  ```

- **Misol**

  ```js
  const foo = markRaw({})
  console.log(isReactive(reactive(foo))) // false

  // boshqa reaktiv ob'ektlar ichida joylashganda ham ishlaydi
  const bar = reactive({ foo })
  console.log(isReactive(bar.foo)) // false
  ```

  :::warning Ehtiyotkorlik bilan ishlating
  `markRaw()` va `shallowReactive()` kabi sathli API'lar sizga default chuqur reaktiv/faqat o'qish uchun konvertatsiyadan tanlab chiqish va holat grafigingizda xom, proxy qilinmagan ob'ektlarni joylashtirish imkonini beradi. Ular turli sabablarga ko'ra ishlatilishi mumkin:

  - Ba'zi qiymatlar oddiygina reaktiv qilinmasligi kerak, masalan murakkab 3-toifali klass instansi yoki Vue komponent ob'ekti.

  - Proxy konvertatsiyasini o'tkazib yuborish o'zgarmas ma'lumotlar manbalari bilan katta ro'yxatlarni renderlashda ishlashni yaxshilashni ta'minlashi mumkin.

  Ular kengaytirilgan hisoblanadi, chunki xom tanlab chiqish faqat ildiz darajasida, shuning uchun agar siz ichki, belgilanmagan xom ob'ektni reaktiv ob'ektga o'rnatsangiz va keyin uni yana kiritsangiz, siz proxy qilingan versiyani qaytarib olasiz. Bu **identifikatsiya xavflariga** olib kelishi mumkin - ya'ni ob'ekt identifikatsiyasiga tayanadigan operatsiyani bajarish, lekin bir xil ob'ektning xom va proxy qilingan versiyalarini ishlatish:

  ```js
  const foo = markRaw({
    nested: {}
  })

  const bar = reactive({
    // `foo` xom deb belgilangan bo'lsa ham, foo.nested emas.
    nested: foo.nested
  })

  console.log(foo.nested === bar.nested) // false
  ```

  Identifikatsiya xavflari umuman kam uchraydi. Biroq, bu API'larni to'g'ri ishlatish va identifikatsiya xavflarini xavfsiz tarzda oldini olish uchun reaktivlik tizimi qanday ishlashini yaxshi tushunish kerak.

  :::

## effectScope() {#effectscope}

Uning ichida yaratilgan reaktiv effektlarni (ya'ni computed va kuzatuvchilar) ushlab qolishi mumkin bo'lgan effekt scope ob'ektini yaratadi, shunda bu effektlar birgalikda bekor qilinishi mumkin. Bu API'ning batafsil ishlatish holatlari uchun uning tegishli [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0041-reactivity-effect-scope.md) ga murojaat qiling.

- **Turi**

  ```ts
  function effectScope(detached?: boolean): EffectScope

  interface EffectScope {
    run<T>(fn: () => T): T | undefined // undefined agar scope faol bo'lmasa
    stop(): void
  }
  ```

- **Misol**

  ```js
  const scope = effectScope()

  scope.run(() => {
    const doubled = computed(() => counter.value * 2)

    watch(doubled, () => console.log(doubled.value))

    watchEffect(() => console.log('Count: ', doubled.value))
  })

  // scope'dagi barcha effektlarni bekor qilish uchun
  scope.stop()
  ```

## getCurrentScope() {#getcurrentscope}

Agar mavjud bo'lsa, joriy faol [effect scope](#effectscope) ni qaytaradi.

- **Turi**

  ```ts
  function getCurrentScope(): EffectScope | undefined
  ```

## onScopeDispose() {#onscopedispose}

Joriy faol [effect scope](#effectscope) da bekor qilish callback'ini ro'yxatdan o'tkazadi. Callback tegishli effekt scope to'xtatilganda chaqiriladi.

Bu metod qayta ishlatilishi mumkin bo'lgan kompozitsiya funksiyalarida `onUnmounted` ning komponent bilan bog'lanmagan almashtiruvchisi sifatida ishlatilishi mumkin, chunki har bir Vue komponentining `setup()` funksiyasi ham effekt scope'da chaqiriladi.

Agar bu funksiya faol effekt scope'siz chaqirilsa, ogohlantirish chiqariladi. 3.5+ da, bu ogohlantirishni ikkinchi argument sifatida `true` ni uzatish orqali bostirish mumkin.

- **Turi**

  ```ts
  function onScopeDispose(fn: () => void, failSilently?: boolean): void
  ```
