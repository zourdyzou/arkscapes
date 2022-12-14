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
  skeletonBody: {
    display: "flex",
    alignItems: "flex-end",
    "& .MuiSkeleton-root": {
      margin: "0 2px",
    },
  },
}));

export const ChartSkeleton: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Box className={classes.skeletonContainer}>
      <Box className={classes.skeletonBody}>
        <Skeleton animation="wave" variant="rect" height={25} width={15} />
        <Skeleton animation="wave" variant="rect" height={40} width={15} />
        <Skeleton animation="wave" variant="rect" height={59} width={15} />
        <Skeleton animation="wave" variant="rect" height={78} width={15} />
        <Skeleton animation="wave" variant="rect" height={47} width={15} />
      </Box>
    </Box>
  );
};
