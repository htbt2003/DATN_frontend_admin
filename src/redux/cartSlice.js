import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    numberCart:0,
    Carts:[],
  },
  reducers: {
    // AddCart: (state, action) => {
    //     const itemInCart = state.Carts.find(
    //       (item) => item.id === action.payload.id
    //     );
    //     if (itemInCart) {
    //       if (itemInCart.quantity !== undefined) {
    //         itemInCart.quantity++;
    //       }
    //     } else {
    //       state.Carts.unshift({ ...action.payload, quantity: 1 });
    //     }
    //     state.numberCart++;
    //   },
    AddCart: (state, action) => {
      const { id, product_id } = action.payload;
    
      // Xác định sản phẩm hoặc biến thể dựa trên product_id
      const isVariant = product_id !== undefined;
      
      // Tìm sản phẩm hoặc biến thể trong giỏ hàng
      const itemInCart = state.Carts.find(
        (item) => isVariant ? item.id === id && item.product_id === product_id : item.id === id
      );
    
      if (itemInCart) {
        // Nếu sản phẩm hoặc biến thể đã tồn tại trong giỏ hàng, tăng số lượng
        itemInCart.quantity = (itemInCart.quantity || 0) + 1;
      } else {
        // Nếu chưa tồn tại, thêm mới vào giỏ hàng
        state.Carts.unshift({ ...action.payload, quantity: 1 });
      }
    
      // Tăng tổng số lượng sản phẩm trong giỏ hàng
      state.numberCart++;
    },
    
    
    IncreaseQuantity(state, action) {
        state.numberCart++;
        state.Carts[action.payload].quantity++;
    },
    DecreaseQuantity(state, action) {
        let quantity = state.Carts[action.payload].quantity;
        if(quantity>1){
            state.numberCart--;
            state.Carts[action.payload].quantity--;
        }
    },
    DeleteCart(state, action) {
        let quantity_ = state.Carts[action.payload].quantity;
        state.numberCart= state.numberCart - quantity_;
        state.Carts = state.Carts.filter(item=>{
            return item.id!=state.Carts[action.payload].id
        });
    },
    ClearCart(state) {
        state.numberCart = 0;
        state.Carts = [];
    },
  },
})

export const { AddCart, IncreaseQuantity, DecreaseQuantity, DeleteCart, ClearCart } = cartSlice.actions
export default cartSlice.reducer