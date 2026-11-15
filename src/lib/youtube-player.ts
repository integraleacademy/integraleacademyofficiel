export interface YouTubePlayer {
  mute(): void;
  playVideo(): void;
  pauseVideo(): void;
  getPlayerState(): number;
  destroy(): void;
}

type PlayerEvent = { target: YouTubePlayer };
type YouTubeApi = {
  Player: new (element: HTMLIFrameElement, options: {
    events: {
      onReady: (event: PlayerEvent) => void;
      onStateChange: (event: PlayerEvent & { data: number }) => void;
      onAutoplayBlocked: () => void;
      onError: () => void;
    };
  }) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let loading: Promise<YouTubeApi> | undefined;

export function loadYouTubePlayer(): Promise<YouTubeApi> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (loading) return loading;

  loading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      window.onYouTubeIframeAPIReady = previous;
      if (window.YT?.Player) resolve(window.YT);
      previous?.();
    };
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    script.onerror = () => {
      window.onYouTubeIframeAPIReady = previous;
      loading = undefined;
      script.remove();
      reject(new Error('Lecteur YouTube indisponible'));
    };
    document.head.append(script);
  });
  return loading;
}
