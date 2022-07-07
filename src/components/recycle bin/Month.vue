<template>
  <q-page class="subcontent">
      <h3>{{ currentMonth }}</h3>
      <div class="row justify-center">
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
    <q-page-sticky v-if="rangeSelected" position="bottom-right" :offset="[18, 18]">
      <q-fab
        icon="add"
        direction="up"
        color="accent"
      />
    </q-page-sticky>
     
  </q-page>
</template>
<script setup>
  
  import { today, getDayIdentifier, parseTimestamp } from 'boot/qcalendar'
  import { countSelectedRange, monthToString } from 'src/lib/date'

  let selectedDate = $ref(null),
    currentMonth = monthToString(parseTimestamp(today()).month),
    calendar = $ref(null),
    anchorTimestamp = $ref(null),
    otherTimestamp = $ref(null),
    mouseDown = $ref(false),
    rangeSelected = $ref(false)

  function leftClick (e) {
    return e.button === 0
  }
  function clearSelection() {
    mouseDown = false
    anchorTimestamp = null
    otherTimestamp = null
    rangeSelected = false
   /*  
    
    let $first = document.querySelector(".q-range-first"),
      $middle = document.getElementsByClassName("q-range"),
      $last = document.querySelector(".q-range-last")
    $first && $first.classList.remove("q-range-first")
    while ($middle.length > 0) { $middle[0].classList.remove('q-range') }
    $last && $last.classList.remove("q-range-last") */      
  }

 

  let startEndDates = $computed(() => {
    const dates = []
    if (anchorDayIdentifier !== false && otherDayIdentifier !== false) {
      if (anchorDayIdentifier <= otherDayIdentifier) {
        dates.push(anchorTimestamp.date, otherTimestamp.date)
      } else {
        dates.push(otherTimestamp.date, anchorTimestamp.date)
      }
    }
    return dates
  })

  let anchorDayIdentifier = $computed(() => {
    if (anchorTimestamp !== null) {
      return getDayIdentifier(anchorTimestamp)
    }
    return false
  })

  let otherDayIdentifier = $computed(() => {
    if (otherTimestamp !== null) {
      return getDayIdentifier(otherTimestamp)
    }
    return false
  })

  function onMouseDownDay ({ scope, event }) {
    if (leftClick(event)) {
      if (anchorTimestamp !== null && otherTimestamp !== null && anchorTimestamp.date === otherTimestamp.date) {
        otherTimestamp = scope.timestamp
        let range = countSelectedRange(...startEndDates)
        if(range<=7){        
          mouseDown = false
          rangeSelected = true
          return
        }
        
      }
      // mouse is down, start selection and capture current
      mouseDown = true
      anchorTimestamp = scope.timestamp
      otherTimestamp = scope.timestamp
      rangeSelected = false
    }
  }

  function onMouseUpDay ({ scope, event }) {
    if (leftClick(event)) {
      // mouse is up, capture last and cancel selection
      otherTimestamp = scope.timestamp
      mouseDown = false
    }
  }

  function onMouseMoveDay ({ scope, event }) {
    if (mouseDown === true && scope.outside !== true) {
      otherTimestamp = scope.timestamp
    }
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