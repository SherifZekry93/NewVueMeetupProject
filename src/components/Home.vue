<template>
  <b-container>
    <b-row>
      <b-col class="text-right">
        <b-button variant="primary" type="dark" to="/Meetups">Explore Meetups</b-button>
      </b-col>
      <b-col>
        <b-button variant="primary" type="dark" to="/CreateMeetup">Organize Meetup</b-button>
      </b-col>
    </b-row>
    <div class="text-center" v-show="loading">
      <b-spinner label="Spinning"></b-spinner>
    </div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="100000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <div
        style="cursor:pointer"
        v-for="item in slideData"
        :key="item.id"
        @click="hello(item.id)"
      >
        <b-carousel-slide :img-src="item.imgURL" :caption="item.caption" :text="item.text"></b-carousel-slide>
      </div>
    </b-carousel>
    <div class="text-center mt-2">
      <h3 class="bottom-header">Join our Meetings today!</h3>
    </div>

  </b-container>
</template>

<script>
export default {
  computed: {
    slideData() {
      return this.$store.getters.featuredMeetups;
    },
        loading() {
      return this.$store.getters.loading;
    }
  },
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    hello(meetupId) {
      this.$router.push(`/Single/${meetupId}`);
    },

  },
  
};
</script>

<style lang="scss" >
.carousel-caption {
  width: 100%;
  display: flex;
  justify-content: center;
  left: 0;
  text-align: center;
}
.carousel-caption h3 {
  background-color: rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
  padding: 10px;
}
.bottom-header {
  color: #666;
}
.carousel-inner
{
  max-height: calc(100vh - 200px)
}
</style>