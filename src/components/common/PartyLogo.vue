<style lang="scss" scoped>
.party-logo--shorten {
  width: 24px;
  height: 24px;
  line-height: 24px;
}
</style>
<template>
  <span
    v-if="size === 'shorten' || logoSrc.includes('undefined')"
    :class="`bg-${partyMap.codeMap[party]}`"
    class="party-logo--shorten rounded-circle fs-7 d-inline-block text-center"
  >
    {{ shortenPartyName[party] }}
  </span>
  <img
    v-else
    :src="logoSrc"
    class="rounded-circle d-none d-lg-block"
    alt="party-logo"
    width="100"
    height="100"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import partyMap from '@/data/party.json'
import type { CandidateVotes } from '@/types'

const props = withDefaults(
  defineProps<{
    party: keyof typeof partyMap.codeMap
    size?: 'default' | 'shorten'
  }>(),
  {
    size: 'default',
  },
)

const logoSrc = computed(() => {
  return new URL(
    `../../assets/party-logo/${partyMap.codeMap[props.party]}.png`,
    import.meta.url,
  ).href
})

const shortenPartyName: Record<keyof CandidateVotes, string> = {
  金色曠野同盟: '野',
  蔚藍海岸陣線: '海',
  鬱蔥雨林聯盟: '林',
}
</script>
