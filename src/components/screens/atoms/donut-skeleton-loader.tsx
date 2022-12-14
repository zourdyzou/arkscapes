import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) => ({
  skeletonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  circle: {
    height: 100,
    width: 100,
    position: "absolute",
    backgroundColor: theme.palette.card.default,
    borderRadius: "50%",
  },
  lineGap: {
    position: "absolute",
    backgroundColor: theme.palette.card.default,
    height: 125,
    width: 5,
  },
}));

export const DonutSkeleton: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Box className={classes.skeletonContainer}>
      <Skeleton animation="wave" variant="circle" height={150} width={150} />
      <div className={classes.circle} />
      <div className={classes.lineGap} style={{ transform: "rotate(20deg) translateY(14px)" }} />
      <div className={classes.lineGap} style={{ transform: "rotate(140deg) translateY(14px)" }} />
      <div className={classes.lineGap} style={{ transform: "rotate(80deg) translateY(-14px)" }} />
    </Box>
  );
};
