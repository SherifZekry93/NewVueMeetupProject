<template>
  <b-container>
    <b-row>
      <b-col lg="6" offset-lg="3" md="8" offset-md="2">
        <b-alert
          :show="!showDismissibleAlert()"
          variant="danger"
          dismissible
        >{{this.$store.getters.error}}</b-alert>
        <b-form @submit="onSubmit">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
            class="text-muted"
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Password:" label-for="input-2" class="text-muted">
            <b-form-input
              id="input-2"
              v-model="form.password"
              type="password"
              required
              placeholder="Enter Passworrd"
            ></b-form-input>
          </b-form-group>
          <b-button variant="primary custom-primary" @click="onSubmit">
            <b-spinner small type="grow" v-if="loading"></b-spinner>
            {{buttonText}}
          </b-button>

          <!-- <b-button type="submit" style="color:white;" variant="primary">Submit</b-button> -->
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        confirmpassword: "",
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$store.dispatch("signUserIn", this.form);
    },
    showDismissibleAlert() {
      return this.$store.getters.error === null;
    },

  },
  computed: {
    comparePasswords() {
      return this.form.password === this.form.confirmpassword;
    },
    user() {
      return this.$store.getters.getUser;
    },
    loading() {
      return this.$store.getters.loading;
    },
    buttonText() {
      return this.loading ? "Loading..." : "Signin";
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-primary {
  color: white !important;
}
</style>