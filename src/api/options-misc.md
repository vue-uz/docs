# Options: Boshqa {#options-misc}

## name {#name}

Komponent uchun ko'rsatish nomini aniq e'lon qiladi.

- **Turi**

  ```ts
  interface ComponentOptions {
    name?: string
  }
  ```

- **Tafsilotlar**

  Komponent nomi quyidagilar uchun ishlatiladi:

  - Komponentning o'z shablonida rekursiv o'z-o'ziga havola
  - Vue DevTools'ning komponent tekshirish daraxtida ko'rsatish
  - Ogohlantirish komponent izlarida ko'rsatish

  Single-File Components ishlatganingizda, komponent o'z nomini fayl nomidan avtomatik aniqlaydi. Masalan, `MyComponent.vue` nomli fayl "MyComponent" ko'rsatish nomiga ega bo'ladi.

  Yana bir holat shundaki, komponent [`app.component`](/api/application#app-component) yordamida global ravishda ro'yxatdan o'tkazilganda, global ID avtomatik ravishda uning nomi sifatida o'rnatiladi.

  `name` opsiyasi sizga aniqlangan nomni bekor qilish yoki hech qanday nom aniqlanmagan bo'lganda (masalan, build vositalaridan foydalanilmaganda yoki inline bo'lmagan SFC komponenti) aniq nomni ta'minlash imkonini beradi.

  `name` aniq zarur bo'lgan bir holat mavjud: [`<KeepAlive>`](/guide/built-ins/keep-alive) ning `include / exclude` prop'lari orqali keshga olish mumkin bo'lgan komponentlarga mos kelishda.

  :::tip
  3.2.34 versiyasidan boshlab, `<script setup>` ishlatadigan single-file komponent o'z `name` opsiyasini fayl nomidan avtomatik aniqlaydi, bu esa `<KeepAlive>` bilan ishlatilganda ham nomni qo'lda e'lon qilish zarurligini olib tashlaydi.
  :::

## inheritAttrs {#inheritattrs}

Komponentning default atribut o'tkazish xatti-harakatini yoqish kerakligini boshqaradi.

- **Turi**

  ```ts
  interface ComponentOptions {
    inheritAttrs?: boolean // default: true
  }
  ```

- **Tafsilotlar**

  Default bo'yicha, prop sifatida tan olinmagan ota-ona scope atribut bog'lamalari "o'tib ketadi". Bu degani, bizda bitta ildiz komponenti bo'lganda, bu bog'lamalar bola komponentning ildiz elementi uchun oddiy HTML atributlari sifatida qo'llaniladi. Maqsadli element yoki boshqa komponentni o'rab oladigan komponent yaratishda, bu har doim ham kerakli xatti-harakat bo'lmasligi mumkin. `inheritAttrs` ni `false` ga o'rnatish orqali bu default xatti-harakat o'chirilishi mumkin. Atributlar `$attrs` instansiya xususiyati orqali mavjud va `v-bind` yordamida ildiz bo'lmagan elementga aniq bog'lanishi mumkin.

- **Misol**

  <div class="options-api">

  ```vue
  <script>
  export default {
    inheritAttrs: false,
    props: ['label', 'value'],
    emits: ['input']
  }
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>
  <div class="composition-api">

  `<script setup>` ishlatadigan komponentda bu opsiyani e'lon qilishda, [`defineOptions`](/api/sfc-script-setup#defineoptions) makrosidan foydalanishingiz mumkin:

  ```vue
  <script setup>
  defineProps(['label', 'value'])
  defineEmits(['input'])
  defineOptions({
    inheritAttrs: false
  })
  </script>

  <template>
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
    </label>
  </template>
  ```

  </div>

- **Qarang**

  - [O'tib Ketadigan Atributlar](/guide/components/attrs)
  <div class="composition-api">

  - [Oddiy `<script>` bilan birga `inheritAttrs` dan foydalanish](/api/sfc-script-setup.html#usage-alongside-normal-script)
  </div>

## components {#components}

Komponent instansiyasi uchun mavjud bo'lishi kerak bo'lgan komponentlarni ro'yxatdan o'tkazadigan ob'ekt.

- **Turi**

  ```ts
  interface ComponentOptions {
    components?: { [key: string]: Component }
  }
  ```

- **Misol**

  ```js
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'

  export default {
    components: {
      // qisqartma
      Foo,
      // boshqa nom ostida ro'yxatdan o'tkazish
      RenamedBar: Bar
    }
  }
  ```

- **Qarang** [Komponent Ro'yxatdan O'tkazish](/guide/components/registration)

## directives {#directives}

Komponent instansiyasi uchun mavjud bo'lishi kerak bo'lgan direktivalarni ro'yxatdan o'tkazadigan ob'ekt.

- **Turi**

  ```ts
  interface ComponentOptions {
    directives?: { [key: string]: Directive }
  }
  ```

- **Misol**

  ```js
  export default {
    directives: {
      // shablonda v-focus ni yoqish
      focus: {
        mounted(el) {
          el.focus()
        }
      }
    }
  }
  ```

  ```vue-html
  <input v-focus>
  ```

- **Qarang** [Maxsus Direktivalar](/guide/reusability/custom-directives)
