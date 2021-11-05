<template>
  <div :class="$style.main">
    <ui-block title="hour map">
      <HourMap />
    </ui-block>
    <ui-block
      :class="$style.block"
      title="history"
      icon="plus"
      :scrollY="true"
      @iconClick="
        $store.dispatch('modal/show', {
          name: 'add/work',
          data: {
            name: '',
            description: '',
            start: $root.moment($store.state.work.date).format('YYYY-MM-DD HH:mm:ss'),
            stop: $root.moment($store.state.work.date).format('YYYY-MM-DD HH:mm:ss'),
          },
          onSuccess: () => {
            $store.dispatch('work/add');
          },
        })
      "
    >
      <div class="task" v-for="(x, i) in $store.state.work.history" :key="x">
        <Task
          :item="x"
          :nextItem="$store.state.work.history[i + 1]"
          :date="$store.state.work.date"
        />
      </div>
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HourMap from '../component/main/HourMap.vue';
import Task from '../component/main/Task.vue';

export default defineComponent({
  components: { HourMap, Task },
  async mounted() {},
  methods: {},
  data: () => {
    return {
      currentDate: new Date(),
    };
  },
});
</script>

<style lang="scss" module>
@import '../gam_sdk_ui/vue/style/size.scss';
@import '../gam_sdk_ui/vue/style/color.scss';

.main {
  box-sizing: border-box;
  display: grid;
  height: calc(100% - 48px);
  gap: $gap-base;
  grid-template-columns: 200px 340px 1fr;
  padding: $gap-base;

  .block {
    min-height: 0;
  }
  /*
  height: calc(100% - 110px);
  padding: 10px;
  padding-top: 0;

  .body {
    margin-top: 10px;
    
  }*/
}
</style>
