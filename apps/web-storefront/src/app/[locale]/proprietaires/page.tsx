import { redirect } from "next/navigation";

export default function ProprietairesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  redirect(`/${locale}`);
}
