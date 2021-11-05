<template>
  <div class="main">
    <div class="body">
      <ui-block title="hour map">
        <HourMap />
      </ui-block>
      <ui-block
        title="history"
        icon="plus"
        @iconClick="
          $store.dispatch('modal/show', {
            name: 'add/work',
            data: {
              name: '',
              description: '',
              start: $root.moment($store.state.main.date).format('YYYY-MM-DD HH:mm:ss'),
              stop: $root.moment($store.state.main.date).format('YYYY-MM-DD HH:mm:ss'),
            },
            onSuccess: () => {
              $store.dispatch('work/add');
            },
          })
        "
      >
        <History />
      </ui-block>
      <ui-block title="schedule">
        <ui-schedule
          :map="$store.state.work.yearMap"
          :max="21600"
          :date="$store.state.work.date"
          :yearRange="[-4, -3, -2, -1, 0]"
          formatValue="time"
          color="#007eff"
          @select="$store.dispatch('work/setDate', $event)"
        />
      </ui-block>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HourMap from '../component/main/HourMap.vue';
import History from '../component/main/History.vue';

export default defineComponent({
  components: { HourMap, History },
  async mounted() {},
  methods: {},
  data: () => {
    return {
      currentDate: new Date(),
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  box-sizing: border-box;
  height: calc(100% - 110px);
  padding: 10px;
  padding-top: 0;

  .body {
    margin-top: 10px;
    display: grid;
    height: calc(100% - 110px);
    gap: 10px;
    grid-template-columns: 200px 340px 1fr;
  }
}
</style>
