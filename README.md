# nw-vue-devtools-prebuilt
Install prebuilt Vue DevTools extension to use in nw.js application

## Instructions

1. `git clone https://github.com/DimPaDev/nw-vue-devtools-prebuilt.git`
2. `cd nw-vue-devtools-prebuilt && npm install && cd ..`

3. Add this to your `package.json` of your nw.js app:
    ```js
      "chromium-args": "--load-extension='./nw-vue-devtools-prebuilt/vue'"
    ```
4. Vue.js must be in use in your app, and cannot be minified (`vue.js` not `vue.min.js`).

You may need to add `Vue.config.devtools = true;` to your `main.js` file.

If you are using `nwjs-builder-phoenix` then add in `"chromium-args"` to your `package.json` `build.strippedProperties` array ([more info](https://github.com/evshiron/nwjs-builder-phoenix/blob/master/docs/Options.md#build---buildconfig)).
