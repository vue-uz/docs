# Reactivity API: Yordamchi Dasturlar {#reactivity-api-utilities}

## isRef() {#isref}

Qiymat ref ob'ekti ekanligini tekshiradi.

- **Turi**

  ```ts
  function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
  ```

  Qaytarilgan tur [type predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) ekanligini ta'kidlang, ya'ni `isRef` tur qo'riqchisi sifatida ishlatilishi mumkin:

  ```ts
  let foo: unknown
  if (isRef(foo)) {
    // foo'ning turi Ref<unknown> ga toraytiriladi
    foo.value
  }
  ```

## unref() {#unref}

Agar argument ref bo'lsa ichki qiymatni, aks holda argumentning o'zini qaytaradi. Bu `val = isRef(val) ? val.value : val` uchun shakar funksiyasi.

- **Turi**

  ```ts
  function unref<T>(ref: T | Ref<T>): T
  ```

- **Misol**

  ```ts
  function useFoo(x: number | Ref<number>) {
    const unwrapped = unref(x)
    // unwrapped endi number ekanligi kafolatlanadi
  }
  ```

## toRef() {#toref}

Qiymatlarni / ref'larni / getter'larni ref'larga normalizatsiya qilish uchun ishlatilishi mumkin (3.3+).

Manba reaktiv ob'ektning xususiyati uchun ref yaratish uchun ham ishlatilishi mumkin. Yaratilgan ref o'z manba xususiyati bilan sinxronlashtiriladi: manba xususiyatini o'zgartirish ref'ni yangilaydi va aksincha.

- **Turi**

  ```ts
  // normalizatsiya imzosi (3.3+)
  function toRef<T>(
    value: T
  ): T extends () => infer R
    ? Readonly<Ref<R>>
    : T extends Ref
    ? T
    : Ref<UnwrapRef<T>>

  // ob'ekt xususiyati imzosi
  function toRef<T extends object, K extends keyof T>(
    object: T,
    key: K,
    defaultValue?: T[K]
  ): ToRef<T[K]>

  type ToRef<T> = T extends Ref ? T : Ref<T>
  ```

- **Misol**

  Normalizatsiya imzosi (3.3+):

  ```js
  // mavjud ref'larni o'z holatida qaytaradi
  toRef(existingRef)

  // .value ga kirishda getter'ni chaqiradigan faqat o'qish uchun ref yaratadi
  toRef(() => props.foo)

  // funksiya bo'lmagan qiymatlardan oddiy ref'lar yaratadi
  // ref(1) bilan ekvivalent
  toRef(1)
  ```

  Ob'ekt xususiyati imzosi:

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // original xususiyat bilan sinxronlashgan ikki tomonlama ref
  const fooRef = toRef(state, 'foo')

  // ref'ni o'zgartirish originalni yangilaydi
  fooRef.value++
  console.log(state.foo) // 2

  // originalni o'zgartirish ham ref'ni yangilaydi
  state.foo++
  console.log(fooRef.value) // 3
  ```

  Bu quyidagidan farq qilishini ta'kidlang:

  ```js
  const fooRef = ref(state.foo)
  ```

  Yuqoridagi ref `state.foo` bilan **sinxronlashmaydi**, chunki `ref()` oddiy raqam qiymatini oladi.

  `toRef()` prop'ning ref'ini kompozitsiya funksiyasiga uzatishni xohlaganingizda foydali:

  ```vue
  <script setup>
  import { toRef } from 'vue'

  const props = defineProps(/* ... */)

  // `props.foo` ni ref'ga konvertatsiya qilish, keyin
  // kompozitsiya funksiyasiga uzatish
  useSomeFeature(toRef(props, 'foo'))

  // getter sintaksisi - 3.3+ da tavsiya etiladi
  useSomeFeature(toRef(() => props.foo))
  </script>
  ```

  `toRef` komponent prop'lari bilan ishlatilganda, prop'larni o'zgartirish bo'yicha odatiy cheklovlar ham qo'llaniladi. Ref'ga yangi qiymat tayinlashni urinish prop'ni to'g'ridan-to'g'ri o'zgartirishga urinish bilan ekvivalent va ruxsat berilmaydi. Bu holatda `get` va `set` bilan [`computed`](./reactivity-core#computed) ni ishlatishni ko'rib chiqishingiz mumkin. Batafsil ma'lumot uchun [komponentlar bilan `v-model` ishlatish](/guide/components/v-model) qo'llanmasiga qarang.

  Ob'ekt xususiyati imzosini ishlatganda, `toRef()` manba xususiyati hozirda mavjud bo'lmasa ham ishlatilishi mumkin bo'lgan ref qaytaradi. Bu [`toRefs`](#torefs) tomonidan aniqlanmaydigan ixtiyoriy xususiyatlar bilan ishlash imkonini beradi.

## toValue() {#tovalue}

- Faqat 3.3+ da qo'llab-quvvatlanadi

Qiymatlarni / ref'larni / getter'larni qiymatlarga normalizatsiya qiladi. Bu [unref()](#unref) ga o'xshaydi, faqat u getter'larni ham normalizatsiya qiladi. Agar argument getter bo'lsa, u chaqiriladi va uning qaytarilgan qiymati qaytariladi.

Bu [Kompozitsiyalar](/guide/reusability/composables.html) da qiymat, ref yoki getter bo'lishi mumkin bo'lgan argumentni normalizatsiya qilish uchun ishlatilishi mumkin.

- **Turi**

  ```ts
  function toValue<T>(source: T | Ref<T> | (() => T)): T
  ```

- **Misol**

  ```js
  toValue(1) //       --> 1
  toValue(ref(1)) //  --> 1
  toValue(() => 1) // --> 1
  ```

  Kompozitsiyalarda argumentlarni normalizatsiya qilish:

  ```ts
  import type { MaybeRefOrGetter } from 'vue'

  function useFeature(id: MaybeRefOrGetter<number>) {
    watch(() => toValue(id), id => {
      // id o'zgarishlariga reaksiya
    })
  }

  // bu kompozitsiya quyidagilardan birini qo'llab-quvvatlaydi:
  useFeature(1)
  useFeature(ref(1))
  useFeature(() => 1)
  ```

## toRefs() {#torefs}

Reaktiv ob'ektni har bir xususiyati original ob'ektning tegishli xususiyatiga ishora qiluvchi ref bo'lgan oddiy ob'ektga konvertatsiya qiladi. Har bir alohida ref [`toRef()`](#toref) yordamida yaratiladi.

- **Turi**

  ```ts
  function toRefs<T extends object>(
    object: T
  ): {
    [K in keyof T]: ToRef<T[K]>
  }

  type ToRef = T extends Ref ? T : Ref<T>
  ```

- **Misol**

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  const stateAsRefs = toRefs(state)
  /*
  stateAsRefs turi: {
    foo: Ref<number>,
    bar: Ref<number>
  }
  */

  // ref va original xususiyat "bog'langan"
  state.foo++
  console.log(stateAsRefs.foo.value) // 2

  stateAsRefs.foo.value++
  console.log(state.foo) // 3
  ```

  `toRefs` kompozitsiya funksiyasidan reaktiv ob'ektni qaytarishda foydali, shunda iste'mol qiluvchi komponent reaktivlikni yo'qotmasdan qaytarilgan ob'ektni destrukturalizatsiya qilishi / tarqatishi mumkin:

  ```js
  function useFeatureX() {
    const state = reactive({
      foo: 1,
      bar: 2
    })

    // ...state ustida operatsiyalar

    // qaytarishda ref'larga konvertatsiya qilish
    return toRefs(state)
  }

  // reaktivlikni yo'qotmasdan destrukturalizatsiya qilish mumkin
  const { foo, bar } = useFeatureX()
  ```

  `toRefs` faqat chaqiruv vaqtida manba ob'ektida sanab o'tilishi mumkin bo'lgan xususiyatlar uchun ref'lar yaratadi. Hozirda mavjud bo'lmasligi mumkin bo'lgan xususiyat uchun ref yaratish uchun o'rniga [`toRef`](#toref) dan foydalaning.

## isProxy() {#isproxy}

Ob'ekt [`reactive()`](./reactivity-core#reactive), [`readonly()`](./reactivity-core#readonly), [`shallowReactive()`](./reactivity-advanced#shallowreactive) yoki [`shallowReadonly()`](./reactivity-advanced#shallowreadonly) tomonidan yaratilgan proxy ekanligini tekshiradi.

- **Turi**

  ```ts
  function isProxy(value: any): boolean
  ```

## isReactive() {#isreactive}

Ob'ekt [`reactive()`](./reactivity-core#reactive) yoki [`shallowReactive()`](./reactivity-advanced#shallowreactive) tomonidan yaratilgan proxy ekanligini tekshiradi.

- **Turi**

  ```ts
  function isReactive(value: unknown): boolean
  ```

## isReadonly() {#isreadonly}

Uzatilgan qiymat faqat o'qish uchun ob'ekt ekanligini tekshiradi. Faqat o'qish uchun ob'ektning xususiyatlari o'zgartirilishi mumkin, lekin ular uzatilgan ob'ekt orqali to'g'ridan-to'g'ri tayinlanishi mumkin emas.

[`readonly()`](./reactivity-core#readonly) va [`shallowReadonly()`](./reactivity-advanced#shallowreadonly) tomonidan yaratilgan proxy'lar ham faqat o'qish uchun hisoblanadi, shuningdek `set` funksiyasiga ega bo'lmagan [`computed()`](./reactivity-core#computed) ref'i ham.

- **Turi**

  ```ts
  function isReadonly(value: unknown): boolean
  ```
