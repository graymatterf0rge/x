<template>
  <div class="subcontent">
    <div style="display: flex; justify-content: center; align-items: center;">
      <!-- <q-checkbox v-model="mobile"
        label="Check here to enable range selection selection (first click, second click, up to 5 at a t)"
      /> -->
    </div>

    <div class="row justify-center">
      <div ref="qCalContainer" style="display: flex; max-width: 800px; width: 100%;">
        <q-calendar-month
          ref="calendar"
          v-model="selectedDate"
          :selected-start-end-dates="startEndDates"
          no-active-date
          :day-min-height="100"
          animated
          bordered
          short-weekday-label
          @mousedown-day="onMouseDownDay"
          @mouseup-day="onMouseUpDay"
          @mousemove-day="onMouseMoveDay"
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-workweek="onClickWorkweek"
          @click-head-workweek="onClickHeadWorkweek"
          @click-head-day="onClickHeadDay"
        />
      </div>
      <div>
        {{ startEndDates[0] + " " + startEndDates[1] }}
        <hr />
        {{ weekDayList }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, watchEffect } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { countSelectedDays, leftClick, getWeekDayRange } from 'src/lib/date'
import { today, getDayIdentifier } from 'boot/qcalendar'

  const emit = defineEmits(['rangeSelected'])
    let selectedDate = $ref(today()),
      startEndDates = $ref([]),
      calendar = $ref(null),
      qCalContainer = $ref(null),
      rangeCount = $ref(null),
      weekDayList = $ref(null),
      aTs = $ref(null),
      oTs = $ref(null),
      aDi = $computed(() => { return (aTs !== null) ? getDayIdentifier(aTs) : false }),
      oDi = $computed(() => { return (oTs !== null) ? getDayIdentifier(oTs) : false }),
      mouseDown = $ref(false)

      watchEffect(() => {
        aDi = (aTs !== null) ? getDayIdentifier(aTs) : false
        oDi = (oTs !== null) ? getDayIdentifier(oTs) : false
        if (aDi !== false && oDi !== false) 
          startEndDates = (aDi <= oDi) ? [aTs.date, oTs.date] : [oTs.date, aTs.date]
        console.log('watchEffect', startEndDates)
      })

      watch(startEndDates,(newSelection, oldSelection) => {
        console.log('new:',newSelection,"prev:",oldSelection)    
      })

      watch(weekDayList,(newList, oldList) => {
        console.log('WeekDayList: new:',newList,"prev:",oldList)    
      })
      /* startEndDates = $computed(() => {
        let _dates, 
          dates = []
        if (aDi !== false && oDi !== false) {
          _dates = (aDi <= oDi) ? [aTs.date, oTs.date] : [oTs.date, aTs.date]
          dates.push(..._dates)
        }
        return dates
      }) */
    function clearSelection() {
      aTs = null
      oTs = null
      mouseDown = false
    }
    function onMouseDownDay ({ scope, event }) {
      if (leftClick(event)) { // if the user has clicked a date
        // and this is only the first selection
        if ( aTs !== null && oTs !== null && aTs.date === oTs.date ){       
          oTs = scope.timestamp // set the second date in the range 
          rangeCount = countSelectedDays(...startEndDates)
          if(rangeCount > 7 || rangeCount < -5) {
            oTs = aTs
          } else {
            weekDayList = getWeekDayRange(...startEndDates)
            mouseDown = false
            return
          }
        }
        /* if this is the first click, flip the mouseDown switch on
        and set both dates equal to the clicked date */
        mouseDown = true
        aTs = scope.timestamp
        oTs = scope.timestamp
      }
    }

    function onMouseUpDay ({ scope, event }) {
      if (leftClick(event)) {// mouse is up, capture last and cancel selection
        oTs = scope.timestamp
        mouseDown = false
        console.log("oTs:",oTs.weekday)
      }
    }

    function onMouseMoveDay ({ scope, event }) {
      if (mouseDown === true && scope.outside !== true) {
        oTs = scope.timestamp
      }
    }

    function onClear () {
      clearSelection()
    }
    

    function onToday () {
      calendar.moveToToday()
    }
    function onPrev () {
      calendar.prev()
    }
    function onNext () {
      calendar.next()
    }
    onClickOutside(qCalContainer, () => { 
      clearSelection()
    })
    function onMoved (data) {
      console.log('onMoved', data)
    }
    function onChange (data) {
      console.log('onChange', data)
    }
    function onClickDate (data) {
      console.log('onClickDate', data)
    }
    // function onClickDay (data) {
    //   console.log('onClickDay', data)
    // }
    function onClickWorkweek (data) {
      console.log('onClickWorkweek', data)
    }
    function onClickHeadDay (data) {
      console.log('onClickHeadDay', data)
    }
    function onClickHeadWorkweek (data) {
      console.log('onClickHeadWorkweek', data)
    }

   
</script>
<style>
  .q-calendar-month__day.q-range-first, 
  .q-calendar-month__day.q-range, 
  .q-calendar-month__day.q-range-last {
    background-color: #e4e0ad;
  }
  .q-calendar-month__head--weekday {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 32px;
  }
</style>