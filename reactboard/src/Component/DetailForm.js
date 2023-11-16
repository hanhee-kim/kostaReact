import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { useParams } from 'react-router-dom';
import { useBoardList } from "../Component/BoardListContext";

const DetailForm=()=> {
    // url에서 게시글 번호 가져옴
    const { num } = useParams();
    const numInt = parseInt(num, 10);

    // 게시글 목록 읽어옴
    const { boardList, setBoardList } = useBoardList();
    console.log("boardList: ", boardList);
    // 게시글 
    const board = boardList.find(item => item.num === numInt);
    console.log("board: ", board);

    // 목록 버튼
    const goBoardList=()=> {
        window.location.href = "/boardlist";
    }

    const formStyle = {width:"50%", textAlign:"center", display:"inline-block", border:"solid lightgray 1px", borderRadius: "7px", padding: "15px"}
    return (
        <>
            <h5 style={{margin:"20px"}}>게시판글 상세</h5>
            <Form style={formStyle}>
                <FormGroup row>
                    <Label sm={2}>글쓴이</Label>
                    <Col sm={10}>
                        <Input type="text" disabled value={board.writer}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>제&nbsp;&nbsp;목</Label>
                    <Col sm={10}>
                        <Input type="text" disabled value={board.title}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>내&nbsp;&nbsp;용</Label>
                    <Col sm={10}>
                        <Input type="textarea" disabled value={board.content} style={{height:"400px"}}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={2}>이미지</Label>
                    <Col sm={10} style={{textAlign:"left"}}>
                        <img src={board.img} width="200px" height="200px" alt=""/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Button color="primary">수정</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button color="primary" onClick={goBoardList}>게시판 목록</Button>
                </FormGroup>
            </Form>
        </>
    )
}

export default DetailForm;