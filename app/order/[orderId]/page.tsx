"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OrderStatus from "./components/orderStatus";
import { Separator } from "@/components/ui/separator";
import { Banknote, Coins, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";

const SingleOrder = () => {
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
              <h2 className="font-semibold">Rakesh K</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                55, New Street, Upper Lane, New Delhi, India - 409876
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
                <span className="text-muted-foreground">ord121313123131313</span>
              </div>

              <div className="flex items-center gap-3">
                <Banknote size={18} />
                <span className="font-medium">Payment status:</span>
                <span className="text-green-600 font-medium">Paid</span>
              </div>

              <div className="flex items-center gap-3">
                <Coins size={18} />
                <span className="font-medium">Payment method:</span>
                <span className="capitalize">Card</span>
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
