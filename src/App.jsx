import {useState} from "react";
// import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {Routes, Route, Link, useNavigate, Outlet} from "react-router-dom"

import data from './data.js'
import Card from "./component/Card.jsx";
import Detail from "./routes/Detail.jsx";
import About from "./routes/About.jsx";
import Event from "./routes/Event.jsx";


function App() {
    const [shoes, setShoes] = useState(data);
    const navigate = useNavigate();

  return (
    <>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand onClick={() => {navigate("/")}}>Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => {navigate("/")}}>Home</Nav.Link>
                    <Nav.Link onClick={() => {navigate("/detail")}}>Cart</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

        {/*링크 이동 버튼*/}
        {/*<a>가 생김*/}
        {/*<Link to="/">home</Link>*/}
        {/*<Link to="/detail">detail</Link>*/}

        {/* routes */}
        <Routes>
            <Route path="/" element={
                <>
                    {/* 대문 사진*/}
                    <div className='main-bg'></div>

                    {/*  상품  */}
                    <Container>
                        <Row>
                            {
                                shoes.map((i, j) => {
                                    return (
                                        <Card key={j} shoes={shoes} index={j}/>
                                    );
                                })
                            }
                        </Row>
                    </Container>
                </>
            }/>
            {/*파라미터는 여러개 사용 가능*/}
            <Route path="/detail/:id" element={
                <Detail shoes={shoes} />
            } />

            <Route path="/about" element={<About />}>
                <Route path="member" element={<div>Member info</div>}/>
                <Route path="location" element={<div>Location info</div>}/>
            </Route>

            <Route path="/event" element={<Event />} >
                <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>}/>
                <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
            </Route>
            <Route path="*" element={<div>Not found</div>}/>
        </Routes>

    </>
  )
}

export default App
