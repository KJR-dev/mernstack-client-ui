import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import CustomerForm from "./components/customerForm";

export default async function Checkout({
  searchParams,
}: {
  searchParams: Promise<{ tenantId?: string }>;
}) {
  //   const [paymentMode, setPaymentMode] = useState("card");
  //   const [coupon, setCoupon] = useState("");
  const sParams = new URLSearchParams(await searchParams);
  const existingQueryString = sParams.toString();
  sParams.append("return-to", `/checkout?${existingQueryString}`);
  const session = await getSession();
  if (!session) {
    redirect(`/login?${sParams}`);
  }

  return <CustomerForm />;
}
