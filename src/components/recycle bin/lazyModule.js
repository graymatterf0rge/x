import { onUnmounted } from 'vue'

function lazyModule(store, moduleName, module) {
  if(store) {
    if (!store.hasModule(moduleName)) {
      store.registerModule(moduleName, module)
      console.log(`module ${moduleName} registered successfully`)
    } else {
      console.log(`module ${moduleName} has been registered before`)
    }

    onUnmounted(() => {
      if (store.hasModule(moduleName)) {
        store.unregisterModule(moduleName)
      }
    })
  } else {
    console.log(`store does not exist`)
  }
}

export { lazyModule }