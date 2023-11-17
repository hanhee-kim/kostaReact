import axios from "axios";
import { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

function Withdraw() {
  const formStyle = {
    width: "600px",
    margin: "30px auto",
    border: "solid lightgray 1px",
    borderRadius: "7px",
    padding: "30px",
  };

  const [acc, setAcc] = useState({
    id: "",
    money: 0,
  });
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const toggle = () => {
    setModal(!modal);
  };
  const changeInput = (e) => {
    setAcc({ ...acc, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8090/withdraw", acc)
      .then((res) => {
        setMessage(`${res.data.id}계좌의 잔액은 ${res.data.balance}원 입니다.`);
        setAcc({ id: "", money: 0 });
        toggle();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  return (
    <div>
      <Form style={formStyle}>
        <h4 style={{ textAlign: "center" }}>출금</h4>
        <br />
        <FormGroup row>
          <Label sm={3} for="account">
            계좌번호
          </Label>
          <Col sm={9}>
            <Input
              type="text"
              name="id"
              id="id"
              value={acc.id}
              onChange={changeInput}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="amount">
            출금액
          </Label>
          <Col sm={9}>
            <Input
              type="text"
              name="money"
              id="money"
              value={acc.money}
              onChange={changeInput}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={12} style={{ marginTop: "20px" }}>
            <Button
              onClick={submit}
              color="primary"
              value={acc.money}
              style={{ width: "100%" }}
            >
              출금
            </Button>
          </Col>
        </FormGroup>
      </Form>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>출금 성공</ModalHeader>
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            확인
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Withdraw;
