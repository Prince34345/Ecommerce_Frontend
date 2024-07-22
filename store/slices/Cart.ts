import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ProductInfo {
    ProductId: number
    Gender: string
    Category: string
    SubCategory: string
    ProductType: string
    Colour: string
    Usage: string
    ProductTitle: string
    ImageURL: string
    UnitPrice: GLfloat
}
interface IntialState {
    items: Array<ProductInfo & { quantity: number }>,
    totalQuantity: number,
    totalAmount: number
}
const intialState: IntialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0
}
export type SingleProduct = ProductInfo & { quantity: number }
const CartSlice = createSlice({
    name: 'cart',
    initialState: intialState,
    reducers: {
        updateCart(state, action: PayloadAction<SingleProduct>) {
            const index = state.items.findIndex(item => String(item.ProductId) === String(action.payload.ProductId));

            if (index === -1) {
                state.items.push(action.payload);
            } else {
                state.items[index] = action.payload;
            }

            const total = state.items.reduce((quantityAcc: number, quantityCrrValue) => {
                return quantityAcc += quantityCrrValue.quantity
            }, 0)
            const totalPrice = state.items.reduce((priceAcc: number, item) => {
                return priceAcc += (item.UnitPrice * item.quantity)
            }, 0)
            state.totalQuantity = total
            state.totalAmount = totalPrice
        },
        RemoveItemfromCart(state, action: PayloadAction<SingleProduct>) {
            const index = state.items.findIndex((item, index) => {
                return item.ProductId == action.payload.ProductId
            })
            state.items.splice(index, 1)
            const total = state.items.reduce((quantityAcc: number, quantityCrrValue) => {
                return quantityAcc += quantityCrrValue.quantity
            }, 0)
            const totalPrice = state.items.reduce((priceAcc: number, item) => {
                return priceAcc += (item.UnitPrice * item.quantity)
            }, 0)
            state.totalQuantity = total
            state.totalAmount = totalPrice
        },

    }
})
export const { updateCart, RemoveItemfromCart } = CartSlice.actions
export default CartSlice.reducer