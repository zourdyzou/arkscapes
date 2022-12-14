import React from "react";
import ReactApexChart from "react-apexcharts";
import { Box } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { ApexOptions } from "apexcharts";

import { HeatmapLoadingProgress } from "@/components/screens/atoms/heatmap-loading-progress";
import { Overlay } from "@/components/screens/atoms/overlay";
import { selectCoins } from "@/features/coins-slice";
import { useAppSelector } from "@/hooks/*";
import { Coin } from "@/src/models";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(3),
    opacity: 0.15,
  },
}));

export const CorrelationHeatmapSkeleton: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();

  const coins = useAppSelector(selectCoins);

  const options: ApexOptions = {
    chart: {
      id: "CryptoscapesCorrelationHeatmap",
      height: "100%",
      fontFamily: "Gilroy, sans-serif",
      type: "heatmap",
      background: theme.palette.card.default,
      animations: {
        speed: 1000,
      },
    },
    theme: {
      mode: "dark",
    },
    tooltip: {
      custom: (data) => {
        const value = data.series[data.seriesIndex][data.dataPointIndex];
        return `<div class="custom-tooltip">
        <div class="header">${coins.value[data.seriesIndex].name} vs ${coins.value[data.dataPointIndex].name}</div>
        <div class="content">Correlation: ${value}</div>
        </div>`;
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: "20px",
      },
    },
    legend: {
      fontSize: "14px",
    },
    colors: ["#000000"],
    xaxis: {
      categories: coins.value.slice(0, 15).map((coin: Coin) => coin.symbol.toUpperCase()),
      labels: {
        style: {
          fontSize: `${theme.typography.subtitle2.fontSize}`,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: `${theme.typography.subtitle2.fontSize}`,
        },
      },
    },
  };

  const data = coins.value.slice(0, 15).map((coin: Coin) => {
    return {
      name: coin.symbol.toUpperCase(),
      data: Array.from(Array(15).keys()),
    };
  });

  return (
    <Overlay loadingIcon={<HeatmapLoadingProgress />}>
      <Box className={classes.container}>
        <ReactApexChart options={options} series={data} type="heatmap" height="100%" />
      </Box>
    </Overlay>
  );
};
