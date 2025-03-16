import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { ProductSection } from "@/components";
import products from "@/constants/products";
import axios from "axios";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const SponseredProducts = products.slice(0,8);

  const getOrdersByUser = async() => {
    try {
      const req = await axios.get("https://shopease-server-f7ke.onrender.com/api/orders/order")
      console.log(req.data)
      const ordrs = req.data.orders
      setOrders(ordrs.reverse())
    } catch (error) {
      setOrders([])
    }
  }

  useEffect(() => {
    // Mock order data
    getOrdersByUser()
  }, []);

  const handleCancelOrder = () => {
    if (selectedOrder) {
      setOrders(orders.map(order => order.id === selectedOrder.id ? { ...order, status: "Cancelled" } : order));
      setSelectedOrder(null);
    }
  };

  return (
    <div className="p-6 mx-auto min-h-screen rounded-lg shadow-lg flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>
      <div className="w-full space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order._id} className="rounded-lg shadow-md p-6 border-white flex flex-col md:flex-row items-center w-full">
              <CardContent className="w-full flex flex-col md:flex-row items-center gap-6">
                <img src={order.productImage} alt={order.productName} className="w-24 h-24 object-cover rounded-lg border" />
                <div className="flex-1 text-center md:text-left">
                  <p className="text-xl font-semibold">{order.productName}</p>
                  <p className="text-sm">Order ID: {order._id}</p>
                  <p className="text-sm">Date: {order.createdAt.split("T")[0]}</p>
                  <p className="mt-2 font-medium text-lg">Total: ${order.price}</p>
                </div>
                <div className="flex flex-col items-center md:items-end">
                  <Badge
                    className={`px-3 py-1 text-white rounded-full ${
                      order.status === "Delivered" ? "bg-green-500" :
                      order.status === "Shipped" ? "bg-blue-500" :
                      order.status === "Processing" ? "bg-yellow-500" : "bg-red-500"
                    }`}
                  >
                    {order.status}
                  </Badge>
                  {order.status !== "Cancelled" && order.status !== "Delivered" && (
                    <Button
                      onClick={() => setSelectedOrder(order)}
                      className="mt-3 bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg shadow"
                    >
                      Cancel Order
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-center">No orders found.</p>
        )}
      </div>
      <ProductSection sectionName={"Sponsered Products"} products={SponseredProducts}/>
      {/* Cancel Confirmation Dialog */}
      {selectedOrder && (
        <Dialog open={true} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent>
            <DialogHeader>
              <h2 className="text-xl font-bold">Cancel Order</h2>
            </DialogHeader>
            <p className="text-gray-600">Are you sure you want to cancel the order for {selectedOrder.name}?</p>
            <DialogFooter className="flex flex-col md:flex-row md:justify-end gap-3">
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>Close</Button>
              <Button className="bg-red-500 hover:bg-red-600" onClick={handleCancelOrder}>Confirm Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OrderPage;
