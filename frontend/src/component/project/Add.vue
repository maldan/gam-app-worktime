<template>
  <div :class="$style.container">
    <div :class="$style.window">
      <ui-input icon="food" placeholder="Name..." style="margin-bottom: 10px" v-model="name" />
      <ui-textarea
        icon="weight"
        placeholder="Description..."
        style="margin-bottom: 10px"
        v-model="desription"
      />

      <ui-input
        icon="weight"
        placeholder="Price per hour..."
        style="margin-bottom: 10px"
        v-model="pricePerHour"
      />
      <ui-input icon="date" placeholder="Stop..." style="margin-bottom: 10px" v-model="created" />

      <div style="display: flex">
        <ui-button @click="$emit('close')" text="Cancel" style="margin-right: 5px" />
        <ui-button @click="submit()" text="Add" icon="add" style="margin-left: 5px" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RestApi } from '../../util/RestApi';
import Moment from 'moment';

export default defineComponent({
  props: {},
  components: {},
  async mounted() {},
  methods: {
    async submit() {
      await RestApi.project.add(
        this.name,
        this.desription,
        Number(this.pricePerHour),
        this.created,
      );
      this.$emit('close');
    },
  },
  data() {
    return {
      name: '',
      desription: '',
      pricePerHour: '',
      created: Moment().format('YYYY-MM-DD HH:mm:ss'),
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
