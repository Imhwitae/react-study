import {createContext, lazy, Suspense, useEffect, useState} from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Col, Container, Nav, Navbar, Row} from "react-bootstrap";
import {Routes, Route, Link, useNavigate, Outlet} from "react-router-dom"
import axios from "axios";

import data from './data.js'
import Card from "./component/Card.jsx";
// import Detail from "./routes/Detail.jsx";
import About from "./routes/About.jsx";
import Event from "./routes/Event.jsx";
import Cart from "./routes/Cart.jsx";
import {useQuery} from "react-query";

// lazy loading
const Detail = lazy(() => import('./routes/Detail.jsx'));

// let Context1 = createContext();


function App() {
    const [shoes, setShoes] = useState(data);
    const navigate = useNavigate();
    let [product, setProduct] = useState([10, 11, 12]);

    // Local Storage
    let obj = {name: 'kim'};
    // localStorage.setItem('name', obj);
    localStorage.setItem('name', JSON.stringify(obj));

    let data2 = localStorage.getItem('name');
    // console.log(JSON.parse(data2));

    // 페이지에 접속했을 때 생성
    useEffect(() => {
        if (localStorage.getItem('watched').length < 0) {
            localStorage.setItem('watched', JSON.stringify([]));
        }
    }, [])

    // react-query 사용해서 서버에서 데이터 가져오기 (실시간이면 유용함)
    // useQuery로 감싸면 성공/실패/로딩 쉽게 파악 가능
    // 자동으로 재요청(refetch) 해줌
    // 실패시 retry 해줌
    // state 공유 안해도 된다. 다른 컴포넌트에서 아래와 같은 요청을 해도 요청을 두 번 하지 않는다.
    // 결과 캐싱. 이전에 가져왔던 데이터를 먼저 보여준다.
    let userInfo = useQuery('user', () => {
        return axios.get('https://codingapple1.github.io/userdata.json')
            .then((user) => {
               return user.data
            })
    })
    
    // userInfo.data -> data 확인
    // userInfo.error -> error일 때 true
    // userInfo.isLoading -> data를 가져오는 중일 때
    


  return (
    <>
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand onClick={() => {navigate("/")}}>Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={() => {navigate("/detail/0")}}>detail</Nav.Link>
                    <Nav.Link onClick={() => {navigate("/cart")}}>Cart</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                    {userInfo.isLoading && '로딩중'}
                    {userInfo.error && '에러'}
                    {userInfo.data && userInfo.data.name}
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
                    {/* 서버에서 가져온 데이터 shoes 데이터에 추가 */}
                    <button onClick={() => {
                        // 로딩 중... UI 띄우기
                        axios.get('https://codingapple1.github.io/shop/data2.json')
                        .then((data) => {
                            let shoesCopy = [...shoes, ...data.data];
                            setShoes(shoesCopy);
                        // 로딩 중... UI 숨기기
                        }).catch(() => {
                            // 로딩 중... UI 숨기기
                            console.log('fail');
                        })
                    //  응용: 버튼 2회 누를 때 7,8,9번 상품 가져오기
                    //  버튼 누른 횟수를 저장해서 해보자
                    }}>버튼</button>
                </>
            }/>
            {/*파라미터는 여러개 사용 가능*/}
            <Route path="/detail/:id" element={
                // <Context1.Provider value={{product, shoes}}>
                // 로딩창 띄우기
                <Suspense fallback={<div>loading..</div>}>
                    <Detail shoes={shoes}/>
                </Suspense>
                // </Context1.Provider>
            } />
            <Route path="/cart" element={
                <Cart />
            }/>

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
