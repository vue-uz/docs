# \<script setup> {#script-setup}

`<script setup>` - bu Single-File Komponentlar (SFC) ichida Composition API'ni ishlatish uchun kompilyatsiya vaqtidagi sintaksis shakaridir. Agar siz ham SFC, ham Composition API'ni ishlatayotgan bo'lsangiz, bu tavsiya etilgan sintaksis. Bu oddiy `<script>` sintaksisiga nisbatan bir qator afzalliklarga ega:

- Kam boilerplate bilan yanada ixcham kod
- Toza TypeScript yordamida prop'lar va chiqarilgan hodisalarni e'lon qilish imkoniyati
- Yaxshiroq runtime ishlash (shablon xuddi shu scope'da render funksiyasiga kompilyatsiya qilinadi, oraliq proxy'siz)
- Yaxshiroq IDE tur aniqlash ishlashi (til serveri uchun kodlardan turlarni ajratib olish kamroq ish)

## Asosiy Sintaksis {#basic-syntax}

Sintaksisni ishlatish uchun `<script>` blokiga `setup` atributini qo'shing:

```vue
<script setup>
console.log('hello script setup')
</script>
```

Ichidagi kod komponentning `setup()` funksiyasi kontenti sifatida kompilyatsiya qilinadi. Bu oddiy `<script>` dan farqli ravishda, u faqat komponent birinchi marta import qilinganda bir marta ishga tushiriladi, `<script setup>` ichidagi kod **komponentning har bir instansi yaratilganda ishga tushiriladi**.

### Yuqori darajadagi bog'lanishlar shablonga ochiq {#top-level-bindings-are-exposed-to-template}

`<script setup>` ishlatganda, `<script setup>` ichida e'lon qilingan har qanday yuqori darajadagi bog'lanishlar (o'zgaruvchilar, funksiya e'lonlari va importlar) shablonda to'g'ridan-to'g'ri ishlatilishi mumkin:

```vue
<script setup>
// o'zgaruvchi
const msg = 'Hello!'

// funksiyalar
function log() {
  console.log(msg)
}
</script>

<template>
  <button @click="log">{{ msg }}</button>
</template>
```

Importlar ham xuddi shu tarzda ochiq. Bu shablon ifodalarida import qilingan yordamchi funksiyani `methods` opsiyasi orqali ochishga hojat yo'q, to'g'ridan-to'g'ri ishlatish mumkinligini anglatadi:

```vue
<script setup>
import { capitalize } from './helpers'
</script>

<template>
  <div>{{ capitalize('hello') }}</div>
</template>
```

## Reaktivlik {#reactivity}

Reaktiv holat [Reaktivlik API'lari](./reactivity-core) yordamida aniq yaratilishi kerak. `setup()` funksiyasidan qaytarilgan qiymatlarga o'xshab, ref'lar shablonda ishlatilganda avtomatik ravishda ochiladi:

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

## Komponentlarni Ishlatish {#using-components}

`<script setup>` scope'idagi qiymatlar ham maxsus komponent teglari nomlari sifatida to'g'ridan-to'g'ri ishlatilishi mumkin:

```vue
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
  <MyComponent />
</template>
```

`MyComponent` o'zgaruvchi sifatida ishlatilgan deb o'ylang. Agar siz JSX ishlatgan bo'lsangiz, bu yerda mental model o'xshash. Kebab-case ekvivalenti `<my-component>` ham shablonda ishlaydi - biroq izchillik uchun PascalCase komponent teglari kuchli tavsiya etiladi. Bu shuningdek mahalliy maxsus elementlardan farqlashga yordam beradi.

### Dinamik Komponentlar {#dynamic-components}

Komponentlar string kalitlari ostida ro'yxatdan o'tkazilgan o'rniga o'zgaruvchilar sifatida ishlatilgani uchun, `<script setup>` ichida dinamik komponentlarni ishlatganda dinamik `:is` bog'lashidan foydalanishimiz kerak:

```vue
<script setup>
import Foo from './Foo.vue'
import Bar from './Bar.vue'
</script>

<template>
  <component :is="Foo" />
  <component :is="someCondition ? Foo : Bar" />
</template>
```

Komponentlar ternary ifodada o'zgaruvchilar sifatida qanday ishlatilishi mumkinligiga e'tibor bering.

### Rekursiv Komponentlar {#recursive-components}

SFC o'z fayl nomi orqali o'ziga o'zini murojaat qilishi mumkin. Masalan, `FooBar.vue` nomli fayl o'z shablonida `<FooBar/>` sifatida o'ziga murojaat qilishi mumkin.

Eslatma, bu import qilingan komponentlardan pastroq ustuvorlikka ega. Agar sizda komponentning aniqlangan nomi bilan to'qnashuvchi nomli import bo'lsa, importni alias qilishingiz mumkin:

```js
import { FooBar as FooBarChild } from './components'
```

### Namespace Komponentlar {#namespaced-components}

Ob'ekt xususiyatlari ostida joylashgan komponentlarga murojaat qilish uchun `<Foo.Bar>` kabi nuqtali komponent teglaridan foydalanishingiz mumkin. Bu bitta fayldan bir nechta komponentlarni import qilganda foydali:

```vue
<script setup>
import * as Form from './form-components'
</script>

<template>
  <Form.Input>
    <Form.Label>label</Form.Label>
  </Form.Input>
</template>
```

## Maxsus Direktivalarni Ishlatish {#using-custom-directives}

Global ro'yxatdan o'tkazilgan maxsus direktivalar oddiygina ishlaydi. Mahalliy maxsus direktivalar `<script setup>` bilan aniq ro'yxatdan o'tkazilishi shart emas, lekin ular `vNameOfDirective` nomlash sxemasiga rioya qilishi kerak:

```vue
<script setup>
const vMyDirective = {
  beforeMount: (el) => {
    // element bilan biror narsa qilish
  }
}
</script>
<template>
  <h1 v-my-directive>This is a Heading</h1>
</template>
```

Agar siz direktivani boshqa joydan import qilayotgan bo'lsangiz, uni kerakli nomlash sxemasiga moslashtirish uchun qayta nomlash mumkin:

```vue
<script setup>
import { myDirective as vMyDirective } from './MyDirective.js'
</script>
```

## defineProps() & defineEmits() {#defineprops-defineemits}

To'liq tur aniqlash qo'llab-quvvatlashiga ega `props` va `emits` kabi opsiyalarni e'lon qilish uchun, `<script setup>` ichida avtomatik ravishda mavjud bo'lgan `defineProps` va `defineEmits` API'laridan foydalanishimiz mumkin:

```vue
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
// setup kodi
</script>
```

- `defineProps` va `defineEmits` faqat `<script setup>` ichida ishlatilishi mumkin bo'lgan **kompilyator makrolari**. Ular import qilishni talab qilmaydi va `<script setup>` qayta ishlanganda kompilyatsiya qilinadi.

- `defineProps` `props` opsiyasi bilan bir xil qiymatni qabul qiladi, `defineEmits` esa `emits` opsiyasi bilan bir xil qiymatni qabul qiladi.

- `defineProps` va `defineEmits` uzatilgan opsiyalarga asoslangan to'g'ri tur aniqlashini ta'minlaydi.

- `defineProps` va `defineEmits` ga uzatilgan opsiyalar setup'dan modul scope'iga ko'tariladi. Shuning uchun, opsiyalar setup scope'ida e'lon qilingan mahalliy o'zgaruvchilarga murojaat qila olmaydi. Buning natijasida kompilyatsiya xatosi yuzaga keladi. Biroq, u modul scope'ida ham bo'lgani uchun import qilingan bog'lanishlarga murojaat qilishi _mumkin_.

### Faqat tur uchun prop/emit e'lonlari<sup class="vt-badge ts" /> {#type-only-props-emit-declarations}

Prop'lar va emit'lar ham `defineProps` yoki `defineEmits` ga literal tur argumentini uzatish orqali toza tur sintaksisi yordamida e'lon qilinishi mumkin:

```ts
const props = defineProps<{
  foo: string
  bar?: number
}>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+: alternativa, yanada ixcham sintaksis
const emit = defineEmits<{
  change: [id: number] // nomlangan tuple sintaksisi
  update: [value: string]
}>()
```

- `defineProps` yoki `defineEmits` faqat runtime e'lon YOKI tur e'lonidan foydalanishi mumkin. Ikkalasini bir vaqtda ishlatish kompilyatsiya xatosini keltirib chiqaradi.

- Tur e'lonini ishlatganda, ekvivalent runtime e'lon statik tahlil orqali avtomatik ravishda yaratiladi, bu ikki marta e'lon qilish zaruratini olib tashlaydi va baribir to'g'ri runtime xatti-harakatini ta'minlaydi.

  - Dev rejimida, kompilyator turlardan tegishli runtime tekshiruvini aniqlashga harakat qiladi. Masalan, bu yerda `foo: String` `foo: string` turidan aniqlanadi. Agar tur import qilingan turga havola bo'lsa, kompilyator tashqi fayllar haqida ma'lumotga ega bo'lmagani uchun aniqlangan natija `foo: null` (ya'ni `any` turi bilan teng) bo'ladi.

  - Prod rejimida, kompilyator paket hajmini kamaytirish uchun massiv formatidagi e'lonni yaratadi (bu yerda prop'lar `['foo', 'bar']` ga kompilyatsiya qilinadi)

- 3.2 va undan past versiyalarda, `defineProps()` uchun generic tur parametri faqat literal tur yoki mahalliy interfeysga havola bilan cheklangan edi.

  Bu cheklov 3.3 da hal qilindi. Vue'ning so'nggi versiyasi tur parametri o'rnida import qilingan va cheklangan murakkab turlar to'plamiga havolalarni qo'llab-quvvatlaydi. Biroq, turdan runtime konvertatsiyasi hali ham AST-ga asoslangan bo'lgani uchun, ba'zi murakkab turlar, masalan shartli turlar, qo'llab-quvvatlanmaydi. Siz bitta prop uchun shartli turlardan foydalanishingiz mumkin, lekin butun prop'lar ob'ekti uchun emas.

### Reaktiv Prop'lar Destrukturalizatsiyasi <sup class="vt-badge" data-text="3.5+" /> {#reactive-props-destructure}

Vue 3.5 va undan yuqori versiyalarda, `defineProps` qaytarilgan qiymatidan destrukturalizatsiya qilingan o'zgaruvchilar reaktiv. Vue kompilyatori bir xil `<script setup>` blokidagi kod `defineProps` dan destrukturalizatsiya qilingan o'zgaruvchilarga kirganda avtomatik ravishda `props.` ni oldiga qo'shadi:

```ts
const { foo } = defineProps(['foo'])

watchEffect(() => {
  // 3.5 dan oldin faqat bir marta ishga tushadi
  // 3.5+ da "foo" prop'i o'zgarganda qayta ishga tushadi
  console.log(foo)
})
```

Yuqoridagi kod quyidagi ekvivalentga kompilyatsiya qilinadi:

```js {5}
const props = defineProps(['foo'])

watchEffect(() => {
  // `foo` kompilyator tomonidan `props.foo` ga o'zgartiriladi
  console.log(props.foo)
})
```

Bundan tashqari, prop'lar uchun default qiymatlarni e'lon qilish uchun JavaScript'ning native default qiymat sintaksisidan foydalanishingiz mumkin. Bu ayniqsa turga asoslangan prop'lar e'lonini ishlatganda foydali:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const { msg = 'hello', labels = ['one', 'two'] } = defineProps<Props>()
```

### Tur e'lonini ishlatganda default prop qiymatlari <sup class="vt-badge ts" /> {#default-props-values-when-using-type-declaration}

3.5 va undan yuqori versiyalarda, default qiymatlar Reaktiv Prop'lar Destrukturalizatsiyasini ishlatganda tabiiy ravishda e'lon qilinishi mumkin. Lekin 3.4 va undan past versiyalarda, Reaktiv Prop'lar Destrukturalizatsiyasi default bo'yicha yoqilmagan. Turga asoslangan e'lon bilan prop'lar default qiymatlarini e'lon qilish uchun `withDefaults` kompilyator makrosi kerak:

```ts
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

Bu ekvivalent runtime prop'lar `default` opsiyalariga kompilyatsiya qilinadi. Bundan tashqari, `withDefaults` yordamchisi default qiymatlar uchun tur tekshiruvini ta'minlaydi va default qiymatlar e'lon qilingan xususiyatlar uchun ixtiyoriy bayroqlar olib tashlangan `props` turini ta'minlaydi.

:::info
Eslatma, `withDefaults` ishlatganda o'zgartirilishi mumkin bo'lgan havola turlari (masalan massivlar yoki ob'ektlar) uchun default qiymatlar tasodifiy o'zgartirish va tashqi yon effektlardan saqlash uchun funksiyalar ichiga o'ralishi kerak. Bu har bir komponent instansi o'zining default qiymat nusxasini olishini ta'minlaydi. Bu destrukturalizatsiya bilan default qiymatlarni ishlatganda **kerak emas**.
:::

## defineModel() {#definemodel}

- Faqat 3.4+ da mavjud

Bu makro ota-ona komponentidan `v-model` orqali ishlatilishi mumkin bo'lgan ikki tomonlama bog'lanish prop'ini e'lon qilish uchun ishlatilishi mumkin. Misol ishlatish [Komponent `v-model`](/guide/components/v-model) qo'llanmasida ham muhokama qilinadi.

Qulaylik uchun, bu makro model prop'ini va tegishli qiymat yangilash hodisasini e'lon qiladi. Agar birinchi argument literal string bo'lsa, u prop nomi sifatida ishlatiladi; Aks holda prop nomi default bo'yicha `"modelValue"` bo'ladi. Ikkala holatda ham, siz prop'ning opsiyalarini va model ref'ining qiymat transformatsiya opsiyalarini o'z ichiga olgan qo'shimcha ob'ektni uzatishingiz mumkin.

```js
// ota-ona tomonidan v-model orqali ishlatiladigan "modelValue" prop'ini e'lon qiladi
const model = defineModel()
// YOKI: opsiyalar bilan "modelValue" prop'ini e'lon qiladi
const model = defineModel({ type: String })

// o'zgartirilganda "update:modelValue" ni chiqaradi
model.value = 'hello'

// ota-ona tomonidan v-model:count orqali ishlatiladigan "count" prop'ini e'lon qiladi
const count = defineModel('count')
// YOKI: opsiyalar bilan "count" prop'ini e'lon qiladi
const count = defineModel('count', { type: Number, default: 0 })

function inc() {
  // o'zgartirilganda "update:count" ni chiqaradi
  count.value++
}
```

:::warning
Agar `defineModel` prop'i uchun `default` qiymati bo'lsa va siz bu prop uchun ota-ona komponentidan hech qanday qiymat bermasangiz, bu ota-ona va farzand komponentlari o'rtasida sinxronizatsiyani yo'qotishga olib kelishi mumkin. Quyidagi misolda, ota-onaning `myRef` i aniqlanmagan, lekin farzandning `model` i 1:

```js
// farzand komponenti:
const model = defineModel({ default: 1 })

// ota-ona komponenti:
const myRef = ref()
```

```html
<Child v-model="myRef"></Child>
```

:::

### Modifikatorlar va Transformatorlar {#modifiers-and-transformers}

`v-model` direktivasi bilan ishlatilgan modifikatorlarga kirish uchun, `defineModel()` qaytarilgan qiymatini quyidagicha destrukturalizatsiya qilishimiz mumkin:

```js
const [modelValue, modelModifiers] = defineModel()

// v-model.trim bilan mos keladi
if (modelModifiers.trim) {
  // ...
}
```

Modifikator mavjud bo'lganda, biz uni o'qiganda yoki ota-onaga qayta sinxronlashtirganda qiymatni transformatsiya qilishimiz kerak bo'lishi mumkin. Buni `get` va `set` transformator opsiyalarini ishlatish orqali amalga oshirishimiz mumkin:

```js
const [modelValue, modelModifiers] = defineModel({
  // get() bu yerda kerak bo'lmagani uchun tashlab ketilgan
  set(value) {
    // agar .trim modifikatori ishlatilgan bo'lsa, qirqilgan qiymatni qaytaradi
    if (modelModifiers.trim) {
      return value.trim()
    }
    // aks holda, qiymatni o'z holatida qaytaradi
    return value
  }
})
```

### TypeScript bilan Ishlatish <sup class="vt-badge ts" /> {#usage-with-typescript}

`defineProps` va `defineEmits` kabi, `defineModel` ham model qiymati va modifikatorlar turlarini belgilash uchun tur argumentlarini qabul qilishi mumkin:

```ts
const modelValue = defineModel<string>()
//    ^? Ref<string | undefined>

// opsiyalar bilan default model, required mumkin bo'lgan undefined qiymatlarni olib tashlaydi
const modelValue = defineModel<string>({ required: true })
//    ^? Ref<string>

const [modelValue, modifiers] = defineModel<string, 'trim' | 'uppercase'>()
//                 ^? Record<'trim' | 'uppercase', true | undefined>
```

## defineExpose() {#defineexpose}

`<script setup>` ishlatadigan komponentlar **default bo'yicha yopiq** - ya'ni shablon ref'lari yoki `$parent` zanjirlari orqali olingan komponentning ommaviy instansi `<script setup>` ichida e'lon qilingan bog'lanishlardan hech birini **ochmaydi**.

`<script setup>` komponentida xususiyatlarni aniq ochish uchun `defineExpose` kompilyator makrosidan foydalaning:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

Ota-ona bu komponentning instansini shablon ref'lari orqali olganda, olingan instans `{ a: number, b: number }` ko'rinishida bo'ladi (ref'lar oddiy instanslardagi kabi avtomatik ravishda ochiladi).

## defineOptions() {#defineoptions}

- Faqat 3.3+ da qo'llab-quvvatlanadi

Bu makro alohida `<script>` blokidan foydalanishga hojat yo'q, to'g'ridan-to'g'ri `<script setup>` ichida komponent opsiyalarini e'lon qilish uchun ishlatilishi mumkin:

```vue
<script setup>
defineOptions({
  inheritAttrs: false,
  customOptions: {
    /* ... */
  }
})
</script>
```

- Bu makro. Opsiyalar modul scope'iga ko'tariladi va `<script setup>` ichidagi literal konstantalar bo'lmagan mahalliy o'zgaruvchilarga kirish imkoni yo'q.

## defineSlots()<sup class="vt-badge ts"/> {#defineslots}

- Faqat 3.3+ da qo'llab-quvvatlanadi

Bu makro IDE'larga slot nomi va prop'lar turini tekshirish uchun tur maslahatlarini ta'minlash uchun ishlatilishi mumkin.

`defineSlots()` faqat tur parametrini qabul qiladi va runtime argumentlari yo'q. Tur parametri xususiyat kaliti slot nomi va qiymat turi slot funksiyasi bo'lgan tur literal bo'lishi kerak. Funksiyaning birinchi argumenti slot qabul qilishi kutilayotgan prop'lar va uning turi shablondagi slot prop'lari uchun ishlatiladi. Qaytarilgan tur hozirda e'tiborga olinmaydi va `any` bo'lishi mumkin, lekin biz kelajakda slot kontentini tekshirish uchun undan foydalanishimiz mumkin.

Bu shuningdek `slots` ob'ektini qaytaradi, u setup kontekstida ochilgan yoki `useSlots()` tomonidan qaytarilgan `slots` ob'ekti bilan ekvivalent.

```vue
<script setup lang="ts">
const slots = defineSlots<{
  default(props: { msg: string }): any
}>()
</script>
```

## `useSlots()` & `useAttrs()` {#useslots-useattrs}

`<script setup>` ichida `slots` va `attrs` ishlatilishi nisbatan kam uchraydi, chunki ularga shablonda `$slots` va `$attrs` orqali to'g'ridan-to'g'ri kirish mumkin. Kam uchraydigan holatlarda, ularga kerak bo'lsa, mos ravishda `useSlots` va `useAttrs` yordamchilaridan foydalaning:

```vue
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```

`useSlots` va `useAttrs` `setupContext.slots` va `setupContext.attrs` bilan ekvivalent bo'lgan haqiqiy runtime funksiyalari. Ular oddiy kompozitsiya API funksiyalarida ham ishlatilishi mumkin.

## Oddiy `<script>` bilan Birga Ishlatish {#usage-alongside-normal-script}

`<script setup>` oddiy `<script>` bilan birga ishlatilishi mumkin. Oddiy `<script>` quyidagi holatlarda kerak bo'lishi mumkin:

- `<script setup>` da ifodalab bo'lmaydigan opsiyalarni e'lon qilish, masalan `inheritAttrs` yoki plugin'lar orqali yoqilgan maxsus opsiyalar (3.3+ da [`defineOptions`](/api/sfc-script-setup#defineoptions) bilan almashtirilishi mumkin).
- Nomlangan eksportlarni e'lon qilish.
- Faqat bir marta ishga tushirilishi kerak bo'lgan yon effektlarni ishga tushirish yoki ob'ektlarni yaratish.

```vue
<script>
// oddiy <script>, modul scope'ida ishga tushiriladi (faqat bir marta)
runSideEffectOnce()

// qo'shimcha opsiyalarni e'lon qilish
export default {
  inheritAttrs: false,
  customOptions: {}
}
</script>

<script setup>
// setup() scope'ida ishga tushiriladi (har bir instans uchun)
</script>
```

Bir xil komponentda `<script setup>` va `<script>` ni birlashtirish qo'llab-quvvatlanishi yuqorida tavsiflangan holatlarla cheklangan. Xususan:

- `<script setup>` da allaqachon e'lon qilish mumkin bo'lgan `props` va `emits` kabi opsiyalar uchun alohida `<script>` bo'limidan foydalanmang.
- `<script setup>` ichida yaratilgan o'zgaruvchilar komponent instansiga xususiyatlar sifatida qo'shilmaydi, shuning uchun ular Options API orqali kirish imkoni yo'q. API'larni shu tarzda aralashtirish kuchli tavsiya etilmaydi.

Agar o'zingizni qo'llab-quvvatlanmaydigan holatlardan birida topsangiz, `<script setup>` ishlatish o'rniga aniq [`setup()`](/api/composition-api-setup) funksiyasiga o'tishni ko'rib chiqishingiz kerak.

## Yuqori darajadagi `await` {#top-level-await}

Yuqori darajadagi `await` `<script setup>` ichida ishlatilishi mumkin. Natijada olingan kod `async setup()` sifatida kompilyatsiya qilinadi:

```vue
<script setup>
const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

Bundan tashqari, kutayotgan ifoda `await` dan keyin joriy komponent instans kontekstini saqlaydigan formatda avtomatik ravishda kompilyatsiya qilinadi.

:::warning Eslatma
`async setup()` hozirda hali eksperimental xususiyat bo'lgan [`Suspense`](/guide/built-ins/suspense.html) bilan birga ishlatilishi kerak. Biz uni kelajakdagi relizda yakunlash va hujjatlashtirishni rejalashtirmoqdamiz - lekin agar siz hozir qiziqsangiz, u qanday ishlashini ko'rish uchun uning [testlariga](https://github.com/vuejs/core/blob/main/packages/runtime-core/__tests__/components/Suspense.spec.ts) murojaat qilishingiz mumkin.
:::

## Import Bayonotlari {#imports-statements}

Vue'dagi import bayonotlari [ECMAScript modul spetsifikatsiyasiga](https://nodejs.org/api/esm.html) rioya qiladi.
Bundan tashqari, siz build tool konfiguratsiyangizda belgilangan alias'lardan foydalanishingiz mumkin:

```vue
<script setup>
import { ref } from 'vue'
import { componentA } from './Components'
import { componentB } from '@/Components'
import { componentC } from '~/Components'
</script>
```

## Generic'lar <sup class="vt-badge ts" /> {#generics}

Generic tur parametrlari `<script>` tegi ustidagi `generic` atributi yordamida e'lon qilinishi mumkin:

```vue
<script setup lang="ts" generic="T">
defineProps<{
  items: T[]
  selected: T
}>()
</script>
```

`generic` qiymati TypeScript'dagi `<...>` orasidagi parametrlar ro'yxati bilan bir xil ishlaydi. Masalan, siz bir nechta parametrlardan, `extends` cheklovlaridan, default turlardan va import qilingan turlarga havolalardan foydalanishingiz mumkin:

```vue
<script
  setup
  lang="ts"
  generic="T extends string | number, U extends Item"
>
import type { Item } from './types'
defineProps<{
  id: T
  list: U[]
}>()
</script>
```

Tur aniqlab bo'lmasa, aniq turlarni uzatish uchun `@vue-generic` direktivasidan foydalanishingiz mumkin:

```vue
<template>
  <!-- @vue-generic {import('@/api').Actor} -->
  <ApiSelect v-model="peopleIds" endpoint="/api/actors" id-prop="actorId" />

  <!-- @vue-generic {import('@/api').Genre} -->
  <ApiSelect v-model="genreIds" endpoint="/api/genres" id-prop="genreId" />
</template>
```

Generic komponentga havolani `ref` da ishlatish uchun `InstanceType` ishlamagani uchun [`vue-component-type-helpers`](https://www.npmjs.com/package/vue-component-type-helpers) kutubxonasidan foydalanish kerak.

```vue
<script
  setup
  lang="ts"
>
import componentWithoutGenerics from '../component-without-generics.vue';
import genericComponent from '../generic-component.vue';

import type { ComponentExposed } from 'vue-component-type-helpers';

// Generic'siz komponent uchun ishlaydi
ref<InstanceType<typeof componentWithoutGenerics>>();

ref<ComponentExposed<typeof genericComponent>>();
```

## Cheklovlar {#restrictions}

- Modul ishga tushirish semantikasi farqi tufayli, `<script setup>` ichidagi kod SFC kontekstiga tayanadi. Tashqi `.js` yoki `.ts` fayllariga ko'chirilganda, bu ham ishlab chiquvchilar, ham asboblar uchun chalkashlikka olib kelishi mumkin. Shuning uchun, **`<script setup>`** `src` atributi bilan ishlatilishi mumkin emas.
- `<script setup>` In-DOM Root Komponent Shablonini qo'llab-quvvatlamaydi.([Muhokama](https://github.com/vuejs/core/issues/8391))
