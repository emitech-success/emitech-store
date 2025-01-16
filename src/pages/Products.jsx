/* eslint-disable react-refresh/only-export-components */

import { Filters, PaginationContainer, ProductContainer } from "../components"
import { customFetch } from "../utils"

const url = '/products'
export const loader = async ({request})=>{
 const params = Object.fromEntries([
  ...new URL(request.url).searchParams.entries()
 ])
 
  
  const response = await customFetch(url, {
    params
  })
  const meta = response.data.meta
  const products = response.data.data
  return {products, meta, params }
  
}

const Products = () => {
  
 
  return (
    <>
      <Filters />
      <ProductContainer />
      <PaginationContainer />
    </>
  )
}
export default Products