// import React from "react";
import { useYandexSDK } from "../../utils/YandexSDKContext";

const ShowAdButton = () => {
  const ysdk = useYandexSDK();

  const showAd = () => {
    if (ysdk && ysdk.adv) {
      ysdk.adv
        .showFullscreenAdv()
        .then(() => console.log("Ad shown successfully"))
        .catch((err: any) => console.error("Failed to show ad", err)); // eslint-disable-line
    } else {
      console.error("Yandex SDK is not initialized");
    }
  };

  return <button onClick={showAd}>Show Ad</button>;
};

export default ShowAdButton;
