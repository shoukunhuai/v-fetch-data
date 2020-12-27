<template>
  <slot :error="error" :loading="loading" :responseData="responseData">
    <span>{{ loading }}</span>
  </slot>
</template>

<script>
export default {
  name: "FetchData",
  props: {
    method: {
      type: String,
      default: "GET",
    },
    url: {
      type: String,
      required: true,
    },
    useFetch: {
      type: Boolean,
      default: true,
    },
    useAxios: {
      type: Boolean,
      default: false,
    },
    useJQuery: {
      type: Boolean,
      default: false,
    },
    withCredentials: {
      type: Boolean,
      default: false,
    },
    axios: {
      type: String,
      default: "$axios",
    },
    jquery: {
      type: String,
      default: "jQuery",
    },
  },
  emits: ["error"],
  data() {
    return {
      loading: true,
      error: undefined,
      responseData: {},
    };
  },
  methods: {
    doFetch() {
      const {
        url,
        method,
        useFetch,
        useAxios,
        useJQuery,
        withCredentials,
      } = this;
      if (useAxios) {
        this[this.axios]
          .request(url, {
            method,
          })
          .then((response) => {
            this.responseData = response.data;
          })
          .catch((error) => this.onError(error));
      } else if (useJQuery) {
        (jQuery || window[this.jquery])
          .ajax({
            url,
            method,
            xhrFields: {
              withCredentials,
            },
          })
          .then((response) => {
            this.responseData = response;
          })
          .catch((error) => this.onError(error));
      } else if (useFetch) {
        this.loading = true;
        fetch(url, {
          method,
        })
          .then(async (response) => {
            if (response.ok) {
              this.responseData = await response.json();
              this.error = undefined;
            } else {
              throw response.statusText;
            }
          })
          .catch((error) => this.onError(error))
          .finally(() => {
            this.loading = false;
          });
      }
    },
    onError(error) {
      this.error = error;
      this.loading = false;
      this.$emit("error", error);
    },
  },
  watch: {
    url() {
      this.doFetch();
    },
  },
  mounted() {
    this.doFetch();
  },
};
</script>

<style></style>
