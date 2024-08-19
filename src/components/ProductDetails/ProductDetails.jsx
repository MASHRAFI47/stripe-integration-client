import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import useAxiosCommon from "../../hooks/useAxiosCommon";

const ProductDetails = () => {
    const { id } = useParams();
    const axiosCommon = useAxiosCommon();

    const { data: product, isLoading } = useQuery({
        queryKey: ['product'],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/product-details/${id}`)
            return data
        }
    })

    console.log(product)

    return (
        <div className="container mx-auto">
            <img src={product?.productImage} className="w-96" alt="" />
            <p className="text-2xl"><span className="font-bold">Price:</span> ${product?.price}</p>
            <button className="btn btn-primary">Buy Now</button>
        </div>
    )
}

export default ProductDetails