<template>
  <div>
    <b-button
      variant="outline-info"
      class="mb-2"
      v-b-modal.modal-prevent-closing
      @click="editedDialogue = true"
    >
      <b-icon icon="pen" aria-hidden="true"></b-icon>
    </b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Edit Meetiing"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      v-if="editedDialogue"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
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
      </form>
    </b-modal>
  </div>
</template>
<script>
export default {
  props: ["meetup"],
  data() {
    return {
      editedDialogue: false,
      editedTitle: this.meetup.caption,
      editedDescription: this.meetup.description,
    };
  },
  methods: {
    checkFormValidity() {
      return (
        this.title !== "" && this.location !== "" && this.description !== ""
      );
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      this.editedDialogue = false;
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't   valid
      if (!this.checkFormValidity()) {
        alert("Not valid form!");
        return;
      }
      const meetup = {
        imgURL: this.meetup.imgURL,
        caption: this.editedTitle,
        date:"Date: " + this.meetup.date + " -- " + "Time: " + this.meetup.time,
        description: this.editedDescription,
        location: this.meetup.location,
      };
      console.log(meetup);
    },
  },
  computed: {},
};
</script>