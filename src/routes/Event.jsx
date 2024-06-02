import {Outlet} from "react-router-dom";

export default function Event(props) {
    return (
        <>
            <div><h4>오늘의 이벤트</h4></div>
            <Outlet></Outlet>
        </>
    );
}