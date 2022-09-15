import React from "react";
import { useTheme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Area, AreaChart, YAxis } from "recharts";

import { selectCoinMarketChartList } from "@/features/marketChartSlice";
import { useAppSelector } from "@/hooks/*";
import { Coin, CoinMarketChart } from "@/src/models";

interface Props {
  coin: Coin;
  dataKey: keyof CoinMarketChart;
}

export const SmallCoinChart: React.FunctionComponent<Props> = ({ coin, dataKey }) => {
  const coinMarketChartList = useAppSelector(selectCoinMarketChartList);
  const theme = useTheme();
  const gain = coin.priceChangePercentage24H > 0;

  const formatRawData = () => {
    const formattedData = [];

    for (const array of coinMarketChartList.value[coin.id][dataKey]) {
      formattedData.push({ date: array[0], dataKey: array[1] });
    }

    return formattedData;
  };

  return (
    <>
      {!coinMarketChartList.value[coin.id] ? (
        <Skeleton animation="wave" height={60} width={100} id="titleSkeleton" />
      ) : (
        <AreaChart width={100} height={60} data={formatRawData()} margin={{ top: 0, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id={gain ? "gain" : "loss"} x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={gain ? theme.palette.success.main : theme.palette.error.main}
                stopOpacity={0.5}
              />
              <stop
                offset="60%"
                stopColor={gain ? theme.palette.success.main : theme.palette.error.main}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <YAxis domain={[(dataMin: number) => dataMin * 0.95, (dataMax: number) => dataMax * 1.05]} hide />
          <Area
            type="monotone"
            dataKey="dataKey"
            dot={false}
            animationDuration={3000}
            stroke={gain ? theme.palette.success.main : theme.palette.error.main}
            fillOpacity={1}
            fill={`url(#${gain ? "gain" : "loss"})`}
          />
        </AreaChart>
      )}
    </>
  );
};
