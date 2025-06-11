# SFC CSS Xususiyatlari {#sfc-css-features}

## Scoped CSS {#scoped-css}

`<style>` tegi `scoped` atributiga ega bo'lganda, uning CSS'i faqat joriy komponent elementlariga qo'llaniladi. Bu Shadow DOM'da topilgan style inkapsulyatsiyasiga o'xshaydi. Bu bir nechta cheklovlarga ega, lekin hech qanday polyfill talab qilmaydi. Bu PostCSS yordamida quyidagi kodni transformatsiya qilish orqali amalga oshiriladi:

```vue
<style scoped>
.example {
  color: red;
}
</style>

<template>
  <div class="example">hi</div>
</template>
```

Quyidagi kodga:

```vue
<style>
.example[data-v-f3f3eg9] {
  color: red;
}
</style>

<template>
  <div class="example" data-v-f3f3eg9>hi</div>
</template>
```

### Farzand Komponent Root Elementlari {#child-component-root-elements}

`scoped` bilan, ota-ona komponentining stillari farzand komponentlarga o'tmaydi. Biroq, farzand komponentning root tuguni ham ota-onaning scoped CSS'i, ham farzandning scoped CSS'i ta'sirida bo'ladi. Bu dizayn bo'yicha, ota-ona farzand root elementini layout maqsadlarida stillash uchun.

### Chuqur Selektirlar {#deep-selectors}

Agar siz `scoped` stillaridagi selektorni "chuqur" qilmoqchi bo'lsangiz, ya'ni farzand komponentlarga ta'sir qilish uchun, `:deep()` psevdo-klassidan foydalanishingiz mumkin:

```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

Yuqoridagi kod quyidagiga kompilyatsiya qilinadi:

```css
.a[data-v-f3f3eg9] .b {
  /* ... */
}
```

:::tip
`v-html` bilan yaratilgan DOM kontenti scoped stillar ta'sirida bo'lmaydi, lekin siz ularni chuqur selektirlar yordamida stillashingiz mumkin.
:::

### Slotted Selektirlar {#slotted-selectors}

Default bo'yicha, scoped stillar `<slot/>` tomonidan render qilingan kontentga ta'sir qilmaydi, chunki ular ularni uzatayotgan ota-ona komponentga tegishli deb hisoblanadi. Slot kontentini aniq nishonga olish uchun `:slotted` psevdo-klassidan foydalaning:

```vue
<style scoped>
:slotted(div) {
  color: red;
}
</style>
```

### Global Selektirlar {#global-selectors}

Agar siz faqat bitta qoidani global qo'llashni xohlasangiz, boshqa `<style>` yaratish o'rniga `:global` psevdo-klassidan foydalanishingiz mumkin (quyida ko'ring):

```vue
<style scoped>
:global(.red) {
  color: red;
}
</style>
```

### Mahalliy va Global Stillarni Aralashtirish {#mixing-local-and-global-styles}

Siz bir xil komponentda ham scoped, ham scoped bo'lmagan stillarni kiritishingiz mumkin:

```vue
<style>
/* global stillar */
</style>

<style scoped>
/* mahalliy stillar */
</style>
```

### Scoped Style Maslahatlari {#scoped-style-tips}

- **Scoped stillar klasslarga bo'lgan ehtiyojni yo'q qilmaydi**. Brauzerlar turli CSS selektirlarini render qilish usuli tufayli, `p { color: red }` scoped bo'lganda (ya'ni atribut selektori bilan birlashtirilganda) ko'p marta sekinroq bo'ladi. Agar siz klasslar yoki id'lardan foydalansangiz, masalan `.example { color: red }` da, siz virtual ravishda bu ishlash pasayishini yo'q qilasiz.

- **Rekursiv komponentlarda meros selektirlar bilan ehtiyot bo'ling!** `.a .b` selektori bo'lgan CSS qoidasi uchun, agar `.a` ga mos keladigan element rekursiv farzand komponentni o'z ichiga olsa, unda o'sha farzand komponentdagi barcha `.b` lar qoida tomonidan mos keladi.

## CSS Modullari {#css-modules}

`<style module>` tegi [CSS Modullari](https://github.com/css-modules/css-modules) sifatida kompilyatsiya qilinadi va natijada olingan CSS klasslarini komponentga `$style` kaliti ostidagi ob'ekt sifatida ochadi:

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

Natijada olingan klasslar to'qnashuvdan saqlash uchun hash'lanadi, bu CSS'ni faqat joriy komponentga scoped qilishning bir xil effektini beradi.

[CSS Modullari spetsifikatsiyasi](https://github.com/css-modules/css-modules) haqida [global istisnolar](https://github.com/css-modules/css-modules/blob/master/docs/composition.md#exceptions) va [kompozitsiya](https://github.com/css-modules/css-modules/blob/master/docs/composition.md#composition) kabi ko'proq ma'lumot uchun murojaat qiling.

### Maxsus Inject Nomi {#custom-inject-name}

Siz inject qilingan klasslar ob'ektining xususiyat kalitini `module` atributiga qiymat berish orqali sozlashingiz mumkin:

```vue
<template>
  <p :class="classes.red">red</p>
</template>

<style module="classes">
.red {
  color: red;
}
</style>
```

### Composition API bilan Ishlatish {#usage-with-composition-api}

Inject qilingan klasslarga `setup()` va `<script setup>` ichida `useCssModule` API orqali kirish mumkin. Maxsus inject nomlariga ega `<style module>` bloklari uchun, `useCssModule` mos keladigan `module` atribut qiymatini birinchi argument sifatida qabul qiladi:

```js
import { useCssModule } from 'vue'

// setup() scope'ida...
// default, <style module> uchun klasslarni qaytaradi
useCssModule()

// nomlangan, <style module="classes"> uchun klasslarni qaytaradi
useCssModule('classes')
```

- **Misol**

```vue
<script setup lang="ts">
import { useCssModule } from 'vue'

const classes = useCssModule()
</script>

<template>
  <p :class="classes.red">red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

## CSS'da `v-bind()` {#v-bind-in-css}

SFC `<style>` teglari `v-bind` CSS funksiyasi yordamida CSS qiymatlarini dinamik komponent holatiga bog'lashni qo'llab-quvvatlaydi:

```vue
<template>
  <div class="text">hello</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style>
.text {
  color: v-bind(color);
}
</style>
```

Sintaksis [`<script setup>`](./sfc-script-setup) bilan ishlaydi va JavaScript ifodalarini qo'llab-quvvatlaydi (qo'shtirnoq ichiga o'ralishi kerak):

```vue
<script setup>
import { ref } from 'vue'
const theme = ref({
    color: 'red',
})
</script>

<template>
  <p>hello</p>
</template>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

Haqiqiy qiymat hash'langan CSS maxsus xususiyatiga kompilyatsiya qilinadi, shuning uchun CSS hali ham statik. Maxsus xususiyat komponentning root elementiga inline stillar orqali qo'llaniladi va manba qiymati o'zgarganda reaktiv ravishda yangilanadi.
