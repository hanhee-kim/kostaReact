import {
  Table,
  Input,
  Button,
  FormGroup,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BoardList = () => {
  const { page } = useParams();
  const [boards, setBoards] = useState([]);
  const [pageBtn, setPageBtn] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const [type, setType] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    // let page = { ...curPage };
    reqBoardList(page);
  }, []);

  const reqBoardList = (repage) => {
    axios
      .get(`http://localhost:8090/boardlist/${repage}`)
      .then((res) => {
        setBoards(res.data);
        console.log(res.data);
        let pageInfo = res.data.pageInfo;
        let list = res.data.boardList;
        setBoards([...list]);
        let btn = [];
        for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
          btn.push(i);
        }
        setPageBtn(btn);
        setPageInfo({ ...pageInfo });
        setIsSearch(false);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const searchSubmit = () => {
    reqBoardSearch(1);
  };
  //페이지별 서치가 있으므로 컴포넌트를 뱉는 형식이 아니라
  //라우터로 다시 요청을 보내는 식으로 !
  const reqBoardSearch = (repage) => {
    if (type === "") {
      Swal.fire("검색타입을 지정해주세요.");
      return;
    }
    if (keyword.trim() === "") {
      Swal.fire("검색어를 입력해주세요.");
      return;
    }

    axios
      .get(`http://localhost:8090/boardsearch/${repage}/${type}/${keyword}`)
      .then((res) => {
        console.log(res);
        let pageInfo = res.data.pageInfo;
        let list = res.data.boardList;
        setBoards([...list]);
        let btn = [];
        for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
          btn.push(i);
        }
        setPageBtn(btn);
        setPageInfo({ ...pageInfo });
        setIsSearch(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pageChange = (repage) => {
    if (isSearch) {
      reqBoardSearch(repage);
    } else {
      reqBoardList(repage);
    }
  };

  const deleteBoard = (e) => {
    let boardNum = e.target.id;
    axios
      .get(`http://localhost:8090/boarddelete/${boardNum}`)
      .then((res) => {
        console.log(res);
        // let num = res.data;
        // let reboards = boards.filter((board) => board.num != num);
        // setBoards([...reboards]);
        //tr이 state가 보드 배열을 바라보고 있기 때문에,
        //보드배열만 다시 설정해주면 된다.
        //단 이렇게 하면 10개씩 불러와지던 보드 배열이 숫자가 줄어든다.
        //만약 10개씩 불러오려면 페이징처리도 다시 해주어야하고,
        //데이터도 새로 불러와야하기때문에 데이터 통신이 이루어져 화면 깜박임이 필요하다.
        //하지만 삭제후에 백엔드에서 프론트로 데이터를 수정해서 보낸다면 가능하다

        //다시 요청하는 방법
        pageChange(pageInfo.curPage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        style={{ margin: "20px auto", textAlign: "center", fontSize: "25px" }}
      >
        게시판글 목록
      </div>
      <br />
      <FormGroup
        row
        style={{ width: "600px", textAlign: "center", margin: "0 auto" }}
      >
        <Col sm={3}>
          <Input
            type="select"
            name="type"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">선택하세요</option>
            <option value="subject">제목</option>
            <option value="writer">작성자</option>
            <option value="content">내용</option>
          </Input>
        </Col>
        <Col sm={3}>
          <Input
            type="text"
            name="keyword"
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
        <Col sm={3}>
          <Button onClick={searchSubmit}>검색</Button>
        </Col>
        <Col sm={3}>
          <Button tag="a" href="/writeform" color="success">
            글쓰기
          </Button>
        </Col>
      </FormGroup>
      <Table
        bordered
        className="table"
        style={{ margin: "0 auto", width: "900px" }}
      >
        <thead>
          <tr key="0">
            <td>번호</td>
            <td>제목</td>
            <td>작성자</td>
            <td>날짜</td>
            <td>조회수</td>
            <td>삭제</td>
          </tr>
        </thead>
        <tbody>
          {boards.length !== 0 &&
            boards.map((board) => {
              return (
                <tr key={board.num}>
                  <td>
                    <Link to={"/detailform/" + board.num}>{board.num}</Link>
                  </td>
                  <td>
                    <Link to={"/detailform/" + board.num}>{board.subject}</Link>
                  </td>
                  <td>{board.writer}</td>
                  <td>{board.writedate}</td>
                  <td>{board.viewcount}</td>
                  <td>
                    <Button id={board.num} onClick={deleteBoard}>
                      삭제
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <br />
      <Pagination
        aria-label="Page navigation example"
        style={{ margin: "0 auto", width: "900px" }}
      >
        {pageInfo.curPage === 1 ? (
          <PaginationItem disabled>
            <PaginationLink previous href="#" />
          </PaginationItem>
        ) : (
          <PaginationItem>
            {/* <PaginationLink previous href={"/list/" + (pageInfo.curPage - 1)} /> */}
            <PaginationLink
              previous
              onClick={() => pageChange(pageInfo.curPage - 1)}
            />
          </PaginationItem>
        )}
        {pageBtn.map((item) => {
          return (
            <PaginationItem
              key={item}
              className={item === pageInfo.curPage ? "active" : ""}
            >
              {/* url에 페이지를 넘김으로 라우트 url로 요청한것 : 화면 깜박임*/}
              {/* <PaginationLink href={"/list/" + item}>{item}</PaginationLink> */}
              {/* click함수와 매칭시켜줄때 파라미터가 없을때는 이름만 써주고,
              파라미터가 있을때는 onClick={()=>pageChange(item)}처럼 써준다.
              이름만 사용하고 파라미터를 e.target.id로 호출하여 사용할 수 있다. */}
              <PaginationLink onClick={() => pageChange(item)}>
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {pageInfo.curPage === pageInfo.endPage ? (
          <PaginationItem disabled>
            <PaginationLink next href="#" />
          </PaginationItem>
        ) : (
          <PaginationItem>
            {/* <PaginationLink next href={"/list/" + (pageInfo.curPage + 1)} /> */}
            <PaginationLink
              next
              onClick={() => pageChange(pageInfo.curPage + 1)}
            />
          </PaginationItem>
        )}
      </Pagination>
    </>
  );
};

export default BoardList;
