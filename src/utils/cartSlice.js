import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart" , 
    initialState : {
        items : []
    },
    reducers : {
        addItem : (state , action)=>{
            state.items.push(action.payload);
                }, 
        removeItem : (state , action)=>{
            console.log("recieved" +  action.payload);
            console.log("initial" +  state.items);
            state.items = state.items.filter(item=> Number(item.id) !== Number(action.payload))
        },
        clearCart : (state)=>{
            state.items.length = 0;
        }
    }
})

export const {addItem , removeItem , clearCart} = cartSlice.actions
export default cartSlice.reducer;