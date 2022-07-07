<template>
    <div>  
      <q-card class="my-card">
        <q-img :src="photoURL" :draggable="false" max-height="300px" />  
        <q-card-section>
          <camera-button :uid="uid"/>
        </q-card-section>
        <q-card-actions>
          <q-btn flat>Action 1</q-btn>
          <q-btn flat>Action 2</q-btn>
        </q-card-actions>
      </q-card>
    </div>
</template>
<script setup>
  import CameraButton from 'components/CameraButton.vue'
    const props = defineProps({
        "uid": String,
        "name": String,
        "age": String,
        "photoURL": String,
    })
</script>