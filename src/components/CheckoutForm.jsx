/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { Form, redirect } from "react-router-dom";
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch, formatPrice } from "../utils";
import { clearCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

export const action = (store, queryClient) =>async ({request}) =>{
  const formData = await request.formData()
  const {name, address} = Object.fromEntries(formData)
  const user = store.getState().userState.user

  const {cartItems, orderTotal, numItemsInCart} = store.getState().cartState;

  const info = {
    name, address, chargeTotal:orderTotal, orderTotal:formatPrice(orderTotal), 
    cartItems, numItemsInCart
  }

  try {
    const response = await customFetch.post('/orders', {data: info}, {
      headers: {
        Authorization: `Bearer ${user.tokrn}`
      }
    })
    queryClient.removeQueries(['orders'])
    store.dispatch(clearCart())
    toast.success('order placed successfully')
    return redirect('/orders')
    
  } catch (error) {
    const errormsg = error?.response?.data?.error?.message || 'there was an error placing your order'
    toast.error(errormsg)
    if (error?.response?.status === 401 || 403) return redirect('/login')
    return null
  }

  
}
const CheckoutForm = () => {
  return (
    <Form method="post" className="flex gap-y-4 flex-col">
      <h4 className="font-medium text-xl capitalize">
        shipping information
      </h4>
      <FormInput label='first name' name='name' type='text'/>
      <FormInput label='address' name='address' type='text'/>
      <div className="mt-4">
        <SubmitBtn text='Place your order' />
      </div>
    </Form>
  )
}
export default CheckoutForm