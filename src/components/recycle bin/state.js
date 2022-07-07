import { computed } from 'vue'
import { useStore } from 'vuex'
import _ from 'lodash'

const useState = (module) => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store.state[module]).map(
      key => [key, computed(() => store.state[module][key])]
    )
  )
}

const useGetters = (module) => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store.getters).map(
      getter => {
        if(!_.isUndefined(module) && _.startsWith(getter, module)) {  
          let _getter = getter.substr(module.length+1)  
          return [_getter, computed(() => store.getters[module+'/'+_getter])]
        } else {
          return [getter, computed(() => store.getters[getter])]  
        }
      }
    )
  )
}

const useMutations = (module) => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store._mutations[module]).map(
      mutation => {
        if(!_.isUndefined(module) && _.startsWith(mutation, module)) {  
            let _mutation = mutation.substr(module.length+1)  
            return [_mutation, value => store.commit(module+'/'+_mutation, value)]
        } else {
            return [mutation, value => store.commit(mutation, value)] 
        }
      }
    )
  )
}

const useActions = (module) => {
  const store = useStore()
  return Object.fromEntries(
    Object.keys(store._actions).map(
      action => {
        if(!_.isUndefined(module) && _.startsWith(action, module)) {  
            let _action = action.substr(module.length+1)  
            return [_action, value => store.dispatch(module+'/'+_action, value)]
        } else {
            return [action, value => store.dispatch(action, value)] 
        }
      }
      
    )
  )
}

export { useState, useGetters, useMutations, useActions }
