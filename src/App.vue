<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="own-bg">
      <b-navbar-brand>
        <router-link to="/" tag="span" style="cursor:pointer;">Dev Meetup</router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav></b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item dark v-for="item in menuitems" :to="item.routerLink" :key="item.title">
            <b-icon :icon="item.icon"></b-icon>
            {{item.title}}
          </b-nav-item>
          <b-nav-item dark v-if="userIsAuthenticated" @click="logOut">
            <b-icon icon="power"></b-icon>Logout
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data: function () {
    return {};
  },
  methods: {
    logOut() {
      this.$store.dispatch("logoOut")
    },
  },
  computed: {
    menuitems() {
      let menuItems = [
        { icon: "file-richtext", title: "Sign up", routerLink: "/Signup" },
        { icon: "lock", title: "sign in", routerLink: "/Signin" },
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "file-richtext",
            title: "Meetings",
            active: "active",
            routerLink: "/Meetups",
          },
          {
            icon: "person-plus",
            title: "Add Meeting",
            routerLink: "/CreateMeetup",
          },
          {
            icon: "emoji-sunglasses",
            title: "Profile",
            routerLink: "/Profile",
          },
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return this.$store.getters.getUser;
    },
  },
};
</script>

<style lang="scss" scope>
.own-bg {
  background-color: red;
}
.navbar-dark .navbar-nav .nav-link {
  font-weight: bold;
}
a {
  color: #fff;
}
</style>