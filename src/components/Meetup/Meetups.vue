<template>
  <div>
    <v-container>
      <b-card v-for="item in loadedMeetups" :img-src="item.imgURL" img-alt="Card image" img-left class="mb-3" :key="item.id">
        <b-card-text>
          <h4>{{item.caption}}</h4>
          <span class="date-span">{{item.date}}</span>
        </b-card-text>
        <b-button href="#" variant="primary" class="custom-button" @click="goToMeetup(item.id)">
          <b-icon icon="arrow-right" class="mr-1"></b-icon>
          <span>Show Meeting</span>
        </b-button>
      </b-card>
    </v-container>
  </div>
</template>

<style lang="scss" scope>
.custom-button {
  color: #fff !important;
}
.date-span {
  color: #888;
}
.card-img-left
{
  width: 200px;
}

</style>
<script>
export default {
  name: "Meetups",
  computed: {
    loadedMeetups() {
      return this.$store.getters.loadedMeetups;
    },
  },
  methods:{
    goToMeetup(id)
    {
      this.$router.push(`/Single/${id}`)
    }
  }
};
</script>