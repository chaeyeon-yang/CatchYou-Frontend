import { $axios } from "../lib/axios";
import { TApiResponse } from "../types/commonTypes";
import { TMontageDetail, TMontageListAll, TMontagePublic } from "../types/montage/montagePublic";

const MONTAGE_QUERY_KEYS = {
  MONTAGE_PUBLIC: (region: string = "서울") => `/criminal/open?region=${region || "서울"}`,
  MONTAGE_DETAIL: (caseId: number) => `/criminal/open/${caseId}`,
  MONTAGE_CREATE: (interviewId: number) => `/montage/create/${interviewId}`,
  MONTAGE_ALL: (interviewId: number) => `/interview/montages/${interviewId}`,
  MONTAGE_FINAL: (interviewId: number) => `/interview/montages/${interviewId}`,
} as const;

// 지역별 공개 몽타주 조회
export const getMontagePublic = async (region: string) => {
  const res = await $axios.get<TApiResponse<TMontagePublic>>(MONTAGE_QUERY_KEYS.MONTAGE_PUBLIC(region))
  return res.data;
}

// 공개 몽타주 상세 조회 
export const getMontageDetail = async (caseId: number) => {
  const res = await $axios.get<TMontageDetail>(MONTAGE_QUERY_KEYS.MONTAGE_DETAIL(caseId))
  return res;
}

// 몽타주 생성
export const postMontageCreate = async (interviewId:number, auth:string, prompt: string) => {
  const promptJson = {"prompt": prompt}
  const res = await $axios.post(MONTAGE_QUERY_KEYS.MONTAGE_CREATE(interviewId), promptJson, {
    headers: {
      Authorization: `Bearer ${auth}`,
    }
  });
  return res.data;
}

// 현재까지 생성된 몽타주 조회
export const getMontageAll = async (interviewId: number, auth: string) => {
  const res = await $axios.get<TMontageListAll>(MONTAGE_QUERY_KEYS.MONTAGE_ALL(interviewId), {
    headers: {
      Authorization: `Bearer ${auth}`,
    }
  })
  return res.data;
}

// 최종 결정한 몽타주 
export const postFinalMontage = async (interviewId: number, montageId: number, auth: string) => {
  const montageJson = {"id": montageId}
  const res = await $axios.post(MONTAGE_QUERY_KEYS.MONTAGE_FINAL(interviewId), montageJson, {
    headers: {
      Authorization: `Bearer ${auth}`,
    }
  })
  return res.data;
}