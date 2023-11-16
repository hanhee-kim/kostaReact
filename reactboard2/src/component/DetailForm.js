import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Table, Input, Button, Label } from "reactstrap";

const DetailForm = () => {
  //라우터에서 넘긴 파라미터의 이름과 같아야  useParams로 받을 수 있다.
  const { num } = useParams();
  const [heart, setHeart] = useState(false); //로그인한 회원이 좋아요를 눌렀었으면 true로
  const [board, setBoard] = useState({
    num: null,
    subject: "",
    content: "",
    writedate: "",
    fileurl: "",
    writer: "",
    viewcount: null,
    likecount: null,
  });
  const [images, setImages] = useState([]);
  //navigate는 url을 넘기는 것과 같다.
  //장점은 파라미터를 같이 넘길 수 있다.
  const navigate = useNavigate();
  const boardModify = (num) => {
    navigate("/modifyform/" + num);
  };
  const likeUpdate = () => {
    axios.post(`http://localhost:8090/boardlike`);
  };
  const likeBoard = (e) => {
    if (heart) {
      //true면(눌러져있으면)
      setHeart(false);
    } else {
      setHeart(true);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8090/boarddetail/${num}`)
      .then((res) => {
        console.log(res);
        setBoard({ ...res.data });
        let fileurl = res.data.fileurl;
        let filenums = fileurl.split(",");
        setImages([...filenums]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <h5 style={{ textAlign: "center", margin: "20px auto" }}>게시판글상세</h5>
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
                  id="writer"
                  required="required"
                  disabled
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
                  id="subject"
                  required="required"
                  disabled
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
                  cols="40"
                  rows="15"
                  required="required"
                  disabled
                  value={board.content}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Label for="file">이미지</Label>
              </td>
              <td>
                {images.length !== 0 &&
                  images.map((num, index) => (
                    <span>
                      <img
                        key={num}
                        src={`http://localhost:8090/img/${num}`}
                        alt=""
                        width={"100px"}
                        height={"100px"}
                        style={{ marginRight: "10px" }}
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
                {/* file  한개였을때 */}
                {/* {board.fileurl && (
                  <img
                    src={`http://localhost:8090/img/${board.fileurl}`}
                    alt=""
                    width={"100px"}
                  />
                )} */}
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <Button color="primary" onClick={() => boardModify(board.num)}>
                  수정
                </Button>
                &nbsp;&nbsp; &nbsp;&nbsp;
                <Button color="primary" tag="a" href="/list/1">
                  게시판목록
                </Button>
                &nbsp;&nbsp;
                <img
                  src={heart ? "/redheart.png" : "/blackheart.png"}
                  alt=""
                  width={"30px"}
                  height={"30px"}
                  onClick={likeBoard}
                />
                &nbsp;<span>{board.likecount}</span>
                &nbsp;
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default DetailForm;
