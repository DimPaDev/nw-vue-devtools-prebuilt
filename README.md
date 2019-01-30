# nw-vue-devtools-prebuilt
Install prebuilt Vue DevTools extension to use in a NW.js application

## Instructions

1. `npm install nw-vue-devtools-prebuilt`

2. Add this to your `package.json` of your NW.js app:
    ```js
      "chromium-args": "--load-extension='./node_modules/nw-vue-devtools-prebuilt/extension'"
    ```
3. Vue.js must be in use in your app, and cannot be minified (`vue.js` not `vue.min.js`).

You may need to add `Vue.config.devtools = true;` to your `main.js` file.

If you are using `nwjs-builder-phoenix` then add in `"chromium-args"` to your `package.json` `build.strippedProperties` array ([more info](https://github.com/evshiron/nwjs-builder-phoenix/blob/master/docs/Options.md#build---buildconfig)).
