<template>
  <b-container>
    <b-row>
      <b-col md="8" offset-md="2" lg="6" offset-lg="3">
        <h3 class="text-muted">Create Meetup</h3>
        <b-form @submit="onSubmit" @reset="reset">
          <b-form-group id="input-group-1" label="Title:" label-for="input-1" class="text-muted">
            <b-form-input id="input-1" v-model="title" required placeholder="Meeting Title"></b-form-input>
          </b-form-group>

          <b-form-group
            class="text-muted"
            id="input-group-2"
            label="Enter Location:"
            label-for="input-2"
          >
            <b-form-input id="input-2" v-model="location" required placeholder="Meeting Location"></b-form-input>
          </b-form-group>

          <b-form-group
            class="text-muted"
            id="input-group-2"
            label="Image URL:"
            label-for="input-2"
          >
            <b-form-file
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              accept="image/*"
              @change="imageChanged"
            ></b-form-file>
          </b-form-group>

          <b-form-group>
            <b-img
              thumbnail
              fluid
              :src="imgURL"
              alt="Preview your image"
              style="width:100%;min-height:150px;max-height:150px"
            ></b-img>
          </b-form-group>

          <b-form-group
            class="text-muted"
            id="input-group-2"
            label="Description:"
            label-for="input-2"
          >
            <b-form-textarea
              id="textarea"
              v-model="description"
              placeholder="Enter Description..."
              rows="3"
              max-rows="6"
              class="mb-1"
            ></b-form-textarea>
          </b-form-group>

          <b-form-group
            class="text-muted"
            id="input-group-2"
            label="Date Picker:"
            label-for="input-2"
          >
            <b-form-datepicker id="example-datepicker" v-model="date" class="mb-2"></b-form-datepicker>
          </b-form-group>

          <b-form-group
            class="text-muted"
            id="input-group-2"
            label="Time Picker:"
            label-for="input-2"
          >
            <b-form-timepicker v-model="time" locale="en"></b-form-timepicker>
          </b-form-group>

          <b-button
            type="submit"
            style="color:white;"
            variant="primary"
            :disabled="!formIsValid"
            class="mt-2"
          >Submit</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      location: "",
      description: "",
      date: "",
      time: "",
      image: null,
      imgURL:''
    };
  },
  methods: {
    imageChanged(event) {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", () => {
        this.imgURL = fileReader.result;
      });
      this.image = file;
    },
    onSubmit(evt) {
      evt.preventDefault();
      if (!this.image) {
        return;
      }
      const meetup = {
        image: this.image,
        caption: this.title,
        date: "Date: " + this.date + " -- " + "Time: " + this.time,
        description: this.description,
        location:this.location
      };
      this.$store.dispatch("createMeetup", meetup);
      //alert("Added Successfully ");
      this.$router.push("/Meetups");
    },
    reset() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
      this.title = "";
      this.location = "";
      this.imgURL = "";
      this.description = "";
    },
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imgURL !== "" &&
        this.description !== ""
      );
    }
  },
};
</script>