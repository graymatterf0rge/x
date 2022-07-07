<template>
  <div class="subcontent">
    <calendar-bar @today="onToday" @prev="onPrev" @next="onNext" :month="month" :year="year" :mode="mode" />
    <div class="row justify-center full-width">
      <div style="display: flex; max-width: 800px; width: 100%;">
        <q-calendar-month
          ref="calendar"
          v-model="selectedDate"  
          :selected-start-end-dates="startEndDates"
          day-min-height="40"
          animated
          bordered
          focusable
          :focus-type="focusType"
          @mousedown-day="onMouseDownDay"
          @mouseup-day="onMouseUpDay"
          @mousemove-day="onMouseMoveDay"
          @change="onChange"
          @click-date="onClickDate"
          @click-day="onClickDate"
          @click-head-day="onClickDate" 
        />
      </div>
    </div>
  </div>
</template>
<script setup>
  import { useRouter } from 'vue-router'
  import CalendarBar from 'components/Admin/Scheduler/CalendarBar.vue'
  function leftClick (e) {
    return e.button === 0
  }
  const emit = defineEmits([
    'dateSelected'
  ])
  const router = useRouter()
  let calendar = $ref(null)
  const focusType = ['date']
  let mode = $ref('month')
  let month = $ref('')
  let year = $ref('')
  let selectedDate = $ref(today())
  let startEndDates = $computed(() => {
    const dates = []
    if (anchorDayIdentifier !== false && otherDayIdentifier !== false) {
      if (anchorDayIdentifier <= otherDayIdentifier) {
        dates.push(anchorTimestamp.date, otherTimestamp.date)
      }
      else {
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
  const onMouseDownDay = ({ scope, event }) => {
    if (leftClick(event)) {
      if (mobile === true
        && anchorTimestamp !== null
        && otherTimestamp !== null
        && anchorTimestamp.date === otherTimestamp.date) {
        otherTimestamp = scope.timestamp
        mouseDown = false
        return
      }
      // mouse is down, start selection and capture current
      mouseDown = true
      anchorTimestamp = scope.timestamp
      otherTimestamp = scope.timestamp
    }
  }
  const onMouseUpDay = ({ scope, event }) => {
    if (leftClick(event)) {
      // mouse is up, capture last and cancel selection
      otherTimestamp = scope.timestamp
      mouseDown = false
    }
  }
  const onMouseMoveDay = (scope, event) => {
    if (mouseDown === true && scope.outside !== true) {
      otherTimestamp = scope.timestamp
    }
  }
  const onToday = () => calendar.moveToToday() 
  const onPrev = () => calendar.prev()
  const onNext = () => calendar.next()
  const onChange = (data) => {
    console.log('onClickDate', data)
    const { days } = data
    const monthNames = ["null","January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]
    month = monthNames[days[7].month]
    year = days[7].year
  }
  const onClickDate = (data) => {
    console.log('onClickDate', data)
  }



</script>