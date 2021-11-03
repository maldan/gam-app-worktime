import { createStore } from 'vuex';

import modal, { ModalStore } from '../gam_sdk_ui/vue/store/modal';
import main, { MainStore } from './main';
import work, { WorkStore } from './work';

export type MainTree = {
  main: MainStore;
  modal: ModalStore;
  work: WorkStore;
};

export default createStore({
  modules: { main, modal, work },
});
