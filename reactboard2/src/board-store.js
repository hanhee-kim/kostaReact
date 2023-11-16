import persistReducer from "redux-persist/es/persistReducer";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

// const reducer = (currentState, action) => {
//   if (!currentState) {
//     return {
//       //   member: {
//       //     id: "",
//       //     name: "",
//       //     password: "",
//       //     email: "",
//       //     address: "",
//       //   },
//       //   board: {
//       subject: "",
//       content: "",
//       writedate: "",
//       fileurl: "",
//       writer: "",
//       viewcount: 0,
//       likecount: 0,
//       //   },
//     };
//   }
// };

// const newBoardState = { ...currentState };
// switch (action.type) {
//   case "subject":
//     newBoardState.subject = action.data;
//     break;
//   case "content":
//     newBoardState.content = action.data;
//     break;
//   case "fileurl":
//     newBoardState.fileurl = action.data;
//     break;
//   case "viewcount":
//     newBoardState.viewcount = action.data;
//     break;
//   case "likecount":
//     newBoardState.likecount = action.data;
//     break;
//   case "all":
//     return { ...action.data };
//   default:
// }

// const persistConfig = {
//   key: "root",
//   storage: storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducer);
// const store = configureStore({
//   reducer: persistedReducer,
// });

// export default store;
