import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";
import MakeAccount from "./Component/MakeAccount";
import AccountInfo from "./Component/AccountInfo";
import AllAccountInfo from "./Component/AllAccountInfo";
import Withdraw from "./Component/Withdraw";
import Deposit from "./Component/Deposit";
import BankTop from "./Component/BankTop";
import Login from "./Component/Login";
import Join from "./Component/Join";
import Logout from "./Component/Logout";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import store from "./persist-store";
import { PersistGate } from "redux-persist/integration/react";

export const persistor = persistStore(store);
const persister = persistStore(store);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        {/* useState는 리덕스에 비에 가볍기때문에 값이 바뀌는 걸 바로 확인할 수 있었던 반면
        리덕스스테이트는 스토리지에 올라가있고, 값이 바뀌면 랜더링된 후에 확인할 수 있기 때문에
        화면으로 확인하는 것이 가장 정확하다. 
        persistor : 랜더링 되는 시간을 조금 지연 시켜라*/}
        <PersistGate persistor={persister}>
          {/* BrowserRouter와 Routes 사이에 다른 태그는 올 수 없다. */}
          <BrowserRouter>
            <BankTop />
            {/* 고정된 부분은 Routes 외부에 선언 */}
            {/* 하나의 영역에 변경되는 부분을 Routes 안에 묶어줌 */}
            {/* path는 링크. element는 호출할 페이지.js */}
            <Routes>
              <Route exact path="/" element={<MakeAccount />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/logout" element={<Logout />} />
              <Route exact path="/join" element={<Join />} />
              <Route exact path="/deposit" element={<Deposit />} />
              <Route exact path="/withdraw" element={<Withdraw />} />
              <Route exact path="/accountInfo" element={<AccountInfo />} />
              <Route
                exact
                path="/allAccountInfo"
                element={<AllAccountInfo />}
              />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
