import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "./ProductList";

const EditProduct = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const navigate= useNavigate()
    const {id} = useParams()

    const updateProduct= async(e: React.FormEvent) => {
        e.preventDefault()
        try{
            await axios.patch(`http://localhost:5000/products/${id}`, {name, price})
            navigate('/')
        }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchProduct = async () :Promise<void>  => {
            try{
                const res = await axios.get<Product>(`http://localhost:5000/products/${id}`)
                setName(res.data.name)
                setPrice(res.data.price)
            }catch(error){
                console.error(error)
            }
        }
        fetchProduct()
    } , [id])

  return (
    <form onSubmit={updateProduct} className="max-w-sm mx-auto pt-6">
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
        Update
      </button>
    </form>
  );
};

export default EditProduct;
