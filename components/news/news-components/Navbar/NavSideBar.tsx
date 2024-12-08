import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs"
import { MdOutlineClose } from "react-icons/md"

import { LinkTo, Text } from "../../news-components"
import { THEMES } from "../../shared/enums"
import { iNavLink, iNavSetup, iNavSocials } from "../../shared/interfaces"
import {
  addBodyNoScroll,
  combineClasses,
  getCategories,
  removeBodyNoScroll,
} from "../../utils/utils"
import NavCatergoryDD from "../Misc/NavCategoryDD"
import classes from "./Navbar.module.scss"

interface IProps {
  openSidebar: boolean
  closeNavSidebar: () => void
  navSetup: iNavSetup
  changeTheme: () => void
}

const NavSidebar = ({
  openSidebar = false,
  closeNavSidebar,
  navSetup,
  changeTheme,
}: IProps) => {
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    openSidebar ? addBodyNoScroll() : removeBodyNoScroll()

    return () => {
      removeBodyNoScroll()
    }
  }, [openSidebar])

  const env = process.env.NODE_ENV
  const [openDD, setOpenDD] = useState(false)

  return null
}

export default NavSidebar
