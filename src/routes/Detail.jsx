import {useParams} from "react-router-dom";
import styled from "styled-components";
import {useContext, useEffect, useState} from "react";
import {Nav} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {addData} from "../store.js";

// let YellowButton = styled.button`
    //background: yellow;
    //color: black;
    //padding: 10px;
// `

export default function Detail(props) {
    let {id} = useParams();
    let result = props.shoes.find(data => data.id == id);
    let [count, setCount] = useState(0);
    let [show, setShow] = useState(true);
    let [checkNum, setCheckNum] = useState('');
    let [tab, setTab] = useState(0);
    let [pageFade, setPagePade] = useState('');
    let dispatch = useDispatch();
    let stockCount = 3;

    useEffect(() => {
        // 타이머
        let timer = setTimeout(() => {
            setShow(false);
        }, 2000);

        isNaN(checkNum) ? alert('숫자만 입력') : null

        let fadeTimer = setTimeout(() => {
            setPagePade('end');
        }, 10);
        
        // local storage에 상품의 번호 저장
        let watched = localStorage.getItem('watched');
        watched = JSON.parse(watched);
        console.log(result);
        watched.push(result.id);
        watched = new Set(watched);
        watched = Array.from(watched);
        console.log(watched);
        localStorage.setItem('watched', JSON.stringify(watched));

        // clean up function
        return () => {
            // 타이머 제거하는 함수 (기본 제공)
            // clearTimeout(timer);
            clearTimeout(fadeTimer);
            setPagePade('');
        }
    }, []);

    return (
        <div className={"container start " + pageFade}>
            {/* todo - 2초가 지났을 경우 alert 안보이게 하기 */}
            {
                show ?
                <div className="alert alert-warning">
                    2초 이내 구매시 할인
                </div>
                    : null
            }
            {/*<YellowButton />*/}
            <div className="row">
            <div className="col-md-6">
                    <img src={'https://codingapple1.github.io/shop/shoes' + (parseInt(id) + 1) + '.jpg'} width="100%"/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{result.title}</h4>
                    <p>{result.content}</p>
                    <p>{result.price}원</p>
                    <button className="btn btn-danger" onClick={() =>{
                        dispatch(addData({
                            id: stockCount++,
                            name: result.title,
                            count: 1
                        }));
                    }}>주문하기</button>
                    {/*<input type='text' onChange={(e) => {*/}
                    {/*    isNaN(e.target.value) ? alert('숫자만 입력') : null*/}
                    {/*    }*/}
                    {/*}/>*/}
                    <input type='text' onChange={(e) => {
                        setCheckNum(e.target.value);
                    }} />
                </div>
            </div>
            <Nav fill variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={() => {setTab(0)}}>button1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={() => {setTab(1)}}>button2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={() => {setTab(2)}}>button3</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab} shoes={props.shoes}/>
        </div>
    )
}

function TabContent(props) {
    // 탭 메뉴 fade 효과 주기
    let [fade, setFade] = useState('');

    useEffect(() => {
        let timer = setTimeout(() => {
            setFade('end');
            }, 10);

        return () => {
            clearTimeout(timer);
            setFade('')
        }
    }, [props.tab]);

    return <div className={'start ' + fade}>
            {/* [props.tab]으로 배열의 요소에 접근 */}
            {[<div>{props.shoes[0].title}</div>, <div>content2</div>, <div>content3</div>][props.tab]}
        </div>
}
