import React from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import chroma from "chroma-js";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { roundDecimals } from "@/common/helpers/round-decimals";
import { shortenNumber } from "@/common/helpers/shorten-number";
import { DonutSkeleton } from "@/components/screens/atoms/donut-skeleton-loader";
import { selectCoins } from "@/features/coins-slice";
import { selectGlobalCoinData } from "@/features/global-coin-data-slice";
import { useAppSelector } from "@/hooks/*";
import { Coin } from "@/src/models";

const useStyles = makeStyles((theme: Theme) => ({
  responsiveContainer: {
    "& .recharts-default-tooltip": {
      borderRadius: 12,
      backgroundColor: `${theme.palette.background.default}dd !important`,
      border: "none !important",
      "& .recharts-tooltip-item": {
        color: `${theme.palette.text.primary} !important`,
      },
    },
  },
}));

interface DataFormat {
  coinName: string;
  coinSymbol: string;
  value: number;
}

interface Props {
  coinsToDisplay: number;
}

export const GlobalCoinDataDonutChart: React.FunctionComponent<Props> = ({ coinsToDisplay }) => {
  const classes = useStyles();
  const theme = useTheme();

  const coins = useAppSelector(selectCoins);
  const globalCoinData = useAppSelector(selectGlobalCoinData);

  const formatRawData = (totalValue: number) => {
    const newData: DataFormat[] = [];

    const topCoins = coins.value.slice(0, coinsToDisplay);

    topCoins.forEach((coin: Coin) => {
      newData.push({
        coinName: coin.name,
        coinSymbol: coin.symbol.toUpperCase(),
        value: coin.marketCap,
      });
    });

    newData.push({
      coinName: "Others",
      coinSymbol: "Others",
      value: totalValue - topCoins.reduce((acc: number, coin: Coin) => acc + coin.marketCap, 0),
    });

    return newData;
  };

  return (
    <>
      {coins.value.length === 0 || coins.status === "LOADING" || globalCoinData.value === null ? (
        <DonutSkeleton />
      ) : (
        <ResponsiveContainer height="100%" width="100%" className={classes.responsiveContainer}>
          <PieChart>
            <Pie
              data={formatRawData(globalCoinData.value.totalMarketCap.usd)}
              dataKey="value"
              nameKey="coinName"
              cx="50%"
              cy="50%"
              innerRadius="40%"
              outerRadius="55%"
              fill={theme.palette.primary.main}
              label={(data: DataFormat) => data.coinSymbol}
              paddingAngle={5}
              cursor="pointer"
            >
              {formatRawData(globalCoinData.value.totalMarketCap.usd).map((data: DataFormat, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  id={`cell-formatted-data-${data.coinName}`}
                  fill={
                    chroma.scale([theme.palette.primary.main, theme.palette.secondary.main]).colors(coinsToDisplay + 1)[
                      index
                    ]
                  }
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string): any =>
                globalCoinData.value !== null && [
                  `US$${shortenNumber(value)} (${roundDecimals(
                    (value / globalCoinData.value.totalMarketCap.usd) * 100
                  )}%)`,
                  name,
                ]
              }
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
