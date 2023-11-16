import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; //localStorage에 저장
// import storageSession from "redux-persist/lib/storage/session"; //sessionStorage에 저장
//왜? redux의 storage페이지를 새로고침하면 state가 사라짐

const reducer = (currentState, action) => {
  if (currentState === undefined) {
    return {
      id: "",
      name: "",
      password: "",
      email: "",
      address: "",
    };
  }
  //실제 스테이트를 가지고있고 스테이트를 계속 변경해줌
  //리듀서의 리턴값은 새로 복제된(값이 변경된)스테이트 값이다
  //
  const newState = { ...currentState };
  switch (action.type) {
    case "ID":
      newState.id = action.payload;
      break;
    // return {...currentState,id:action.payload} 같은 의미
    case "NAME":
      newState.name = action.payload;
      break;
    case "PASSWORD":
      newState.password = action.payload;
      break;
    case "EMAIL":
      newState.email = action.payload;
      break;
    case "ADDRESS":
      newState.address = action.payload;
      break;
    case "ALL":
      return { ...action.payload };
    // newState.id = action.payload.id;
    // newState.name = action.payload.name;
    // newState.password = action.payload.password;
    // newState.email = action.payload.email;
    // newState.address = action.payload.address;
    // break;
    default:
  }
  return newState;
};

const persistConfig = {
  key: "root",
  storage: storage,
};

//리덕스만 가져오면 새로고침 했을때 값이 날라가는 현상이 발생한다.
//npm install --save @reduxjs/toolkit
//npm install --save

//createStore 대신 configureStore를 사용
const persistedReducer = persistReducer(persistConfig, reducer); // 리듀서를 감싼다
const store = configureStore({
  reducer: persistedReducer,
  //스토리지를 사용하면서 미들웨어 설정이 필요하여 작성해준 코드
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); // 리듀서를 감싼것을 또 감싼다
export default store;
