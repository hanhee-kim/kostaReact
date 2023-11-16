import { Table, Input, Button, Label } from "reactstrap";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const WriteForm = () => {
  const [board, setBoard] = useState({ title: "", content: "", userId: "" });
  const [files, setFiles] = useState([]);
  const imgBoxRef = useRef();
  const navigate = useNavigate();

  const change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBoard({ ...board, [name]: value });
  };
  const fileChange = (e) => {
    console.log(e);
    console.log("files : " + files);
    //파일선택창에서 cancel버튼 누를시 파일을 가져오지않으면 set해주지 않는다.
    //
    //파일이 몇개 선택되었는지를 가지고 비교 취소시 0
    // if(e.target.files.length > 0){}
    console.log("선택된 파일의 갯수 : " + e.target.files.length);
    //
    //실제 벨류값의 길이를 가지고와서 비교 취소시 0
    console.log("선택파일길이" + e.target.value.length);
    if (e.target.value.length > 0) {
      setFiles([...files, e.target.files[0]]);
    }
    // const imageSrc = URL.createObjectURL(e.target.files[0]);
    // imgBoxRef.current.src = imageSrc; //원래의 이미지를 변경
  };
  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("writer", board.writer);
    formData.append("subject", board.subject);
    formData.append("content", board.content);
    // formData.append("file", files);
    for (let file of files) {
      formData.append("file", file);
    }

    axios
      .post(`http://localhost:8090/boardwrite`, formData)
      .then((res) => {
        console.log(res);
        let boardNum = res.data;
        navigate(`/detailform/${boardNum}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {}, []);
  return (
    <>
      <h5 style={{ textAlign: "center", margin: "20px auto" }}>게시판글등록</h5>
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
                  src="noImage.png"
                  width="100px"
                  height="100px"
                  id="image-box"
                  alt=""
                  ref={imgBoxRef}
                  onClick={() => document.getElementById("file").click()}
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
                {files.length !== 0 &&
                  files.map((file, index) => (
                    <span key={index}>
                      <img
                        src={URL.createObjectURL(file)}
                        width={"100px"}
                        height={"100px"}
                        style={{ marginRight: "10px" }}
                        alt=""
                      />
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
                  등록
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

export default WriteForm;
