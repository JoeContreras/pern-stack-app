import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const navigate= useNavigate()

    const saveProduct= async(e: React.FormEvent) => {
        e.preventDefault()
        try{
            await axios.post('http://localhost:5000/products', {name, price})
            navigate('/')
        }catch(error){
            console.error(error)
        }
    }

  return (
    <form onSubmit={saveProduct} className="max-w-sm mx-auto pt-6">
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Product Name
        </label>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
    <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Price
        </label>
        <input
            type="number"
            id="price"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
        ></input>
    </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default AddProduct;
