<template>
  <div class="main">
    <ui-block
      title="project list"
      icon="plus"
      @iconClick="
        $store.dispatch('modal/show', {
          name: 'add/project',
          data: {
            name: '',
            description: '',
            pricePerHour: '800',
            color: '#fefefe',
            created: $root.moment($store.state.main.date).format('YYYY-MM-DD HH:mm:ss'),
          },
          onSuccess: () => {
            $store.dispatch('project/add');
          },
        })
      "
    >
      <div class="item" v-for="item in $store.state.project.list" :key="item.id">
        <div><b>Name:</b> {{ item.name }}</div>
        <div><b>Description:</b> {{ item.description }}</div>
        <div><b>Price per hour:</b> {{ item.pricePerHour }}</div>
        <div><b>Created:</b> {{ $root.moment(item.created).format('DD MMM YYYY') }}</div>
        <div style="position: absolute; right: 10px; top: 10px">
          <ui-button
            @click="
              $store.dispatch('modal/show', {
                name: 'edit/project',
                data: {
                  ...item,
                  created: $root.moment(item.created).format('YYYY-MM-DD HH:mm:ss'),
                },
                onSuccess: () => {
                  $store.dispatch('project/update');
                },
              })
            "
            icon="pencil"
            size="empty"
            style="margin-left: auto"
          />
          <ui-button
            @click="
              $store.dispatch('modal/show', {
                name: 'approve',
                data: {
                  title: `Remove '${item.name}' project?`,
                },
                onSuccess: () => {
                  $store.dispatch('project/remove', item.id);
                },
              })
            "
            icon="trash"
            size="empty"
          />
        </div>
      </div>
    </ui-block>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import List from '../component/project/List.vue';

export default defineComponent({
  components: { List },
  async mounted() {
    this.$store.dispatch('project/getList');
  },
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
  height: calc(100% - 50px);
  padding: 10px;

  .item {
    position: relative;
    padding: 10px;
    border-bottom: 1px solid #555555;
  }
}
</style>
