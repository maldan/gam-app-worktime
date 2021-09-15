<template>
  <div :class="$style.container">
    <div :class="$style.window">
      <Input icon="food" placeholder="Name..." style="margin-bottom: 10px" v-model="name" />
      <TextArea
        icon="weight"
        placeholder="Description..."
        style="margin-bottom: 10px"
        v-model="description"
      />

      <Input
        icon="weight"
        placeholder="Price per hour..."
        style="margin-bottom: 10px"
        v-model="pricePerHour"
      />
      <Input icon="date" placeholder="Stop..." style="margin-bottom: 10px" v-model="created" />

      <div style="display: flex">
        <Button @click="$emit('close')" text="Cancel" style="margin-right: 5px" />
        <Button @click="submit()" text="Save" icon="add" style="margin-left: 5px" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RestApi } from '../../util/RestApi';
import Button from '../Button.vue';
import Input from '../../gam_sdk_ui/vue/component/Input.vue';
import Select from '../Select.vue';
import TextArea from '../TextArea.vue';
import Moment from 'moment';

export default defineComponent({
  props: {
    id: String,
  },
  components: { Button, Input, Select, TextArea },
  async mounted() {
    const item = await RestApi.project.get(this.id + '');
    this.name = item.name;
    this.description = item.description;
    this.pricePerHour = item.pricePerHour;
    this.created = Moment(item.created).format('YYYY-MM-DD HH:mm:ss');
  },
  methods: {
    async submit() {
      await RestApi.project.update(
        this.id + '',
        this.name,
        this.description,
        Number(this.pricePerHour),
        this.created,
      );
      this.$emit('close');
    },
  },
  data() {
    return {
      name: '',
      description: '',
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
