import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 5000); // Redirect to homepage after 5 seconds
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-100">
            <h1 className="text-3xl font-bold text-green-600">Payment Successful! 🎉</h1>
            <p className="mt-2 text-gray-700">Thank you for your purchase.</p>
            <p className="mt-2 text-gray-700">Redirecting to homepage...</p>
        </div>
    );
};

export default Success;
