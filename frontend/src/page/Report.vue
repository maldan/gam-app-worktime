<template>
  <div :class="$style.main">
    <ui-block :class="$style.block" title="filter">
      <div :class="$style.filter_body">
        <div>
          <ui-input
            :class="$style.input"
            icon="title"
            placeholder="Project name..."
            v-model="$store.state.report.name"
            style=""
          />
          <ui-input
            :class="$style.input"
            icon="calendar"
            placeholder="From date..."
            v-model="$store.state.report.fromDate"
          />
        </div>
        <div>
          <ui-input
            :class="$style.input"
            icon="title"
            placeholder="Project description..."
            v-model="$store.state.report.description"
          />
          <ui-input
            :class="$style.input"
            icon="calendar"
            placeholder="To date..."
            v-model="$store.state.report.toDate"
          />
        </div>
        <ui-button
          @click="$store.dispatch('report/getList')"
          icon="stopwatch"
          text="Calculate"
          style="flex: none"
        />
      </div>
    </ui-block>

    <ui-block :class="$style.block" title="total">
      <div :class="$style.item">
        <div :class="$style.field">
          <span>Total time</span> {{ totalTime($store.state.report.totalTime) }}
        </div>
        <div :class="$style.field">
          <span>Total price</span> {{ ~~$store.state.report.totalPrice }}
        </div>
      </div>
    </ui-block>

    <ui-block :class="$style.block" title="result" :scroll-y="true">
      <div :class="$style.item" v-for="x in $store.state.report.list" :key="x.id">
        <div :class="$style.field"><span>Name</span> {{ x.name }}</div>
        <div :class="$style.field"><span>Description</span> {{ x.description }}</div>
        <div :class="$style.field">
          <span>Created</span> {{ $root.moment(x.start).format('DD MMM YYYY') }}
        </div>
        <div :class="$style.field">
          <span>Duration</span>
          {{
            $root
              .moment()
              .startOf('day')
              .seconds($root.moment(x.stop).diff($root.moment(x.start), 'seconds'))
              .format('HH:mm')
          }}
        </div>
        <div :class="$style.field">
          <span>Price</span>
          {{
            ~~(
              ($root.moment(x.stop).diff($root.moment(x.start), 'seconds') / 3600) *
              ~~hourRate[x.name]
            )
          }}
        </div>
      </div>
    </ui-block>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RestApi } from '../util/RestApi';

export default defineComponent({
  components: {},
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
      /*this.list = await RestApi.report.search(
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
      }*/
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
    };
  },
});
</script>

<style lang="scss" module>
@import '../gam_sdk_ui/vue/style/size.scss';
@import '../gam_sdk_ui/vue/style/color.scss';

.main {
  box-sizing: border-box;
  height: calc(100% - 50px);
  padding: $gap-base;
  display: grid;
  grid-template-rows: max-content max-content 1fr;

  .block {
    margin-bottom: $gap-base;
    min-height: 0;

    &:last-child {
      margin-bottom: 0;
    }

    .filter_body {
      background-color: $gray-medium;
      padding: $gap-base;
      display: grid;
      gap: $gap-base;
      grid-template-columns: 1fr 1fr 1fr;

      .input {
        margin-bottom: $gap-base;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .item {
      position: relative;
      padding: $gap-base;
      background-color: $gray-medium;
      margin-bottom: $gap-base;

      .field {
        display: flex;
        align-items: center;
        margin-bottom: $gap-base;
        color: $text-gray;

        &:last-child {
          margin-bottom: 0;
        }

        > span {
          background: $gray-dark;
          color: $text-gray;
          font-size: 14px;
          padding: 3px 7px;
          border-radius: 4px;
          width: 140px;
          display: block;
          margin-right: $gap-base;
          text-transform: uppercase;
        }
      }

      .icons {
        display: flex;
        position: absolute;
        right: $gap-base;
        top: $gap-base;

        .icon {
          margin-left: $gap-base;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
