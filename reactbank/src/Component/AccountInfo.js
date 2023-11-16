import axios from "axios";
import { useState } from "react";
import { Form, FormGroup, Label, Col, Input, Button, Table } from "reactstrap";
import Swal from "sweetalert2";

function AccountInfo() {
  const formStyle = {
    width: "700px",
    margin: "20px auto",
    border: "1px solid lightgray",
    padding: "30px",
    borderRadius: "7px",
  };
  const [id, setId] = useState("");
  const [acc, setAcc] = useState({
    id: "",
    name: "",
    balance: 0,
    type: "normal",
    grade: "",
  });
  //특정요소가 보여지도록
  const [show, setShow] = useState(false);
  const changeInput = (e) => {
    setId(e.target.value);
    // setAcc({ ...acc, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8090/accountinfo/${id}`)
      .then((res) => {
        console.log(res.data);
        setAcc(res.data);
        setShow(true);
      })
      .catch((err) => {
        console.log(err.response.data);
        Swal.fire(err.response.data);
      });
  };

  // const selectAccount=(e)=> {
  //     let sacc = {...acc};

  //     if(sacc.account==='') {
  //         Swal.fire({
  //             title: '계좌번호를 입력하세요.',
  //             icon: 'warning'
  //         });
  //     } else {

  //     }
  // }

  return (
    <Form style={formStyle}>
      <h4 style={{ textAlign: "center", marginBottom: "40px" }}>계좌조회</h4>
      <FormGroup row>
        <Label sm={3} for="examAccount">
          계좌번호
        </Label>
        <Col sm={6}>
          <Input type="text" name="id" id="id" onChange={changeInput} />
        </Col>
        <Col sm={3}>
          <Button
            color="primary"
            style={{ paddingRight: "20px", paddingLeft: "20px" }}
            onClick={submit}
          >
            조회
          </Button>
        </Col>
      </FormGroup>
      {show && (
        <Table bordered>
          <tbody>
            <tr>
              <th scope="row">계좌번호</th>
              <td>{acc.id}</td>
            </tr>
            <tr>
              <th scope="row">이름</th>
              <td>{acc.name}</td>
            </tr>
            <tr>
              <th scope="row">잔액</th>
              <td>{acc.balance}</td>
            </tr>
            <tr>
              <th scope="row">계좌종류</th>
              <td>{acc.type}</td>
            </tr>
            {acc.type === "special" && (
              <tr>
                <th scope="row">등급</th>
                <td>{acc.grade}</td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
      {/* <FormGroup hidden>
        <Table bordered>
          <tbody>
            <tr>
              <th scope="row">계좌번호</th>
              <td>10001</td>
            </tr>
            <tr>
              <th scope="row">이름</th>
              <td>홍길동</td>
            </tr>
            <tr>
              <th scope="row">잔액</th>
              <td>100000</td>
            </tr>
            <tr>
              <th scope="row">계좌종류</th>
              <td>normal</td>
            </tr>
          </tbody>
        </Table>
      </FormGroup> */}
    </Form>
  );
}

export default AccountInfo;
