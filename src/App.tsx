import Header from "./components/head/header";
import Settings from "./components/settings/settings";
import PlayingField from "./components/playingField/playingField";
import "./App.css";

export default function App() {
  return (
    <>
      <Header></Header>
      <Settings></Settings>
      <PlayingField></PlayingField>
    </>
  );
}
