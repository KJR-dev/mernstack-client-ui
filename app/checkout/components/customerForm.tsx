"use client";
import { useEffect, useState } from "react";
import { z } from "zod";

import { getCustomer } from "@/lib/http/api";
import { Customer } from "@/lib/types";
import AddAddress from "./addAddress";

import { useQuery } from "@tanstack/react-query";
import { Coins, CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const formSchema = z.object({
  address: z.string().min(1, "Please select an address"),

  paymentMode: z.enum(["card", "cash"], {
    error: "Please select a payment mode",
  }),

  comment: z.string().optional().or(z.literal("")),
});

const CustomerForm = () => {
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [paymentMode, setPaymentMode] = useState<string>("card");

  const customerForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { data: customer, isLoading } = useQuery<Customer>({
    queryKey: ["customer"],
    queryFn: async (): Promise<Customer> => {
      const res = await getCustomer();
      return res.data as Customer;
    },
  });

  useEffect(() => {
    if (!customer?.addresses?.length) return;

    const firstDefaultIndex = customer.addresses.findIndex(
      (addr) => addr.isDefault === true
    );

    setSelectedAddress(firstDefaultIndex !== -1 ? firstDefaultIndex : 0);
  }, [customer]);

  if (isLoading) return <h3>Loading...</h3>;

  const handlePlaceOrder = (data: z.infer<typeof formSchema>) => {
    console.log("data", data);
  };

  return (
    <Form {...customerForm}>
      <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
        <div className="container mx-auto mt-16 flex flex-col gap-6 lg:flex-row">
          {/* LEFT */}
          <Card className="lg:w-3/5 border-none">
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>

            <CardContent className="grid gap-6">
              {/* Customer info */}
              <div className="grid gap-3">
                <Label>First Name</Label>
                <Input disabled value={customer?.firstName} />
              </div>

              <div className="grid gap-3">
                <Label>Last Name</Label>
                <Input disabled value={customer?.lastName} />
              </div>

              <div className="grid gap-3">
                <Label>Email</Label>
                <Input disabled value={customer?.email} />
              </div>

              {/* Address */}
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label>Address</Label>
                  {customer && <AddAddress customerId={customer._id} />}
                </div>
                <FormField
                  name="address"
                  control={customerForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            className="grid grid-cols-2 gap-6 mt-2"
                          >
                            {customer?.addresses.map((address, index) => (
                              <Card key={address.text}>
                                <div className="flex items-start space-x-2">
                                  <FormControl>
                                    <RadioGroupItem
                                      value={address.text}
                                      id={address.text}
                                    />
                                  </FormControl>

                                  <Label
                                    htmlFor={address.text}
                                    className="leading-normal"
                                  >
                                    {address.text}
                                  </Label>
                                </div>
                              </Card>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              {/* Payment Mode */}
              <div className="grid gap-3">
                <Label>Payment Mode</Label>
                <FormField
                  name="paymentMode"
                  control={customerForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            className="flex gap-6"
                          >
                            <div className="w-36">
                              <FormControl>
                                <RadioGroupItem
                                  value={"card"}
                                  id={"card"}
                                  className="peer sr-only"
                                  aria-label={"card"}
                                />
                              </FormControl>
                              <Label
                                htmlFor={"card"}
                                className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <CreditCard size={"20"} />
                                <span className="ml-2">Card</span>
                              </Label>
                            </div>
                            <div className="w-36">
                              <FormControl>
                                <RadioGroupItem
                                  value={"cash"}
                                  id={"cash"}
                                  className="peer sr-only"
                                  aria-label={"cash"}
                                />
                              </FormControl>
                              <Label
                                htmlFor={"cash"}
                                className="flex items-center justify-center rounded-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <Coins size={"20"} />
                                <span className="ml-2 text-md">Cash</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              {/* Comment */}
              <div className="grid gap-3">
                <Label>Comment</Label>
                <FormField
                  name="comment"
                  control={customerForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
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

              <Button className="mt-4 w-full">Place Order</Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </Form>
  );
};

export default CustomerForm;
