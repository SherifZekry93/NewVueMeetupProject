import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loadMeetups: [],
    user: null,
    loading: false,
    authError: null,
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadMeetups.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.authError = payload;
    },
    clearError(state) {
      state.authError = null;
    },
    setMeetups(state, payload) {
      state.loadMeetups = payload;
    },
  },
  actions: {
    autoSignIn({ commit }, user) {
      commit("setUser", user);
    },
    getMeetupsFromFirebase({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("meetups")
        .on("value",(data) => {
          commit("setLoading", false);
          const values = data.val();
          const meetups = [];
          for (let key in values) {
            const meetup = {
              id: key,
              imgURL: values[key].imgURL,
              caption: values[key].caption,
              date: values[key].date,
              description: values[key].description,
              creatorID: values[key].creatorID,
              location:values[key].location
            };
            meetups.push(meetup);
          }
          commit("setMeetups", meetups);
        });
    },
    createMeetup( context , payload) {
      const Meetup = {
        caption: payload.caption,
        date: payload.date,
        description: payload.description,
        creatorID: context.getters.getUser.id,
        location:payload.location
      };
      let extension = "";
      firebase
        .database()
        .ref("meetups")
        .push(Meetup)
        .then((data) => {
          Meetup.id = data.key;
//          commit("createMeetup", Meetup);
          return Meetup.id;
        })
        .then((key) => {
          const fileName = payload.image.name;
          extension = fileName.slice(fileName.lastIndexOf("."));
          return firebase
            .storage()
            .ref("meetups/" + key + extension)
            .put(payload.image);
        })
        .then(() => {
          firebase
            .storage()
            .ref("meetups/" + Meetup.id + extension)
            .getDownloadURL()
            .then((url) => {
              Meetup.imgURL = url;
              return firebase
                .database()
                .ref("meetups")
                .child(Meetup.id)
                .update({ imgURL: url });
            });
        })
        .catch(() => {

        });
    },
    signUserUp(context, payload) {
      context.commit("setLoading", true);
      context.commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          context.commit("setLoading", false);
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
          };
          context.commit("setUser", newUser);
        })
        .catch((err) => {
          context.commit("setLoading", false);
          context.commit("setError", err);
        });
    },
    signUserIn(context, payload) {
      context.commit("setLoading", true);
      context.commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
          };
          context.commit("setUser", newUser);
          context.commit("setLoading", false);
        })
        .catch((err) => {
          context.commit("setLoading", false);

          context.commit("setError", err);
        });
    },
    logoOut({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
  },
  getters: {
    loadedMeetups(state) {
      return state.loadMeetups.sort((x, y) => {
        return x.date > y.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 3);
    },
    loadedMeetup(state) {
      return (id) => {
        return state.loadMeetups.find((x) => x.id === id);
      };
    },
    getUser(state) {
      return state.user;
    },
    error(state) {
      return state.authError;
    },
    loading(state) {
      return state.loading;
    },
  },
});
