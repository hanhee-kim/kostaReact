import { Link } from "react-router-dom";
import "./Header.css";

const Header=()=> {
    const style = {backgroundColor:'#F5F5F5', width:'100%', textAlign:'left'};

    return (
        <div style={style}>
            <ul className="nav-items">
                <li className="nav-item">
                    <Link to={"/main"} id="logo"><i><b>kosta.com</b></i></Link>
                </li>
                <li className="nav-item">
                    <Link to={"/login"}>로그인</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/join"}>회원가입</Link>
                </li>
                <li className="nav-item">
                    <Link to={"/boardlist"}>게시판</Link>
                </li>
            </ul>
        </div>
    )
}

export default Header;