<template>
  <b-container>
    <div class="card-wrap">
      <div class="meeting-title">
        <div >
          <h3>{{meetup.caption}}</h3>
          <span>{{meetup.location}}</span>
        </div>

        <template v-if="checkMeetupMatch">
          <edit-meeting :meetup="meetup" />
        </template>
      </div>

      <img :src="meetup.imgURL" alt width="100%" height="350px"/>
      <div class="info-container">
        <h5 class="mt-3">{{meetup.date}}</h5>
        <p>{{meetup.description}}</p>
        <b-button href="#" variant="primary">Register</b-button>
      </div>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "SingleMeetup",
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    isAuthenticated() {
      return (
        this.$store.getters.getUser !== null &&
        this.$store.getters.getUser !== undefined
      );
    },
    checkMeetupMatch() {
      return this.meetup.creatorID === this.$store.getters.getUser.id;
    },
  },
};
</script>
<style lang="scss" scoped>
.card-wrap {
  .meeting-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  width: 75%;
  margin-left: auto;
  margin-right: auto;
  background: #fff;
  box-shadow: 0 0 10px #ccc6c6;
  padding: 10px 0;
  overflow: hidden;
  .info-container {
    padding: 0 15px;
  }
  .meeting-title {
    color: gray;
    padding: 15px;
  }
  h5 {
    color: #3f51b5;
    font-weight: 300;
  }
  a {
    color: white;
    float: right;
  }
}
</style>