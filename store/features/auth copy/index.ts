import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// import Cookies from "js-cookie";
import type { TRootState } from "@/store";
import type { TSigninData } from "@/store/api/auth/auth.types";
import type { TNullish } from "@/store/api/common-api-types";

import type { TApiTokenInfo, TAuthState } from "./types";

const initialState: TAuthState = {
  authInfo: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login(state, action: PayloadAction<Partial<TSigninData> | TNullish>) {
      if (!action.payload) {
        return;
      }

      state.authInfo = {
        message: action.payload?.message,
        user: action.payload?.user,
        accessToken: action.payload?.accessToken,
        refreshToken: action.payload?.refreshToken,
        accessExpiresAt: action.payload?.accessExpiresAt,
        refreshExpiresAt: action?.payload?.refreshExpiresAt,
      };
    },

    logout(state) {
      state.authInfo = null;
    },

    updateToken: (state, action: PayloadAction<TApiTokenInfo>) => {
      if (action.payload === null) {
        state.authInfo = null;
        return;
      }

      state.authInfo = {
        // Other data
        message: state.authInfo?.message,
        user: state.authInfo?.user,

        // TTokenData
        accessToken: action.payload?.accessToken || state.authInfo?.accessToken,
        refreshToken:
          action.payload?.refreshToken || state.authInfo?.refreshToken,
        accessExpiresAt:
          action.payload?.accessExpiresAt || state.authInfo?.accessExpiresAt,
        refreshExpiresAt:
          action?.payload?.refreshExpiresAt || state.authInfo?.refreshExpiresAt,
      };
    },

    updateFcmToken: (state, action: PayloadAction<string | TNullish>) => {
      if (!action.payload) {
        return;
      }

      if (state.authInfo && state.authInfo.user) {
        state.authInfo.user.fcmToken = action.payload;
      }
    },
  },

  selectors: {
    // Auth User selectors
    selectAuthUser: (state) => state?.authInfo?.user,
    selectAuthUserId: (state) => state?.authInfo?.user?.id,
    selectAuthUserFirstName: (state) => state?.authInfo?.user?.firstName,
    selectAuthUserLastName: (state) => state?.authInfo?.user?.lastName,
    selectAuthUserEmail: (state) => state?.authInfo?.user?.email,
    selectAuthUserPhone: (state) => state?.authInfo?.user?.phone,
    selectAuthUserAvatar: (state) => state?.authInfo?.user?.avatar,
    selectAuthUserAvatarUrl: (state) => state?.authInfo?.user?.avatar?.url,
    selectAuthUserType: (state) => state?.authInfo?.user?.type,

    // Auth Token selectors
    selectTokenInfo: (state) => ({
      accessToken: state?.authInfo?.accessToken,
      refreshToken: state?.authInfo?.refreshToken,
      accessExpiresAt: state?.authInfo?.accessExpiresAt,
      refreshExpiresAt: state?.authInfo?.refreshExpiresAt,
    }),
    selectAccessToken: (state) => state?.authInfo?.accessToken,
    selectRefreshToken: (state) => state?.authInfo?.refreshToken,
    selectAccessExpiresAt: (state) => state?.authInfo?.accessExpiresAt,
    selectRefreshExpiresAt: (state) => state?.authInfo?.refreshExpiresAt,
    selectFcmToken: (state) => state?.authInfo?.user?.fcmToken,
  },
});

export const selectAuth = (state: TRootState): typeof state.authSlice =>
  state.authSlice;

export const { login, logout, updateToken, updateFcmToken } = authSlice.actions;

export const {
  selectAuthUser,
  selectAuthUserId,
  selectAuthUserFirstName,
  selectAuthUserLastName,
  selectAuthUserEmail,
  selectAuthUserPhone,
  selectAuthUserAvatar,
  selectAuthUserAvatarUrl,
  selectAuthUserType,
  selectTokenInfo,
  selectAccessToken,
  selectRefreshToken,
  selectAccessExpiresAt,
  selectRefreshExpiresAt,
} = authSlice.selectors;

const authReducer = authSlice.reducer;
export default authReducer;
