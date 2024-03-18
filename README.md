# introduction
i'm trying to create pages programmatically via `addTemplate()`,
then watching for changes to the template via nuxt.hook `builder:watch`,
then updating the templates when I edit the template via `updateTemplates()`.

- the "models" I have are `models/foo.js` and `models/bar.js`
- the template is `runtime/qux.vue`
- expect to have both `pages/admin/foo.vue` and `pages/admin/bar.vue`
- only `pages/admin/bar.vue` is created and updated on subsequent edits to `runtime/qux.vue`

# output
```sh
$ npm run dev

> dev
> nuxt dev

Nuxt 3.11.0 with Nitro 2.9.4                                                                                                                       3:55:21 PM
                                                                                                                                                   3:55:21 PM
  ➜ Local:    http://localhost:3000/
  ➜ Network:  use --host to expose

{ model: { name: 'foo' } }                                                                                                                         3:55:22 PM
{ result:                                                                                                                                          3:55:22 PM
   { src: '/home/user/tmp/nuxtexample/my-app/runtime/qux.vue',
     dst: '/home/user/tmp/nuxtexample/my-app/pages/admin/foo.vue',
     options: { model: [Object] },
     write: true,
     filename: 'runtime.qux.dcbdde06.vue' } }
{ model: { name: 'bar' } }                                                                                                                         3:55:22 PM
{ result:                                                                                                                                          3:55:22 PM
   { src: '/home/user/tmp/nuxtexample/my-app/runtime/qux.vue',
     dst: '/home/user/tmp/nuxtexample/my-app/pages/admin/bar.vue',
     options: { model: [Object] },
     write: true,
     filename: 'runtime.qux.dcbdde06.vue' } }
  ➜ DevTools: press Shift + Alt + D in the browser (v1.0.8)                                                                                        3:55:22 PM

ℹ Vite client warmed up in 916ms                                                                                                                  3:55:24 PM
ℹ Vite server warmed up in 946ms                                                                                                                  3:55:24 PM
✔ Nuxt Nitro server built in 434 ms                                                                                                         nitro 3:55:24 PM
```

# filesystem
```sh
$ ls pages/admin/
bar.vue
```
