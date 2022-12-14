import { createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers } from "@reduxjs/toolkit";
import axios from "axios";

import { API_CONFIG as config, http } from "@/common/constants";
import { alternativeMe as API, coinGecko as coinAPI } from "@/common/endpoints";
import { toCamelCase } from "@/common/helpers/case-transformer";
import { RootState } from "@/components/app/store";
import {
  AvailableDayRanges,
  CoinMarketChart,
  FearGreedIndex,
  FearGreedIndexRootObject,
  FearGreedIndexState,
} from "@/src/models";

interface Reducers extends SliceCaseReducers<FearGreedIndexState> {
  setShowBitcoinCorrelation: (state: FearGreedIndexState, action: PayloadAction<boolean>) => void;
}

const initialState: FearGreedIndexState = {
  value: [],
  today: null,
  status: "IDLE",
  showBitcoinCorrelation: false,
};

export const fetchFearGreedIndex = createAsyncThunk("fearGreedIndex", async () => {
  const canceler = axios.CancelToken.source();

  const dayRange: AvailableDayRanges = 30;

  const response = await axios.request({
    ...config("alternative.me"),
    url: API.fearGreedIndex(dayRange),
    cancelToken: canceler.token,
  });

  const bitcoinMarketChart = await http.request({
    ...config("coinGecko"),
    url: coinAPI.coinMarketChart("bitcoin", dayRange, "daily"),
    cancelToken: canceler.token,
  });

  const normalizedResponse = toCamelCase(response.data) as FearGreedIndexRootObject;
  // Sort here since endpoint returns data in date descending order, which does NOT work for the charts
  normalizedResponse.data.sort((a: FearGreedIndex, b: FearGreedIndex) => Number(a.timestamp) - Number(b.timestamp));

  const normalizedBitcoinMarketChart = toCamelCase(bitcoinMarketChart.data) as CoinMarketChart;
  normalizedResponse.data.forEach((indexData: FearGreedIndex, index: number) => {
    indexData.bitcoinPrice = normalizedBitcoinMarketChart.prices[index][1];
  });

  return normalizedResponse.data as FearGreedIndex[];
});

const fearGreedIndexSlice: Slice<FearGreedIndexState, Reducers, "fearGreedIndex"> = createSlice({
  name: "fearGreedIndex",
  initialState,
  reducers: {
    setShowBitcoinCorrelation: (state: FearGreedIndexState, action: PayloadAction<boolean>) => {
      state.showBitcoinCorrelation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFearGreedIndex.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchFearGreedIndex.fulfilled, (state, action) => {
        state.status = "IDLE";
        state.value = action.payload;
        state.today = action.payload[action.payload.length - 1];
      })
      .addCase(fetchFearGreedIndex.rejected, (state, action) => {
        state.status = "FAILED";
        state.error = action.error.message;
      });
  },
});

export const selectFearGreedIndex: (state: RootState) => FearGreedIndexState = (state: RootState) =>
  state.fearGreedIndex;

export const { setShowBitcoinCorrelation } = fearGreedIndexSlice.actions;

export default fearGreedIndexSlice.reducer;
