# Composition API: Yordamchilar {#composition-api-helpers}

## useAttrs() {#useattrs}

[Setup Context](/api/composition-api-setup#setup-context)dan `attrs` ob'ektini qaytaradi, u joriy komponentning [fallthrough atributlarini](/guide/components/attrs#fallthrough-attributes) o'z ichiga oladi. Bu `<script setup>`da ishlatish uchun mo'ljallangan, u yerda setup kontekst ob'ekti mavjud emas.

- **Turi**

  ```ts
  function useAttrs(): Record<string, unknown>
  ```

## useSlots() {#useslots}

[Setup Context](/api/composition-api-setup#setup-context)dan `slots` ob'ektini qaytaradi, u ota-ona tomonidan o'tkazilgan slotlarni Virtual DOM tugunlarini qaytaruvchi chaqiriladigan funksiyalar sifatida o'z ichiga oladi. Bu `<script setup>`da ishlatish uchun mo'ljallangan, u yerda setup kontekst ob'ekti mavjud emas.

Agar TypeScript ishlatilsa, [`defineSlots()`](/api/sfc-script-setup#defineslots) afzal ko'rilishi kerak.

- **Turi**

  ```ts
  function useSlots(): Record<string, (...args: any[]) => VNode[]>
  ```

## useModel() {#usemodel}

Bu [`defineModel()`](/api/sfc-script-setup#definemodel)ni quvvatlovchi asosiy yordamchi. Agar `<script setup>` ishlatilsa, `defineModel()` afzal ko'rilishi kerak.

- Faqat 3.4+ versiyasida mavjud

- **Turi**

  ```ts
  function useModel(
    props: Record<string, any>,
    key: string,
    options?: DefineModelOptions
  ): ModelRef

  type DefineModelOptions<T = any> = {
    get?: (v: T) => any
    set?: (v: T) => any
  }

  type ModelRef<T, M extends PropertyKey = string, G = T, S = T> = Ref<G, S> & [
    ModelRef<T, M, G, S>,
    Record<M, true | undefined>
  ]
  ```

- **Misol**

  ```js
  export default {
    props: ['count'],
    emits: ['update:count'],
    setup(props) {
      const msg = useModel(props, 'count')
      msg.value = 1
    }
  }
  ```

- **Tafsilotlar**

  `useModel()` SFC bo'lmagan komponentlarda ishlatilishi mumkin, masalan, xom `setup()` funksiyasini ishlatganda. U birinchi argument sifatida `props` ob'ektini va ikkinchi argument sifatida model nomini kutadi. Ixtiyoriy uchinchi argument natijaviy model ref uchun maxsus getter va setter e'lon qilish uchun ishlatilishi mumkin. E'tibor bering, `defineModel()`dan farqli ravishda, siz props va emits'ni o'zingiz e'lon qilish uchun mas'ulsiz.

## useTemplateRef() <sup class="vt-badge" data-text="3.5+" /> {#usetemplateref}

Qiymati mos keladigan ref atributiga ega shablon elementi yoki komponenti bilan sinxronlashtiriladigan shallow ref'ni qaytaradi.

- **Turi**

  ```ts
  function useTemplateRef<T>(key: string): Readonly<ShallowRef<T | null>>
  ```

- **Misol**

  ```vue
  <script setup>
  import { useTemplateRef, onMounted } from 'vue'

  const inputRef = useTemplateRef('input')

  onMounted(() => {
    inputRef.value.focus()
  })
  </script>

  <template>
    <input ref="input" />
  </template>
  ```

- **Qarang**
  - [Guide - Template Refs](/guide/essentials/template-refs)
  - [Guide - Typing Template Refs](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />
  - [Guide - Typing Component Template Refs](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />

## useId() <sup class="vt-badge" data-text="3.5+" /> {#useid}

Kirish atributlari yoki form elementlari uchun ilovaga o'ziga xos ID'larni yaratish uchun ishlatiladi.

- **Turi**

  ```ts
  function useId(): string
  ```

- **Misol**

  ```vue
  <script setup>
  import { useId } from 'vue'

  const id = useId()
  </script>

  <template>
    <form>
      <label :for="id">Name:</label>
      <input :id="id" type="text" />
    </form>
  </template>
  ```

- **Tafsilotlar**

  `useId()` tomonidan yaratilgan ID'lar ilovaga o'ziga xos. U form elementlari va kirish atributlari uchun ID'lar yaratish uchun ishlatilishi mumkin. Bir xil komponentda bir nechta chaqiruvlar boshqa ID'lar yaratadi; bir xil komponentning bir nechta instansiyalari `useId()`ni chaqirganda ham boshqa ID'larga ega bo'ladi.

  `useId()` tomonidan yaratilgan ID'lar server va mijoz renderlari o'rtasida barqaror bo'lishi kafolatlanadi, shuning uchun ular hydration nomuvofiqliklariga olib kelmasdan SSR ilovalarida ishlatilishi mumkin.

  Agar sizda bir xil sahifaning bir nechta Vue ilova instansiyasi bo'lsa, har bir ilovaga [`app.config.idPrefix`](/api/application#app-config-idprefix) orqali ID prefiksini berish orqali ID ziddiyatlarini oldini olishingiz mumkin.
