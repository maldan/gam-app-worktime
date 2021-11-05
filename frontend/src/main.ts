import { createApp } from 'vue';
import App from './App.vue';
import Router from './router';
import Store from './store';
import UI from '../src/gam_sdk_ui/vue/ui';
import Event from '../src/gam_sdk_ui/vue/event';
import '../src/gam_sdk_ui/vue/style/main.scss';
import './main.scss';

(async () => {
  const app = createApp(App);
  app.use(UI).use(Event).use(Router).use(Store).mount('#app');

  await Store.dispatch('project/getList');
  await Store.dispatch('work/setDate', new Date());
  await Store.dispatch('todo/getList');
})();
