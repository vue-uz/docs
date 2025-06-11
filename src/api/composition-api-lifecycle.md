# Composition API: Hayot Aylanishi Hook'lari {#composition-api-lifecycle-hooks}

:::info Ishlatish Eslatmasi
Bu sahifada ro'yxatdan o'tkazilgan barcha API'lar komponentning `setup()` bosqichida sinxron ravishda chaqirilishi kerak. Batafsil ma'lumot uchun [Guide - Lifecycle Hooks](/guide/essentials/lifecycle)ni tekshiring.
:::

## onMounted() {#onmounted}

Komponent mount qilingandan keyin chaqiriladigan callback'ni ro'yxatdan o'tkazadi.

- **Turi**

  ```ts
  function onMounted(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **Tafsilotlar**

  Komponent quyidagilardan keyin mount qilingan hisoblanadi:

  - Uning barcha sinxron farzand komponentlari mount qilingan (bu async komponentlar yoki `<Suspense>` daraxtlari ichidagi komponentlarni o'z ichiga olmaydi).

  - Uning o'z DOM daraxti yaratilgan va ota-ona konteynerga kiritilgan. E'tibor bering, u faqat ilovaning ildiz konteyneri ham hujjatda bo'lsa, komponentning DOM daraxti hujjatda ekanligini kafolatlaydi.

  Bu hook odatda komponentning render qilingan DOM'iga kirishni talab qiladigan yon ta'sirlarni bajarish yoki DOM bilan bog'liq kodni [server-render qilingan ilovada](/guide/scaling-up/ssr) mijozga cheklash uchun ishlatiladi.

  **Bu hook server-side rendering paytida chaqirilmaydi.**

- **Misol**

  Shablon ref orqali elementga kirish:

  ```vue
  <script setup>
  import { ref, onMounted } from 'vue'

  const el = ref()

  onMounted(() => {
    el.value // <div>
  })
  </script>

  <template>
    <div ref="el"></div>
  </template>
  ```

## onUpdated() {#onupdated}

Komponent reaktiv holat o'zgarishi tufayli o'z DOM daraxtini yangilagandan keyin chaqiriladigan callback'ni ro'yxatdan o'tkazadi.

- **Turi**

  ```ts
  function onUpdated(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **Tafsilotlar**

  Ota-ona komponentning updated hook'i uning farzand komponentlaridan keyin chaqiriladi.

  Bu hook komponentning har qanday DOM yangilanishidan keyin chaqiriladi, bu turli holat o'zgarishlari tufayli bo'lishi mumkin, chunki bir nechta holat o'zgarishlari ishlash sabablari uchun bitta render aylanishiga to'planishi mumkin. Agar siz ma'lum bir holat o'zgarishidan keyin yangilangan DOM'ga kirishni xohlasangiz, buning o'rniga [nextTick()](/api/general#nexttick)ni ishlating.

  **Bu hook server-side rendering paytida chaqirilmaydi.**

  :::warning
  Updated hook'da komponent holatini o'zgartirmang - bu cheksiz yangilanish tsikliga olib kelishi mumkin!
  :::

- **Misol**

  Yangilangan DOM'ga kirish:

  ```vue
  <script setup>
  import { ref, onUpdated } from 'vue'

  const count = ref(0)

  onUpdated(() => {
    // matn mazmuni joriy `count.value` bilan bir xil bo'lishi kerak
    console.log(document.getElementById('count').textContent)
  })
  </script>

  <template>
    <button id="count" @click="count++">{{ count }}</button>
  </template>
  ```

## onUnmounted() {#onunmounted}

Komponent unmount qilingandan keyin chaqiriladigan callback'ni ro'yxatdan o'tkazadi.

- **Turi**

  ```ts
  function onUnmounted(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **Tafsilotlar**

  Komponent quyidagilardan keyin unmount qilingan hisoblanadi:

  - Uning barcha farzand komponentlari unmount qilingan.

  - Uning barcha bog'liq reaktiv ta'sirlari (render ta'siri va `setup()` paytida yaratilgan computed / kuzatuvchilar) to'xtatilgan.

  Bu hook'ni qo'lda yaratilgan yon ta'sirlarni, masalan, taymerlar, DOM hodisa tinglovchilari yoki server ulanishlarini tozalash uchun ishlating.

  **Bu hook server-side rendering paytida chaqirilmaydi.**

- **Misol**

  ```vue
  <script setup>
  import { onMounted, onUnmounted } from 'vue'

  let intervalId
  onMounted(() => {
    intervalId = setInterval(() => {
      // ...
    })
  })

  onUnmounted(() => clearInterval(intervalId))
  </script>
  ```

## onBeforeMount() {#onbeforemount}

Komponent mount qilinishidan oldin chaqiriladigan hook'ni ro'yxatdan o'tkazadi.

- **Turi**

  ```ts
  function onBeforeMount(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **Tafsilotlar**

  Bu hook chaqirilganda, komponent o'z reaktiv holatini sozlashni tugatgan, lekin hali DOM tugunlari yaratilmagan. U birinchi marta o'z DOM render ta'sirini bajarish arafasida.

  **Bu hook server-side rendering paytida chaqirilmaydi.**

## onBeforeUpdate() {#onbeforeupdate}

Komponent reaktiv holat o'zgarishi tufayli o'z DOM daraxtini yangilashidan oldin chaqiriladigan hook'ni ro'yxatdan o'tkazadi.

- **Turi**

  ```ts
  function onBeforeUpdate(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **Tafsilotlar**

  Bu hook Vue DOM'ni yangilashidan oldin DOM holatiga kirish uchun ishlatilishi mumkin. Bu hook ichida komponent holatini o'zgartirish ham xavfsiz.

  **Bu hook server-side rendering paytida chaqirilmaydi.**

## onBeforeUnmount() {#onbeforeunmount}

Komponent instansiyasi unmount qilinishidan oldin chaqiriladigan hook'ni ro'yxatdan o'tkazadi.

- **Turi**

  ```ts
  function onBeforeUnmount(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **Tafsilotlar**

  Bu hook chaqirilganda, komponent instansiyasi hali to'liq ishlaydi.

  **Bu hook server-side rendering paytida chaqirilmaydi.**

## onErrorCaptured() {#onerrorcaptured}

Avlod komponentdan tarqalayotgan xatani ushlaganda chaqiriladigan hook'ni ro'yxatdan o'tkazadi.

- **Turi**

  ```ts
  function onErrorCaptured(callback: ErrorCapturedHook): void

  type ErrorCapturedHook = (
    err: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => boolean | void
  ```

- **Tafsilotlar**

  Xatolar quyidagi manbalardan ushlanishi mumkin:

  - Komponent renderlari
  - Hodisa ishlovchilari
  - Hayot aylanishi hook'lari
  - `setup()` funksiyasi
  - Kuzatuvchilar
  - Maxsus direktiva hook'lari
  - O'tish hook'lari

  Hook uchta argument oladi: xato, xatoni ishga tushirgan komponent instansiyasi va xato manba turini belgilaydigan ma'lumot stringi.

  :::tip
  Production'da, 3-argument (`info`) to'liq ma'lumot stringi o'rniga qisqartirilgan kod bo'ladi. Siz kodni string mapping'ini [Production Error Code Reference](/error-reference/#runtime-errors)da topishingiz mumkin.
  :::

  Siz `onErrorCaptured()`da komponent holatini foydalanuvchiga xato holatini ko'rsatish uchun o'zgartirishingiz mumkin. Biroq, xato holati xatoga sabab bo'lgan asl mazmunni render qilmasligi muhim; aks holda komponent cheksiz render tsikliga tushadi.

  Hook xatoni keyingi tarqalishini to'xtatish uchun `false` qaytarishi mumkin. Xato tarqalish tafsilotlarini quyida ko'ring.

  **Xato Tarqalish Qoidalari**

  - Default bo'yicha, barcha xatolar agar aniqlangan bo'lsa, ilova darajasidagi [`app.config.errorHandler`](/api/application#app-config-errorhandler)ga yuboriladi, shunda bu xatolar hali ham analitika xizmatiga bitta joyda xabar qilinishi mumkin.

  - Agar komponentning meros zanjiri yoki ota-ona zanjirida bir nechta `errorCaptured` hook'lari mavjud bo'lsa, ularning barchasi bir xil xatoda, pastdan yuqoriga qarab chaqiriladi. Bu asosiy DOM hodisalarining bubbling mexanizmi bilan o'xshash.

  - Agar `errorCaptured` hook'i o'zi xatoni chiqarsa, ham bu xato, ham asl ushlangan xato `app.config.errorHandler`ga yuboriladi.

  - `errorCaptured` hook'i xatoni keyingi tarqalishini oldini olish uchun `false` qaytarishi mumkin. Bu asosan "bu xato boshqarilgan va e'tibor berilmasligi kerak" degani. Bu bu xato uchun qo'shimcha `errorCaptured` hook'lari yoki `app.config.errorHandler` chaqirilishini oldini oladi.

## onRenderTracked() <sup class="vt-badge dev-only" /> {#onrendertracked}

Komponentning render ta'siri tomonidan reaktiv bog'liqlik kuzatilganda chaqiriladigan debug hook'ni ro'yxatdan o'tkazadi.

**Bu hook faqat development rejimida va server-side rendering paytida chaqirilmaydi.**

- **Turi**

  ```ts
  function onRenderTracked(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **Qarang** [Reactivity in Depth](/guide/extras/reactivity-in-depth)

## onRenderTriggered() <sup class="vt-badge dev-only" /> {#onrendertriggered}

Registers a debug hook to be called when a reactive dependency triggers the component's render effect to be re-run.

**This hook is development-mode-only and not called during server-side rendering.**

- **Type**

  ```ts
  function onRenderTriggered(callback: DebuggerHook): void

  type DebuggerHook = (e: DebuggerEvent) => void

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
    key: any
    newValue?: any
    oldValue?: any
    oldTarget?: Map<any, any> | Set<any>
  }
  ```

- **See also** [Reactivity in Depth](/guide/extras/reactivity-in-depth)

## onActivated() {#onactivated}

Registers a callback to be called after the component instance is inserted into the DOM as part of a tree cached by [`<KeepAlive>`](/api/built-in-components#keepalive).

**This hook is not called during server-side rendering.**

- **Type**

  ```ts
  function onActivated(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **See also** [Guide - Lifecycle of Cached Instance](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## onDeactivated() {#ondeactivated}

Registers a callback to be called after the component instance is removed from the DOM as part of a tree cached by [`<KeepAlive>`](/api/built-in-components#keepalive).

**This hook is not called during server-side rendering.**

- **Type**

  ```ts
  function onDeactivated(callback: () => void, target?: ComponentInternalInstance | null): void
  ```

- **See also** [Guide - Lifecycle of Cached Instance](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## onServerPrefetch() <sup class="vt-badge" data-text="SSR only" /> {#onserverprefetch}

Registers an async function to be resolved before the component instance is to be rendered on the server.

- **Type**

  ```ts
  function onServerPrefetch(callback: () => Promise<any>): void
  ```

- **Details**

  If the callback returns a Promise, the server renderer will wait until the Promise is resolved before rendering the component.

  This hook is only called during server-side rendering can be used to perform server-only data fetching.

- **Example**

  ```vue
  <script setup>
  import { ref, onServerPrefetch, onMounted } from 'vue'

  const data = ref(null)

  onServerPrefetch(async () => {
    // component is rendered as part of the initial request
    // pre-fetch data on server as it is faster than on the client
    data.value = await fetchOnServer(/* ... */)
  })

  onMounted(async () => {
    if (!data.value) {
      // if data is null on mount, it means the component
      // is dynamically rendered on the client. Perform a
      // client-side fetch instead.
      data.value = await fetchOnClient(/* ... */)
    }
  })
  </script>
  ```

- **See also** [Server-Side Rendering](/guide/scaling-up/ssr)
