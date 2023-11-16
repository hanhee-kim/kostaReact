import { Form, FormGroup, Label, Col, Input, Button } from "reactstrap";
import { useState } from 'react';
import { useBoardList } from "../Component/BoardListContext";

const WriteForm=()=> {
    // 현재 날짜를 가져옵니다.
    const today = new Date();
    // 날짜 포맷 (추후 YYYY-MM-DD로 변경)
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

    // 게시글 목록 읽어옴
    const { boardList, setBoardList } = useBoardList();
    // 게시글 
    const [board, setBoard] = useState({num:0, writer:"", title:"", content:"", date:formattedDate, views:0, img:""});

    const change=(e)=> {
        let name = e.target.name;
        let value = e.target.value;
        setBoard({...board, [name]:value});
        console.log("board: ", board);
    }

    // 작성 버튼 (baordList 추가)
    const goDetailForm=()=> {
        setBoard({...board, num:boardList.length + 1});
        setBoardList([...boardList, board ]);
        console.log("boardList: ", boardList);
        window.location.href = "/detailform/num=" + board.num;
    }

    // 다시쓰기 버튼
    const goWriteForm=()=> {
        window.location.href = "/writeform";
    }

    const formStyle = {width:"50%", textAlign:"center", display:"inline-block", border:"solid lightgray 1px", borderRadius: "7px", padding: "15px"}
    return (
        <>
            <h5 style={{margin:"20px"}}>게시판글 등록</h5>
            <Form style={formStyle}>
                <FormGroup row>
                    <Label sm={3}>글쓴이</Label>
                    <Col sm={9}>
                        <Input type="text" name="writer" value={board.writer} onChange={change}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3}>제&nbsp;&nbsp;목</Label>
                    <Col sm={9}>
                        <Input type="text" name="title" value={board.title} onChange={change}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3}>내&nbsp;&nbsp;용</Label>
                    <Col sm={9}>
                        <Input type="textarea" name="content" value={board.content} onChange={change} style={{height:"400px"}}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label sm={3}>이미지 파일 첨부</Label>
                    <Col sm={9}>
                        <Input type="file" name="img" value={board.img} onChange={change}/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" onClick={goDetailForm}>등록</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button color="primary" onClick={goWriteForm}>다시쓰기</Button>
                </FormGroup>
            </Form>
        </>
    )
}

export default WriteForm;