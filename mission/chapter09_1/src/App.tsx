import CartList from './components/CartList'
import Navbar from './components/Navbar'
import store from './store/store'
import './App.css';
import { Provider } from 'react-redux';
import PriceBox from './components/PriceBox';
import DeleteCheckModal from './components/DeleteCheckModal';

function App() {
  return (
      <Provider store={store}>
        <Navbar/>
        <CartList/>
        <PriceBox/>
        <DeleteCheckModal />
      </Provider> 
    )
}

export default App
