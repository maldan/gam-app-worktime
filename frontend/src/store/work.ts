import Axios from 'axios';
import Moment from 'moment';
import { ActionContext } from 'vuex';
import { MainTree } from '.';

export type WorkStore = {
  list: any[];
};
export type WorkActionContext = ActionContext<WorkStore, MainTree>;

export default {
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    SET_LIST(state: WorkStore, list: any[]) {
      state.list = list;
    },
  },
  actions: {
    async getList(action: WorkActionContext) {
      const list = (await Axios.get(`${action.rootState.main.API_URL}/work/list`)).data.response;
      action.commit('SET_LIST', list);
    },
    async add(action: WorkActionContext) {
      await Axios.post(`${action.rootState.main.API_URL}/work`, action.rootState.modal.data);
    },
  },
};
