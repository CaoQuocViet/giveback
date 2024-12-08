import { useState } from "react"
import { AiFillCaretRight } from "react-icons/ai"

import { combineClasses } from "../../utils/utils"

interface iAccordian {
  title: string
  children: any
  keepOpen: boolean
}

const Accordian = ({
  title = "Accordian Title",
  children,
  keepOpen = false,
}: iAccordian) => {
  const [open, setOpen] = useState(keepOpen)

  const openAccordian = () => {
    setOpen(!open)
  }

  return (
    <div className="my-3 w-full border-b border-slate-300 pb-1">
      <h3
        className="flex cursor-pointer items-start justify-between text-[18px] font-bold transition-opacity hover:opacity-80 md:items-center md:text-xl"
        onClick={openAccordian}
      >
        {title}{" "}
        <AiFillCaretRight
          className={combineClasses(
            "md:text-[30px] text-[25px] md:pt-0 pt-1 transition-transform text-blue-500 dark:text-white ml-3 shrink-0",
            open ? "-rotate-90" : "rotate-90"
          )}
        />
      </h3>
      <div
        className={combineClasses(
          "md:text-[18px] text-[16px]  text-slate-700 dark:text-slate-300 font-regular overflow-hidden transition-all w-full ring-blue-200 rounded px-3",
          open ? "max-h-[300px] my-3 ring-1 p-2 " : "max-h-[0px]"
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default Accordian
