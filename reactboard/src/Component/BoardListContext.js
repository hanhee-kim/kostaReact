// 상태 관리 라이브러리
// 상태(state)는 React에서 컴포넌트 내에 관리되는 변수들
// 이러한 상태를 서로 props의 형태로 공유
// 자식 컴포넌트 간에는 상태 공유가 불가능하며, 부모 컴포넌트를 통해서만 공유 가능
// 이 때, 컴포넌트 계층이 많아지면 중간에 props를 사용하지 않아도 들고있는 문제 발생
// 이러한 문제를 props drilling이라고 하며, 프로젝트가 커질수록  state 관리가 어려워짐
// 따라서, 전역적으로 상태를 관리하는 상태 관리 라이브러리가 필요
// React Context API: react에서 자체적으로 제공해주는 전역 상태 관리 API

// 문제점: 리액트 앱 최상단에 Provider를 배치하고, 이는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는데,
// context를 구독하는 컴포넌트들이 Provider의 value prop이 바뀔 때마다 다시 렌더링 되므로
// 심각한 성능상의 비효율

import { createContext, useContext, useState } from "react";

// 데이터 값을 전달할 수 있는 콘텍스트 생성
const BoardListContext = createContext();

// 데이터 쓰기
export function BoardListProvider({ children }) {
    // 데이터를 쓸 때, setBoard 함수 호출
    // 데이터 초기값은 빈 객체
    const [boardList, setBoardList] = useState([]);

    return (
        <BoardListContext.Provider value={{ boardList, setBoardList }}>
            {children}
        </BoardListContext.Provider>
    );
}

// 데이터 읽기
export function useBoardList() {
    return useContext(BoardListContext);
}
