import { createSlice } from "@reduxjs/toolkit"

interface IntialState {
    items: any[],
    totalQuantity: number,
    totalAmount: number
}
const intialState: IntialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
}

// const CartSlice = createSlice()