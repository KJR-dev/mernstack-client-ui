"use client";
import { Tenant } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const TenantSelect = ({ tenants }: { tenants: { data: Tenant[] } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (value: string) => {
    router.push(`/?tenantId=${value}`);
  };
  return (
    <Select onValueChange={handleValueChange} defaultValue={searchParams.get('tenantId') || ''}>
      <SelectTrigger className="w-45 focus:ring-0">
        <SelectValue placeholder="Select Restaurant" />
      </SelectTrigger>
      <SelectContent>
        {tenants?.data.map((tenant) => (
          <SelectItem value={String(tenant.id)} key={tenant.id}>
            {tenant.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default TenantSelect;
