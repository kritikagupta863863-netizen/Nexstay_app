import { redirect } from "next/navigation";

export default function BillingRoot() {
  redirect("/billing/revenue");
}
