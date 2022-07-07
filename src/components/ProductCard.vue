<template>
  <q-card class="">
    <q-img :src="product.img" height="220px">
      <q-chip v-if="product.chip" :class="product.chip_class" :color="product.chip_color" :label="product.chip"></q-chip>
    </q-img>

    <q-card-section>
      <q-btn
        fab
        color="teal-7"
        icon="add_shopping_cart" padding="sm"
        class="absolute"
        style="top: 0; right: 12px; transform: translateY(-50%);"
      />
    </q-card-section>

    <q-card-section>
      <div class="text-h6">
        {{ product.name }}
      </div>
      <div class="text-subtitle1 text-justify q-mt-sm">
        {{ product.caption }}
      </div>
      <div>
        <q-rating
          v-model="product.rating"
          max="5"
          size="1.5em"
          color="yellow"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half" readonly
          no-dimming
        />
      </div>
    </q-card-section>
    <q-card-section>
      <div class="col-12">
        <span class="text-h6">{{ product.amount }}</span>
        <span class="text-h6 float-right">
          <q-btn label="See Details" rounded color="secondary" outline></q-btn>
        </span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  const props = defineProps(['product'])
</script>

<style scoped>

</style>
