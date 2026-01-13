import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle2, LayoutDashboard, Store } from "lucide-react";
import Link from "next/link";

const Payment = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Success Icon */}
      <div className="flex flex-col items-center gap-3 text-center">
        <CheckCircle2 size={88} className="text-green-500" />
        <h1 className="text-3xl font-bold">Order placed successfully</h1>
        <p className="text-muted-foreground">
          Thank you for your order. We’re preparing it for you.
        </p>
      </div>

      {/* Order Info Card */}
      <Card className="mt-8 w-full max-w-lg shadow-md">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Store className="text-primary" size={32} />
              <h2 className="text-lg font-semibold">Order information</h2>
            </div>
            <Badge variant="secondary" className="px-4 py-1 text-sm">
              Confirmed
            </Badge>
          </div>
          <Separator />
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Order Reference */}
          <div className="flex items-center gap-3">
            <LayoutDashboard size={18} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Order reference:
            </span>
            <Link href="/" className="font-semibold underline underline-offset-4">
              5335674238764
            </Link>
          </div>

          {/* Payment Status */}
          <div className="flex items-center gap-3">
            <LayoutDashboard size={18} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">
              Payment status:
            </span>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Paid</Badge>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Button asChild size="lg" className="mt-8">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft size={18} />
          Place another order
        </Link>
      </Button>
    </div>
  );
};

export default Payment;
