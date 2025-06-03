---
outline: deep
---

<script setup>
import { ref, onMounted } from 'vue'

const version = ref()

onMounted(async () => {
  const res = await fetch('https://api.github.com/repos/vuejs/core/releases/latest')
  version.value = (await res.json()).name
})
</script>

---
outline: deep
---

<script setup>
import { ref, onMounted } from 'vue'

const version = ref()

onMounted(async () => {
  const res = await fetch('https://api.github.com/repos/vuejs/core/releases/latest')
  version.value = (await res.json()).name
})
</script>

# Relizlar {#relizlar}

<p v-if="version">
Vue-ning hozirgi eng so'nggi barqaror versiyasi <strong>{{ version }}</strong>.
</p>
<p v-else>
Eng so'nggi versiyani tekshirilmoqda...
</p>

O'tgan relizlarning to'liq o'zgarishlar ro'yxati [GitHub'da](https://github.com/vuejs/core/blob/main/CHANGELOG.md) mavjud.

## Reliz tsikli {#reliz-tsikli}

Vue-ning qat'iy belgilangan reliz tsikli yo'q.

- Yamoq relizlari kerak bo'lganda chiqariladi.

- Kichik relizlar har doim yangi funksiyalarni o'z ichiga oladi, odatda 3~6 oy oralig'ida. Kichik relizlar har doim beta oldindan chiqarish bosqichidan o'tadi.

- Asosiy relizlar oldindan e'lon qilinadi va dastlabki muhokama bosqichi hamda alfa/beta oldindan chiqarish bosqichlaridan o'tadi.

## Semantik versiyalashning chekka holatlari {#semantik-versiyalashning-chekka-holatlari}

Vue relizlari [Semantik versiyalash](https://semver.org/) ga rioya qiladi, ammo bir nechta chekka holatlar mavjud.

### TypeScript ta'riflari {#typescript-tariflari}

Biz **kichik** versiyalar o'rtasida TypeScript ta'riflariga mos kelmaydigan o'zgarishlarni kiritishimiz mumkin. Buning sabablari:

1. Ba'zida TypeScript-ning o'zi kichik versiyalar o'rtasida mos kelmaydigan o'zgarishlarni kiritadi va biz yangi TypeScript versiyalarini qo'llab-quvvatlash uchun turlarni moslashtirishimiz kerak bo'ladi.

2. Ba'zan biz faqat TypeScript-ning yangi versiyasida mavjud bo'lgan funksiyalarni qabul qilishimiz kerak bo'ladi, bu esa TypeScript-ning minimal talab qilinadigan versiyasini oshiradi.

Agar siz TypeScript-dan foydalanayotgan bo'lsangiz, joriy kichik versiyani qulflaydigan semver diapazonidan foydalanishingiz va Vue-ning yangi kichik versiyasi chiqarilganda qo'lda yangilashingiz mumkin.

### Eski runtime bilan kompilyatsiya qilingan kodning mosligi {#eski-runtime-bilan-kompilyatsiya-qilingan-kodning-mosligi}

Vue kompilyatorining yangi **kichik** versiyasi eski kichik versiyadagi Vue runtime bilan mos kelmaydigan kod ishlab chiqarishi mumkin. Masalan, Vue 3.2 kompilyatori tomonidan ishlab chiqarilgan kod Vue 3.1 runtime tomonidan iste'mol qilinganda to'liq mos kelmasligi mumkin.

Bu faqat kutubxona mualliflari uchun tashvishlidir, chunki ilovalarda kompilyator versiyasi va runtime versiyasi har doim bir xil bo'ladi. Versiya mos kelmasligi faqat siz oldindan kompilyatsiya qilingan Vue komponent kodini paket sifatida jo'natsangiz va iste'molchi uni Vue-ning eski versiyasidan foydalanadigan loyihada ishlatsa yuzaga kelishi mumkin. Natijada, paketingiz Vue-ning minimal talab qilinadigan kichik versiyasini aniq e'lon qilishi kerak bo'lishi mumkin.

## Oldindan chiqarishlar {#oldindan-chiqarishlar}

Kichik relizlar odatda qat'iy bo'lmagan beta relizlar sonidan o'tadi. Asosiy relizlar alfa bosqichi va beta bosqichidan o'tadi.

Bundan tashqari, biz har hafta GitHub’dagi `main` va `minor` tarmoqlaridan kanareyka relizlarini nashr qilamiz. Ular barqaror kanalning npm metama'lumotlarini kengaytirmaslik uchun turli paketlar sifatida nashr etiladi. Ularni `npx install-vue@canary` yoki `npx install-vue@canary-minor` orqali o'rnatish mumkin.

Oldindan chiqarishlar integratsiya/stabilik sinovlari uchun mo'ljallangan va barqaror bo'lmagan funksiyalar bo'yicha erta qabul qiluvchilardan fikr-mulohaza olish uchun xizmat qiladi. Ishlab chiqarishda oldindan chiqarishlardan foydalanmang. Barcha oldindan chiqarishlar barqaror emas deb hisoblanadi va har qanday relizlar o'rtasida o'zgarishlar kiritishi mumkin, shuning uchun oldindan chiqarishlardan foydalanganda har doim aniq versiyalarga bog'lang.

## Eskirgan funksiyalar {#eskirgan-funksiyalar}

Biz vaqti-vaqti bilan kichik relizlarda yangi, yaxshiroq o'rinbosarlar mavjud bo'lgan funksiyalarni eskirgan deb belgilashimiz mumkin. Eskirgan funksiyalar ishlashda davom etadi va eskirgan holatga o'tgandan keyin keyingi asosiy relizda o'chiriladi.

## RFC'lar {#rfclar}

Katta API sathiga ega yangi funksiyalar va Vue-ga katta o'zgarishlar **Fikr so'rash uchun so'rov** (RFC) jarayonidan o'tadi. RFC jarayoni yangi funksiyalarni frameworkga kiritish uchun izchil va boshqariladigan yo'lni ta'minlash va foydalanuvchilarga dizayn jarayonida ishtirok etish va fikr-mulohaza bildirish imkoniyatini berish uchun mo'ljallangan.

RFC jarayoni GitHub’dagi [vuejs/rfcs](https://github.com/vuejs/rfcs) reposida o'tkaziladi.

## Eksperimental funksiyalar {#eksperimental-funksiyalar}

Ba'zi funksiyalar Vue-ning barqaror versiyasida nashr etiladi va hujjatlashtiriladi, lekin eksperimental deb belgilanadi. Eksperimental funksiyalar odatda tegishli RFC muhokamasiga ega bo'lib, dizayn muammolarining aksariyati qog'ozda hal qilingan, lekin hali real dunyodagi foydalanishdan fikr-mulohaza yetishmaydi.

Eksperimental funksiyalarning maqsadi foydalanuvchilarga ishlab chiqarish muhitida sinovdan o'tkazish orqali ular bo'yicha fikr-mulohaza berish imkonini berishdir, Vue-ning barqaror bo'lmagan versiyasidan foydalanmasdan. Eksperimental funksiyalar o'zlari barqaror emas deb hisoblanadi va har qanday reliz turlari o'rtasida o'zgarishi mumkin bo'lgan tarzda boshqarilishi kerak.
