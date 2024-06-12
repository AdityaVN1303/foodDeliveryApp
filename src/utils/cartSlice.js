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
            console.log(action.payload);
            state.items.filter((item)=>{
                item.id != action.payload
            })
            state.items.length--;
        },
        clearCart : (state)=>{
            state.items.length = 0;
        }
    }
})

export const {addItem , removeItem , clearCart} = cartSlice.actions
export default cartSlice.reducer;