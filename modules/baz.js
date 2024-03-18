import { defineNuxtModule, createResolver, addTemplate, updateTemplates } from "@nuxt/kit"
import foo from "../models/foo"
import bar from "../models/bar"

export default defineNuxtModule({
        meta: {
                name: "baz",
                configKey: "baz",
        },
        async setup(options, nuxt) {
                const { resolve, resolvePath } = createResolver(import.meta.url)
                const models = [
                        foo,
                        bar,
                ]
                for (const model of models) {
                        addTemplate({
                                src: resolve("../runtime/qux.vue"),
                                dst: resolve(`../pages/admin/${model.name}.vue`),
                                options: { model },
                                write: true,
                        })
                }

                nuxt.hook("builder:watch", async (event, relativePath) => {
                        console.log({event, relativePath})

                        if (relativePath.startsWith("runtime")) {
                                updateTemplates()
                        }
                })
        },
})
