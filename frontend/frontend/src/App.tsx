import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import routes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <Layout >{routes}</Layout>
    </BrowserRouter>
  );
}

export default App;
