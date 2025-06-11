# Options: Hayot Aylanishi {#options-lifecycle}

:::info Qarang
Hayot aylanishi hook'larining umumiy ishlatilishi uchun [Guide - Lifecycle Hooks](/guide/essentials/lifecycle)ni tekshiring
:::

## beforeCreate {#beforecreate}

Instansiya ishga tushirilganda chaqiriladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    beforeCreate?(this: ComponentPublicInstance): void
  }
  ```

- **Tafsilotlar**

  Instansiya ishga tushirilganda va props'lar hal qilinganda darhol chaqiriladi.

  Keyin props'lar reaktiv xususiyatlar sifatida va `data()` yoki `computed` kabi holat sozlanadi.

  E'tibor bering, Composition API'ning `setup()` hook'i har qanday Options API hook'laridan oldin, hatto `beforeCreate()`dan ham oldin chaqiriladi.

## created {#created}

Instansiya barcha holat bilan bog'liq opsiyalarni qayta ishlashni tugatgandan keyin chaqiriladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    created?(this: ComponentPublicInstance): void
  }
  ```

- **Tafsilotlar**

  Bu hook chaqirilganda, quyidagilar sozlanadi: reaktiv ma'lumotlar, computed xususiyatlar, metodlar va kuzatuvchilar. Biroq, mount bosqichi boshlanmagan va `$el` xususiyati hali mavjud bo'lmaydi.

## beforeMount {#beforemount}

Komponent mount qilinishidan oldin chaqiriladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    beforeMount?(this: ComponentPublicInstance): void
  }
  ```

- **Tafsilotlar**

  Bu hook chaqirilganda, komponent o'z reaktiv holatini sozlashni tugatgan, lekin hali DOM tugunlari yaratilmagan. U birinchi marta o'z DOM render ta'sirini bajarish arafasida.

  **Bu hook server-side rendering paytida chaqirilmaydi.**

## mounted {#mounted}

Komponent mount qilingandan keyin chaqiriladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    mounted?(this: ComponentPublicInstance): void
  }
  ```

- **Tafsilotlar**

  Komponent quyidagilardan keyin mount qilingan hisoblanadi:

  - Uning barcha sinxron farzand komponentlari mount qilingan (bu async komponentlar yoki `<Suspense>` daraxtlari ichidagi komponentlarni o'z ichiga olmaydi).

  - Uning o'z DOM daraxti yaratilgan va ota-ona konteynerga kiritilgan. E'tibor bering, u faqat ilovaning ildiz konteyneri ham hujjatda bo'lsa, komponentning DOM daraxti hujjatda ekanligini kafolatlaydi.

  Bu hook odatda komponentning render qilingan DOM'iga kirishni talab qiladigan yon ta'sirlarni bajarish yoki DOM bilan bog'liq kodni [server-render qilingan ilovada](/guide/scaling-up/ssr) mijozga cheklash uchun ishlatiladi.

  **Bu hook server-side rendering paytida chaqirilmaydi.**

## beforeUpdate {#beforeupdate}

Komponent reaktiv holat o'zgarishi tufayli o'z DOM daraxtini yangilashidan oldin chaqiriladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    beforeUpdate?(this: ComponentPublicInstance): void
  }
  ```

- **Tafsilotlar**

  Bu hook Vue DOM'ni yangilashidan oldin DOM holatiga kirish uchun ishlatilishi mumkin. Bu hook ichida komponent holatini o'zgartirish ham xavfsiz.

  **Bu hook server-side rendering paytida chaqirilmaydi.**

## updated {#updated}

Komponent reaktiv holat o'zgarishi tufayli o'z DOM daraxtini yangilagandan keyin chaqiriladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    updated?(this: ComponentPublicInstance): void
  }
  ```

- **Tafsilotlar**

  Ota-ona komponentning updated hook'i uning farzand komponentlaridan keyin chaqiriladi.

  Bu hook komponentning har qanday DOM yangilanishidan keyin chaqiriladi, bu turli holat o'zgarishlari tufayli bo'lishi mumkin. Agar siz ma'lum bir holat o'zgarishidan keyin yangilangan DOM'ga kirishni xohlasangiz, buning o'rniga [nextTick()](/api/general#nexttick)ni ishlating.

  **Bu hook server-side rendering paytida chaqirilmaydi.**

  :::warning
  Updated hook'da komponent holatini o'zgartirmang - bu cheksiz yangilanish tsikliga olib kelishi mumkin!
  :::

## beforeUnmount {#beforeunmount}

Komponent instansiyasi unmount qilinishidan oldin chaqiriladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    beforeUnmount?(this: ComponentPublicInstance): void
  }
  ```

- **Tafsilotlar**

  Bu hook chaqirilganda, komponent instansiyasi hali to'liq ishlaydi.

  **Bu hook server-side rendering paytida chaqirilmaydi.**

## unmounted {#unmounted}

Komponent unmount qilingandan keyin chaqiriladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    unmounted?(this: ComponentPublicInstance): void
  }
  ```

- **Tafsilotlar**

  Komponent quyidagilardan keyin unmount qilingan hisoblanadi:

  - Uning barcha farzand komponentlari unmount qilingan.

  - Uning barcha bog'liq reaktiv ta'sirlari (render ta'siri va `setup()` paytida yaratilgan computed / kuzatuvchilar) to'xtatilgan.

  Bu hook'ni qo'lda yaratilgan yon ta'sirlarni, masalan, taymerlar, DOM hodisa tinglovchilari yoki server ulanishlarini tozalash uchun ishlating.

  **Bu hook server-side rendering paytida chaqirilmaydi.**

## errorCaptured {#errorcaptured}

Avlod komponentdan tarqalayotgan xatani ushlaganda chaqiriladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    errorCaptured?(
      this: ComponentPublicInstance,
      err: unknown,
      instance: ComponentPublicInstance | null,
      info: string
    ): boolean | void
  }
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

  Siz `errorCaptured()`da komponent holatini foydalanuvchiga xato holatini ko'rsatish uchun o'zgartirishingiz mumkin. Biroq, xato holati xatoga sabab bo'lgan asl mazmunni render qilmasligi muhim; aks holda komponent cheksiz render tsikliga tushadi.

  Hook xatoni keyingi tarqalishini to'xtatish uchun `false` qaytarishi mumkin. Xato tarqalish tafsilotlarini quyida ko'ring.

  **Xato Tarqalish Qoidalari**

  - Default bo'yicha, barcha xatolar agar aniqlangan bo'lsa, ilova darajasidagi [`app.config.errorHandler`](/api/application#app-config-errorhandler)ga yuboriladi, shunda bu xatolar hali ham analitika xizmatiga bitta joyda xabar qilinishi mumkin.

  - Agar komponentning meros zanjiri yoki ota-ona zanjirida bir nechta `errorCaptured` hook'lari mavjud bo'lsa, ularning barchasi bir xil xatoda, pastdan yuqoriga qarab chaqiriladi. Bu asosiy DOM hodisalarining bubbling mexanizmi bilan o'xshash.

  - Agar `errorCaptured` hook'i o'zi xatoni chiqarsa, ham bu xato, ham asl ushlangan xato `app.config.errorHandler`ga yuboriladi.

  - `errorCaptured` hook'i xatoni keyingi tarqalishini oldini olish uchun `false` qaytarishi mumkin. Bu asosan "bu xato boshqarilgan va e'tibor berilmasligi kerak" degani. Bu bu xato uchun qo'shimcha `errorCaptured` hook'lari yoki `app.config.errorHandler` chaqirilishini oldini oladi.

  **Xato Ushlash Ogohlantirishlari**
  
  - Async `setup()` funksiyasi (yuqori darajadagi `await` bilan) komponentlarda Vue komponent shablonini render qilishga har doim harakat qiladi, hatto `setup()` xatolik chiqarsa ham. Bu ko'proq xatolarga olib kelishi mumkin, chunki render paytida komponentning shablonu muvaffaqiyatsiz `setup()` kontekstining mavjud bo'lmagan xususiyatlariga kirishga harakat qilishi mumkin. Bunday komponentlarda xatolarni ushlashda, ham muvaffaqiyatsiz async `setup()` (ular har doim birinchi keladi), ham muvaffaqiyatsiz render jarayonidan kelib chiqadigan xatolarni boshqarishga tayyor bo'ling.

  - <sup class="vt-badge" data-text="SSR only"></sup> `<Suspense>` ichida chuqur joylashgan ota-ona komponentda xatolik chiqarish mumkin bo'lgan mantiqni farzand `setup()`dan alohida funksiyaga ajratib, uni ota-ona komponentning `setup()`ida bajarishga harakat qiling, u yerda siz bajarish jarayonini xavfsiz `try/catch` qilishingiz va kerak bo'lsa, haqiqiy farzand komponentni render qilishdan oldin almashtirishingiz mumkin.

## renderTracked <sup class="vt-badge dev-only" /> {#rendertracked}

Komponentning render ta'siri tomonidan reaktiv bog'liqlik kuzatilganda chaqiriladi.

**Bu hook faqat development rejimida va server-side rendering paytida chaqirilmaydi.**

- **Turi**

  ```ts
  interface ComponentOptions {
    renderTracked?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

  type DebuggerEvent = {
    effect: ReactiveEffect
    target: object
    type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
    key: any
  }
  ```

- **Qarang** [Reactivity in Depth](/guide/extras/reactivity-in-depth)

## renderTriggered <sup class="vt-badge dev-only" /> {#rendertriggered}

Reaktiv bog'liqlik komponentning render ta'sirini qayta ishga tushirishga sabab bo'lganda chaqiriladi.

**Bu hook faqat development rejimida va server-side rendering paytida chaqirilmaydi.**

- **Turi**

  ```ts
  interface ComponentOptions {
    renderTriggered?(this: ComponentPublicInstance, e: DebuggerEvent): void
  }

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

- **Qarang** [Reactivity in Depth](/guide/extras/reactivity-in-depth)

## activated {#activated}

Komponent instansiyasi [`<KeepAlive>`](/api/built-in-components#keepalive) tomonidan keshga olingan daraxtning bir qismi sifatida DOM'ga kiritilgandan keyin chaqiriladi.

**Bu hook server-side rendering paytida chaqirilmaydi.**

- **Turi**

  ```ts
  interface ComponentOptions {
    activated?(this: ComponentPublicInstance): void
  }
  ```

- **Qarang** [Guide - Lifecycle of Cached Instance](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## deactivated {#deactivated}

Komponent instansiyasi [`<KeepAlive>`](/api/built-in-components#keepalive) tomonidan keshga olingan daraxtning bir qismi sifatida DOM'dan olib tashlangandan keyin chaqiriladi.

**Bu hook server-side rendering paytida chaqirilmaydi.**

- **Turi**

  ```ts
  interface ComponentOptions {
    deactivated?(this: ComponentPublicInstance): void
  }
  ```

- **Qarang** [Guide - Lifecycle of Cached Instance](/guide/built-ins/keep-alive#lifecycle-of-cached-instance)

## serverPrefetch <sup class="vt-badge" data-text="SSR only" /> {#serverprefetch}

Komponent instansiyasi serverda render qilinishidan oldin hal qilish uchun async funksiyani ro'yxatdan o'tkazadi.

- **Turi**

  ```ts
  interface ComponentOptions {
    serverPrefetch?(this: ComponentPublicInstance): Promise<any>
  }
  ```

- **Tafsilotlar**

  Agar funksiya Promise qaytarsa, server renderer komponentni render qilishdan oldin Promise hal qilinishini kutadi.

  Bu hook faqat server-side rendering paytida chaqiriladi va server-side ma'lumotlarni olish uchun ishlatilishi mumkin.

- **Misol**

  ```vue
  <script>
  export default {
    data() {
      return {
        items: []
      }
    },
    async serverPrefetch() {
      // server-side ma'lumotlarni olish
      this.items = await fetchOnServer(/* ... */)
    },
    async mounted() {
      if (!this.items.length) {
        // agar ma'lumotlar bo'sh bo'lsa, bu komponent
        // mijozda dinamik ravishda render qilingan.
        // Buning o'rniga mijozda ma'lumotlarni olish.
        this.items = await fetchOnClient(/* ... */)
      }
    }
  }
  </script>
  ```

- **Qarang** [Server-Side Rendering](/guide/scaling-up/ssr)
