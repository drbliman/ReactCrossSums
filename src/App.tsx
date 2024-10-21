import React from "react";
import Settings from "./components/settings/settings";
import PlayingField from "./components/playingField/playingField";
import Rules from "./components/rules/rules";
import "./App.css";
import { useYandexSDK } from "./utils/YandexSDKContext";

export default function App() {
  const ysdk = useYandexSDK();

  React.useEffect(() => {
    const disableContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", disableContextMenu);

    const disableTouchHoldMenu = (event: TouchEvent) => {
      event.preventDefault();
    };

    document.addEventListener("touchstart", disableTouchHoldMenu);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("touchstart", disableTouchHoldMenu);
    };
  }, []);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      if (ysdk?.features?.LoadingAPI) {
        ysdk.features.GameplayAPI.stop();
      }
    } else {
      if (ysdk?.features?.LoadingAPI) {
        ysdk.features.GameplayAPI.start();
      }
    }
  });

  const baseWidth = 1000;
  const baseHeight = 720;

  function scalePage() {
    const gameBoard = document.getElementById("root") as HTMLDivElement;

    const isDesktop = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;

    if (isDesktop) {
      const rootWidth = gameBoard.offsetWidth;
      const windowWidth = window.innerWidth;
      const leftOffset = (windowWidth - rootWidth) / 2;
      gameBoard.style.left = `${leftOffset}px`;
      return;
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    if (windowWidth < 1000) {
      gameBoard.style.left = "0px";
    } else {
      gameBoard.style.left = `${(window.innerWidth - baseWidth) / 2}px`;
    }
    if (windowHeight < 720) {
      const scaleX = windowWidth / baseWidth;
      const scaleY = windowHeight / baseHeight;

      const scale = Math.min(scaleX, scaleY);

      gameBoard.style.transform = `scale(${scale})`;

      gameBoard.style.top = `-${(baseHeight * (1 - scale)) / 2}px`;
    } else {
      gameBoard.style.transform = `scale(1)`;
      gameBoard.style.top = "0px";
    }
  }

  window.addEventListener("resize", scalePage);
  window.addEventListener("load", scalePage);

  return (
    <>
      <Settings></Settings>
      <Rules></Rules>
      <PlayingField></PlayingField>
    </>
  );
}
