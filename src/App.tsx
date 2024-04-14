import { Provider } from "jotai";
import { AppRouter } from "./routes";

function App() {
  return (
    <Provider>
      <AppRouter />
    </Provider>
  );
}

export default App;
