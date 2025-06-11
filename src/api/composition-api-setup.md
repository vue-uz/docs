# Composition API: setup() {#composition-api-setup}

## Asosiy Ishlatilishi {#basic-usage}

`setup()` hook'i quyidagi holatlarda komponentlarda Composition API'ni ishlatish uchun kirish nuqtasi vazifasini bajaradi:

1. Build qadami bo'lmagan holda Composition API'ni ishlatish;
2. Options API komponentida Composition-API-ga asoslangan kod bilan integratsiya qilish.

:::info Eslatma
Agar siz Composition API'ni Single-File Components bilan ishlatayotgan bo'lsangiz, yanada ixcham va ergonomik sintaksis uchun [`<script setup>`](/api/sfc-script-setup)ni ishlatish tavsiya etiladi.
:::

[Reactivity APIs](./reactivity-core) yordamida reaktiv holatni e'lon qilishimiz va `setup()`dan qaytarilgan obyekt orqali ularni shablonga taqdim etishimiz mumkin. Qaytarilgan obyektning xususiyatlari komponent instansiyasida ham mavjud bo'ladi (agar boshqa opsiyalar ishlatilgan bo'lsa):

```vue
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    // shablon va boshqa options API hook'lariga taqdim etish
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

`setup`dan qaytarilgan [refs](/api/reactivity-core#ref) shablonda ishlatilganda [avtomatik ravishda shallow unwrap qilinadi](/guide/essentials/reactivity-fundamentals#deep-reactivity), shuning uchun ularga kirishda `.value` ishlatishning hojati yo'q. Ular `this` orqali kirishda ham xuddi shunday unwrap qilinadi.

`setup()`ning o'zi komponent instansiyasiga kira olmaydi - `setup()` ichida `this` `undefined` qiymatiga ega bo'ladi. Siz Options API'dan Composition-API orqali taqdim etilgan qiymatlarga kira olasiz, lekin aksincha emas.

`setup()` _sinxron_ ravishda obyekt qaytarishi kerak. `async setup()` ishlatilishi mumkin bo'lgan yagona holat - bu komponent [Suspense](../guide/built-ins/suspense) komponentining avlodi bo'lgandir.

## Props'larga Kirish {#accessing-props}

`setup` funksiyasidagi birinchi argument `props` argumentidir. Oddiy komponentda kutilganidek, `setup` funksiyasi ichidagi `props` reaktiv va yangi props'lar kiritilganda yangilanadi.

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

E'tibor bering, agar siz `props` obyektini destrukturalizatsiya qilsangiz, destrukturalizatsiya qilingan o'zgaruvchilar reaktivlikni yo'qotadi. Shuning uchun props'larga har doim `props.xxx` ko'rinishida kirish tavsiya etiladi.

Agar siz props'larni haqiqatan ham destrukturalizatsiya qilishingiz kerak bo'lsa yoki reaktivlikni saqlab qolgan holda prop'ni tashqi funksiyaga o'tkazishingiz kerak bo'lsa, buni [toRefs()](./reactivity-utilities#torefs) va [toRef()](/api/reactivity-utilities#toref) utility API'lari yordamida qilishingiz mumkin:

```js
import { toRefs, toRef } from 'vue'

export default {
  setup(props) {
    // `props`ni ref'lar obyektiga aylantirish, keyin destrukturalizatsiya qilish
    const { title } = toRefs(props)
    // `title` - bu `props.title`ni kuzatib boruvchi ref
    console.log(title.value)

    // YOKI, `props`dagi bitta xususiyatni ref'ga aylantirish
    const title = toRef(props, 'title')
  }
}
```

## Setup Konteksti {#setup-context}

`setup` funksiyasiga o'tkazilgan ikkinchi argument **Setup Konteksti** obyektidir. Kontekst obyekti `setup` ichida foydali bo'lishi mumkin bo'lgan boshqa qiymatlarni taqdim etadi:

```js
export default {
  setup(props, context) {
    // Xususiyatlar (Reaktiv bo'lmagan obyekt, $attrs'ga ekvivalent)
    console.log(context.attrs)

    // Slotlar (Reaktiv bo'lmagan obyekt, $slots'ga ekvivalent)
    console.log(context.slots)

    // Hodisalarni chiqarish (Funksiya, $emit'ga ekvivalent)
    console.log(context.emit)

    // Ommaviy xususiyatlarni taqdim etish (Funksiya)
    console.log(context.expose)
  }
}
```

Kontekst obyekti reaktiv emas va xavfsiz ravishda destrukturalizatsiya qilish mumkin:

```js
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

`attrs` va `slots` - bu komponentning o'zi yangilanganda har doim yangilanadigan holatli obyektlar. Bu shuni anglatadiki, ularni destrukturalizatsiya qilishdan saqlanish kerak va har doim xususiyatlarga `attrs.x` yoki `slots.x` orqali murojaat qilish kerak. Shuningdek, `props`dan farqli ravishda, `attrs` va `slots`ning xususiyatlari reaktiv **emas**. Agar siz `attrs` yoki `slots` o'zgarishlariga asoslangan yon ta'sirlarni qo'llashni niyatlangan bo'lsangiz, buni `onBeforeUpdate` hayot aylanishi hook'i ichida qilishingiz kerak.

### Ommaviy Xususiyatlarni Taqdim Etish {#exposing-public-properties}

`expose` - bu ota-ona komponent [template refs](/guide/essentials/template-refs#ref-on-component) orqali komponent instansiyasiga kirganda taqdim etiladigan xususiyatlarni aniq cheklash uchun ishlatilishi mumkin bo'lgan funksiya:

```js{5,10}
export default {
  setup(props, { expose }) {
    // instansiyani "yopiq" qilish -
    // ya'ni ota-onaga hech narsani taqdim etmaslik
    expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // mahalliy holatni tanlab taqdim etish
    expose({ count: publicCount })
  }
}
```

## Render Funksiyalari bilan Ishlatish {#usage-with-render-functions}

`setup` bir xil scope'da e'lon qilingan reaktiv holatdan to'g'ridan-to'g'ri foydalanishi mumkin bo'lgan [render funksiyasi](/guide/extras/render-function)ni ham qaytarishi mumkin:

```js{6}
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```

Render funksiyasini qaytarish bizni boshqa narsalarni qaytarishdan to'xtatadi. Ichki jihatdan bu muammo bo'lmasligi kerak, lekin agar biz bu komponentning metodlarini template refs orqali ota-ona komponentga taqdim etishni xohlasak, muammo bo'lishi mumkin.

Bu muammoni [`expose()`](#exposing-public-properties)ni chaqirish orqali hal qilishimiz mumkin:

```js{8-10}
import { h, ref } from 'vue'

export default {
  setup(props, { expose }) {
    const count = ref(0)
    const increment = () => ++count.value

    expose({
      increment
    })

    return () => h('div', count.value)
  }
}
```

`increment` metodi keyin ota-ona komponentda template ref orqali mavjud bo'ladi.