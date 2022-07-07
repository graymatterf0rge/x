<template>
    <div class="subcontent">
      <div class="row justify-center">
        <div class="day-view-container">
          <div class="col-2">
            <q-btn label="<"> </q-btn>
          </div>
          <div class="col-8">
            <q-calendar-day
              ref="calendar"
              v-model="selectedDate"
              view="week"
              :interval-count="0"
              cell-width="100px"
              animated
              bordered
              focusable
              :focus-type="focusType"
              transition-next="slide-left"
              transition-prev="slide-right"
              @click-time="onClickTime"
              @mousedown-time="onMouseDownTime"
              @mouseup-time="onMouseUpTime"
              @mousemove-time="onMouseMoveTime"
            />
          </div>
          <div class="col-2">
            <q-btn label=">"> </q-btn>
          </div>
        </div>
        <div> 
          {{ duration }}
        </div>
      </div>
    </div>
  </template>
  <script setup>// using the script setup rfc syntax
    import { formatDateString, leftClick } from 'src/lib/date'
    import { useState } from 'src/lib/state'
    import { today, getDateTime, getDayTimeIdentifier } from 'boot/qcalendar'
    
    const { intervalCount, intervalMinutes, intervalStart } = useState('schedule')
    const emit = defineEmits(['timeSelected'])
    const focusType = ['day']
    let selectedDate = $ref(today()),
      calendar = $ref(null),
      aTs = $ref(null),
      oTs = $ref(null),
      mouseDown = $ref(false),
      duration = $ref(0)
    
    // methods
    let startEndDates = $computed(() => {
      const dates = []
      if (aDTi !== false && oDTi !== false) {
        if (aDTi <= oDTi) dates.push(getDateTime(aTs), getDateTime(oTs)); else dates.push(getDateTime(oTs), getDateTime(aTs))
      }
      return dates
    })

    let aDTi = $computed(() => { return (aTs !== null) ? getDayTimeIdentifier(aTs) : false })
    let oDTi = $computed(() => { return (oTs !== null) ? getDayTimeIdentifier(oTs) : false })
    
    function onMouseDownTime ({ scope, event }) {
      console.log('onMouseDownTime', { scope, event })
      if (leftClick(event)) {
        if (aTs !== null && oTs !== null && getDateTime(aTs) === getDateTime(oTs)) {
          oTs = scope.timestamp
          let rangeCount = rangeDuration(...startEndDates)
          duration = (rangeCount + intervalMinutes.value) + " mins"
          mouseDown = false
          return
        }
        // mouse is down, start selection and capture current
        mouseDown = true
        duration = ''
        aTs = scope.timestamp
        oTs = scope.timestamp
      }
    }
    function onMouseUpTime ({ scope, event }) {
      if (leftClick(event)) {
        oTs = scope.timestamp
        mouseDown = false
      }
    }
    function onMouseMoveTime ({ scope, event }) {
      if (mouseDown === true) oTs = scope.timestamp
    }

    // respond to events from <calendar-bar>
    const onNext = () => calendar.next()
    const onPrev = () => calendar.prev()
    const onToday = () => calendar.moveToToday()
  
    let formattedDate = $computed(()=>formatDateString(selectedDate+'T04:00:00Z'))
  </script>
  <style lang="sass">
  .day-view-container
    display: flex 
    max-width: 800px 
    width: 100% 
    height: 400px
  
  .day-view-current-time-indicator
    position: absolute
    left: -5px
    height: 10px
    width: 10px
    margin-top: -4px
    background-color: rgba(0, 0, 255, .5)
    border-radius: 50%
  
  .day-view-current-time-line
    position: absolute
    left: 5px
    border-top: rgba(0, 0, 255, .5) 2px solid
    width: calc(100% - 5px)
  
  .q-dark,
  .body--dark,
  .q-calendar--dark
    .day-view-current-time-indicator
      background-color: rgba(255, 255, 0, .85)
  
    .day-view-current-time-line
      border-top: rgba(255, 255, 0, .85) 2px solid
  
  </style>