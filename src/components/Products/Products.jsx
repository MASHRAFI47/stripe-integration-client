import axios from "axios";
import { useEffect, useState } from "react"

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const { data } = await axios(`${import.meta.env.VITE_api_url}/products`)
            setProducts(data);
        }
        getData();
    }, []);

    console.log(products)

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
        </div>
    )
}

export default Products