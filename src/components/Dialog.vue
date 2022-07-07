<template>
  <q-page>  
    <div class="q-pa-md q-gutter-sm full-width">
      <q-dialog v-model="showDialog" transition-show="scale" transition-hide="scale">
    <q-card>
      <q-card-section>
        <q-btn
          icon="arrow_back"
          @click="emit('close')"
          label="Back"
          flat
          dense
        />
        <span>title</span>
      </q-card-section>
      <q-card-section>
        <q-btn
          color="primary"
          @click="emit('save')"
          label="Save"
          flat
          dense
        />
        <q-btn
          color="red"
          @click="emit('delete')"
          label="Delete"
          flat
          dense
        />
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="name"
          label="Name"
          placeholder="Name"
          :error="nameError"
        />
        <q-input
          v-model="description"
          label="Description"
          placeholder="Description"
          :error="descriptionError"
        />
      </q-card-section>
    </q-card>
    </q-dialog>
</div>
  </q-page>
  
</template>

<script setup>
  let name = $ref(null),
    description = $ref(null),
    nameError = $ref(null),
    descriptionError = $ref(null)
  const emit = defineEmits(['close', 'save', 'delete'])
</script>
