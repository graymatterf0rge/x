<template>
  <swiper
    :effect="'coverflow'" 
    :grabCursor="true" 
    :centeredSlides="true" 
    :slidesPerView="'auto'" 
    :coverflowEffect='{
      "rotate": 50,
      "stretch": 0,
      "depth": 100,
      "modifier": 1,
      "slideShadows": true
    }' 
    :pagination="false">
      <swiper-slide v-for="(pet,index) in list" :key="index">
        <pet-card :uid="pet.id" :name="pet.name" :age="pet.age" :photoURL="pet.photoURL" />
      </swiper-slide>
  </swiper>
</template>
<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import SwiperCore, { EffectCoverflow,Pagination } from 'swiper'
  import PetCard from 'components/PetCard.vue'
  // install Swiper modules
  SwiperCore.use([EffectCoverflow,Pagination])
  const props = defineProps(['list'])
</script>