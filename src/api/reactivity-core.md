# Reactivity API: Asosiy {#reactivity-api-core}

:::info Qarang
Reactivity API'larini yaxshiroq tushunish uchun qo'llanmaning quyidagi bo'limlarini o'qish tavsiya etiladi:

- [Reaktivlik Asoslari](/guide/essentials/reactivity-fundamentals) (API afzalligi Composition API ga o'rnatilgan)
- [Reaktivlik Chuqurroq](/guide/extras/reactivity-in-depth)
  :::

## ref() {#ref}

Ichki qiymatni oladi va unga ishora qiluvchi `.value` xususiyatiga ega bo'lgan reaktiv va o'zgartirilishi mumkin bo'lgan ref ob'ektini qaytaradi.

- **Turi**

  ```ts
  function ref<T>(value: T): Ref<UnwrapRef<T>>

  interface Ref<T> {
    value: T
  }
  ```

- **Tafsilotlar**

  Ref ob'ekti o'zgartirilishi mumkin - ya'ni `.value` ga yangi qiymatlarni tayinlashingiz mumkin. U shuningdek reaktiv - ya'ni `.value` ga har qanday o'qish operatsiyalari kuzatiladi va yozish operatsiyalari tegishli effektlarni ishga tushiradi.

  Agar ob'ekt ref qiymati sifatida tayinlangan bo'lsa, ob'ekt [reactive()](#reactive) yordamida chuqur reaktiv qilinadi. Bu shuningdek ob'ekt ichki ref'larni o'z ichiga olsa, ular chuqur ravishda ochilishini anglatadi.

  Chuqur konvertatsiyani oldini olish uchun o'rniga [`shallowRef()`](./reactivity-advanced#shallowref) dan foydalaning.

- **Misol**

  ```js
  const count = ref(0)
  console.log(count.value) // 0

  count.value = 1
  console.log(count.value) // 1
  ```

- **Qarang**
  - [Qo'llanma - `ref()` bilan Reaktivlik Asoslari](/guide/essentials/reactivity-fundamentals#ref)
  - [Qo'llanma - `ref()` ni Turini Aniqlash](/guide/typescript/composition-api#typing-ref) <sup class="vt-badge ts" />

## computed() {#computed}

[Getter funksiyasi](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get#description) ni oladi va getter dan qaytarilgan qiymat uchun faqat o'qish uchun reaktiv [ref](#ref) ob'ektini qaytaradi. U shuningdek yozish mumkin bo'lgan ref ob'ektini yaratish uchun `get` va `set` funksiyalariga ega ob'ektni ham qabul qilishi mumkin.

- **Turi**

  ```ts
  // faqat o'qish uchun
  function computed<T>(
    getter: (oldValue: T | undefined) => T,
    // "Computed Debugging" havolasiga qarang
    debuggerOptions?: DebuggerOptions
  ): Readonly<Ref<Readonly<T>>>

  // yozish mumkin
  function computed<T>(
    options: {
      get: (oldValue: T | undefined) => T
      set: (value: T) => void
    },
    debuggerOptions?: DebuggerOptions
  ): Ref<T>
  ```

- **Misol**

  Faqat o'qish uchun computed ref yaratish:

  ```js
  const count = ref(1)
  const plusOne = computed(() => count.value + 1)

  console.log(plusOne.value) // 2

  plusOne.value++ // xato
  ```

  Yozish mumkin bo'lgan computed ref yaratish:

  ```js
  const count = ref(1)
  const plusOne = computed({
    get: () => count.value + 1,
    set: (val) => {
      count.value = val - 1
    }
  })

  plusOne.value = 1
  console.log(count.value) // 0
  ```

  Debugging:

  ```js
  const plusOne = computed(() => count.value + 1, {
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **Qarang**
  - [Qo'llanma - Computed Xususiyatlari](/guide/essentials/computed)
  - [Qo'llanma - Computed Debugging](/guide/extras/reactivity-in-depth#computed-debugging)
  - [Qo'llanma - `computed()` ni Turini Aniqlash](/guide/typescript/composition-api#typing-computed) <sup class="vt-badge ts" />
  - [Qo'llanma - Ishlash - Computed Barqarorligi](/guide/best-practices/performance#computed-stability)

## reactive() {#reactive}

Ob'ektning reaktiv proxy'sini qaytaradi.

- **Turi**

  ```ts
  function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
  ```

- **Tafsilotlar**

  Reaktiv konvertatsiya "chuqur": u barcha ichki xususiyatlarni ta'sir qiladi. Reaktiv ob'ekt shuningdek reaktivlikni saqlab qolgan holda [ref](#ref) bo'lgan har qanday xususiyatlarni chuqur ravishda ochadi.

  Shuni ham ta'kidlash kerakki, ref reaktiv massiv elementi yoki `Map` kabi native to'plam turi sifatida kirishda ref ochilishi amalga oshirilmaydi.

  Chuqur konvertatsiyani oldini olish va faqat ildiz darajasida reaktivlikni saqlab qolish uchun o'rniga [shallowReactive()](./reactivity-advanced#shallowreactive) dan foydalaning.

  Qaytarilgan ob'ekt va uning ichki ob'ektlari [ES Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) bilan o'ralgan va original ob'ektlarga **teng emas**. Faqat reaktiv proxy bilan ishlash va original ob'ektga tayanmaslik tavsiya etiladi.

- **Misol**

  Reaktiv ob'ekt yaratish:

  ```js
  const obj = reactive({ count: 0 })
  obj.count++
  ```

  Ref ochish:

  ```ts
  const count = ref(1)
  const obj = reactive({ count })

  // ref ochiladi
  console.log(obj.count === count.value) // true

  // bu `obj.count` ni yangilaydi
  count.value++
  console.log(count.value) // 2
  console.log(obj.count) // 2

  // bu ham `count` ref'ini yangilaydi
  obj.count++
  console.log(obj.count) // 3
  console.log(count.value) // 3
  ```

  E'tibor bering, ref'lar massiv yoki to'plam elementlari sifatida kirishda **ochilmaydi**:

  ```js
  const books = reactive([ref('Vue 3 Guide')])
  // bu yerda .value kerak
  console.log(books[0].value)

  const map = reactive(new Map([['count', ref(0)]]))
  // bu yerda .value kerak
  console.log(map.get('count').value)
  ```

  [ref](#ref) ni `reactive` xususiyatiga tayinlaganda, o'sha ref ham avtomatik ravishda ochiladi:

  ```ts
  const count = ref(1)
  const obj = reactive({})

  obj.count = count

  console.log(obj.count) // 1
  console.log(obj.count === count.value) // true
  ```

- **Qarang**
  - [Qo'llanma - Reaktivlik Asoslari](/guide/essentials/reactivity-fundamentals)
  - [Qo'llanma - `reactive()` ni Turini Aniqlash](/guide/typescript/composition-api#typing-reactive) <sup class="vt-badge ts" />

## readonly() {#readonly}

Ob'ektni (reaktiv yoki oddiy) yoki [ref](#ref) ni oladi va originalga faqat o'qish uchun proxy qaytaradi.

- **Turi**

  ```ts
  function readonly<T extends object>(
    target: T
  ): DeepReadonly<UnwrapNestedRefs<T>>
  ```

- **Tafsilotlar**

  Faqat o'qish uchun proxy chuqur: kirish uchun har qanday ichki xususiyat ham faqat o'qish uchun bo'ladi. U shuningdek `reactive()` bilan bir xil ref-ochish xatti-harakatiga ega, faqat ochilgan qiymatlar ham faqat o'qish uchun qilinadi.

  Chuqur konvertatsiyani oldini olish uchun o'rniga [shallowReadonly()](./reactivity-advanced#shallowreadonly) dan foydalaning.

- **Misol**

  ```js
  const original = reactive({ count: 0 })

  const copy = readonly(original)

  watchEffect(() => {
    // reaktivlik kuzatish uchun ishlaydi
    console.log(copy.count)
  })

  // originalni o'zgartirish copy'ga tayanuvchi kuzatuvchilarni ishga tushiradi
  original.count++

  // copy'ni o'zgartirish xatolikni keltirib chiqaradi va ogohlantirish beradi
  copy.count++ // ogohlantirish!
  ```

## watchEffect() {#watcheffect}

Funksiyani darhol ishga tushiradi va uning bog'liqliklarini reaktiv ravishda kuzatadi va bog'liqliklar o'zgarganda uni qayta ishga tushiradi.

- **Turi**

  ```ts
  function watchEffect(
    effect: (onCleanup: OnCleanup) => void,
    options?: WatchEffectOptions
  ): WatchHandle

  type OnCleanup = (cleanupFn: () => void) => void

  interface WatchEffectOptions {
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }

  interface WatchHandle {
    (): void // chaqirilishi mumkin, `stop` bilan bir xil
    pause: () => void
    resume: () => void
    stop: () => void
  }
  ```

- **Tafsilotlar**

  Birinchi argument ishga tushirilishi kerak bo'lgan effekt funksiyasi. Effekt funksiyasi tozalash callback'ini ro'yxatdan o'tkazish uchun ishlatilishi mumkin bo'lgan funksiyani oladi. Tozalash callback'i keyingi marta effekt qayta ishga tushirilishidan oldin chaqiriladi va bekor qilingan yon effektlarni, masalan kutilayotgan async so'rovni tozalash uchun ishlatilishi mumkin (quyidagi misolga qarang).

  Ikkinchi argument effektning tozalash vaqtini sozlash yoki effektning bog'liqliklarini debug qilish uchun ishlatilishi mumkin bo'lgan ixtiyoriy opsiyalar ob'ekti.

  Default bo'yicha, kuzatuvchilar komponent renderlashidan oldin ishga tushadi. `flush: 'post'` ni o'rnatish kuzatuvchini komponent renderlashidan keyin kechiktirishga olib keladi. Batafsil ma'lumot uchun [Callback Tozalash Vaqti](/guide/essentials/watchers#callback-flush-timing) ga qarang. Kamdan-kam hollarda, reaktiv bog'liqlik o'zgarganda kuzatuvchini darhol ishga tushirish kerak bo'lishi mumkin, masalan keshni bekor qilish uchun. Bu `flush: 'sync'` yordamida amalga oshirilishi mumkin. Biroq, bu sozlash ehtiyotkorlik bilan ishlatilishi kerak, chunki bir vaqtning o'zida bir nechta xususiyatlar yangilanganda ishlash va ma'lumotlar izchilligi bilan bog'liq muammolarga olib kelishi mumkin.

  Qaytarilgan qiymat effektni yana ishga tushirishni to'xtatish uchun chaqirilishi mumkin bo'lgan handle funksiyasi.

- **Misol**

  ```js
  const count = ref(0)

  watchEffect(() => console.log(count.value))
  // -> 0 ni log qiladi

  count.value++
  // -> 1 ni log qiladi
  ```

  Kuzatuvchini to'xtatish:

  ```js
  const stop = watchEffect(() => {})

  // kuzatuvchi endi kerak bo'lmaganda:
  stop()
  ```

  Kuzatuvchini pauza qilish / davom ettirish: <sup class="vt-badge" data-text="3.5+" />

  ```js
  const { stop, pause, resume } = watchEffect(() => {})

  // kuzatuvchini vaqtincha pauza qilish
  pause()

  // keyinroq davom ettirish
  resume()

  // to'xtatish
  stop()
  ```

  Yon effektni tozalash:

  ```js
  watchEffect(async (onCleanup) => {
    const { response, cancel } = doAsyncWork(newId)
    // `cancel` `id` o'zgarsa chaqiriladi, oldingi so'rov
    // hali tugallanmagan bo'lsa uni bekor qiladi
    onCleanup(cancel)
    data.value = await response
  })
  ```

  3.5+ da yon effektni tozalash:

  ```js
  import { onWatcherCleanup } from 'vue'

  watchEffect(async () => {
    const { response, cancel } = doAsyncWork(newId)
    // `cancel` `id` o'zgarsa chaqiriladi, oldingi so'rov
    // hali tugallanmagan bo'lsa uni bekor qiladi
    onWatcherCleanup(cancel)
    data.value = await response
  })
  ```

  Opsiyalar:

  ```js
  watchEffect(() => {}, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

- **Qarang**
  - [Qo'llanma - Kuzatuvchilar](/guide/essentials/watchers#watcheffect)
  - [Qo'llanma - Kuzatuvchi Debugging](/guide/extras/reactivity-in-depth#watcher-debugging)

## watchPostEffect() {#watchposteffect}

`flush: 'post'` opsiyasi bilan [`watchEffect()`](#watcheffect) ning taxallusi.

## watchSyncEffect() {#watchsynceffect}

`flush: 'sync'` opsiyasi bilan [`watchEffect()`](#watcheffect) ning taxallusi.

## watch() {#watch}

Bir yoki bir nechta reaktiv ma'lumotlar manbalarini kuzatadi va manbalar o'zgarganda callback funksiyasini chaqiradi.

- **Turi**

  ```ts
  // bitta manbani kuzatish
  function watch<T>(
    source: WatchSource<T>,
    callback: WatchCallback<T>,
    options?: WatchOptions
  ): WatchHandle

  // bir nechta manbalarni kuzatish
  function watch<T>(
    sources: WatchSource<T>[],
    callback: WatchCallback<T[]>,
    options?: WatchOptions
  ): WatchHandle

  type WatchCallback<T> = (
    value: T,
    oldValue: T,
    onCleanup: (cleanupFn: () => void) => void
  ) => void

  type WatchSource<T> =
    | Ref<T> // ref
    | (() => T) // getter
    | (T extends object ? T : never) // reaktiv ob'ekt

  interface WatchOptions extends WatchEffectOptions {
    immediate?: boolean // default: false
    deep?: boolean | number // default: false
    flush?: 'pre' | 'post' | 'sync' // default: 'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
    once?: boolean // default: false (3.4+)
  }

  interface WatchHandle {
    (): void // chaqirilishi mumkin, `stop` bilan bir xil
    pause: () => void
    resume: () => void
    stop: () => void
  }
  ```

  > Turlar o'qilish uchun soddalashtirilgan.

- **Tafsilotlar**

  `watch()` default bo'yicha dangasa - ya'ni callback faqat kuzatilayotgan manba o'zgarganda chaqiriladi.

  Birinchi argument kuzatuvchining **manbasi**. Manba quyidagilardan biri bo'lishi mumkin:

  - Qiymat qaytaradigan getter funksiyasi
  - Ref
  - Reaktiv ob'ekt
  - ...yoki yuqoridagilarning massivi.

  Ikkinchi argument manba o'zgarganda chaqiriladigan callback. Callback uchta argument oladi: yangi qiymat, eski qiymat va yon effekt tozalash callback'ini ro'yxatdan o'tkazish uchun funksiya. Tozalash callback'i keyingi marta effekt qayta ishga tushirilishidan oldin chaqiriladi va bekor qilingan yon effektlarni, masalan kutilayotgan async so'rovni tozalash uchun ishlatilishi mumkin.

  Bir nechta manbalarni kuzatganda, callback manba massiviga mos keluvchi yangi / eski qiymatlarni o'z ichiga olgan ikkita massiv oladi.

  Uchinchi ixtiyoriy argument quyidagi opsiyalarni qo'llab-quvvatlovchi opsiyalar ob'ekti:

  - **`immediate`**: kuzatuvchi yaratilganda callback'ni darhol ishga tushirish. Birinchi chaqiruvda eski qiymat `undefined` bo'ladi.
  - **`deep`**: agar ob'ekt bo'lsa, manbani chuqur o'tishni majburlash, shunda callback chuqur o'zgarishlarda ishga tushadi. 3.5+ da, bu maksimal o'tish chuqurligini ko'rsatuvchi raqam ham bo'lishi mumkin. [Chuqur Kuzatuvchilar](/guide/essentials/watchers#deep-watchers) ga qarang.
  - **`flush`**: callback'ning tozalash vaqtini sozlash. [Callback Tozalash Vaqti](/guide/essentials/watchers#callback-flush-timing) va [`watchEffect()`](/api/reactivity-core#watcheffect) ga qarang.
  - **`onTrack / onTrigger`**: kuzatuvchining bog'liqliklarini debug qilish. [Kuzatuvchi Debugging](/guide/extras/reactivity-in-depth#watcher-debugging) ga qarang.
  - **`once`**: (3.4+) callback'ni faqat bir marta ishga tushirish. Kuzatuvchi birinchi callback ishga tushirilgandan keyin avtomatik ravishda to'xtatiladi.

  [`watchEffect()`](#watcheffect) bilan taqqoslaganda, `watch()` bizga quyidagilarni imkon beradi:

  - Yon effektni dangasa amalga oshirish;
  - Kuzatuvchi qayta ishga tushirilishi kerak bo'lgan holat haqida aniqroq bo'lish;
  - Kuzatilayotgan holatning oldingi va joriy qiymatiga kirish.

- **Misol**

  Getter'ni kuzatish:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state.count,
    (count, prevCount) => {
      /* ... */
    }
  )
  ```

  Ref'ni kuzatish:

  ```js
  const count = ref(0)
  watch(count, (count, prevCount) => {
    /* ... */
  })
  ```

  Bir nechta manbalarni kuzatganda, callback manba massiviga mos keluvchi yangi / eski qiymatlarni o'z ichiga olgan massivlarni oladi:

  ```js
  watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    /* ... */
  })
  ```

  Getter manbasini ishlatganda, kuzatuvchi faqat getter'ning qaytarilgan qiymati o'zgarganda ishga tushadi. Agar callback chuqur o'zgarishlarda ham ishga tushishini xohlasangiz, `{ deep: true }` bilan kuzatuvchini chuqur rejimga majburlashingiz kerak. Chuqur rejimda, callback chuqur o'zgarish tufayli ishga tushirilganda yangi qiymat va eski qiymat bir xil ob'ekt bo'ladi:

  ```js
  const state = reactive({ count: 0 })
  watch(
    () => state,
    (newValue, oldValue) => {
      // newValue === oldValue
    },
    { deep: true }
  )
  ```

  Reaktiv ob'ektni to'g'ridan-to'g'ri kuzatganda, kuzatuvchi avtomatik ravishda chuqur rejimda:

  ```js
  const state = reactive({ count: 0 })
  watch(state, () => {
    /* state ga chuqur o'zgarishda ishga tushadi */
  })
  ```

  `watch()` [`watchEffect()`](#watcheffect) bilan bir xil tozalash vaqti va debugging opsiyalarini baham ko'radi:

  ```js
  watch(source, callback, {
    flush: 'post',
    onTrack(e) {
      debugger
    },
    onTrigger(e) {
      debugger
    }
  })
  ```

  Kuzatuvchini to'xtatish:

  ```js
  const stop = watch(source, callback)

  // kuzatuvchi endi kerak bo'lmaganda:
  stop()
  ```

  Kuzatuvchini pauza qilish / davom ettirish: <sup class="vt-badge" data-text="3.5+" />

  ```js
  const { stop, pause, resume } = watch(() => {})

  // kuzatuvchini vaqtincha pauza qilish
  pause()

  // keyinroq davom ettirish
  resume()

  // to'xtatish
  stop()
  ```

  Yon effektni tozalash:

  ```js
  watch(id, async (newId, oldId, onCleanup) => {
    const { response, cancel } = doAsyncWork(newId)
    // `cancel` `id` o'zgarsa chaqiriladi, oldingi so'rov
    // hali tugallanmagan bo'lsa uni bekor qiladi
    onCleanup(cancel)
    data.value = await response
  })
  ```

  3.5+ da yon effektni tozalash:

  ```js
  import { onWatcherCleanup } from 'vue'

  watch(id, async (newId) => {
    const { response, cancel } = doAsyncWork(newId)
    onWatcherCleanup(cancel)
    data.value = await response
  })
  ```

- **Qarang**

  - [Qo'llanma - Kuzatuvchilar](/guide/essentials/watchers)
  - [Qo'llanma - Kuzatuvchi Debugging](/guide/extras/reactivity-in-depth#watcher-debugging)

## onWatcherCleanup() <sup class="vt-badge" data-text="3.5+" /> {#onwatchercleanup}

Joriy kuzatuvchi qayta ishga tushirilishidan oldin bajarilishi kerak bo'lgan tozalash funksiyasini ro'yxatdan o'tkazadi. Faqat `watchEffect` effekt funksiyasi yoki `watch` callback funksiyasining sinxron bajarilishi paytida chaqirilishi mumkin (ya'ni u async funksiyada `await` dan keyin chaqirilishi mumkin emas.)

- **Turi**

  ```ts
  function onWatcherCleanup(
    cleanupFn: () => void,
    failSilently?: boolean
  ): void
  ```

- **Misol**

  ```ts
  import { watch, onWatcherCleanup } from 'vue'

  watch(id, (newId) => {
    const { response, cancel } = doAsyncWork(newId)
    // `cancel` `id` o'zgarsa chaqiriladi, oldingi so'rov
    // hali tugallanmagan bo'lsa uni bekor qiladi
    onWatcherCleanup(cancel)
  })
  ```
