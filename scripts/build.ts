import { join, resolve } from 'path'
import type { Dirent } from 'fs'
import { existsSync, readdirSync } from 'fs'
import { build } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import type { Target } from 'vite-plugin-static-copy'

const src = resolve(__dirname, '..', 'src')
const components: string[] = readdirSync(resolve(src, 'components'), { encoding: 'utf-8', withFileTypes: true })
  .filter((dirent: Dirent) => {
    const entry = resolve(src, 'components', dirent.name, 'index.ts')
    return existsSync(entry)
  })
  .map((dirent: Dirent) => {
    return dirent.name
  })

// vite not support multiple entry point when formats include 'iife'.
// so we build every single component using vite and wrap it all.
Promise.all(components.map((entry: string) => {
  const entryMap: { [key: string]: string } = {}
  entryMap[entry] = join(src, 'components', entry, 'index.ts')

  return build({
    resolve: {
      alias: {
        '@': src,
      },
    },
    build: {
      outDir: join('dist', entry),
      emptyOutDir: true,
      minify: false,
      lib: {
        name: entry,
        entry: entryMap,
        formats: ['iife'],
        // fileName must be a function or output file will be [fileName].iife.js
        fileName: _ext => `${entry}.js`,
      },
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: join(src, 'components', entry, '*.(conf|png)'),
            dest: './',
          } as Target,
        ],
      }),
    ],
  })
}))
