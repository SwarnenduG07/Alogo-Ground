import { Problems } from "@/components/problem";

export default function Page({
  searchParams,
} :{searchParams: {query: string | null}; }): JSX.Element {
  return (
    <main>
       <Problems query={searchParams.query}/>
    </main>
  )
}