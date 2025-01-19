

import { useLoaderData, useLocation, useNavigate } from "react-router-dom"


const ComplexPaginationContainer = () => {
  const {meta} = useLoaderData()
  const {pageCount, page} = meta.pagination;

  

  const {search, pathname} = useLocation()
  const navigate = useNavigate()
  const handleChange = (pageNumber)=>{
    const searchParams =new URLSearchParams(search)
    searchParams.set('page', pageNumber)
    navigate(`${pathname}?${searchParams.toString()}`)
  }

  const addPageButton = ({pageNumber, activeClass}) =>{
    return <button key={pageNumber} onClick={() => handleChange(pageNumber)}
    className={`btn btn-xs sm:btn-md border-none join-item ${activeClass ?
      'bg-base-300': ''
    }`}
    >
      {pageNumber}
    </button>
  }

  const renderPageButtons = ()=>{
    const pageButtons = []
    // page 1
    pageButtons.push(addPageButton({pageNumber:1, activeClass:page === 1}))
    //dots
    if (page < pageCount - 1) {
      pageButtons.push(<button className="join-item btn btn-xs sm:btn-md" key='dots-2'>...</button>)
    }
    
    //active page/ current page
    if (page !== 1 && page !== pageCount) {
      pageButtons.push(addPageButton({pageNumber:page, activeClass: page}))
    }
    
    // last page
    pageButtons.push(addPageButton({pageNumber:pageCount, activeClass:page === pageCount}))
    return pageButtons

  }

  if (pageCount < 2)  return null
  
  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button className="btn btn-xs sm:btn-md join-item" onClick={()=> {
          let prevPage = page - 1
          if(prevPage < 1) prevPage = pageCount
          handleChange(prevPage)}}>
          prev
        </button>
        {renderPageButtons()}
        <button className="btn btn-xs sm:btn-md join-item" onClick={()=> {
           let nextPage = page + 1
           if(nextPage >  pageCount) nextPage = 1
          handleChange(nextPage)}}>
          next
        </button>
      </div>
    </div>
  )
}
export default ComplexPaginationContainer