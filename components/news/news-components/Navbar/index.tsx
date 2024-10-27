import { NavbarType, THEMES } from "../../shared/enums";
import SimpleNavbar from "./SimpleNavbar";
import CenteredNavbar from "./Centered";
import { useEffect, useState } from "react";
import {
  addBodyNoScroll,
  combineClasses,
  getDeviceType,
  removeBodyNoScroll,
  webShare,
} from "../../utils/utils";
import NavSidebar from "./NavSideBar";
import Search from "../Search";
import { PRIMARY_NAV } from "../../../../NEWS_CONSTANTS/_BLOG_SETUP";
import { useTheme } from "next-themes";
import classes from "./Navbar.module.scss";
import SocialShareModal from "../SocialShare/SocialShareModal";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);

  useEffect(() => {
    showSearch
      ? addBodyNoScroll()
      : () => {
          return;
        };
    return () => {
      removeBodyNoScroll();
    };
  }, [showSearch]);

  const changeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const [scrolled, setScrolled] = useState(false);
  let lastScrollTop = 0;
  useEffect(() => {
    setIsMobile(getDeviceType() === "tablet" || getDeviceType() === "mobile");

    window.onscroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const scrollYDistance = window.scrollY;
      if (scrollYDistance > 0 && st > lastScrollTop) {
        setScrolled(true);
      } else if (scrollYDistance > 50 && st < lastScrollTop) {
        setScrolled(false);
      }
      lastScrollTop = st <= 0 ? 0 : st;
    };

    return () => {
      setScrolled(false);
    };
  }, []);

  const openSearch = () => {
    setShowSearch(true);
  };

  const toggleSideMenu = () => {
    setOpenSidebar(!openSidebar);
  };

  const onShareClick = () => {
    if (!webShare()) {
      setOpenShareModal(true);
    }
  };

  return null;
};

export default Navbar;
