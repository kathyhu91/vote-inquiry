<style lang="scss">
@import '@/styles/main.scss';
.winnerCard {
  width: 100%;
  min-width: 18.75rem;
  @include media-breakpoint-up(md) {
    min-width: 28.25rem;
  }
  padding: 0 1.5rem;
  &__year {
    text-align: center;
    @include media-breakpoint-up(md) {
      text-align: start;
    }
  }
}
</style>

<template>
  <div class="winnerCard">
    <p class="display-2 fw-bold text-info mb-3 winnerCard__year">
      {{ winner.voteYear }}
    </p>
    <div class="row p-6 mb-4">
      <div class="col-12 col-md-6 mb-4 mb-md-0">
        <div class="d-flex flex-column align-items-center">
          <img
            :src="getImageUrl(winner.main.avatar_url)"
            alt="avatar"
            class="avatar--md"
          />
          <p>總統－{{ winner.main.name }}</p>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="d-flex flex-column align-items-center">
          <img
            :src="getImageUrl(winner.vice.avatar_url)"
            alt="avatar"
            class="avatar--md"
          />
          <p>副總統－{{ winner.vice.name }}</p>
        </div>
      </div>
    </div>
    <div class="d-flex flex-column align-items-center">
      <p class="h3 fw-bold text-info mb-4">
        {{ commaNumber(winner.voteNum) }} 票
      </p>
      <RouterLink
        :to="`past-elections/${winner.voteYear}`"
        class="link-primary py-6"
        >查看本屆詳情</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { toRefs, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { commaNumber } from '@/utils/base.js'
import { getImageUrl } from '@/utils/candidateFilter.js'

const props = defineProps({
  winnerInfo: Object,
})
const { winnerInfo } = toRefs(props)
const winner = computed(() => {
  if (!winnerInfo.value) return []
  return winnerInfo.value
})
</script>
