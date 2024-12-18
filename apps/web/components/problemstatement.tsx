import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
const ProblemStatement = ({description} : {
    description: string,
}) => {
  return (
    <div className='prose lg:prose-sm dark:prose-gray dark:prose-h2:text-gray-200 dark:prose-h4:text-gray-200'>
       <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown> 
    </div>
  )
}

export default ProblemStatement
