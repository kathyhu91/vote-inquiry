export interface CandidateVotes {
  金色曠野同盟: number
  蔚藍海岸陣線: number
  鬱蔥雨林聯盟: number
}

export interface VoteData {
  無效票數: number
  投票數: number
  選舉人數: number
  有效票數: number
  投票率: number
  候選人票數: CandidateVotes
  用餘票數: number
  發出票數: number
  村里別?: string
  行政區別: string
  選舉年度?: number
  已領未投票數: number
}

export interface VoteMapData {
  city: string
  party: keyof CandidateVotes
  count: number
}

export interface CandidateInfo {
  election_year: string
  candidate_id: string
  role: number
  name: string
  party: keyof CandidateVotes
  party_logo_url: string
  education: string
  experience: string
  avatar_url: string
  is_elected: boolean
}
