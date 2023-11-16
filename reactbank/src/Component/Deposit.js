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
import Swal from "sweetalert2";

function Deposit() {
  const formStyle = {
    width: "600px",
    margin: "30px auto",
    border: "solid lightgray 1px",
    borderRadius: "7px",
    padding: "30px",
  };
  const [id, setId] = useState("");
  const [money, setMoney] = useState(0);
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const submit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8090/deposit/${id}`, { money: money })
      .then((res) => {
        setMessage(`${res.data.id}님의 잔액은 ${res.data.balance}원입니다.`);
        console.log(res.data);
        toggle();
        setId("");
        setMoney(0);
      })
      .catch((err) => {
        console.log(err.response.data);
        Swal.fire(err.response.data);
      });
  };

  return (
    <div>
      <Form style={formStyle}>
        <h4 style={{ textAlign: "center" }}>입금</h4>
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
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="money">
            입금액
          </Label>
          <Col sm={9}>
            <Input
              type="text"
              name="money"
              id="money"
              onChange={(e) => {
                setMoney(e.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={12} style={{ marginTop: "20px" }}>
            <Button color="primary" style={{ width: "100%" }} onClick={submit}>
              입금
            </Button>
          </Col>
        </FormGroup>
      </Form>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>입금 성공</ModalHeader>
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

export default Deposit;
