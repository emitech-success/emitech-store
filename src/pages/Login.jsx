/* eslint-disable react-refresh/only-export-components */
import { Form, Link, redirect, } from "react-router-dom"
import { FormIput, SubmitBtn } from "../components"
import { customFetch } from "../utils"
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice"


export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post('/auth/local', data);
     store.dispatch(loginUser(response.data));
     console.log(response)
     toast.success('Logged in successfully');
     return redirect('/');
  
   } catch (error) {
     const errormsg = error?.response?.data?.error?.message || 'please double check your credentials'
     toast.error(errormsg)
   } 
  
  return null
}

const Login = () => {
  
  
  return (
    <section className="h-screen grid place-items-center">
      <Form method="post" className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-3xl text-center font-bold">
          login
        </h4>
        <FormIput type='email' label='email' name='identifier' defaultValue='test@test.com'/>
        <FormIput type='password' label='password' name='password' defaultValue='secret'/>
        <div className="mt-4">
          <SubmitBtn text='login'/>
        </div>
          <p className="text-center">
            Not a member yet? <Link to='/register' 
            className="ml-2 link link-hover link-primary capitalize">
              register
            </Link>
          </p>
      </Form>
    </section>
  )
}
export default Login