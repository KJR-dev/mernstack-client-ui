import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { addAddress } from "@/lib/http/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
});

const AddAddress = ({ customerId }: { customerId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addressForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["address", customerId],
    mutationFn: async (address: string) => {
      return await addAddress(customerId, address);
    },
    onSuccess: () => {
      addressForm.reset();
      setIsModalOpen(false);
      return queryClient.invalidateQueries({ queryKey: ["customer"] });
    },
  });

  const handleAddressAdd = (data: z.infer<typeof formSchema>) => {
    mutate(data.address);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="link">
          <Plus size={16} className="mr-2" />
          Add New Address
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...addressForm}>
          <form
            onSubmit={addressForm.handleSubmit(handleAddressAdd)}
            className="space-y-4"
          >
            <DialogHeader>
              <DialogTitle>Add Address</DialogTitle>
              <DialogDescription>
                Save address for faster checkout next time.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={addressForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Enter full address"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <LoaderCircle className="animate-spin" />
                    <span>Please wait...</span>
                  </span>
                ) : (
                  "Save change"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddress;
