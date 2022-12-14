import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import { FastForwardRounded, HourglassEmptyRounded, ScheduleRounded } from "@material-ui/icons";

import { GasIndicator } from "@/components/screens/atoms/gas-indicator";
import { selectGasOracle, setSelectedGasFee } from "@/features/gas-oracle-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/*";

const useStyles = makeStyles((theme: Theme) => ({
  avatarColor: {
    marginRight: 6,
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.card.paper,
    borderRadius: 8,
  },
  conditionalButtonChild: {
    "& .MuiButton-outlined": {
      height: 88,
      border: `2px solid ${theme.palette.secondary.main}80`,
    },
  },
}));

export const GasIndicatorGroup: React.FunctionComponent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const gasOracle = useAppSelector(selectGasOracle);

  return (
    <Grid container spacing={2} className={classes.conditionalButtonChild}>
      <Grid item xs={4}>
        <GasIndicator
          header="Slow"
          price={gasOracle.value.safeGasPrice}
          time="< 30mins"
          icon={<HourglassEmptyRounded />}
          color={theme.palette.error.main}
          selected={gasOracle.selectedGasFee === gasOracle.value.safeGasPrice}
          onClick={() => dispatch(setSelectedGasFee(gasOracle.value.safeGasPrice))}
        />
      </Grid>
      <Grid item xs={4}>
        <GasIndicator
          header="Normal"
          price={gasOracle.value.proposeGasPrice}
          time="< 5mins"
          icon={<ScheduleRounded />}
          color={theme.palette.warning.main}
          selected={gasOracle.selectedGasFee === gasOracle.value.proposeGasPrice}
          onClick={() => dispatch(setSelectedGasFee(gasOracle.value.proposeGasPrice))}
        />
      </Grid>
      <Grid item xs={4}>
        <GasIndicator
          header="Fast"
          price={gasOracle.value.fastGasPrice}
          time="< 1min"
          icon={<FastForwardRounded />}
          color={theme.palette.success.main}
          selected={gasOracle.selectedGasFee === gasOracle.value.fastGasPrice}
          onClick={() => dispatch(setSelectedGasFee(gasOracle.value.fastGasPrice))}
        />
      </Grid>
    </Grid>
  );
};
