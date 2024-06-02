import {Col} from "react-bootstrap";

export default function Card(props) {
    return (
        <Col>
            <img src={props.shoes[props.index].img} width="80%"/>
            <h4>{props.shoes[props.index].title}</h4>
            <p>{props.shoes[props.index].content}</p>
        </Col>
    );
}