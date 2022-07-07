<template>
    <draggable
      tag="div" 
      class="q-list full-width"
      v-model="list"
      item-key="id"
      group="simple"
      ghost-class="ghost"
      @start="dragging = true"
      @end="dragging = false">
      <template #item="{ element }">
        <q-item clickable v-ripple to="/store">
          <q-item-section avatar>
            <q-avatar>
              <img :src="element.photoURL" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ element.name }}</q-item-label>
            <q-item-label caption>2 new messages</q-item-label>
          </q-item-section>
          <q-item-section side>
            3 min ago
          </q-item-section>
        </q-item>
      </template>
    </draggable>
</template>

<script setup>
  import draggable from "vuedraggable"
  const props = defineProps(['list'])
  let dragging = false 
</script>
<style>
  .ghost {
    opacity: 0.75;
    background: #c8ebfb;
  }
</style>