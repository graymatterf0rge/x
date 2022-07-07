<template>
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
</template>
<script setup>
  const props = defineProps({
    "pet": Object
  })
  let model = $ref(props.pet.name)
</script>