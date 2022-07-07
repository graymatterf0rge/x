<template>
  <q-list>
    <q-slide-item v-for="(item,index) in list" :key="index" @left="(details)=>left(details)" @right="(details)=>right(details)">
      <template v-slot:left>
        <slot name="left-side">
          <div class="row items-center">
            <q-icon left name="done" /> Left
          </div>
        </slot>
      </template>
      <template v-slot:right>
        <slot name="right-side">
          <div class="row items-center">
            Right content.. long <q-icon right name="alarm" />
          </div>
        </slot>
      </template>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-img :src="item.photoURL" :draggable="false" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          {{ item.name }}
          <q-popup-edit v-model="item.name" auto-save v-slot="scope">
            <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
          </q-popup-edit>
        </q-item-section>
      </q-item>
    </q-slide-item>
  </q-list>
</template>

<script setup>
  const props = defineProps(['list', 'left', 'right'])
</script>

<style scoped>

</style>
