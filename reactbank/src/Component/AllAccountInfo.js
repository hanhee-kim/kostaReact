import axios from "axios";
import { useState, useEffect } from "react";
import { Form, FormGroup, Table } from "reactstrap";

function AllAccountInfo() {
  const formStyle = {
    width: "600px",
    margin: "30px auto",
    border: "solid lightgray 1px",
    borderRadius: "7px",
    padding: "30px",
  };
  const [accs, setAccs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/allaccountinfo")
      .then((res) => {
        setAccs([...res.data]);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);
  return (
    <Form style={formStyle}>
      <h4 style={{ textAlign: "center", margin: "20px" }}>전체계좌조회</h4>
      <FormGroup>
        <Table bordered>
          <thead>
            <tr>
              <th>계좌번호</th>
              <th>이름</th>
              <th>잔액</th>
              <th>종류</th>
              <th>등급</th>
            </tr>
          </thead>
          <tbody>
            {/* {accs.map(acc=> 로 사용하면 accs로 접근가능{})} */}
            {accs.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.balance}</td>
                  <td>{item.type}</td>
                  <td>{item.grade}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </FormGroup>
    </Form>
  );
}

export default AllAccountInfo;
