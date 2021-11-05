import { createStore } from 'vuex';

import modal, { ModalStore } from '../gam_sdk_ui/vue/store/modal';
import main, { MainStore } from './main';
import work, { WorkStore } from './work';
import project, { ProjectStore } from './project';
import todo, { TodoStore } from './todo';
import report, { ReportStore } from './report';

export type MainTree = {
  main: MainStore;
  modal: ModalStore;
  work: WorkStore;
  project: ProjectStore;
  todo: TodoStore;
  report: ReportStore;
};

export default createStore({
  modules: { main, modal, work, project, todo, report },
});
