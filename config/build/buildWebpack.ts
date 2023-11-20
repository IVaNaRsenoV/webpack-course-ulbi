import path from "path";
import webpack from "webpack";

import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { IBuildOptions } from './types/types';

type Mode = 'production' | 'development';

export interface IEnvariables {
    mode: Mode,
    port: number,
}

export function buildWebpak(options: IBuildOptions): webpack.Configuration {
    const { mode, paths } = options;
    const isDev = mode === "development";

    const config: webpack.Configuration = {
        mode: mode || "development",
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: "[name].[contenthash].js",
            clean: true
        },
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? buildDevServer(options) : undefined,
        module: {
            rules: buildLoaders(options)
        },
        resolve: buildResolvers(options),
        plugins: buildPlugins(options)
    };

    return config;
};