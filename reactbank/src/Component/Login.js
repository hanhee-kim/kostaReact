import { useState } from "react";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = () => {
  const formStyle = {
    width: "500px",
    margin: "20px auto",
    border: "1px solid lightgray",
    padding: "30px",
    borderRadius: "7px",
  };
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  //리덕스에서 제공하는 useDispatch사용 -> action을 사용하여 리듀서 호출
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8090/login", { id: id, password: password })
      .then((res) => {
        console.log(res);
        dispatch({ type: "ALL", payload: res.data });
        window.location.href = "/";
      })
      .catch((err) => {
        Swal.fire(err.response.data);
      });
  };

  return (
    <Form style={formStyle}>
      <h4 style={{ textAlign: "center" }}>로그인</h4>
      <br />
      <FormGroup row>
        <Label for="id" sm={3}>
          아이디
        </Label>
        <Col sm={9}>
          <Input
            type="text"
            name="id"
            id="id"
            onChange={(e) => setId(e.target.value)}
            value={id}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="password" sm={3}>
          패스워드
        </Label>
        <Col sm={9}>
          <Input
            type="text"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={12}>
          <Button color="primary" style={{ width: "100%" }} onClick={submit}>
            로그인
          </Button>
        </Col>
      </FormGroup>
    </Form>
  );
};

export default Login;
