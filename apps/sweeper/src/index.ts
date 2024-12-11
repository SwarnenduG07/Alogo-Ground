import { Prisma } from "@prisma/client";
import { dbCLient } from "../db";

type SubmissionWithTestcases = Prisma.SubmissionGetPayload<{
    include: {
      testcases: true;
    };
  }>;
async function uodateSubmission(queued_Submission:SubmissionWithTestcases) {
     var isAccepted = true

     for(const testcases of queued_Submission?.testcases || []) {
        switch(testcases.status_id) {
            case 1:
            case 2:


            isAccepted = false;
            break;
            case 3:
                break;
            default:
                isAccepted = false;
                await dbCLient.submission.update({
                    where :{
                        id: queued_Submission.id,
                    },
                    data: {
                        status :"REJECTED",
                    },
                });
                return;
        }
        if(!isAccepted) {
            break;
        }
     }
     if(isAccepted && queued_Submission?.testcases) {
        
     }
}