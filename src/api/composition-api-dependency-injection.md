# Composition API: <br>Bog'liqlik In'ektsiyasi {#composition-api-dependency-injection}

## provide() {#provide}

Avlod komponentlar tomonidan in'ektsiya qilish mumkin bo'lgan qiymatni ta'minlaydi.

- **Turi**

  ```ts
  function provide<T>(key: InjectionKey<T> | string, value: T): void
  ```

- **Tafsilotlar**

  `provide()` ikkita argument oladi: kalit, bu string yoki symbol bo'lishi mumkin, va in'ektsiya qilinadigan qiymat.

  TypeScript ishlatganda, kalit `InjectionKey` sifatida cast qilingan symbol bo'lishi mumkin - bu Vue tomonidan ta'minlangan `Symbol`ni kengaytiruvchi utility turi, u `provide()` va `inject()` o'rtasidagi qiymat turini sinxronlashtirish uchun ishlatilishi mumkin.

  Hayot aylanishi hook'larini ro'yxatdan o'tkazish API'lari singari, `provide()` komponentning `setup()` bosqichida sinxron ravishda chaqirilishi kerak.

- **Misol**

  ```vue
  <script setup>
  import { ref, provide } from 'vue'
  import { countSymbol } from './injectionSymbols'

  // statik qiymatni ta'minlash
  provide('path', '/project/')

  // reaktiv qiymatni ta'minlash
  const count = ref(0)
  provide('count', count)

  // Symbol kalitlari bilan ta'minlash
  provide(countSymbol, count)
  </script>
  ```

- **Qarang**
  - [Guide - Provide / Inject](/guide/components/provide-inject)
  - [Guide - Typing Provide / Inject](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

## inject() {#inject}

Ota-ona komponent yoki ilova tomonidan ta'minlangan qiymatni in'ektsiya qiladi (`app.provide()` orqali).

- **Turi**

  ```ts
  // default qiymatsiz
  function inject<T>(key: InjectionKey<T> | string): T | undefined

  // default qiymat bilan
  function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

  // factory bilan
  function inject<T>(
    key: InjectionKey<T> | string,
    defaultValue: () => T,
    treatDefaultAsFactory: true
  ): T
  ```

- **Tafsilotlar**

  Birinchi argument in'ektsiya kaliti. Vue ota-ona zanjirini yuqoriga ko'tarib, mos keladigan kalitga ega ta'minlangan qiymatni topadi. Agar ota-ona zanjiridagi bir nechta komponentlar bir xil kalitni ta'minlasa, in'ektsiya qiluvchi komponentga eng yaqin bo'lgani zanjirdagi yuqoridagilarni "soya" qiladi va uning qiymati ishlatiladi. Agar mos keladigan kalitga ega qiymat topilmasa, `inject()` default qiymat ta'minlanmaguncha `undefined` qaytaradi.

  Ikkinchi argument ixtiyoriy va mos keladigan qiymat topilmaganda ishlatiladigan default qiymat.

  Ikkinchi argument shuningdek, yaratish qimmat bo'lgan qiymatlarni qaytaruvchi factory funksiyasi bo'lishi mumkin. Bu holatda, funksiya o'z-o'zidan qiymat o'rniga factory sifatida ishlatilishi kerakligini ko'rsatish uchun uchinchi argument sifatida `true` o'tkazilishi kerak.

  Hayot aylanishi hook'larini ro'yxatdan o'tkazish API'lari singari, `inject()` komponentning `setup()` bosqichida sinxron ravishda chaqirilishi kerak.

  TypeScript ishlatganda, kalit `InjectionKey` turida bo'lishi mumkin - bu Vue tomonidan ta'minlangan `Symbol`ni kengaytiruvchi utility turi, u `provide()` va `inject()` o'rtasidagi qiymat turini sinxronlashtirish uchun ishlatilishi mumkin.

- **Misol**

  Ota-ona komponent oldingi `provide()` misolidagi kabi qiymatlarni ta'minlagan deb faraz qilamiz:

  ```vue
  <script setup>
  import { inject } from 'vue'
  import { countSymbol } from './injectionSymbols'

  // default qiymatsiz statik qiymatni in'ektsiya qilish
  const path = inject('path')

  // reaktiv qiymatni in'ektsiya qilish
  const count = inject('count')

  // Symbol kalitlari bilan in'ektsiya qilish
  const count2 = inject(countSymbol)

  // default qiymat bilan in'ektsiya qilish
  const bar = inject('path', '/default-path')

  // funksiya default qiymati bilan in'ektsiya qilish
  const fn = inject('function', () => {})

  // default qiymat factory bilan in'ektsiya qilish
  const baz = inject('factory', () => new ExpensiveObject(), true)
  </script>
  ```
  
- **Qarang**
  - [Guide - Provide / Inject](/guide/components/provide-inject)
  - [Guide - Typing Provide / Inject](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

## hasInjectionContext() {#has-injection-context}

- Faqat 3.3+ versiyasida qo'llab-quvvatlanadi

Agar [inject()](#inject) noto'g'ri joyda chaqirilgani haqida ogohlantirishsiz ishlatilishi mumkin bo'lsa (masalan, `setup()`dan tashqarida), `true` qaytaradi. Bu metod `inject()`ni ichki ishlatishni xohlaydigan va oxirgi foydalanuvchiga ogohlantirishni ishga tushirmasdan ishlatish uchun mo'ljallangan kutubxonalar uchun mo'ljallangan.

- **Turi**

  ```ts
  function hasInjectionContext(): boolean
  ```
