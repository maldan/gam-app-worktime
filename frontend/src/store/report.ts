import Axios from 'axios';
import Moment from 'moment';
import { ActionContext } from 'vuex';
import { MainTree } from '.';

export type ReportStore = {
  list: any[];
  name: '';
  description: '';
  fromDate: Date;
  toDate: Date;
  totalTime: 0;
  totalPrice: 0;
};
export type ReportActionContext = ActionContext<ReportStore, MainTree>;

export default {
  namespaced: true,
  state: {
    list: [],
    name: '',
    description: '',
    fromDate: Moment().format('YYYY-MM-DD'),
    toDate: Moment().format('YYYY-MM-DD'),
    totalTime: 0,
    totalPrice: 0,
  },
  mutations: {
    SET_LIST(state: ReportStore, list: any[]) {
      state.list = list;
    },
    SET_TOTAL(state: ReportStore, total: any) {
      state.totalPrice = total.price;
      state.totalTime = total.time;
    },
  },
  actions: {
    async getList(action: ReportActionContext) {
      const list = (
        await Axios.get(
          `${action.rootState.main.API_URL}/report/search?name=${action.state.name}&description=${
            action.state.description
          }&fromDate=${Moment(action.state.fromDate).format('YYYY-MM-DD')}&toDate=${Moment(
            action.state.toDate,
          ).format('YYYY-MM-DD')}`,
        )
      ).data.response;
      action.commit('SET_LIST', list);
      action.dispatch('calculateTotal');
    },
    async calculateTotal(action: ReportActionContext) {
      let time = 0;
      let price = 0;
      for (let i = 0; i < action.state.list.length; i++) {
        time += Moment(action.state.list[i].stop).diff(
          Moment(action.state.list[i].start),
          'seconds',
        );
        price +=
          (Moment(action.state.list[i].stop).diff(Moment(action.state.list[i].start), 'seconds') /
            3600) *
          ~~action.rootState.project.hourRate[action.state.list[i].name];
      }

      action.commit('SET_TOTAL', { time, price });
    },
  },
};
