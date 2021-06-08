import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: 'black',
            secondary: 'black',
            accent: 'black',
            error: 'black',
          },
        },
      },
});
