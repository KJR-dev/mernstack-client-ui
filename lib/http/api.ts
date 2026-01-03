import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const ORDER_SERVICE_PREFIX = "/api/v1/order";

export const getCustomer = async () =>
  await api.get(`${ORDER_SERVICE_PREFIX}/api/v1/order/customer`);
export const addAddress = (customerId: string, address: string) =>
  api.patch(`${ORDER_SERVICE_PREFIX}/api/v1/order/customer/addresss/${customerId}`,{address});
