import { Light as SyntaxHighlighter } from "react-syntax-highlighter"
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"

import { combineClasses } from "../../utils/utils"
import { Pre } from "./style"

const CodeBlock = ({
  code,
  className,
}: {
  code: string
  className?: string
}) => {
  return (
    <div className={combineClasses("bg-blue-500 md:p-5 p-2", className)}>
      <div className="shadow-lg">
        <SyntaxHighlighter language="tsx" style={docco}>
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}

export default CodeBlock
