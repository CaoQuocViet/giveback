import { useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai"
import { BsFillShareFill } from "react-icons/bs"

import { LogoType, THEMES } from "../../shared/enums"
import { iNavLink, iNavSocials, iNavbar } from "../../shared/interfaces"
import { combineClasses, transformImagePaths } from "../../utils/utils"
import LinkTo from "../LinkTo"
import NavCatergoryDD from "../Misc/NavCategoryDD"
import classes from "./Navbar.module.scss"

const CenteredNavbar = ({
  openSearch,
  toggleSideMenu,
  openSidebar = false,
  navSetup,
  onShareClick,
}: iNavbar) => {
  const { navLinks, socials, logo } = navSetup

  const [openDD, setOpenDD] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <div className={"container"}>
      <div className="flex items-center justify-between px-3">
        <div className="flex" style={{ width: "120px" }}>
          <div
            className={combineClasses(
              classes.mobileBurgerToggle,
              "mr-3",
              openSidebar ? classes.mobileBurgerToggle__close : " "
            )}
            onClick={() => toggleSideMenu()}
          >
            <AiOutlineMenu className="text-2xl text-black dark:text-white" />
          </div>
          <div
            className={combineClasses(classes.search_icon_wrapper)}
            onClick={() => openSearch()}
          >
            <button
              name="search"
              aria-label="search"
              className="text-black dark:text-white"
            >
              <AiOutlineSearch className="text-[24px]" />
            </button>
          </div>
          <div className="" onClick={() => onShareClick()}>
            <button name="share" aria-label="share page">
              <BsFillShareFill className="ml-3 mt-[7px] text-[18px] text-black dark:text-white" />
            </button>
          </div>
        </div>

        <LinkTo href="/" passHref={true}>
          {logo ? (
            logo.type === LogoType.IMAGE ? (
              <Image
                src={
                  theme === THEMES.DARK
                    ? transformImagePaths(logo.logoLight)
                    : transformImagePaths(logo.logo)
                }
                alt="Avatar"
                width={100}
                height={100}
              />
            ) : (
              <span className="text-[22px] font-semibold">{logo.logo}</span>
            )
          ) : (
            <span className="text-[22px] font-semibold">Logo</span>
          )}
        </LinkTo>

        <div className="flex justify-end" style={{ width: "120px" }}>
          {socials &&
            socials.map((each: iNavSocials, i: any) => (
              <a
                href={each.link}
                target="_blank"
                rel="noopener noreferrer"
                key={each.link}
                className={combineClasses(
                  "dark:text-white text-black text-[24px] d-inline-block",
                  i === socials.length - 1 ? "ml-3" : "mx-3"
                )}
              >
                {each.icon}
              </a>
            ))}
        </div>
      </div>
      <div className="font-regular d-sm-none mt-3 flex items-center justify-center text-[14px]">
        {navLinks.map((each: iNavLink, i: any) =>
          each.type !== "dropdown" ? (
            !each.newTab ? (
              <LinkTo
                href={each.path}
                key={i}
                passHref={true}
                className="mx-2 font-normal"
              >
                {each.label}
              </LinkTo>
            ) : (
              <a
                href={each.path}
                key={each.path}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-2 block flex-wrap font-normal	"
              >
                {each.label}
              </a>
            )
          ) : (
            <NavCatergoryDD
              label={each.label}
              openDD={openDD}
              setOpenDD={() => setOpenDD(!openDD)}
              floating
            />
          )
        )}
      </div>
    </div>
  )
}

export default CenteredNavbar
