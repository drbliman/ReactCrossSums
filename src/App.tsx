import Header from "./components/head/header";
import Settings from "./components/settings/settings";
import PlayingField from "./components/playingField/playingField";
import Rules from "./components/rules/rules";
import "./App.css";

export default function App() {
  return (
    <>
      <Header></Header>
      <Settings></Settings>
      <Rules></Rules>
      <PlayingField></PlayingField>
    </>
  );
}
