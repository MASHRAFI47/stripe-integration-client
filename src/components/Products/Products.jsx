import axios from "axios";
import { useEffect, useState } from "react"

const Products = () => {
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);

    const [search, setSearch] = useState("");
    const [brand, setBrand] = useState("");

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_api_url}/products?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}&brand=${brand}&search=${search}`)
            setProducts(data);
        }
        getData();
    }, [itemsPerPage, currentPage, brand, search]);

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_api_url}/products-count?brand=${brand}&search=${search}`)
            setCount(data.count);
        }
        getData();
    }, [brand, search]);



    const handlePageButton = (val) => {
        setCurrentPage(val)
    }


    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(element => element + 1);


    return (
        <div className="container mx-auto">
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" onChange={e => {setSearch(e.target.value); setCurrentPage(1)}} />
            <br />
            <br />

            <select className="select select-bordered w-full max-w-xs" onChange={e => {setBrand(e.target.value); setCurrentPage(1)}} value={brand}>
                <option disabled selected>Who shot first?</option>
                <option>MSI</option>
                <option>Asus</option>
                <option>Lenovo</option>
            </select>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    products?.map(product => <div key={product?._id}>
                        <div>
                            <div className="card bg-base-100 shadow-xl border mt-3">
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