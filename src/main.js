import { createApp } from "vue";
import {
  Quasar,
  QLayout,
  QHeader,
  QToolbar,
  QToolbarTitle,
  QPageContainer,
  QPage,
  QCard,
  QCardSection,
  QForm,
  QSelect,
  QInput,
  QBanner,
  QBtn,
  QInnerLoading,
  QSpinner,
} from "quasar";
import { VueQueryPlugin } from "@tanstack/vue-query";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import App from "./App.vue";
import { queryClient } from "./providers/queryClient";

const app = createApp(App);

app.use(Quasar, {
  plugins: {},
  components: {
    QLayout,
    QHeader,
    QToolbar,
    QToolbarTitle,
    QPageContainer,
    QPage,
    QCard,
    QCardSection,
    QForm,
    QSelect,
    QInput,
    QBanner,
    QBtn,
    QInnerLoading,
    QSpinner,
  },
});

app.use(VueQueryPlugin, { queryClient });

app.mount("#app");
