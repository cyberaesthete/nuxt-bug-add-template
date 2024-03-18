import { defineNuxtModule, createResolver, addTemplate, updateTemplates } from "@nuxt/kit"

export default defineNuxtModule({
        meta: {
                name: "baz",
                configKey: "baz",
        },
        async setup(options, nuxt) {
                const { resolve, resolvePath } = createResolver(import.meta.url)
                let result

                const foo = await import(await resolvePath("../models/foo.js"))
                result = addTemplate({
                        src: resolve("../runtime/qux.vue"),
                        dst: resolve(`../pages/admin/foo.vue`),
                        filename: "foo_whatever.vue",
                        options: { model: foo.default },
                        write: true,
                })
                ////////////////////
                console.log({result})
                ////////////////////

                const bar = await import(await resolvePath("../models/bar.js"))
                result = addTemplate({
                        src: resolve("../runtime/qux.vue"),
                        dst: resolve(`../pages/admin/bar.vue`),
                        filename: "bar_whatever.vue",
                        options: { model: bar.default },
                        write: true,
                })
                ////////////////////
                console.log({result})
                ////////////////////

                nuxt.hook("builder:watch", async (event, relativePath) => {
                        //////////////////////////////////
                        console.log({event, relativePath})
                        //////////////////////////////////

                        if (relativePath.startsWith("runtime")) {
                                await updateTemplates()
                        }
                })
        },
})
