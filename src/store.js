import {configureStore, createSlice} from '@reduxjs/toolkit'
import cart from "./store/cartSlice.js";  // 함수가 길어지면 export 해놓은 걸 import 해서 써도 된다.

// state 생성
let user = createSlice({
    name : 'user',
    initialState: {name : 'kim', age : 20},

    // state 변경 함수
    reducers : {
        increase(state) {
            state.age += 1;
        }
    }
})

let stock = createSlice({
    name : 'stock',
    initialState: [10, 11, 12]
})

// state 변경 함수들
export let {increase} = user.actions;
export let {add, addData} = cart.actions;

// state 등록
export default configureStore({
    reducer: {
        user : user.reducer,
        stock : stock.reducer,
        cart : cart.reducer
    }
})