// Redirige la racine vers le site public (ex: /fr)
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/fr");
}
