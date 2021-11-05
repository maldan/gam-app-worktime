import Axios from 'axios';
import Moment from 'moment';
import { ActionContext } from 'vuex';
import { MainTree } from '.';

export type ProjectStore = {
  list: any[];
  color: any;
  hourRate: any;
};
export type ProjectActionContext = ActionContext<ProjectStore, MainTree>;

export default {
  namespaced: true,
  state: {
    list: [],
    color: {},
    hourRate: {},
  },
  mutations: {
    SET_LIST(state: ProjectStore, list: any[]) {
      state.list = list;

      for (let i = 0; i < list.length; i++) {
        state.color[list[i].name] = list[i].color || '#cccccc';
        state.hourRate[list[i].name] = ~~list[i].pricePerHour;
      }
    },
  },
  actions: {
    async add(action: ProjectActionContext) {
      await Axios.post(`${action.rootState.main.API_URL}/project`, action.rootState.modal.data);
      await action.dispatch('getList');
    },
    async update(action: ProjectActionContext) {
      await Axios.patch(`${action.rootState.main.API_URL}/project`, action.rootState.modal.data);
      await action.dispatch('getList');
    },
    async getList(action: ProjectActionContext) {
      const list = (await Axios.get(`${action.rootState.main.API_URL}/project/list`)).data.response;
      action.commit('SET_LIST', list);
    },
    async remove(action: ProjectActionContext, projectId: string) {
      await Axios.delete(`${action.rootState.main.API_URL}/project?id=${projectId}`);
      await action.dispatch('getList');
    },
  },
};
