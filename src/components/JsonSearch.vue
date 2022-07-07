<template>
  <div>
    <JsonSearch :show-tags="true" v-slot="{ results }">
      <SearchInput />
      <SearchResults>
        <ResultTitle />
        <div v-for="res in results" :key="res.refIndex">
          <ResultListItem v-slot="{ result }" :result="res.item">
            <p>Title: {{ result.title }}</p>
            <p>Tags: {{ result.tags }}</p>
          </ResultListItem>
        </div>
      </SearchResults>
    </JsonSearch>
  </div>
</template>

<script setup>
import { JsonSearch, ResultList, ResultListItem, ResultTitle, SearchInput, SearchResults } from 'vue-json-search'

</script>
