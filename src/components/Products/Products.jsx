import axios from "axios";
import { useEffect, useState } from "react"

const Products = () => {
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_api_url}/products?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`)
            setProducts(data);
        }
        getData();
    }, [itemsPerPage, currentPage]);

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_api_url}/products-count`)
            setCount(data.count);
        }
        getData();
    }, []);



    const handlePageButton = (val) => {
        setCurrentPage(val)
    }

    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1);

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    products?.map(product => <div key={product?._id}>
                        <div>
                            <div className="card bg-base-100 w-96 shadow-xl">
                                <figure>
                                    <img
                                        src={product?.productImage}
                                        alt="Shoes" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{product?.productName}</h2>
                                    <p>Price: ${product?.price}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>

            <div className="flex justify-center gap-6">
                <button disabled={currentPage == 1} className="btn" onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
                {
                    pages?.map(btnNum => <div key={btnNum}>
                        <button onClick={() => handlePageButton(btnNum)} className={`btn ${currentPage == btnNum ? "bg-blue-400" : ""}`}>{btnNum}</button>
                    </div>)
                }
                <button className="btn" disabled={currentPage == numberOfPages}>Next</button>
            </div>
        </div>
    )
}

export default Products