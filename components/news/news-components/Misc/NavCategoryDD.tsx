import { BiChevronDown } from "react-icons/bi"

import { combineClasses, getCategories } from "../../utils/utils"
import LinkTo from "../LinkTo"

interface INavCatergoryDD {
  openDD: boolean
  setOpenDD: any
  label: string
  floating?: boolean
}

const NavCatergoryDD = ({
  openDD,
  setOpenDD,
  label,
  floating = false,
}: INavCatergoryDD) => {
  const CATEGORIES = getCategories()
  return (
    <>
      <div className={"relative"}>
        <div
          className={combineClasses(
            "flex items-center cursor-pointer",
            floating ? "mx-2" : "justify-between"
          )}
          onClick={() => setOpenDD(!openDD)}
        >
          <p className="my-0">{label}</p>
          <BiChevronDown className="text-[20px]" />
        </div>
        <div
          className={combineClasses(
            "overflow-auto",
            floating
              ? "absolute w-[180px] z-20 top-[30px] rounded-[4px] shadow-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-0"
              : "relative",
            openDD ? "h-auto" : "h-0 border-0"
          )}
        >
          <LinkTo href={"/blog"} passHref className="block p-2 text-sm">
            <span onClick={() => setOpenDD(!openDD)}>All Articles</span>
          </LinkTo>
          {CATEGORIES &&
            CATEGORIES.map((each) => (
              <LinkTo
                href={"/blog?category=" + each}
                key={each}
                passHref
                className="block border-t border-gray-400 p-2 text-sm"
              >
                <span
                  style={{ textTransform: "capitalize" }}
                  onClick={() => setOpenDD(!openDD)}
                >
                  {each}
                </span>
              </LinkTo>
            ))}
        </div>
      </div>
    </>
  )
}

export default NavCatergoryDD
