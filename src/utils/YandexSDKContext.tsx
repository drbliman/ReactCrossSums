import React, { createContext, useContext, useEffect, useState } from "react";

const YandexSDKContext = createContext<any | null>(null); // eslint-disable-line

export const YandexSDKProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ysdk, setYsdk] = useState<any | null>(null); // eslint-disable-line

  useEffect(() => {
    if (typeof window !== "undefined" && window.YaGames) {
      window.YaGames.init()
        .then((sdk: any) => { // eslint-disable-line
          console.log("Yandex SDK initialized");
          setYsdk(sdk);
        })
        .catch((err) => {
          console.error("Failed to initialize Yandex SDK", err);
        });
    } else {
      console.warn("YaGames is not available on window");
    }
  }, []);

  return (
    <YandexSDKContext.Provider value={ysdk}>
      {children}
    </YandexSDKContext.Provider>
  );
};

export const useYandexSDK = () => { // eslint-disable-line
  return useContext(YandexSDKContext);
};
