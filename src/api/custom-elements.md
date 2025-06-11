# Maxsus Elementlar API {#custom-elements-api}

## defineCustomElement() {#definecustomelement}

Bu metod [`defineComponent`](#definecomponent) bilan bir xil argumentni qabul qiladi, lekin o'rniga [Maxsus Element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) klass konstruktorini qaytaradi.

- **Turi**

  ```ts
  function defineCustomElement(
    component:
      | (ComponentOptions & CustomElementsOptions)
      | ComponentOptions['setup'],
    options?: CustomElementsOptions
  ): {
    new (props?: object): HTMLElement
  }

  interface CustomElementsOptions {
    styles?: string[]

    // quyidagi opsiyalar 3.5+ versiyasidan
    configureApp?: (app: App) => void
    shadowRoot?: boolean
    nonce?: string
  }
  ```

  > O'qish osonligi uchun tur soddalashtirilgan.

- **Tafsilotlar**

  Oddiy komponent opsiyalaridan tashqari, `defineCustomElement()` quyidagi maxsus elementlarga xos opsiyalarni ham qo'llab-quvvatlaydi:

  - **`styles`**: elementning shadow root'iga kiritilishi kerak bo'lgan CSS'ni ta'minlash uchun inlined CSS stringlarining massivi.

  - **`configureApp`** <sup class="vt-badge" data-text="3.5+"/>: maxsus element uchun Vue ilova instansiyasini sozlash uchun ishlatilishi mumkin bo'lgan funksiya.

  - **`shadowRoot`** <sup class="vt-badge" data-text="3.5+"/>: `boolean`, default qiymati `true`. Maxsus elementni shadow root'siz render qilish uchun `false` qo'ying. Bu maxsus element SFC'laridagi `<style>` endi inkapsulyatsiya qilinmasligini anglatadi.

  - **`nonce`** <sup class="vt-badge" data-text="3.5+"/>: `string`, agar taqdim etilgan bo'lsa, shadow root'ga kiritilgan style teglarida `nonce` atributi sifatida o'rnatiladi.

  E'tibor bering, bu opsiyalar komponentning o'zining bir qismi sifatida o'tkazilish o'rniga, ikkinchi argument orqali ham o'tkazilishi mumkin:

  ```js
  import Element from './MyElement.ce.vue'

  defineCustomElement(Element, {
    configureApp(app) {
      // ...
    }
  })
  ```

  Qaytarilgan qiymat [`customElements.define()`](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) yordamida ro'yxatdan o'tkazilishi mumkin bo'lgan maxsus element konstruktoridir.

- **Misol**

  ```js
  import { defineCustomElement } from 'vue'

  const MyVueElement = defineCustomElement({
    /* komponent opsiyalari */
  })

  // Maxsus elementni ro'yxatdan o'tkazish.
  customElements.define('my-vue-element', MyVueElement)
  ```

- **Qarang**

  - [Guide - Vue bilan Maxsus Elementlar Yaratish](/guide/extras/web-components#building-custom-elements-with-vue)

  - Shuningdek, `defineCustomElement()` Single-File Components bilan ishlatilganda [maxsus konfiguratsiya](/guide/extras/web-components#sfc-as-custom-element) talab qilinishini unutmang.

## useHost() <sup class="vt-badge" data-text="3.5+"/> {#usehost}

Joriy Vue maxsus elementining host elementini qaytaruvchi Composition API yordamchisi.

## useShadowRoot() <sup class="vt-badge" data-text="3.5+"/> {#useshadowroot}

Joriy Vue maxsus elementining shadow root'ini qaytaruvchi Composition API yordamchisi.

## this.$host <sup class="vt-badge" data-text="3.5+"/> {#this-host}

Joriy Vue maxsus elementining host elementini taqdim etuvchi Options API xususiyati.
