import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../app/helpers/axios";

export const CreateOrder = createAsyncThunk("Order/create", async (form) => {
    const CreateOrders = await axios.post('/orders/', form)
    return CreateOrders.data
});

export const Orders = createAsyncThunk('Orders/all', async () => {
    const orders = await axios.get('/orders')
    return orders.data
})

