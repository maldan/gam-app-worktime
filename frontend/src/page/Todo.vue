<template>
  <div :class="$style.main">
    <ui-block
      :class="$style.block"
      title="todo list"
      icon="plus"
      :scrollY="true"
      @iconClick="
        $store.dispatch('modal/show', {
          name: 'add/todo',
          data: {
            priority: '',
            description: '',
            deadline: $root.moment($store.state.main.date).format('YYYY-MM-DD HH:mm:ss'),
            created: $root.moment($store.state.main.date).format('YYYY-MM-DD HH:mm:ss'),
          },
          onSuccess: () => {
            $store.dispatch('todo/add');
          },
        })
      "
    >
      <ui-input :class="$style.filter" icon="title" placeholder="Filter..." v-model="filter" />
      <div :class="$style.list">
        <div
          v-for="item in list"
          :key="item.id"
          :class="$style.block"
          :style="item.priority < 0 ? { opacity: 0.5 } : {}"
        >
          <div :class="$style.header">
            <!-- Left -->
            <div
              :class="$style.left"
              v-html="checkTime($root.moment(item.deadline).fromNow())"
            ></div>
            <div :class="$style.left2">
              {{ item.priority }}
            </div>

            <!-- Time -->
            <div :class="$style.right">
              {{ $root.moment(item.created).fromNow() }}
            </div>

            <div :class="$style.icons">
              <ui-button
                @click="
                  $store.dispatch('modal/show', {
                    name: 'add/todo',
                    data: {
                      ...item,
                      deadline: $root.moment(item.deadline).format('YYYY-MM-DD HH:mm:ss'),
                      created: $root.moment(item.created).format('YYYY-MM-DD HH:mm:ss'),
                    },
                    onSuccess: () => {
                      $store.dispatch('todo/add');
                    },
                  })
                "
                icon="copy"
                size="compact-square"
                :class="$style.icon"
              />
              <ui-button
                @click="
                  $store.dispatch('modal/show', {
                    name: 'edit/todo',
                    data: {
                      ...item,
                      deadline: $root.moment(item.deadline).format('YYYY-MM-DD HH:mm:ss'),
                      created: $root.moment(item.created).format('YYYY-MM-DD HH:mm:ss'),
                    },
                    onSuccess: () => {
                      $store.dispatch('todo/update');
                    },
                  })
                "
                icon="pencil"
                size="compact-square"
                :class="$style.icon"
              />
              <ui-button
                @click="
                  $store.dispatch('modal/show', {
                    name: 'approve',
                    data: {
                      title: `Remove this todo?`,
                    },
                    onSuccess: () => {
                      $store.dispatch('todo/remove', item.id);
                    },
                  })
                "
                icon="trash"
                size="compact-square"
                :class="$style.icon"
              />
            </div>
          </div>
          <div :class="$style.body" v-html="$root.format(item.description)"></div>
        </div>
      </div>
    </ui-block>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  computed: {
    list() {
      return this.$store.state.todo.list.filter((item: any) =>
        item.description.match(new RegExp(this.filter, 'ig')),
      );
    },
  },
  async mounted() {},
  methods: {
    checkTime(str: string) {
      if (str.match(/ago/)) {
        return `<span style="color: #ff5c5c; font-weight: bold;">${str}</span>`;
      }
      return str;
    },
  },
  data: () => {
    return {
      filter: '',
    };
  },
});
</script>

<style lang="scss" module>
@import '../gam_sdk_ui/vue/style/size.scss';
@import '../gam_sdk_ui/vue/style/color.scss';

.main {
  padding: $gap-base;
  height: calc(100% - 50px);
  box-sizing: border-box;
  display: flex;

  .block {
    flex: 1;

    .filter {
      margin-bottom: $gap-base;
    }

    .list {
      min-height: 0;

      .block {
        font-size: 15px;
        margin-bottom: $gap-base;

        .header {
          display: flex;
          align-items: flex-end;

          .left,
          .right,
          .left2 {
            padding: 10px 15px;
            background-color: $gray-medium;
            border-radius: 6px 6px 0 0;
            color: $text-gray;
            font-weight: bold;

            span {
              color: $text-gray;
              font-style: italic;
              font-weight: 300;
            }
          }

          .left {
            color: #cfda1e;
          }

          .left2 {
            margin-left: $gap-base;
            color: #1edaab;
            font-weight: bold;
          }

          .right {
            margin-left: $gap-base;
          }

          .icons {
            display: flex;
            margin-left: auto;

            .icon {
              margin-left: $gap-base;
              margin-bottom: $gap-base;
            }
          }
        }

        .body {
          padding: 10px 15px;
          background-color: $gray-medium;
          border-radius: 0 0 6px 6px;
          color: $text-gray;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
