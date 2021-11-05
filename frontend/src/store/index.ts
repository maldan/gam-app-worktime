import { createStore } from 'vuex';

import modal, { ModalStore } from '../gam_sdk_ui/vue/store/modal';
import main, { MainStore } from './main';
import work, { WorkStore } from './work';
import project, { ProjectStore } from './project';
import todo, { TodoStore } from './todo';

export type MainTree = {
  main: MainStore;
  modal: ModalStore;
  work: WorkStore;
  project: ProjectStore;
  todo: TodoStore;
};

export default createStore({
  modules: { main, modal, work, project, todo },
});
