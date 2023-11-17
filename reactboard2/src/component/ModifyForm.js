import { Table, Input, Button, Label } from "reactstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ModifyForm = () => {
  const { num } = useParams();
  const [board, setBoard] = useState({ title: "", content: "", userId: "" });
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const imgBoxRef = useRef();
  const navigate = useNavigate();
  let selectImg = null;

  useEffect(() => {
    axios
      .get(`http://localhost:8090/boarddetail/${num}`)
      .then((res) => {
        console.log(res);
        setBoard(res.data.board);
        let fileurl = res.data.board.fileurl; //1,2,3
        let filenums = fileurl.split(","); //1,2,3-> [1 2 3]
        let filearr = []; // [{type:"img",data:1},{type:"img",data:2},{type:"img",data:3}]
        for (let filenum of filenums) {
          //배열에 복사해서 스테이트에 넣어줌
          filearr.push({ type: "img", data: +filenum });
        }
        setFiles([...filearr]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBoard({ ...board, [name]: value });
  };
  const imageClick = (e) => {
    selectImg = e;
    document.getElementById("file").click();
  };

  const plusClick = (e) => {
    selectImg = null;
    document.getElementById("file").click();
  };
  const fileChange = (e) => {
    if (e.target.files.length === 0) return;
    if (selectImg == null) {
      setFiles([...files, { type: "file", data: e.target.files[0] }]);
    } else {
      let id = selectImg.target.id;
      files.splice(id, 1, { type: "file", data: e.target.files[0] });
      setFiles([...files]);
    }

    console.log("files" + files);
  };

  //익명함수로 정의하고 index를 매개변수로 받아도 된다.
  const deleteImg = (e) => {
    let idx = e.target.dataset.idx;
    console.log(idx);
    files.splice(idx, 1);
    setFiles([...files]);
    console.log(files);
  };

  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("num", board.num);
    formData.append("writer", board.writer);
    formData.append("subject", board.subject);
    formData.append("content", board.content);
    console.log(files.length);
    //파일넘기기(배열로 넘기면 스트링배열로 넘어감)
    //자바스크립트의 파일타입인 Blob를 사용 -> 자바에서 넘겨받을때 타입이  Blob타입이라면 멀티파트파일로 받을 수 있다.
    for (let file of files) {
      if (file.type === "img") {
        //첫번째 파라미터 : 변수명 , 두번째 : 타입 , 세번째 : 이름(이름을 지정하지 않으면 오리지널파일명을 가지고간다)
        formData.append("file", new Blob(), file.data); //빈파일
      } else {
        formData.append("file", file.data);
      }
    }

    axios
      .post(`http://localhost:8090/boardmodify`, formData)
      .then((res) => {
        console.log(res);
        let boardNum = res.data;
        navigate(`/detailform/${boardNum}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h5 style={{ textAlign: "center", margin: "20px auto" }}>게시판글수정</h5>
      <div
        style={{
          margin: "0 auto",
          width: "600px",
          border: "1px solid lightgray",
          borderRadius: "7px",
          padding: "10px",
        }}
      >
        <Table borderless>
          <tbody>
            <tr>
              <td>
                <Label for="writer">글쓴이</Label>
              </td>
              <td>
                <Input
                  type="text"
                  name="writer"
                  onChange={change}
                  id="writer"
                  required="required"
                  value={board.writer}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label for="subject">제 목</Label>
              </td>
              <td>
                <Input
                  name="subject"
                  type="text"
                  onChange={change}
                  id="subject"
                  required="required"
                  value={board.subject}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label for="content">내 용</Label>
              </td>
              <td>
                <Input
                  type="textarea"
                  id="content"
                  name="content"
                  onChange={change}
                  cols="40"
                  rows="15"
                  required="required"
                  value={board.content}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label for="file"> 이미지 파일 첨부 </Label>
              </td>
              <td>
                <img
                  src="/plus.png"
                  width="100px"
                  height="100px"
                  id="image-box"
                  alt=""
                  onClick={plusClick}
                />
                <br />
                <br />
                <Input
                  name="file"
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={fileChange}
                  hidden
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label for="file">이미지</Label>
              </td>
              <td>
                {files.length !== 0 &&
                  files.map((fileInfo, index) => (
                    <span key={index}>
                      <div style={{ display: "inline-block" }}>
                        <img
                          src={
                            fileInfo.type === "img"
                              ? `http://localhost:8090/img/${fileInfo.data}`
                              : URL.createObjectURL(fileInfo.data)
                          }
                          // src={file.{URL.createObjectURL(file.data)}}
                          // src={`http://localhost:8090/img/${file.num}`}
                          width={"100px"}
                          height={"100px"}
                          style={{ marginRight: "10px" }}
                          alt=""
                          onClick={imageClick}
                          id={index}
                        />
                        <img
                          src="/xIcon.png"
                          width={"20px"}
                          height={"20px"}
                          style={{ marginLeft: "-10px" }}
                          onClick={deleteImg}
                          data-idx={index}
                        />
                      </div>
                      {/* {index} */}
                      {(index + 1) % 3 === 0 ? (
                        <>
                          <br />
                          <br />
                        </>
                      ) : (
                        ""
                      )}
                    </span>
                  ))}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <Button color="primary" onClick={submit}>
                  수정완료
                </Button>
                &nbsp;&nbsp;
                <Button color="primary" type="reset">
                  다시쓰기
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ModifyForm;
