<template>
  <div :class="$style.container">
    <div :class="$style.window">
      <ui-input placeholder="Name..." style="margin-bottom: 10px" v-model="name" />
      <ui-textarea placeholder="Description..." style="margin-bottom: 10px" v-model="desription" />

      <ui-input
        icon="calendar"
        placeholder="Start..."
        style="margin-bottom: 10px"
        v-model="start"
      />
      <ui-input
        placeholder="Stop..."
        style="margin-bottom: 10px"
        v-model="stop"
        icon="calendar"
        functionIcon="stopwatch"
        :functionClick="getCurrentDate"
      />

      <div style="display: flex">
        <ui-button @click="$emit('close')" text="Cancel" style="margin-right: 5px" />
        <ui-button @click="submit()" text="Add" icon="plus" style="margin-left: 5px" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Moment from 'moment';
import { defineComponent } from 'vue';
import { RestApi } from '../../util/RestApi';

export default defineComponent({
  props: {
    date: Object,
  },
  components: {},
  async mounted() {},
  methods: {
    async submit() {
      await RestApi.work.add(this.name, this.desription, this.start, this.stop);
      this.$emit('close');
    },
    getCurrentDate() {
      return Moment().format('YYYY-MM-DD HH:mm:ss');
    },
  },
  data() {
    const moment = (this.$root as any)['moment'];
    const d = this.date as Date;
    d.setHours(new Date().getHours());
    d.setMinutes(new Date().getMinutes());
    d.setSeconds(new Date().getSeconds());

    return {
      name: '',
      desription: '',
      start: moment(d).format('YYYY-MM-DD HH:mm:ss'),
      stop: moment(d).format('YYYY-MM-DD HH:mm:ss'),
    };
  },
});
</script>

<style lang="scss" module>
.container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  .window {
    min-width: 320px;
    background: #313131a8;
    border-radius: 4px;
    padding: 25px;
    color: #fefefe;
    box-shadow: 0px 1px 6px 2px #00000055;

    .found_item {
      padding: 10px 15px;
      background: #3a3a3a;
      margin-bottom: 10px;
      border-radius: 4px;
      display: flex;

      img {
        margin-left: auto;
      }
    }
  }
}
</style>
