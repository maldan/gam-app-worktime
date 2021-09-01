import Axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL || `${window.location.origin}/api`;

export const RestApi = {
  work: {
    async add(name: string, description: string, start: string, stop: string) {
      return (
        await Axios.post(`${API_URL}/work`, {
          name,
          description,
          start,
          stop,
        })
      ).data.response;
    },
    async update(id: string, name: string, description: string, start: string, stop: string) {
      return (
        await Axios.patch(`${API_URL}/work`, {
          id,
          name,
          description,
          start,
          stop,
        })
      ).data.response;
    },

    async get(id: string) {
      return (await Axios.get(`${API_URL}/work?id=${id}`)).data.response;
    },

    async delete(id: string) {
      return (await Axios.delete(`${API_URL}/work?id=${id}`)).data.response;
    },

    async getByDay(date: string): Promise<any> {
      return (await Axios.get(`${API_URL}/work/byDay?date=${date}`)).data.response;
    },

    async getYearMap(date: string): Promise<any> {
      return (await Axios.get(`${API_URL}/work/yearMap?date=${date}`)).data.response;
    },
  },
  report: {
    async search(name: string, description: string, fromDate: string, toDate: string) {
      return (
        await Axios.get(
          `${API_URL}/report/search?name=${name}&description=${description}&fromDate=${fromDate}&toDate=${toDate}`,
        )
      ).data.response;
    },
  },
  project: {
    async add(
      name: string,
      description: string,
      pricePerHour: number,
      created: string,
    ): Promise<void> {
      return (
        await Axios.post(`${API_URL}/project`, {
          name,
          description,
          pricePerHour,
          created,
        })
      ).data.response;
    },
    async update(
      id: string,
      name: string,
      description: string,
      pricePerHour: number,
      created: string,
    ): Promise<void> {
      return (
        await Axios.patch(`${API_URL}/project`, {
          id,
          name,
          description,
          pricePerHour,
          created,
        })
      ).data.response;
    },

    async get(id: string): Promise<any> {
      return (await Axios.get(`${API_URL}/project?id=${id}`)).data.response;
    },
    async getList(): Promise<any[]> {
      return (await Axios.get(`${API_URL}/project/list`)).data.response;
    },
    async delete(id: string) {
      return (await Axios.delete(`${API_URL}/project?id=${id}`)).data.response;
    },
  },
};
