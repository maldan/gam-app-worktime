<template>
  <div class="main">
    <Header />

    <div class="body">
      <div class="block">
        <div class="header">Search</div>
        <div>
          <div style="display: flex">
            <div style="flex: 1; margin-right: 10px">
              <Input icon="title" placeholder="Project name..." v-model="name" style="" />
              <Input icon="title" placeholder="Project description..." v-model="description" />
            </div>
            <div style="flex: 1; margin-right: 10px">
              <Input icon="date" placeholder="From date..." v-model="fromDate" />
              <Input icon="date" placeholder="To date..." v-model="toDate" />
            </div>
            <Button @click="search()" icon="time" text="Calculate" style="flex: none" />
          </div>
        </div>
      </div>

      <div class="block total">
        <div class="header">Total</div>
        <div>
          <div>Total hour: {{ totalTime(totalHours) }}</div>
          <div>Total price: {{ ~~totalPrice }}</div>
        </div>
      </div>

      <div class="block result">
        <div class="header">Results</div>
        <div class="list">
          <div class="item" v-for="x in list" :key="x.id">
            <div><b>Name:</b> {{ x.name }}</div>
            <div><b>Description:</b> {{ x.description }}</div>
            <div><b>Created:</b> {{ $root.moment(x.start).format('DD MMM YYYY') }}</div>
            <div>
              <b>Duration:</b>
              {{
                $root
                  .moment()
                  .startOf('day')
                  .seconds($root.moment(x.stop).diff($root.moment(x.start), 'seconds'))
                  .format('HH:mm')
              }}
            </div>
            <div>
              <b>Price:</b>
              {{
                ~~(
                  ($root.moment(x.stop).diff($root.moment(x.start), 'seconds') / 3600) *
                  ~~hourRate[x.name]
                )
              }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../component/Header.vue';
import History from '../component/main/History.vue';
import Schedule from '../component/main/Schedule.vue';
import Input from '../gam_sdk_ui/vue/component/Input.vue';
import Button from '../component/Button.vue';
import Moment from 'moment';
import { RestApi } from '../util/RestApi';

export default defineComponent({
  components: { Header, History, Schedule, Input, Button },
  async mounted() {
    this.projectList = await RestApi.project.getList();
    for (let i = 0; i < this.projectList.length; i++) {
      this.hourRate[this.projectList[i].name] = this.projectList[i].pricePerHour;
    }
  },
  methods: {
    totalTime(time: number) {
      const h = ~~(time / 3600);
      const m = (time / 60) % 60;
      return `${h} h ${~~m} m`;
    },
    async search() {
      this.list = await RestApi.report.search(
        this.name,
        this.description,
        this.fromDate,
        this.toDate,
      );
      this.totalHours = 0;
      this.totalPrice = 0;
      for (let i = 0; i < this.list.length; i++) {
        this.totalHours += Moment(this.list[i].stop).diff(Moment(this.list[i].start), 'seconds');
        this.totalPrice +=
          (Moment(this.list[i].stop).diff(Moment(this.list[i].start), 'seconds') / 3600) *
          ~~this.hourRate[this.list[i].name];
      }
    },
  },
  data: () => {
    return {
      list: [] as any[],
      projectList: [] as any[],
      hourRate: {} as any,

      currentDate: new Date(),
      totalHours: 0,
      totalPrice: 0,

      name: '',
      description: '',
      fromDate: Moment().format('YYYY-MM-DD'),
      toDate: Moment().format('YYYY-MM-DD'),
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  box-sizing: border-box;
  height: 100%;
  padding: 10px;

  .body {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 60px);

    .total {
      margin-top: 10px;
      color: #999999;
    }

    .result {
      height: calc(100% - 120px);
      overflow: hidden;
      margin-top: 10px;

      .list {
        height: calc(100% - 25px);
        overflow-y: auto;

        .item {
          padding: 5px;
          color: #999999;
          border-bottom: 1px solid #383838;
        }
      }
    }
  }
}
</style>
