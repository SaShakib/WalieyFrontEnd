const { createSlice } = require("@reduxjs/toolkit");

const CartSlice = createSlice({
  name: "Cart",
  initialState: {
    cartItem: [],
    totalAmount: 0,
    cartCount: 0,
  },

  reducers: {
    addToCart: (state, action) => {
      const cartItem = state.cartItem;
      let updatedCartItem = [];
      let totalAmount;
      const itemCount = state.cartItem.filter(
        (item) => item.id === action.payload.id
      );
      if (itemCount.length === 0) {
        updatedCartItem = [
          ...cartItem,
          {
            _id: action.payload.id,
            name: action.payload.name,
            price: Number(action.payload.price),
            quantity: action.payload.quantity,
            img: action.payload.img,
            owner: action.payload.owner,
            createdBy: action.payload.createdBy
              ? action.payload.createdBy._id
              : "",
            total: action.payload.quantity * Number(action.payload.price),
            color: action.payload.Color,
            size: action.payload.Size,
          },
        ];
      } else {
        updatedCartItem = cartItem.map((item) =>
          item._id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity + action.payload.quantity,
                total: item.total + Number(action.payload.price),
              }
            : item
        );
      }
      totalAmount = state.totalAmount + Number(action.payload.price);
      //final
      state.cartItem = updatedCartItem;
      state.totalAmount = totalAmount;
      state.cartCount = state.cartCount + 1;
    },
    clearCart: (state, action) => {
      state.cartItem = [];
      state.totalAmount = 0;
      state.cartCount = 0;
    },

    addQuantity: (state, action) => {
      const addedQuantity = state.cartItem.map((item) =>
        item._id === action.payload.id
          ? {
              ...item,

              quantity: item.quantity + 1,
              total: item.total + item.price,
            }
          : item
      );
      if (addedQuantity) {
        const price = addedQuantity[0].price;

        state.cartItem = addedQuantity;
        state.totalAmount = state.totalAmount + price;
        state.cartCount = state.cartCount + 1;
      }
    },
    removeCart: (state, action) => {
      const addedQuantity = state.cartItem.filter(
        (item) => item._id === action.payload.id
      );
      console.log(addedQuantity);
      if (addedQuantity[0].quantity > 0) {
        state.totalAmount = state.totalAmount - addedQuantity[0].total;
        state.cartCount = state.cartCount - addedQuantity[0].quantity;

        const newItem = state.cartItem.filter(
          (item) => action.payload.id !== item._id
        );
        state.cartItem = newItem;
      }
    },
    addShiping: (state, action) => {
      state.shiping = action.payload;
    },
    decreaseQuantity: (state, action) => {
      const addedQuantity = state.cartItem.filter(
        (item) => item._id === action.payload.id
      );

      if (addedQuantity[0].quantity === 1) {
        state.totalAmount = state.totalAmount - addedQuantity[0].total;
        state.cartCount = state.cartCount - 1;
        const newItem = state.cartItem.filter(
          (item) => action.payload.id !== item._id
        );
        state.cartItem = newItem;
      } else {
        const descrease = state.cartItem.map((item) =>
          item._id === action.payload.id
            ? {
                ...item,
                quantity: item.quantity - 1,
                total: item.total - item.price,
              }
            : item
        );
        if (descrease) {
          const total = descrease[0].price;

          state.cartItem = descrease;
          state.totalAmount = state.totalAmount - total;
          state.cartCount = state.cartCount - 1;
        }
      }
    },
  },
});

export const {
  addToCart,
  addQuantity,
  clearCart,
  removeCart,
  addShiping,
  decreaseQuantity,
} = CartSlice.actions;
export default CartSlice.reducer;
