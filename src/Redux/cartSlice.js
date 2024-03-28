import {createSlice} from '@reduxjs/toolkit';

const initialState  = {
    carts:[]
}

export const cartSlice  = createSlice({
    name:'cartslice',
    initialState,
    reducers : {

        addToCart : (state,action)=>{

            const itemIndex = state.carts.findIndex((item)=>item.id===action.payload.id)
            if(itemIndex>=0)
            {
              state.carts[itemIndex].qnty+=1;
            }
            else
            {
                const temp = {...action.payload,qnty:1}
                state.carts = [...state.carts,temp]
            }
           
        },
    removeToCart : (state,action)=>
    {
        state.carts  = state.carts.filter((ele)=>ele.id!==action.payload)
        
    },

    emptyCartItem : (state,action)=>
    { 
           state.carts = [];
    },

    removeSingleItems:(state,action)=>
    {
        const itemIndex_dec = state.carts.findIndex((item)=>item.id===action.payload.id)

        if(state.carts[itemIndex_dec].qnty>=1)
        {
            state.carts[itemIndex_dec].qnty-=1;
        }
    }


    }
})


export const {addToCart,removeToCart,emptyCartItem,removeSingleItems} = cartSlice.actions;
export default cartSlice.reducer;