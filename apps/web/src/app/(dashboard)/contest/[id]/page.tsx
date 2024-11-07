import { ContestId } from "@/components/contestId";

export default function ContestPage({params}: {params: {id: string}}) {
    if(!params.id) {
        return <div>Contest does not exist...</div>;
    }
    return <ContestId id={params.id} /> 

    
}

export const dynamic = "force-dynamic"