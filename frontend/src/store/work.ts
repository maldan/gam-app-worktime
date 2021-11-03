import Axios from 'axios';
import Moment from 'moment';
import { ActionContext } from 'vuex';
import { MainTree } from '.';

export type WorkStore = {
  history: any[];
  yearMap: any[];
  date: Date;
};
export type WorkActionContext = ActionContext<WorkStore, MainTree>;

export default {
  namespaced: true,
  state: {
    history: [],
    yearMap: {},
    date: new Date('1970-01-01'),
  },
  mutations: {
    SET_HISTORY(state: WorkStore, history: any[]) {
      state.history = history;
    },
    SET_YEAR_MAP(state: WorkStore, payload: any) {
      state.yearMap = payload;
    },
    SET_DATE(state: WorkStore, date: Date) {
      const d = new Date(date);
      d.setHours(new Date().getHours());
      d.setMinutes(new Date().getMinutes());
      d.setSeconds(new Date().getSeconds());
      state.date = d;
    },
  },
  actions: {
    async getHistory(action: WorkActionContext) {
      const list = (
        await Axios.get(
          `${action.rootState.main.API_URL}/work/byDay?date=${Moment(action.state.date).format(
            'YYYY-MM-DD',
          )}`,
        )
      ).data.response;
      action.commit('SET_HISTORY', list);
    },
    async getYearMap(action: WorkActionContext) {
      const yearMap = (
        await Axios.get(
          `${action.rootState.main.API_URL}/work/yearMap?date=${Moment(action.state.date).format(
            'YYYY-MM-DD',
          )}`,
        )
      ).data.response;
      action.commit('SET_YEAR_MAP', yearMap);
    },
    setDate(action: WorkActionContext, date: Date) {
      const isRefresh = date.getFullYear() != action.state.date.getFullYear();
      action.commit('SET_DATE', date);
      if (isRefresh) {
        action.dispatch('getYearMap');
      }
      action.dispatch('getHistory');
    },
    async add(action: WorkActionContext) {
      await Axios.post(`${action.rootState.main.API_URL}/work`, action.rootState.modal.data);
    },
  },
};
