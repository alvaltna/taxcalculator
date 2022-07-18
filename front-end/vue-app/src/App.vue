<template>
<div class="container m-5">
  <nav>
    <div>
    <router-link class="nav-link" to="/">Home</router-link>
    <router-link class="nav-link" to="/countries">Countries</router-link>
    </div>
  </nav>
</div>
  <router-view/>
</template>

<script lang="ts">

export default {
}

</script>

<style scoped lang="scss">

#app {
  text-align: center;
}

.nav-link{
    padding-left: 10px;
    padding-right: 0;
  }

.nav-link.dropdown{
  padding: 0;
}

#SearchBox{
  padding-left: 10px;
}

nav {
  padding: 10px;

  div {

    float:left;
  }

  a {
    padding: 3px;
    float: left;
  }
}

</style>
