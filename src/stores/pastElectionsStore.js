import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { ref as storageRef } from 'firebase/storage'
import { useFetch } from '@vueuse/core'

export const usePastElectionStore = defineStore('pastElectionStore', () => {
  const year = ref('2020')
  const city = ref('嘉義市')
  const district = ref('東區')

  const storage = useFirebaseStorage()
  const votesFileRef = computed(() => {
    return storageRef(
      storage,
      `votes/${year.value}/${city.value}-${district.value}.json`,
    )
  })

  const { url } = computed(() => {
    return useStorageFile(votesFileRef.value)
  })

  const { data: votes } = useFetch(url, { refetch: true })

  return {
    year,
    city,
    district,
    votes,
  }
})
