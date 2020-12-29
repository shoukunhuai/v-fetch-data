import vue from "rollup-plugin-vue";

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: "src/components/FetchData.vue",
    output: {
      format: "esm",
      file: "dist/v-fetch-data.esm.js",
    },
    plugins: [
      vue({
        target: "browser",
      }),
    ],
  },
];
