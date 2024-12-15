import Navbar from "@/components/navbar";
import { Problems } from "@/components/problem";

export default function Page({
  searchParams,
} :{searchParams: {query: string | null}; }): JSX.Element {
  return (
    <main>
      <Navbar />
       <Problems query={searchParams.query}/>
    </main>
  )
}
// export const dynamic = "force-dynamic";