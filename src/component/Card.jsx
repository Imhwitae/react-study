import {Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export default function Card(props) {
    let navigate = useNavigate();

    return (
        <Col onClick={() => {
            navigate("/detail/" + props.shoes[props.index].id)
        }}>
            <img src={`https://codingapple1.github.io/shop/shoes${props.index + 1}.jpg`} width="80%"/>
            <h4>{props.shoes[props.index].title}</h4>
            <p>{props.shoes[props.index].content}</p>
        </Col>
    );
}