interface ImportMetaEnv {
    DEV: any;
    VITE_SERVER_API_URL: string | undefined;
    readonly VITE_SERVER_APT_URL : string;
}

interface ImportMeta {
    readonly env : ImportMetaEnv;
}