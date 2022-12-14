import React, { Fragment } from "react";
import { Divider, ListItem } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  listItemSkeleton: {
    height: (styleProps: StyleProps) => styleProps.height,
    "& .MuiSkeleton-circle": {
      margin: "0 20px",
    },
  },
  listTextSkeleton: {
    width: (styleProps: StyleProps) => `calc(100% - 40px - ${styleProps.iconDimensions}px)`,
    "& .MuiSkeleton-text:first-child": {
      marginBottom: 6,
    },
  },
}));

interface StyleProps {
  height: number;
  iconDimensions: number;
}

interface Props extends StyleProps {
  count: number;
}

export const ListItemSkeleton: React.FC<Props> = ({ count, height, iconDimensions }) => {
  const classes = useStyles({ height, iconDimensions });

  return (
    <>
      {Array.from(Array(count).keys()).map((index: number) => (
        <Fragment key={index}>
          <ListItem className={classes.listItemSkeleton} disableGutters>
            <Skeleton animation="wave" variant="circle" height={iconDimensions} width={iconDimensions} />
            <div className={classes.listTextSkeleton}>
              <Skeleton animation="wave" height={12} width="80%" />
              <Skeleton animation="wave" height={12} width="40%" />
            </div>
          </ListItem>
          {index < count - 1 && <Divider />}
        </Fragment>
      ))}
    </>
  );
};
