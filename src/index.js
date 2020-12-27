import FetchData from "./components/FetchData.vue";

export default {
  install: (app, options) => {
    app.component("v-fetch-data", FetchData);
  },
};

export { FetchData };
