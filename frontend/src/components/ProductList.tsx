import axios from "axios";
import { Link } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";

  export interface Product {
    id: number;
    name: string;
    price: number;
  }


const ProductList = () => {
    const {mutate} = useSWRConfig()

  const fetcher = async (): Promise<Product[]> => {
    const res = await axios.get("http://localhost:5000/products");
    return res.data;
  };

  const { data } = useSWR("products", fetcher);

  if (!data) {
    return (
      <div className="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
          loading...
        </div>
      </div>
    );
  }

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      mutate("products");
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <div className="relative overflow-x-auto py-8">
        <Link
          to={`/add`}
          className=" focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 "
        >
          Add Product
        </Link>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-8">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((product: Product, index: number) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={`${product.id}${index}`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.id}
                </th>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">
                  <Link
                    to={`/edit/${product.id}`}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteProduct(product.id)}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductList;
