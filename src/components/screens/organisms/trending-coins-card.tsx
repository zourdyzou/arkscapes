import React, { Fragment, useEffect } from "react";
import { CardHeader, Divider, List } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";

import { FireIcon } from "@/components/icons/fire-icon";
import { ListItemSkeleton } from "@/components/screens/atoms/list-item-skeleton";
import { CardLayout } from "@/components/screens/molecules/card-layout";
import { TrendingCoinItem } from "@/components/screens/molecules/trending-coin-item";
import { fetchTrendingCoins, selectTrendingCoins } from "@/features/trending-coins-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/*";
import { TrendingCoin } from "@/src/models";

const useStyles = makeStyles((theme: Theme) => ({
  avatarColor: {
    marginRight: 6,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.card.paper,
  },
  trendingCoinList: {
    overflow: "scroll",
    paddingBottom: 8,
  },
}));

export const TrendingCoinsCard: React.FunctionComponent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const trendingCoins = useAppSelector(selectTrendingCoins);

  useEffect(() => {
    if (trendingCoins.value.length === 0 && trendingCoins.status === "IDLE") {
      dispatch(fetchTrendingCoins());
    }
  }, [dispatch, trendingCoins.value.length, trendingCoins.status]);

  return (
    <CardLayout>
      <CardHeader
        title="Trending"
        titleTypographyProps={{ variant: "body1", color: "textPrimary" }}
        subheader="Top-7 searched on CoinGecko"
        subheaderTypographyProps={{ variant: "caption", color: "textSecondary" }}
        avatar={<FireIcon />}
      />
      <Divider />
      <List dense disablePadding className={classes.trendingCoinList}>
        {trendingCoins.value.length === 0 || trendingCoins.status === "LOADING" ? (
          <ListItemSkeleton count={7} height={60} iconDimensions={theme.spacing(3)} />
        ) : (
          <>
            {trendingCoins.value.map((trendingCoin: TrendingCoin, index: number) => {
              return (
                <Fragment key={trendingCoin.id}>
                  <TrendingCoinItem trendingCoin={trendingCoin} />
                  {index < trendingCoins.value.length - 1 && <Divider />}
                </Fragment>
              );
            })}
          </>
        )}
      </List>
    </CardLayout>
  );
};
