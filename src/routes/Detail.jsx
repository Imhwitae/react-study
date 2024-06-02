import {useParams} from "react-router-dom";
import styled from "styled-components";

// let YellowButton = styled.button`
    //background: yellow;
    //color: black;
    //padding: 10px;
// `

export default function Detail(props) {
    let {id} = useParams();
    let result = props.shoes.find(data => data.id == id);
    console.log(result);

    return (
        <div className="container">
            {/*<YellowButton />*/}
            <div className="row">
                <div className="col-md-6">
                    <img src={result.img} width="100%"/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{result.title}</h4>
                    <p>{result.content}</p>
                    <p>{result.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    )
}