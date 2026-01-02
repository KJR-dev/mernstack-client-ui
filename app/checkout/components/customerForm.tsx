"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCustomer } from "@/lib/http/api";
import { Customer } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { useQuery } from "@tanstack/react-query";
import { Coins, CreditCard, Plus } from "lucide-react";

const CustomerForm = () => {
  const { data: customer, isLoading } = useQuery({
    queryKey: ["customer"],
    queryFn: async () => {
      return await getCustomer().then((res) => res.data);
    },
  });
  if (isLoading) {
    return <h3>Loading.....</h3>;
  }
  return (
    <div className="container mx-auto mt-16 flex flex-col gap-6 lg:flex-row">
      {/* LEFT */}
      <Card className="lg:w-3/5 border-none">
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="fname">First Name</Label>
            <Input
              id="fname"
              placeholder="Enter first name"
              defaultValue={(customer as Customer)?.firstName}
              disabled
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Enter last name"
              defaultValue={(customer as Customer)?.lastName}
              disabled
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              defaultValue={(customer as Customer)?.email}
              disabled
            />
          </div>

          {/* Address */}
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label>Address</Label>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="link">
                    <Plus size={16} className="mr-2" />
                    Add New Address
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Address</DialogTitle>
                    <DialogDescription>
                      Save address for faster checkout next time.
                    </DialogDescription>
                  </DialogHeader>

                  <Textarea placeholder="Enter full address" />

                  <DialogFooter>
                    <Button>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <RadioGroup
              defaultValue="1"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                {
                  id: "1",
                  label: "123, ABC Street, Malad West, Mumbai, Maharashtra 400064",
                },
                {
                  id: "2",
                  label: "Flat 501, Sunshine Apartments, Andheri East, Mumbai 400069",
                },
              ].map((address) => (
                <Card key={address.id} className="p-4">
                  <div className="flex items-start gap-2">
                    <RadioGroupItem value={address.id} />
                    <Label className="leading-normal">{address.label}</Label>
                  </div>
                </Card>
              ))}
            </RadioGroup>
          </div>

          {/* Payment Mode */}
          <div className="grid gap-3">
            <Label>Payment Mode</Label>
            <RadioGroup
              //   value={paymentMode}
              //   onValueChange={setPaymentMode}
              className="flex gap-4"
            >
              {[
                { value: "card", label: "Card", icon: CreditCard },
                { value: "cash", label: "Cash", icon: Coins },
              ].map(({ value, label, icon: Icon }) => (
                <Label
                  key={value}
                  htmlFor={value}
                  className="flex h-16 w-36 cursor-pointer items-center justify-center gap-2 rounded-md border-2 hover:bg-accent peer-data-[state=checked]:border-primary"
                >
                  <RadioGroupItem value={value} id={value} className="sr-only" />
                  <Icon size={20} />
                  {label}
                </Label>
              ))}
            </RadioGroup>
          </div>

          <div className="grid gap-3">
            <Label>Comment</Label>
            <Textarea placeholder="Any special instructions?" />
          </div>
        </CardContent>
      </Card>

      {/* RIGHT */}
      <Card className="lg:w-2/5 border-none self-start">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>

        <CardContent className="grid gap-4">
          {[
            ["Subtotal", "₹8130"],
            ["Taxes", "₹82"],
            ["Delivery", "₹100"],
            ["Discount", "₹0"],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <span>{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}

          <hr />

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹8300</span>
          </div>

          <div className="flex gap-3">
            <Input
              placeholder="Coupon code"
              //   value={coupon}
              //   onChange={(e) => setCoupon(e.target.value)}
            />
            <Button variant="outline">Apply</Button>
          </div>

          <Button className="mt-4 w-full">Place Order</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerForm;
