import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: {
      user: "userLogged",
      updatedAt: Date.now().toLocaleString(),
      total: null,
      items: [],
    },
  },

  reducers: {
    addItem: (state, action) => {
      const productRepeated = state.value.items.find(
        (item) => item.id === action.payload.id
      );
      if (productRepeated) {
        const itemsUpdated = state.value.items.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity += action.payload.quantity;
            return item;
          }
          return item;
        });
        const total = itemsUpdated.reduce(
          (acc, currentItem) =>
            (acc + currentItem.price * currentItem.quantity),
          0
        );
        state.value = {
          ...state.value,
          items: itemsUpdated,
          total,
          updatedAt: new Date().toLocaleString(),
        };
      } else {
        state.value.items.push(action.payload);
        const total = state.value.items.reduce(
          (acc, currentItem) =>
            (acc + currentItem.price * currentItem.quantity),
          0
        );
        state.value = {
          ...state.value,
          total,
          updatedAt: new Date().toLocaleString(),
        };
      }
    },

    removeItem: (state, action) => {
      //Primero filtra los elementos que no coincidan con el id, eliminándolos/modificando el array original. Luego calcula el nuevo total, sumando los precios de los elementos ya actualizados y devuelve un array actualizado.

      const updatedItems = state.value.items.filter(
        (item) => item.id !== action.payload.id
      );

      const total = updatedItems.reduce(
        (acc, currentItem) => acc + currentItem.price * currentItem.quantity,
        0
      );

      state.value = {
        ...state.value,
        items: updatedItems,
        total,
        updatedAt: new Date().toLocaleString(),
      };
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;