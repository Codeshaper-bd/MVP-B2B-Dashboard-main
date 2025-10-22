import { useGetFennecLiveB2BQuery } from "@/store/api/fennec-live/fennec-live-api";

export const useFetchFennecLiveData = () => {
  const { data: getFennecLiveB2BRes, ...getFennecLiveB2BApiState } =
    useGetFennecLiveB2BQuery();
  const getFennecLiveB2BData = getFennecLiveB2BRes?.data;
  return { getFennecLiveB2BData, getFennecLiveB2BApiState };
};
