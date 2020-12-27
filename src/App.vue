<template>
  <label for="fetch">fetch</label>
  <input id="fetch" type="radio" name="xhr" value="fetch" v-model="xhr" />
  <label for="axios">axios</label>
  <input id="axios" type="radio" name="xhr" value="axios" v-model="xhr" />
  <label for="jQuery">jQuery</label>
  <input id="jQuery" type="radio" name="xhr" value="jQuery" v-model="xhr" />
  <input placeholder="Search github user" type="text" v-model.lazy="user" />
  <fetch-data
    v-if="user"
    :url="`https://api.github.com/users/${user}`"
    :use-axios="xhr === 'axios'"
    :use-fetch="xhr === 'fetch'"
    :use-jQuery="xhr === 'jQuery'"
    #default="{ responseData: resp, loading, error }"
  >
    <span v-if="loading">Loading...</span>
    <table v-else-if="resp">
      <tr>
        <th style="text-align: right">Key</th>
        <th style="text-align: left">Value</th>
      </tr>
      <tr v-for="(value, key) in resp" :key="key">
        <td style="text-align: right">{{ key }}</td>
        <td style="text-align: left">{{ value }}</td>
      </tr>
    </table>
    <span style="color: red" v-else>{{ error }}</span>
  </fetch-data>
</template>

<script>
import FetchData from "./components/FetchData.vue";
export default {
  name: "App",
  components: {
    FetchData,
  },
  data() {
    return {
      user: "",
      xhr: "fetch",
    };
  },
};
</script>
