/* eslint-disable react/prop-types */
import { useState } from "react";
import { formatPrice } from "../utils";


const FormRange = ({label, size, name, price}) => {
  const step = 1000
  const maxPrice = 100000;
  const [selectedPrice, setSelectedPrice] = useState(price || maxPrice)
  const dollarPrice = formatPrice(selectedPrice)
  return (
    <div className="form-control">
      <label htmlFor={name} className='label cursor-pointer'>
        <span className="label-text capitalize">{label}</span>
        <span>{dollarPrice}</span>
      </label>
      <input type="range" name={name} max={maxPrice} min={0} value={selectedPrice}
      onChange={(e) => setSelectedPrice(e.target.value)}
      step={step} className={`range range-primary ${size}`}
      />
      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-md">0</span>
        <span className="font-bold text-md">Max: {formatPrice(maxPrice)}</span>
      </div>
    </div>
  )
}
export default FormRange