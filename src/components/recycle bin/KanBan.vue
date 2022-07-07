<template>
  <div class="kanban-board">
    <SlickList
      v-model:list="items"
      axis="xy"
      class="kanban-list"
      helper-class="kanban-helper"
    >
      <SlickItem v-for="(item, j) in items" :key="item.id" :index="j" class="kanban-list-item">
        <div class="kanban-list-item-inner">
          {{ item.value }}
        </div>
      </SlickItem>
    </SlickList>
  </div>
</template>

<script setup>
    //import { useWindowSize } from '@vueuse/core'
    import { SlickList, SlickItem } from 'vue-slicksort'

    //const { width } = useWindowSize()
    let items = $ref([
      {
        id: 1,
        value: 'Item 1',
      },
      {
        id: 2,
        value: 'Item 2',
      },
      {
        id: 3,
        value: 'Item 3',
      },
      {
        id: 4,
        value: 'Item 4',
      },
      {
        id: 5,
        value: 'Item 5',
      },
      {
        id: 6,
        value: 'Item 6',
      },
      {
        id: 7,
        value: 'Item 7',
      },
      {
        id: 8,
        value: 'Item 8',
      },
      {
        id: 9,
        value: 'Item 9',
      },
      {
        id: 10,
        value: 'Item 10',
      },
      {
        id: 11,
        value: 'Item 11',
      },
      {
        id: 12,
        value: 'Item 12',
      },
      {
        id: 13,
        value: 'Item 13',
      },
      {
        id: 14,
        value: 'Item 14',
      },
      {
        id: 15,
        value: 'Item 15',
      },
      {
        id: 16,
        value: 'Item 16',
      },
      {
        id: 17,
        value: 'Item 17',
      },
      {
        id: 18,
        value: 'Item 18',
      },
      {
        id: 19,
        value: 'Item 19',
      },
      {
        id: 20,
        value: 'Item 20',
      },
      {
        id: 21,
        value: 'Item 21',
      },
      {
        id: 22,
        value: 'Item 22',
      }
    ])

</script>

<style lang="scss">
  .kanban-list-item {
    width: 100%;
    margin: 5px;
    .kanban-list-item-inner {
      min-height: 100px;
      padding: 10px 15px;
      border-radius: 5px;
      background: white;
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.1);
      cursor: grab;
      transition: background 0.2s, transform 0.2s;
    }
    &.kanban-helper .kanban-list-item-inner {
      background: #9b51e0;
      color: white;
    }
  }
</style>