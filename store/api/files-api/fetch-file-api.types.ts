import type { TNullish } from "../common-api-types";
import type { useLazyFetchFileQuery } from "./fetch-file-api";
import type { TMedia } from "../media/media.types";

export type TFetchFileApiArgs = TMedia | TNullish;
export type TFetchFileApiRes = File | null;
export type TUseLazyFetchFileQuery = ReturnType<typeof useLazyFetchFileQuery>;
export type TUseLazyFetchFileQueryFunction = TUseLazyFetchFileQuery[0];
