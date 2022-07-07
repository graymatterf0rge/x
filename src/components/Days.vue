<template>
    <div class="subcontent">
      <calendar-bar mode="day" :title="formattedDate"/>
      <div class="row justify-center">
        <div class="day-view-container">
          <q-calendar-day
            ref="calendar"
            v-model="selectedDate"
            :selected-dates="selectedDates"
            view="week"
            :weekdays="props.weekDays"
            :interval-start="intervalStart"
            :interval-minutes="intervalMinutes"
            :interval-count="intervalCount"
            animated
            bordered
            focusable
            time-clicks-clamped
            :focus-type="focusType"
            transition-next="slide-left"
            transition-prev="slide-right"
            @click-time="onClickTime"
          />
        </div>
        <div> 
          {{ selectedDates }}
        </div>
      </div>
    </div>
  </template>
  <script setup>// using the script setup rfc syntax
    import { formatDateString } from 'src/helpers/date'
    import { useState } from 'src/helpers/state'
    import { today, copyTimestamp, getDateTime } from 'boot/qcalendar'
    import CalendarBar from 'src/components/CalendarBar.vue'
    
    const { intervalCount, intervalMinutes, intervalStart } = useState('schedule')
    const emit = defineEmits(['timeSelected'])
    const props = defineProps(['weekDays'])
    let selectedDate = $ref(today()),
      selectedDates = $ref([]),
      calendar = $ref(null)    
   
    // respond to events from <calendar-bar>
    const onNext = () => calendar.next()
    const onPrev = () => calendar.prev()
    const onToday = () => calendar.moveToToday()
    
   

    const onClickTime = ({ scope }) => {
      console.log("onClickTime",scope.timestamp.time, selectedDates)
      emit('timeSelected')
      if (scope === undefined) return
      const ts = copyTimestamp(scope.timestamp)
      const t = getDateTime(ts)
      if (selectedDates.includes(t)) {
        for (let i = 0; i < selectedDates.length; ++i) {
          if (t === selectedDates[ i ]) {
            selectedDates.splice(i, 1)
            break
          }
        }
      } else {
        if (scope.outside !== true) selectedDates.push(t)       
      }
    }
    
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