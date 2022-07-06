import { clientPlugin, defineConfig } from "@vitebook/client/node";
import { vueMarkdownPlugin } from "@vitebook/markdown-vue/node";
import { vuePlugin } from "@vitebook/vue/node";
import { defaultThemePlugin } from "@vitebook/theme-default/node";

export default defineConfig({
  include: ["src/**/*.md", "src/**/*.story.vue"],
  plugins: [
    vueMarkdownPlugin(),
    vuePlugin({ appFile: "App.vue" }),
    clientPlugin(),
    defaultThemePlugin(),
  ],
  site: {
    title: "VitaminX",
    description: "Vite based framework focused on DX(developer experience)",
    /** @type {(import('@vitebook/theme-default/node').DefaultThemeConfig} */
    theme: {
      sidebar: {
        style: 'docs',
        categories: true,
      },
    },
  },
});
