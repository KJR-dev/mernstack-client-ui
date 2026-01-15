import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Banknote, Coins, LayoutDashboard } from "lucide-react";
import OrderStatus from "./components/orderStatus";
import { cookies } from "next/headers";
import { Order } from "@/lib/types";

const SingleOrder = async ({ params }: { params: Promise<{ orderId: string }> }) => {
    const orderId = (await params).orderId;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ORDER_URL}/api/v1/order/orders/${orderId}?fields=address,paymentStatus,paymentMode`,
      {
        headers: {
          Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch single order");
    }
    const order: Order = await response.json();

  return (
    <div className="flex justify-center px-4 py-8 bg-muted/30 min-h-screen">
      {/* PAGE WRAPPER */}
      <div className="w-full max-w-6xl space-y-6">
        {/* ORDER STATUS CARD */}
        <Card className="shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Order</CardTitle>
            <CardDescription>Track the order status</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderStatus />
          </CardContent>
        </Card>

        {/* DETAILS SECTION */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* DELIVERY ADDRESS */}
          <Card className="w-full md:w-1/3 shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Delivery Address</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <h2 className="font-semibold">{order.customerId.firstName+" "+order.customerId.lastName}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {order.address}
              </p>
            </CardContent>
          </Card>

          {/* ORDER INFO */}
          <Card className="w-full md:w-2/3 shadow-sm">
            <CardHeader className="p-4">
              <CardTitle className="text-lg">Your order information</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-3">
              <div className="flex items-center gap-3">
                <LayoutDashboard size={18} />
                <span className="font-medium">Order reference:</span>
                              <span className="text-muted-foreground">{order._id}</span>
              </div>

              <div className="flex items-center gap-3">
                <Banknote size={18} />
                <span className="font-medium">Payment status:</span>
                              <span className="text-green-600 font-medium">{ order.paymentStatus.toUpperCase()}</span>
              </div>

              <div className="flex items-center gap-3">
                <Coins size={18} />
                <span className="font-medium">Payment method:</span>
                              <span className="capitalize">{ order.paymentMode.toUpperCase()}</span>
              </div>

              <Button variant="destructive" className="mt-6 w-fit">
                Cancel Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
