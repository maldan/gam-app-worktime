import Axios from 'axios';
import Moment from 'moment';
import { ActionContext } from 'vuex';
import { MainTree } from '.';

export type TodoStore = {
  list: any[];
};
export type TodoActionContext = ActionContext<TodoStore, MainTree>;

export default {
  namespaced: true,
  state: {
    list: [],
  },
  mutations: {
    SET_LIST(state: TodoStore, list: any[]) {
      state.list = list;
    },
  },
  actions: {
    async add(action: TodoActionContext) {
      await Axios.post(`${action.rootState.main.API_URL}/todo`, action.rootState.modal.data);
      await action.dispatch('getList');
    },
    async update(action: TodoActionContext) {
      await Axios.patch(`${action.rootState.main.API_URL}/todo`, action.rootState.modal.data);
      await action.dispatch('getList');
    },
    async getList(action: TodoActionContext) {
      const list = (await Axios.get(`${action.rootState.main.API_URL}/todo/list`)).data.response;
      action.commit('SET_LIST', list);
    },
    async remove(action: TodoActionContext, totoId: string) {
      await Axios.delete(`${action.rootState.main.API_URL}/todo?id=${totoId}`);
      await action.dispatch('getList');
    },
  },
};
