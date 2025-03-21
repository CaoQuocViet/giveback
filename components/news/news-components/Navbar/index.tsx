import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

import { PRIMARY_NAV } from "../../NEWS_CONSTANTS/_NEW_SETUP"
import { NavbarType, THEMES } from "../../shared/enums"
import {
  addBodyNoScroll,
  combineClasses,
  getDeviceType,
  removeBodyNoScroll,
  webShare,
} from "../../utils/utils"
import Search from "../Search"
import SocialShareModal from "../SocialShare/SocialShareModal"
import CenteredNavbar from "./Centered"
import NavSidebar from "./NavSideBar"
import classes from "./Navbar.module.scss"
import SimpleNavbar from "./SimpleNavbar"

const Navbar = () => {
  const { theme, setTheme } = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  const [openSidebar, setOpenSidebar] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [openShareModal, setOpenShareModal] = useState(false)

  useEffect(() => {
    showSearch
      ? addBodyNoScroll()
      : () => {
          return
        }
    return () => {
      removeBodyNoScroll()
    }
  }, [showSearch])

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const [scrolled, setScrolled] = useState(false)
  let lastScrollTop = 0
  useEffect(() => {
    setIsMobile(getDeviceType() === "tablet" || getDeviceType() === "mobile")

    window.onscroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop
      const scrollYDistance = window.scrollY
      if (scrollYDistance > 0 && st > lastScrollTop) {
        setScrolled(true)
      } else if (scrollYDistance > 50 && st < lastScrollTop) {
        setScrolled(false)
      }
      lastScrollTop = st <= 0 ? 0 : st
    }

    return () => {
      setScrolled(false)
    }
  }, [])

  const openSearch = () => {
    setShowSearch(true)
  }

  const toggleSideMenu = () => {
    setOpenSidebar(!openSidebar)
  }

  const onShareClick = () => {
    if (!webShare()) {
      setOpenShareModal(true)
    }
  }

  return null
}

export default Navbar
