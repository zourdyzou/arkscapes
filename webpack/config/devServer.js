/**
 * @see https://webpack.js.org/configuration/dev-server/
 */

import { devServerProxyConfig } from "./devServerProxy";

export const devServerConfig = {
  client: {
    overlay: false,
  },
  headers: { "Access-Control-Allow-Origin": "*" },
  historyApiFallback: true,
  hot: true,
  proxy: devServerProxyConfig,
  static: {
    publicPath: "/",
  },
};
