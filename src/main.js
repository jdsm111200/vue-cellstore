import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@fortawesome/fontawesome-free/css/all.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAYWy4zij0MD8i-OxkUW4QRyQLiZMN2ang",
  authDomain: "vue-cellphone.firebaseapp.com",
  databaseURL: "https://vue-cellphone.firebaseio.com",
  projectId: "vue-cellphone",
  storageBucket: "vue-cellphone.appspot.com",
  messagingSenderId: "792417522030",
  appId: "1:792417522030:web:b6ae79496867594af1317f",
};

const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();
export const st = app.storage();

Vue.config.productionTip = false;
Vue.use(require("vue-moment"));

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
