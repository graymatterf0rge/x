<script setup>
  //const props = defineProps(['list'])
  var foo = new Array(45)
</script>
<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list dense bordered padding class="rounded-borders">
      
      <div v-for="(item,index) in foo" :key="index" class="q-pa-md">
        <slot name="item" :item="item">
          <q-item>
            Text
          </q-item>
        </slot>
      </div>
    </q-list>
  </div>
</template>
