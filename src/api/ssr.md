# Server-Side Rendering API {#server-side-rendering-api}

## renderToString() {#rendertostring}

- **`vue/server-renderer`dan eksport qilingan**

- **Turi**

  ```ts
  function renderToString(
    input: App | VNode,
    context?: SSRContext
  ): Promise<string>
  ```

- **Misol**

  ```js
  import { createSSRApp } from 'vue'
  import { renderToString } from 'vue/server-renderer'

  const app = createSSRApp({
    data: () => ({ msg: 'hello' }),
    template: `<div>{{ msg }}</div>`
  })

  ;(async () => {
    const html = await renderToString(app)
    console.log(html)
  })()
  ```

  ### SSR Context {#ssr-context}

  Siz ixtiyoriy context ob'ektini o'tkazishingiz mumkin, u render paytida qo'shimcha ma'lumotlarni yozib olish uchun ishlatilishi mumkin, masalan [Teleports mazmuniga kirish](/guide/scaling-up/ssr#teleports):

  ```js
  const ctx = {}
  const html = await renderToString(app, ctx)

  console.log(ctx.teleports) // { '#teleported': 'teleported content' }
  ```

  Bu sahifadagi boshqa ko'p SSR API'lar ham ixtiyoriy ravishda context ob'ektini qabul qiladi. Context ob'ektiga komponent kodi orqali [useSSRContext](#usessrcontext) yordamchisi orqali kirish mumkin.

- **Qarang** [Guide - Server-Side Rendering](/guide/scaling-up/ssr)

## renderToNodeStream() {#rendertonodestream}

Kirishni [Node.js Readable stream](https://nodejs.org/api/stream.html#stream_class_stream_readable) sifatida render qiladi.

- **`vue/server-renderer`dan eksport qilingan**

- **Turi**

  ```ts
  function renderToNodeStream(
    input: App | VNode,
    context?: SSRContext
  ): Readable
  ```

- **Misol**

  ```js
  // Node.js http handler ichida
  renderToNodeStream(app).pipe(res)
  ```

  :::tip Eslatma
  Bu metod `vue/server-renderer`ning ESM buildida qo'llab-quvvatlanmaydi, u Node.js muhitidan ajratilgan. O'rniga [`pipeToNodeWritable`](#pipetonodewritable)ni ishlating.
  :::

## pipeToNodeWritable() {#pipetonodewritable}

Mavjud [Node.js Writable stream](https://nodejs.org/api/stream.html#stream_writable_streams) instansiyasiga render qiladi va pipe qiladi.

- **`vue/server-renderer`dan eksport qilingan**

- **Turi**

  ```ts
  function pipeToNodeWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: Writable
  ): void
  ```

- **Misol**

  ```js
  // Node.js http handler ichida
  pipeToNodeWritable(app, {}, res)
  ```

## renderToWebStream() {#rendertowebstream}

Kirishni [Web ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) sifatida render qiladi.

- **`vue/server-renderer`dan eksport qilingan**

- **Turi**

  ```ts
  function renderToWebStream(
    input: App | VNode,
    context?: SSRContext
  ): ReadableStream
  ```

- **Misol**

  ```js
  // ReadableStream qo'llab-quvvatlash mavjud muhitda
  return new Response(renderToWebStream(app))
  ```

  :::tip Eslatma
  Global scope'da `ReadableStream` konstruktorini ochib bermaydigan muhitlarda, o'rniga [`pipeToWebWritable()`](#pipetowebwritable) ishlatilishi kerak.
  :::

## pipeToWebWritable() {#pipetowebwritable}

Mavjud [Web WritableStream](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream) instansiyasiga render qiladi va pipe qiladi.

- **`vue/server-renderer`dan eksport qilingan**

- **Turi**

  ```ts
  function pipeToWebWritable(
    input: App | VNode,
    context: SSRContext = {},
    writable: WritableStream
  ): void
  ```

- **Misol**

  Bu odatda [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream) bilan birgalikda ishlatiladi:

  ```js
  // TransformStream CloudFlare workers kabi muhitlarda mavjud.
  // Node.js da, TransformStream 'stream/web'dan aniq import qilish kerak
  const { readable, writable } = new TransformStream()
  pipeToWebWritable(app, {}, writable)

  return new Response(readable)
  ```

## renderToSimpleStream() {#rendertosimplestream}

Oddiy o'qiladigan interfeys yordamida streaming rejimida kirishni render qiladi.

- **`vue/server-renderer`dan eksport qilingan**

- **Turi**

  ```ts
  function renderToSimpleStream(
    input: App | VNode,
    context: SSRContext,
    options: SimpleReadable
  ): SimpleReadable

  interface SimpleReadable {
    push(content: string | null): void
    destroy(err: any): void
  }
  ```

- **Misol**

  ```js
  let res = ''

  renderToSimpleStream(
    app,
    {},
    {
      push(chunk) {
        if (chunk === null) {
          // tugadi
          console(`render complete: ${res}`)
        } else {
          res += chunk
        }
      },
      destroy(err) {
        // xatolik yuz berdi
      }
    }
  )
  ```

## useSSRContext() {#usessrcontext}

`renderToString()` yoki boshqa server render API'lariga o'tkazilgan context ob'ektini olish uchun ishlatiladigan runtime API.

- **Turi**

  ```ts
  function useSSRContext<T = Record<string, any>>(): T | undefined
  ```

- **Misol**

  Olingan context yakuniy HTMLni render qilish uchun kerakli ma'lumotlarni biriktirish uchun ishlatilishi mumkin (masalan. head metadata).

  ```vue
  <script setup>
  import { useSSRContext } from 'vue'

  // faqat SSR paytida chaqirilishiga ishonch hosil qiling
  // https://vitejs.dev/guide/ssr.html#conditional-logic
  if (import.meta.env.SSR) {
    const ctx = useSSRContext()
    // ...contextga xususiyatlarni biriktirish
  }
  </script>
  ```

## data-allow-mismatch <sup class="vt-badge" data-text="3.5+" /> {#data-allow-mismatch}

[hydration mismatch](/guide/scaling-up/ssr#hydration-mismatch) ogohlantirishlarini bostirish uchun ishlatilishi mumkin bo'lgan maxsus atribut.

- **Misol**

  ```html
  <div data-allow-mismatch="text">{{ data.toLocaleString() }}</div>
  ```

  Qiymat ruxsat etilgan nomuvofiqlikni ma'lum turga cheklashi mumkin. Ruxsat etilgan qiymatlar:

  - `text`
  - `children` (faqat to'g'ridan-to'g'ri farzandlar uchun nomuvofiqlikka ruxsat beradi)
  - `class`
  - `style`
  - `attribute`

  Agar qiymat taqdim etilmagan bo'lsa, barcha turdagi nomuvofiqliklarga ruxsat beriladi.
