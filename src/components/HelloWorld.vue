<template>
  <div class="navbar" id="app">
    <ul v-for="app in values" :key="app.name">
      <a :href="`#/${app.name}`">
        <li>{{ app.name }}</li>
      </a>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["values"],
  data: () => ({})
};
</script>

<style lang="css" scoped>
.navbar {
  font-family: Arial, Helvetica, sans-serif;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #116466;
  color: white;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.navbar ul {
  display: flex;
  align-items: center;
  list-style-type: none;
  height: 100%;
}

.navbar li:hover {
  background-color: #d1e8e2;
}

.navbar li {
  padding-top: 14px;
  padding-bottom: -14px;
  padding-left: 10px;
  padding-right: 10px;
  height: 100%;
}

.navbar li:hover {
  color: black;
}

.navbar a {
  height: 100%;
  text-decoration: none;
  color: white;
}
</style>
