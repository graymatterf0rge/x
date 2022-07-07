<template>
    <router-link :to="to">
        <q-btn flat round dense style="color:white" :icon="icon" />
    </router-link>
</template>
<script setup>
    const props = defineProps({
        to: String,
        icon:  String
    })
</script>
<style scoped>
a {
    text-decoration: none;
}
</style>
<test lang="jest">
  /* your complete test file here */
  //$ quasar test --unit jest --dev
  /*console.log("print")
  it('should fail', () => {
    expect(true).toBe(false)
  })
  it('should pass', () => {
    expect(true).toBe(true)
  })*/
</test>