import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import useAxiosCommon from "../../hooks/useAxiosCommon";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Form/CheckoutForm";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

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

    if(isLoading) return <LoadingSpinner />


    return (
        <div className="container mx-auto">
            <img src={product?.productImage} className="w-96" alt="" />
            <p className="text-2xl"><span className="font-bold">Price:</span> ${product?.price}</p>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>Buy Now</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm product={product} />
                    </Elements>
                    {/* <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
                </div>
            </dialog>
        </div>
    )
}

export default ProductDetails