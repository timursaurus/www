---
title: Run Vue apps inside Siebel CRM Applets
author:
  name: Timur Bolotov
  avatarUrl: https://github.com/timursaurus.png
  link: https://www.linkedin.com/in/saurus/
date: 2023-04-30
description: Learn how to host a JavaScript application inside Siebel CRM Applets. React, Vue, Angular, Svelte, or any other framework.
layout: article
---

## Siebel CRM

:icon{name="simple-icons:oracle" color="#C74634" } Siebel's [Open UI](https://docs.oracle.com/cd/F14158_13/books/ConfigOpenUI/overview-of-siebel-open-ui.html) architecture allows to embed custom JavaScript applications inside Siebel Applets. This is a great way to harness the power of modern JavaScript frameworks and libraries to build rich user interfaces.
Siebel usually exposes [JQuery](https://jquery.com/) to the global scope, but it's hard to build a modern application with JQuery alone.
Since JavaScript frameworks in the end are just JavaScript, we can use them inside Siebel Applets. Not only that, we can use TypeScript and all the other modern tools that we're used to.

The only quirk is that everything has to be bundled into a single file. This is because Siebel requires you to explicitly specify all the custom files that you want to load from a repository to your applet. It's easier to have a single file.

::alert{type="info"}
:bulb: Learn more about how to configure Vite to output a single file [here](/articles/vite-single-file-output).
::

::alert{type="info"}
**JavaScript framework**
<br>

This article is about [ :icon{name="vscode-icons:file-type-vue"} Vue](https://vuejs.org/), but the same approach can be used for
[ :icon{name="vscode-icons:file-type-reactjs"} React](https://react.dev/),
[ :icon{name="vscode-icons:file-type-angular"} Angular](https://angular.io/),
[:icon{name="vscode-icons:file-type-svelte"} Svelte](https://svelte.dev/),
or any other framework.
::



## Siebel Lifecycle hooks

Siebel provides a set of lifecycle hooks that allow to run custom code at different stages of the application lifecycle: [Learn more](https://docs.oracle.com/cd/E14004_01/books/config_open_ui/appendix_a_API8.html)

We're interested in the `ShowUI` event, which is fired when the applet is rendered.

```js [VueAppConfigPR.js]
if (typeof SiebelAppFacade.VueAppConfigPR === "undefined") {
  SiebelJS.Namespace("SiebelAppFacade.VueAppConfigPR");
  define("siebel/custom/VueAppConfigPR", ["siebel/phyrenderer"], function () {
    SiebelAppFacade.VueAppConfigPR = (function () {
      // ... other lifecycle hooks
      VueAppConfigPR.prototype.ShowUI = function () {
        SiebelAppFacade.VueAppConfigPR.superclass.ShowUI.apply(this, arguments);
        // We're going to send a browser event
        // and listen to it in our Vue application
        // to determine when to mount the app
      };
      // ... other lifecycle hooks
      return VueAppConfigPR;
    })();
    return "SiebelAppFacade.VueAppConfigPR";
  });
}
```

::alert{type="info"}
:bulb: The code above has been generated with this handy [Open UI PR/PM/CR code generator](https://duncanford.github.io/prpm-code-generator/?prpm=PR&object=DesktopForm&name=VueAppConfig&userprops=&comments=No&logging=No) by Duncan Ford.
::

## Configuring the applet

- Add your output bundle to the `/scripts/custom/<path>` folder of your Siebel web server.
- Open `Administration - Application` > `Manifest Files` and create a new record with the path to your bundle as its Name

## Configuring Physical Renderer (PR)

```js [VueAppConfigPR.js]{5-5}
if (typeof SiebelAppFacade.VueAppConfigPR === "undefined") {
  SiebelJS.Namespace("SiebelAppFacade.VueAppConfigPR");
  define("siebel/custom/VueAppConfigPR", [
    "siebel/phyrenderer",
    "scripts/custom/<vue bundle path> ",
  ], function () {
    // ...
    return "SiebelAppFacade.VueAppConfigPR";
  });
}
```

```diff [VueAppConfigPR.js]
- define("siebel/custom/VueAppConfigPR", ["siebel/phyrenderer"]
+ define("siebel/custom/VueAppConfigPR", ["siebel/phyrenderer", "siebel/scripts/custom/<vue bundle path>"]
```

<!-- ::alert{type="warning"}
:warning:
The bundle path is required!

:: -->

::alert{type="info"}
Example: `'siebel/scripts/custom/vue-bundle.js'`
::

```js [VueAppConfigPR.js]
// ...
VueAppConfigPR.prototype.ShowUI = function () {
  SiebelAppFacade.VueAppConfigPR.superclass.ShowUI.apply(this, arguments);

  const root = $("<div>", { id: "app" });

  // `_svf0` is the id of the applet
  $("#_svf0").empty().append(root);
  const vueAppEvent = new Event("renderVueApp");
  document.dispatchEvent(vueAppEvent);
};
// ...
```

#### Configuring Vue

```ts [src/main.ts]
import { createApp } from "vue";
import App from "./App.vue";

const __IS_SIEBEL__ = window.SiebelApp !== undefined;

function runApp() {
  const app = createApp(App);
  /** ... */
  app.mount("#app");
}

if (__IS_SIEBEL__) {
  document.addEventListener("renderVueApp", () => {
    runApp();
  });
} else runApp();
```

::alert{type="info"}
:bulb: If `__IS_SIEBEL__` is false, we're most likely running the application in a development environment, so we can just mount the app right away. Otherwise, we're going to wait for the `renderVueApp` event to be fired.
::

### Work in progress...