---
title: How to make Vite output a single file?
author:
  name: Timur Bolotov
  avatarUrl: https://github.com/timursaurus.png
  link: https://www.linkedin.com/in/saurus/
date: 2023-04-30
description: Learn how to configure Vite to (bundle) output a single file.
layout: article
---


[TL;DR](#tldr)


:icon{name="vscode-icons:file-type-vite"} Vite  is built with ESM in mind, so it chunks your code into multiple files by default.

However, if you want to output a single file (bundle), you can do it by configuring :icon{name="vscode-icons:file-type-rollup"} Rollup, which is used by `Vite` under the hood for production builds.

::alert{type="info"}
There are multiple reasons why you might want to do this. Mine was to make a :icon{name="vscode-icons:file-type-vue"} Vue application run inside a Siebel CRM Applet. In Siebel CRM, you have to explicitly specify all the files that you want to load from a repository, so it's easier to have a single file.
::




```ts [vite.config.ts]
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        inlineDynamicImports: false,
        format: 'iife',
        manualChunks: () => {
          return 'Any string'
        },
      },
    },
  },
})

```

### How it works

Rollup provides different bundling strategies. We want to use the `'iife'` format, as it's recommended for bundling applications in the [Rollup docs](https://rollupjs.org/configuration-options/#output-format).

By configuring `manualChunks` to return the same string, you're telling Rollup to treat each module as a part of the same chunk. This way, you'll get a single file output.


The output is usually named `index-<hash>.js`. We can confgire the output name by using the `entryFileName` option.


## TL;DR
```ts [vite.config.ts]

import { defineConfig } from "vite";

```

### Work in progress...