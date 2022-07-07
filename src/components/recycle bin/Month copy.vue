<template>
  <q-page> 
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
    <div> 
      <q-btn
        @click="clearSelection"
        label="Clear"
        flat
        color="primary"
        dense />
      {{ weekDayList }}
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        icon="add"
        direction="up"
        color="accent"
      >
        <q-fab-action color="primary" icon="person_add" />
        <q-fab-action color="primary" icon="mail" />
      </q-fab>
    </q-page-sticky>
     
  </q-page>
</template>

<script setup>
import { onClickOutside } from '@vueuse/core'
import { countSelectedDays, leftClick, getWeekDayRange } from 'src/lib/date'
import { today, getDayIdentifier } from 'boot/qcalendar'

  const emit = defineEmits(['rangeSelected'])
    let selectedDate = $ref(today()),
      calendar = $ref(null),
      target = $ref(null),
      rangeCount = $ref(null),
      weekDayList = $ref(null),
      aTs = $ref(null),
      oTs = $ref(null),
      aDi = $computed(() => { return (aTs !== null) ? getDayIdentifier(aTs) : false }),
      oDi = $computed(() => { return (oTs !== null) ? getDayIdentifier(oTs) : false }),
      mouseDown = $ref(false),
      startEndDates = $computed(() => {
        let dates = []
        if (aDi !== false && oDi !== false) 
          dates.push(...(aDi <= oDi) ? [aTs.date, oTs.date] : [oTs.date, aTs.date])
        return dates
      })
    onClickOutside(target, () => { 
      console.log('clicked outside')
      clearSelection()
    })

    function clearSelection() {
      mouseDown = false
      weekDayList = []
      let $first = document.querySelector(".q-range-first"),
        $middle = document.getElementsByClassName("q-range"),
        $last = document.querySelector(".q-range-last")
      $first && $first.classList.remove("q-range-first")
      while ($middle.length > 0) { $middle[0].classList.remove('q-range') }
      $last && $last.classList.remove("q-range-last")      
    }
    
    function onMouseDownDay ({ scope, event }) { // if the user has clicked a date
      if (leftClick(event)) { // and this is only the first selection
        if ( aTs !== null && oTs !== null && aTs.date === oTs.date ){ 
          weekDayList = []      
          oTs = scope.timestamp // set the second date in the range 
          rangeCount = countSelectedDays(...startEndDates)
          if(rangeCount > 7 || rangeCount < -5) {
            oTs = aTs = null
          } else {
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
      }
    }

    function onMouseMoveDay ({ scope, event }) {
      if (mouseDown && scope.outside !== true) {
        oTs = scope.timestamp
      }
    }    

    const onToday = () => {
      calendar.moveToToday()
    }
    const onPrev = () => {
      calendar.prev()
    }
    const onNext = () => {
      calendar.next()
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