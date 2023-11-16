import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Main from "./component/Main";
import BoardList from "./component/BoardList";
import WriteForm from "./component/WriteForm";
import DetailForm from "./component/DetailForm";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/lib/integration/react";
import Login from "./component/Login";
import Join from "./component/Join";
import Logout from "./component/Logout";
import ModifyForm from "./component/ModifyForm";

// const persister = persistStore(store);
function App() {
  return (
    <div>
      {/* <Provider store={store}> */}
      {/* <PersistGate persistor={persister}> */}
      <BrowserRouter>
        <Main />
        <Routes>
          {/* 라우터 문법으로 list URL에 파라미터로  page를 넘긴다 */}
          <Route exact path="/" element={<Login />} />
          <Route exact path="/join" element={<Join />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exect path="/list/:page" element={<BoardList />} />
          <Route exect path="/writeform" element={<WriteForm />} />
          <Route exect path="/modifyform/:num" element={<ModifyForm />} />
          <Route exect path="/detailform/:num" element={<DetailForm />} />
        </Routes>
      </BrowserRouter>
      {/* </PersistGate> */}
      {/* </Provider> */}
    </div>
  );
}

export default App;
