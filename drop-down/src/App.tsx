import { DROP_DOWN_OPT } from "./components/DropDown/constants/DROP_DOWN_OPT";

import { DropDown } from "./components/DropDown/DropDown";
import "./App.scss";

function App() {
  return (
    <main className="app">
      <h1>Custom Dropdown Demo</h1>
      <section>
        <DropDown
          options={DROP_DOWN_OPT}
          onChange={() => {}}
          value={""}
          placeholder="Select an option"
        />
      </section>
    </main>
  );
}

export default App;
