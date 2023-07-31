export default defineNuxtConfig({
  // https://github.com/nuxt-themes/alpine
  extends: "@nuxt-themes/alpine",
  experimental: {
    payloadExtraction: false,
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },
  modules: [
    // https://github.com/nuxt-modules/plausible
    "@nuxtjs/plausible",
    // https://github.com/nuxt/devtools
    "@nuxt/devtools",
  ],
});
