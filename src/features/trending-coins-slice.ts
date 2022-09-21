import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import axios from "axios";

import { API_CONFIG as config } from "@/common/constants";
import { coinGecko as API } from "@/common/endpoints";
import { toCamelCase } from "@/common/helpers/case-transformer";
import { RootState } from "@/components/app/store";
import { GenericState, Trending, TrendingCoin, TrendingCoinItem } from "@/src/models";

const initialState: GenericState<TrendingCoin[]> = {
  value: [],
  status: "IDLE",
};

export const fetchTrendingCoins = createAsyncThunk("trendingCoins", async () => {
  const canceler = axios.CancelToken.source();

  const response = await axios.request({
    ...config("coinGecko"),
    url: API.trending,
    cancelToken: canceler.token,
  });

  const normalizedResponse = toCamelCase(response.data) as Trending;

  return normalizedResponse.coins.map((trendingCoinItem: TrendingCoinItem) => trendingCoinItem.item);
});

const trendingCoinsSlice: Slice<GenericState<TrendingCoin[]>, {}, "trendingCoins"> = createSlice({
  name: "trendingCoins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingCoins.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchTrendingCoins.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.value = action.payload;
      })
      .addCase(fetchTrendingCoins.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message;
      });
  },
});

export const selectTrendingCoins: (state: RootState) => GenericState<TrendingCoin[]> = (state: RootState) =>
  state.trendingCoins;

export default trendingCoinsSlice.reducer;
