import "./App.css";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./store/store";
import CartPage from "./components/CartPage"; // 추가

function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <CartPage /> {/* CartList + PriceBox + Modal */}
      </Provider>
    </>
  );
}

export default App;
