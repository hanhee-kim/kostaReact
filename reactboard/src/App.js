import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Routes, Route } from 'react-router-dom';
import { BoardListProvider } from './Component/BoardListContext';
import Header from './Component/Header';
import Main from './Component/Main';
import BoardList from './Component/BoardList';
import DetailForm from './Component/DetailForm';
import WriteForm from './Component/WriteForm';

function App() {
  return (
    <div className="App">
      <Header/>
      <BoardListProvider>{/* BoardProvider를 컴포넌트 트리 상위에 배치 */}
        <Routes>
          <Route exact path="/main" element={<Main/>}/>
          <Route exact path="/boardlist" element={<BoardList/>}/>
          <Route exact path="/detailform/:num" element={<DetailForm/>}/>
          <Route exact path="/writeform" element={<WriteForm/>}/>
        </Routes>
      </BoardListProvider>
    </div>
  );
}

export default App;
