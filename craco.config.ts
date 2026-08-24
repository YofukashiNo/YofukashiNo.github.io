import type { Configuration as WebpackConfig } from "webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

interface CracoWebpack {
  configure: (webpackConfig: WebpackConfig) => WebpackConfig;
}

interface CracoConfig {
  webpack: CracoWebpack;
}

const config: CracoConfig = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve = webpackConfig.resolve || {};
      webpackConfig.resolve.plugins = [
        ...(webpackConfig.resolve.plugins || []),
        new TsconfigPathsPlugin({
          configFile: "./tsconfig.json",
        }),
      ];

      return webpackConfig;
    },
  },
};

export default config;
