import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypescript from "react-refresh-typescript";
import { IBuildOptions } from './types/types';
import { removeDataTestIdBabelPlugin } from './babel/removeDataTestIdBabelPlugin';

export function buildLoaders(options: IBuildOptions): ModuleOptions["rules"] {
    const isDev = options.mode === "development";

    const babelLoader = {
        test: /\.(t|j)sx?$/i,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-typescript",
                    ["@babel/preset-react", {
                        runtime: isDev ? "automatic" : "classic"
                    }]
                ],
                plugins: [
                    [removeDataTestIdBabelPlugin, {
                        props: ["data-testid"]
                    }]
                ]
            }
        }
    };

    const assetsLoader = {
        test: /\.(png|jpg|gif|jpeg)$/i,
        type: "asset/resource"
    }

    const svgrLoader = {
        test: /\.svg$/i,
        use: [{
            loader: "@svgr/webpack",
            options: {
                icon: true
            }
        }]
    }

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]"
            },
        }
    };

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            cssLoaderWithModules,
            "sass-loader"]
    };

    // const tsLoader = {
    //     test: /\.tsx?$/,
    //     use: [
    //         {
    //             loader: "ts-loader",
    //             options: {
    //                 transpileOnly: true,
    //                 getCustomTransformers: () => ({
    //                     before: [isDev && ReactRefreshTypescript()].filter(Boolean)
    //                 })
    //             }
    //         }
    //     ],
    //     exclude: /node_modules/
    // }

    return [
        assetsLoader,
        scssLoader,
        babelLoader,
        // tsLoader,
        svgrLoader
    ]
}