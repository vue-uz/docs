# Maxsus Renderer API {#custom-renderer-api}

## createRenderer() {#createrenderer}

Maxsus renderer yaratadi. Platformaga xos tugun yaratish va manipulyatsiya qilish API'larini taqdim etish orqali, Vue'ning asosiy runtime'idan DOM bo'lmagan muhitlarni nishonlash uchun foydalanish mumkin.

- **Turi**

  ```ts
  function createRenderer<HostNode, HostElement>(
    options: RendererOptions<HostNode, HostElement>
  ): Renderer<HostElement>

  interface Renderer<HostElement> {
    render: RootRenderFunction<HostElement>
    createApp: CreateAppFunction<HostElement>
  }

  interface RendererOptions<HostNode, HostElement> {
    patchProp(
      el: HostElement,
      key: string,
      prevValue: any,
      nextValue: any,
      namespace?: ElementNamespace,
      parentComponent?: ComponentInternalInstance | null,
    ): void
    insert(el: HostNode, parent: HostElement, anchor?: HostNode | null): void
    remove(el: HostNode): void
    createElement(
      type: string,
      namespace?: ElementNamespace,
      isCustomizedBuiltIn?: string,
      vnodeProps?: (VNodeProps & { [key: string]: any }) | null,
    ): HostElement
    createText(text: string): HostNode
    createComment(text: string): HostNode
    setText(node: HostNode, text: string): void
    setElementText(node: HostElement, text: string): void
    parentNode(node: HostNode): HostElement | null
    nextSibling(node: HostNode): HostNode | null
    querySelector?(selector: string): HostElement | null
    setScopeId?(el: HostElement, id: string): void
    cloneNode?(node: HostNode): HostNode
    insertStaticContent?(
      content: string,
      parent: HostElement,
      anchor: HostNode | null,
      namespace: ElementNamespace,
      start?: HostNode | null,
      end?: HostNode | null,
    ): [HostNode, HostNode]
  }
  ```

- **Misol**

  ```js
  import { createRenderer } from '@vue/runtime-core'

  const { render, createApp } = createRenderer({
    patchProp,
    insert,
    remove,
    createElement
    // ...
  })

  // `render` - bu past darajali API
  // `createApp` - ilova instansiyasini qaytaradi
  export { render, createApp }

  // Vue core API'larini qayta eksport qilish
  export * from '@vue/runtime-core'
  ```

  Vue'ning o'zining `@vue/runtime-dom` [xuddi shu API yordamida amalga oshirilgan](https://github.com/vuejs/core/blob/main/packages/runtime-dom/src/index.ts). Soddaroq amalga oshirish uchun, Vue'ning o'zining unit testlari uchun maxfiy paket bo'lgan [`@vue/runtime-test`](https://github.com/vuejs/core/blob/main/packages/runtime-test/src/index.ts)ni tekshiring.
