import path from "path";
import webpack from "webpack";

import { buildWebpak } from './config/build/buildWebpack';
import { IBuildPaths, BuildPlatform } from './config/build/types/types';

type Mode = 'production' | 'development';


export interface IEnvariables {
    mode: Mode,
    port: number,
    analyzer?: boolean;
    platform: BuildPlatform;
}

export default (env: IEnvariables) => {
    const paths: IBuildPaths = {
        output: path.resolve(__dirname, "build"),
        entry: path.resolve(__dirname, "src", "index.tsx"),
        html: path.resolve(__dirname, "public", "index.html"),
        src: path.resolve(__dirname, "src"),
        public: path.resolve(__dirname, "public")
    };

    const config: webpack.Configuration = buildWebpak({
        port: env.port ?? 3000,
        mode: env.mode ?? "development",
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop'
    })

    return config;
}