<script setup lang="ts">
import { VTLink } from '@vue/theme'
</script>

<template>
  <section id="newsletter" class="NewsLetter">
    <div class="container">
      <h2 class="title">Haftalik yangiliklarimizga obuna bo'ling.</h2>

      <div class="form">
        <form
          class="box"
          id="revue-form"
          name="revue-form"
          method="post"
          action="https://www.getrevue.co/profile/vuenewsletter/add_subscriber"
          rel="noopener"
          target="_blank"
        >
          <input
            class="input"
            id="member_email"
            name="member[email]"
            type="email"
            placeholder="Elektron manzil"
            required
          />

          <div class="action">
            <input
              class="button"
              id="member_submit"
              name="member[subscribe]"
              type="submit"
              value="OBUNA BO'LISH"
            />
          </div>
        </form>
      </div>

      <p class="help">
        Siz oldingi sonlarni o'qishingiz va podkastimizni tinglashingiz mumkin
        <VTLink
          class="link"
          href="https://news.vuejs.org/"
          no-icon
        >news.vuejs.org</VTLink>. Shuningdek, siz
        <VTLink class="link" href="https://twitter.com/vuejs" no-icon>Twitter</VTLink> ijtimoiy aloqada bo'lishingiz yoki
        <VTLink class="link" href="https://discord.com/invite/vue" no-icon>Discord</VTLink>-dagi uyimizga qo'shilishingiz mumkin .
      </p>
    </div>
  </section>
</template>

<style scoped>
.NewsLetter {
  border-top: 1px solid transparent;
  border-bottom: 1px solid var(--vt-c-divider-light);
  padding: 32px 24px;
  background: var(--vt-c-bg-soft);
  transition: border-color 0.5s, background-color 0.5s;
}

.dark .NewsLetter {
  border-top-color: var(--vt-c-divider-light);
  border-bottom-color: transparent;
  background: var(--vt-c-bg);
}

@media (min-width: 768px) {
  .NewsLetter {
    padding: 48px 32px;
  }
}

.container {
  margin: 0 auto;
  max-width: 512px;
}

.title {
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
}

@media (min-width: 375px) {
  .title {
    font-size: 16px;
  }
}

.form {
  padding-top: 8px;
}

@media (min-width: 375px) {
  .form {
    padding-top: 16px;
  }
}

.box {
  position: relative;
  width: 100%;
}

.input {
  border: 1px solid var(--vt-c-divider);
  border-radius: 8px;
  padding: 11px 128px 11px 16px;
  font-size: 16px;
  width: 100%;
  color: var(--vt-c-text-1);
  transition: border-color 0.25s, background-color 0.25s;
}

.input:hover,
.input:focus {
  border-color: var(--vt-c-brand);
}

.input:focus {
  background-color: var(--vt-c-white);
}

.dark .input {
  background-color: var(--vt-c-bg);
}

.dark .input:focus {
  background-color: var(--vt-c-black-pure);
}

.input::placeholder {
  font-weight: 500;
  color: var(--vt-c-text-3);
  transition: color 0.25s;
}

.action {
  position: absolute;
  top: 6px;
  right: 6px;
}

.button {
  border-radius: 4px;
  padding: 0 12px;
  letter-spacing: 0.8px;
  line-height: 36px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vt-c-text-dark-1);
  background-color: var(--vt-c-brand);
  transition: background-color 0.25s;
  cursor: pointer;
}

.button:hover {
  background-color: var(--vt-c-brand-dark);
}

.help {
  margin: 0 auto;
  padding: 8px;
  max-width: 480px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
}

@media (min-width: 375px) {
  .help {
    padding-top: 16px;
  }
}

.link {
  color: var(--vt-c-brand);
  transition: color 0.25s;
}

.link:hover {
  color: var(--vt-c-brand-dark);
}
</style>
