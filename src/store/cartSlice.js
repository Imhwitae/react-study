import {createSlice} from "@reduxjs/toolkit";

let cart = createSlice({
    name : 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        // count 늘리는 함수
        add(state, action) {
            let index = state.findIndex(arr =>  arr.id === action.payload );
            // array나 object는 return을 쓰지 않아도 된다 immer 라이브러리가 사본을 만들어 줌
            state[index].count += 1;
        },

        addData(state, action) {
            state.push(action.payload);
        }
    }
})

export default cart;