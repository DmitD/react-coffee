import {Route} from 'react-router-dom';

import Header from "./components/header";
import {Home, Cart} from "./pages"


function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
      </div>
    </div>
  );
}

export default App;
