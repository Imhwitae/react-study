import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {add, increase} from "../store.js";
import {memo, useEffect, useState} from "react";

export default function Cart() {

    // Redux store의 state 꺼내기
    let item = useSelector((state) => state);
    // console.log(cartItem);
    // store.js로 요청을 보내주는 함수
    let dispatch = useDispatch();
    let copyCart = [...item.cart];

    // memo: Child 컴포넌트로 전달되는 props가 변할 때 마다 재렌더링해준다.
    //       얘는 기존 props와 신규 props를 서로 비교 하는 과정을 거치기 때문에 전송되는 props가 길고 복잡할 경우
    //       컴포넌트 로딩이 오래걸릴 수 있다.
    let Child = memo( function() {
        console.log('render')
        return <div>child</div>
    })

    return (
        <>
            <Child />
            {item.user.age}의 장바구니
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
                </thead>
                <tbody>
                {
                    item.cart.map((a, i) => {
                        console.log(copyCart);

                        return (
                            <tr key={i}>
                                <td>{item.cart[i].id}</td>
                                <td>{item.cart[i].name}</td>
                                <td>{item.cart[i].count}</td>
                                <td><button onClick={() => {
                                    // dispatch(increase());
                                    dispatch(add(i));
                                }}>+</button></td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
            <Test />
        </>
    );
}

function Test() {
    let [count, setCount] = useState(0);
    let [age, setAge] = useState(20);

    useEffect(() => {
        if (count !== 0 && count < 3) {
            setAge(age + 1);
        }
    }, [count]);

    return (
        <div>
            <div>age: {age}</div>
            <button onClick={() => {
                setCount(count + 1);
            }}>up</button>
        </div>
    )
}