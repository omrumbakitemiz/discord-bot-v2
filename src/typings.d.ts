declare module 'yt-dlp-exec' {
  type YtDlpOptions = Record<string, any>;

  interface YtDlpExec {
    (url: string, options?: YtDlpOptions): Promise<any>;
  }

  const ytdlp: YtDlpExec;
  export default ytdlp;
}
