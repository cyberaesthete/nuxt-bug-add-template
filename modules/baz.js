import { defineNuxtModule, createResolver, addTemplate, updateTemplates } from "@nuxt/kit"

export default defineNuxtModule({
        meta: {
                name: "baz",
                configKey: "baz",
        },
        async setup(options, nuxt) {
                const { resolve, resolvePath } = createResolver(import.meta.url)
                const models = [
                        resolvePath("../models/foo"),
                        resolvePath("../models/bar"),
                ]
                for await (const _model of models) {
                        const model = await import(_model).then((m) => m.default)

                        ////////////////////
                        console.log({model})
                        ////////////////////

                        const result = addTemplate({
                                src: resolve("../runtime/qux.vue"),
                                dst: resolve(`../pages/admin/${model.name}.vue`),
                                options: { model },
                                write: true,
                        })

                        /////////////////////
                        console.log({result})
                        /////////////////////
                }

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
