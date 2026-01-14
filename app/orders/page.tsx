import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order } from "@/lib/types";
import { cookies } from "next/headers";
import Link from "next/link";

const Orders = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_ORDER_URL}/api/v1/order/orders/mine`,
    {
      headers: {
        Authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching orders");
  }

  const orders: Order[] = (await response.json()) || [];

  const formatDate = (date: string) =>
    new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const statusBadge = (status: string) => (
    <Badge variant="outline" className="px-3">
      {status.toUpperCase()}
    </Badge>
  );

  return (
    <div className="flex justify-center px-4 py-10 bg-muted/30 min-h-screen">
      {/* CARD CENTERED */}
      <Card className="w-full max-w-6xl shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Orders</CardTitle>
          <CardDescription>My complete order history.</CardDescription>
        </CardHeader>

        <CardContent>
          {orders.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">No orders yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="mx-auto">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center w-[180px]">ID</TableHead>
                    <TableHead className="text-center">Payment Status</TableHead>
                    <TableHead className="text-center">Method</TableHead>
                    <TableHead className="text-center">Date Time</TableHead>
                    <TableHead className="text-center">Order Status</TableHead>
                    <TableHead className="text-center">Amount</TableHead>
                    <TableHead className="text-center">Details</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id} className="hover:bg-muted/40">
                      {/* ID */}
                      <TableCell className="text-center font-medium truncate max-w-[180px]">
                        {order._id}
                      </TableCell>

                      {/* Payment Status */}
                      <TableCell className="text-center">{order.paymentStatus.toUpperCase()}</TableCell>

                      {/* Payment Method */}
                      <TableCell className="text-center capitalize">
                        {order.paymentMode}
                      </TableCell>

                      {/* Date */}
                      <TableCell className="text-center text-sm text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </TableCell>

                      {/* Order Status */}
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          {statusBadge(order.orderStatus)}
                        </div>
                      </TableCell>

                      {/* Amount */}
                      <TableCell className="text-center font-semibold">
                        ₹{order.total}
                      </TableCell>

                      {/* Action */}
                      <TableCell className="text-center">
                        <Link
                          href={`/order/${order._id}`}
                          className="text-primary hover:underline font-medium"
                        >
                          More details
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
