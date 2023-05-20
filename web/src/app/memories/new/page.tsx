import Link from "next/link";

import { NewMemoryForm } from "@/components/NewMemoryForm";
import { cookies } from "next/headers";


export default function NewMemory() {
  const token = cookies().get('token')?.value

  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >voltar à timeline</Link>

      <NewMemoryForm token={token} />
    </div>
  )
}