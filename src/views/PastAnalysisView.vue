<template>
  <div class="d-flex justify-content-center mb-8">
    <TermMenu
      :election-years="allYears"
      :is-link-nav="true"
      v-model:selected-year="curYear"
    ></TermMenu>
  </div>
  <h2 class="h2 mb-8 text-end">{{ curYear }}年總統大選</h2>
  <div class="mb-8">
    <h4 class="h4 mb-2"><i class="bi bi-compass me-2"></i>查看地區詳情</h4>
    <SearchBar
      :year="curYear"
      v-model:city="curCity"
      v-model:district="curDistrict"
    />
  </div>
  <div class="mb-8">
    <ElectionSummary
      :origin-votes="curVotes"
      :cur-status="curStatus"
      :data-field="dataField"
    ></ElectionSummary>
  </div>
  <div class="mb-8">
    <CandidateSummary
      :origin-votes="curVotes"
      :cur-candidates="curCandidates"
      :cur-status="curStatus"
      :data-field="dataField"
      :affiliated-area="affiliatedArea"
    ></CandidateSummary>
  </div>
  <div class="d-md-block mb-md-8" v-if="isDesktop">
    <VoteStatus
      :origin-votes="curVotes"
      :cur-candidates="curCandidates"
      :cur-status="curStatus"
      :data-field="dataField"
    ></VoteStatus>
  </div>
  <div class="mb-8">
    <BallotAnalysis
      :origin-votes="curVotes"
      :origin-all-votes="allVotes"
      :cur-candidates="curCandidates"
      :cur-year="curYear"
      :cur-city="curCity"
      :cur-district="curDistrict"
      :cur-status="curStatus"
      :affiliated-area="affiliatedArea"
      :data-field="dataField"
    ></BallotAnalysis>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { usePastVotesStore } from '@/stores/pastVotesStore.js'

import { allYears } from '@/utils/electionInfo.js'

import TermMenu from '@/components/common/TermMenu.vue'
import SearchBar from '@/components/common/SearchBar.vue'
import ElectionSummary from '@/components/PastAnal/ElectionSummary.vue'
import CandidateSummary from '@/components/PastAnal/CandidateSummary.vue'
import VoteStatus from '@/components/PastAnal/VoteStatus.vue'
import BallotAnalysis from '@/components/PastAnal/BallotAnalysis.vue'
import { useMediaQuery } from '@vueuse/core'
const isDesktop = useMediaQuery('(min-width: 767px)')

const route = useRoute()

const pastVotesStore = usePastVotesStore()
const {
  curYear,
  curCity,
  curDistrict,
  curCandidates,
  curStatus,
  dataField,
  affiliatedArea,
} = storeToRefs(pastVotesStore)

const allVotes = ref({})
const curVotes = computed(() => {
  return allVotes.value[`vote${curYear.value}`] || []
})

onMounted(() => {
  // set up reactive votes data
  allYears.forEach((yearIndex) => {
    const { votes } = pastVotesStore.getVotesData(
      yearIndex,
      curYear,
      curCity,
      curDistrict,
    )
    allVotes.value[`vote${yearIndex}`] = votes
  })
})

watch(
  () => route.params.year,
  (year) => {
    curYear.value = year
  },
  { immediate: true },
)
</script>
