import { Form, FormGroup, Col, Input, Table, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";

const BoardList=()=> {
    const goWriteForm=()=> {
        window.location.href = "/writeform";
    }

    return (
        <Form style={{width:"60%", textAlign:"center", display:"inline-block"}}>
            <h4 style={{margin:"20px"}}>게시판글 목록</h4>
            <FormGroup row>
                <Col sm={2}></Col>
                <Col sm={2}>
                    <Input type="select" name="select" id="select">
                        <option value="title">제목</option>
                        <option value="writer">작성자</option>
                    </Input>
                </Col>
                <Col sm={2}>
                    <Input type="text" name="seach" id="search">
                    </Input>
                </Col>
                <Col sm={2}>
                    <Button>검색</Button>
                </Col>
                <Col sm={2}>
                    <Button color="success" onClick={goWriteForm}>글쓰기</Button>
                </Col>
            </FormGroup>
            <FormGroup>
                <Table bordered id="boardTable">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>날짜</th>
                            <th>조회수</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td><a href="">1</a></td>
                                <td>제목1</td>
                                <td>홍길동</td>
                                <td>2023-04-01</td>
                                <td>5</td>
                                <td><Button>삭제</Button></td>
                            </tr>
                            <tr>
                                <td><a href="">2</a></td>
                                <td>제목2</td>
                                <td>고길동</td>
                                <td>2023-04-02</td>
                                <td>4</td>
                                <td><Button>삭제</Button></td>
                            </tr>
                            <tr>
                                <td><a href="">3</a></td>
                                <td>제목3</td>
                                <td>가길동</td>
                                <td>2023-04-03</td>
                                <td>2</td>
                                <td><Button>삭제</Button></td>
                            </tr>
                            <tr>
                                <td><a href="">4</a></td>
                                <td>제목4</td>
                                <td>나길동</td>
                                <td>2023-04-04</td>
                                <td>5</td>
                                <td><Button>삭제</Button></td>
                            </tr>
                            <tr>
                                <td><a href="">5</a></td>
                                <td>제목5</td>
                                <td>다길동</td>
                                <td>2023-04-05</td>
                                <td>7</td>
                                <td><Button>삭제</Button></td>
                            </tr>
                        </tbody>
                </Table>
            </FormGroup>
            <FormGroup style={{display:"inline-block"}}>
                <Pagination size="md">
                    <PaginationItem>
                        <PaginationLink previous href="a"/>
                    </PaginationItem>
                    <PaginationItem active>
                        <PaginationLink href="?page=1">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="?page=2">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="?page=3">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="?page=4">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="?page=5">5</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink next href="#"/>
                    </PaginationItem>
                </Pagination>
            </FormGroup>
        </Form>

    )
}

export default BoardList;