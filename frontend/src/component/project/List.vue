<template>
  <div class="block">
    <div class="header">
      Project list
      <img @click="isShowAddForm = true" class="clickable" src="../../asset/add.svg" alt="" />
    </div>
    <div class="list">
      <div class="item" v-for="x in list" :key="x.id">
        <div><b>Name:</b> {{ x.name }}</div>
        <div><b>Description:</b> {{ x.description }}</div>
        <div><b>Price per hour:</b> {{ x.pricePerHour }}</div>
        <div><b>Created:</b> {{ $root.moment(x.start).format('DD MMM YYYY') }}</div>
        <div style="position: absolute; right: 10px; top: 10px">
          <img
            @click="(isShowEditForm = true), (itemId = x.id)"
            class="clickable"
            src="../../asset/pencil.svg"
            alt=""
            style="margin-left: auto; margin-right: 10px"
          />
          <img @click="remove(x)" class="clickable" src="../../asset/trash.svg" alt="" />
        </div>
      </div>
    </div>

    <Add :date="date" v-if="isShowAddForm" @close="(isShowAddForm = false), refresh()" />
    <Edit :id="itemId" v-if="isShowEditForm" @close="(isShowEditForm = false), refresh()" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RestApi } from '../../util/RestApi';
import Header from '../Header.vue';
import Add from './Add.vue';
import Edit from './Edit.vue';

export default defineComponent({
  components: { Header, History, Add, Edit },
  async mounted() {
    this.refresh();
  },
  methods: {
    async refresh() {
      this.list = await RestApi.project.getList();
    },
    async remove(item: any) {
      if (confirm('Are you sure you want to delete it?')) {
        await RestApi.project.delete(item.id);
        this.refresh();
      }
    },
  },
  data: () => {
    return {
      list: [] as any[],
      currentDate: new Date(),

      itemId: '',
      isShowAddForm: false,
      isShowEditForm: false,
    };
  },
});
</script>

<style lang="scss" scoped>
.block {
  .list {
    color: #999999;

    .item {
      position: relative;
      padding: 10px;
      border-bottom: 1px solid #555555;
    }
  }
}
</style>
