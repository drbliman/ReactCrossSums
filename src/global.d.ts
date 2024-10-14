declare global {
  interface Window {
    YaGames: {
      init: () => Promise<YaGamesSDK>;
    };
  }
}

export interface YaGamesSDK {
  adv: {
    showFullscreenAdv: () => Promise<void>;
  };
}

export {};
