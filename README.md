# v-fetch-data
A vue component to fetch and display data

# Use

Install
```bash
$ npm install v-fetch-data
```

Import and register component
```js
import VFetchData from 'v-fetch-data/src/components/FetchData.vue';
app.component("v-fetch-data", VFetchData);
```

User component
```html
<v-fetch-data 
  url="https://api.github.com/users" 
  #default="{error, responseData, loading}"
>
  <span v-if="loading">
    Loading ...
  </span>
  <span v-else-if="error">{{error}}</span>
  <ul v-else>
    <li v-for="user in responseData" :key="user.id">
      <a :href="user.html_url">{{user.login}}</a>
    </li>
  </ul>
</v-fetch-data>
```

# Slots

## default slot
Slot properties
- loading: Boolean, is request pending
- error: String|Error, what ever error while request for data
- responseData: Object|Array, the response data

# todo

Improve build