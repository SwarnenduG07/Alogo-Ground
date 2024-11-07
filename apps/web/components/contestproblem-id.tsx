export const ContestProblemTable = ({contest}: {
    contest: {
        title: string;
        description: string;
        id: string;
        problems: {
            problem :{
                id: string;
                title : string;
                difficulty: string;
                solved: number;
            };
        }[];
        contestSubmissions: {
            userId : string;
            problemId :string;
            contestId: string;
            proints: number;
        }[];
    };
}) => {
   return (
    <div> 
         <div>
             hi there
         </div>
    </div>
   )
}
