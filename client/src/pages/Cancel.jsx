import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/cart");
        }, 5000); // Redirect to cart after 5 seconds
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-100">
            <h1 className="text-3xl font-bold text-red-600">Payment Canceled ❌</h1>
            <p className="mt-2 text-gray-700">Your payment was not completed.</p>
            <p className="mt-2 text-gray-700">Redirecting to cart...</p>
        </div>
    );
};

export default Cancel;
