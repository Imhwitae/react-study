import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {add, increase} from "../store.js";

export default function Cart() {

    // Redux store의 state 꺼내기
    let item = useSelector((state) => state);
    // console.log(cartItem);
    // store.js로 요청을 보내주는 함수
    let dispatch = useDispatch();
    let copyCart = [...item.cart];

    return (
        <>
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
        </>
    );
}