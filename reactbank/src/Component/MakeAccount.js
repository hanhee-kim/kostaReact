import { useState } from "react";
import { Button, Form, FormGroup, Label, Col, Input } from "reactstrap";
import Swal from "sweetalert2";
import axios from "axios";

function MakeAccount() {
  const formStyle = {
    width: "600px",
    margin: "30px auto",
    border: "solid lightgray 1px",
    borderRadius: "7px",
    padding: "30px",
  };
  const [acc, setAcc] = useState({
    id: "",
    name: "",
    balance: 0,
    type: "normal",
    grade: "",
  });

  const changeInput = (e) => {
    setAcc({ ...acc, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    let sacc = { ...acc };
    if (sacc.type === "normal") {
      sacc.grade = "";
    }
    console.log(sacc);
    axios
      .post("http://localhost:8090/makeaccount", sacc)
      .then((res) => {
        console.log(res.data);
        Swal.fire(res.data);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire(err.response.data);
      });

    // if (sacc.type === "special" && sacc.grade === "") {
    //   Swal.fire({
    //     title: "등급을 선택해주세요.",
    //     icon: "warning",
    //   });
    // } else {
    //   Swal.fire({
    //     title: "계좌가 개설되었습니다.",
    //     icon: "success",
    //   });
    // }
  };

  return (
    <Form style={formStyle}>
      <h4 style={{ textAlign: "center" }}>계좌개설</h4>
      <br />
      <FormGroup row>
        <Label sm={3} for="id">
          계좌번호
        </Label>
        <Col sm={9}>
          <Input type="text" name="id" id="id" onChange={changeInput} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={3} for="name">
          이름
        </Label>
        <Col sm={9}>
          <Input type="text" name="name" id="name" onChange={changeInput} />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label sm={3} for="balance">
          입금액
        </Label>
        <Col sm={9}>
          <Input
            type="text"
            name="balance"
            id="balance"
            onChange={changeInput}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="type" sm={3} check>
          계좌종류
        </Label>
        <Label sm={4}>
          <Input
            type="radio"
            name="type"
            id="type"
            value="normal"
            onChange={changeInput}
            checked={acc.type === "normal"}
          />
          일반계좌
        </Label>
        <Label sm={4}>
          <Input
            type="radio"
            name="type"
            id="type"
            value="special"
            onChange={changeInput}
          />
          특수계좌
        </Label>
      </FormGroup>
      <FormGroup row>
        <Label for="grade" sm={3}>
          등급
        </Label>
        <Col sm={9}>
          <Input
            type="select"
            name="grade"
            id="grade"
            onChange={changeInput}
            disabled={acc.type === "normal"}
          >
            <option disabled selected hidden>
              선택하세요 ㅋㅋ
            </option>
            <option value="VIP">VIP</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Normal">Normal</option>
          </Input>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={12} style={{ marginTop: "20px" }}>
          <Button color="primary" style={{ width: "400px" }} onClick={submit}>
            계좌개설
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
}

export default MakeAccount;
