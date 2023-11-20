export interface IBuildPaths {
    entry: string;
    html: string;
    output: string;
    src: string;
    public: string;
}

export type BuildMode = 'production' | 'development';
export type BuildPlatform = 'mobile' | 'desktop';

export interface IBuildOptions {
    port: number;
    mode: BuildMode,
    paths: IBuildPaths;
    analyzer?: boolean;
    platform: BuildPlatform;
}