import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai"

import { LogoType, NavbarType } from "@/components/news/shared/enums"
import { IAuthor, iNavSetup, iSEO } from "@/components/news/shared/interfaces"

/**
 * EXAMPLE AUTHOR
 *
 export const AUTHOR_NAME: IAuthor = {
    name: "Full Name",
    designation: "Work Designation",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    profilePic: "",
     social: [
        {
            icon: <AiFillGithub />,
            link: 'https://github.com/'
        },
        {
            icon: <AiFillLinkedin />,
            link: 'https://www.linkedin.com/'
        },
    ]
}
 */

export const KHANHND: IAuthor = {
  name: "Nguyễn Đình Khánh",
  designation: "Phóng viên",
  bio: "Phóng viên thường trú tại miền Bắc",
  profilePic: "",
  social: [
    {
      icon: <AiFillGithub />,
      link: "https://github.com/Khanh-Nguyen-Dinh",
    },
    {
      icon: <AiFillLinkedin />,
      link: "https://www.linkedin.com/in/Khanh-Nguyen-Dinh/",
    },
  ],
}

export const VIETCQ: IAuthor = {
  name: "Cao Quốc Việt",
  designation: "Phóng viên",
  bio: "Phóng viên thường trú tại miền Bắc",
  profilePic: "",
  social: [
    {
      icon: <AiFillGithub />,
      link: "https://github.com/CaoQuocViet",
    },
    {
      icon: <AiFillLinkedin />,
      link: "https://www.linkedin.com/in/CaoQuocViet/",
    },
  ],
}

// This can your company name / your name etc for SEO purposes
export const WEBSITE_NAME: string = "Next Js Blog Template"
export const WEBSITE_URL: string =
  "https://nextjs-simple-blog-template.web.app/"

/**
 * This is the main navigation setup.
 * This includes the main navbar and the side drawer.
 */
export const PRIMARY_NAV: iNavSetup = {
  type: NavbarType.DEFAULT,
  // max logo image height 40px
  // you can add logo light version if using image
  // logo: {
  //     type: LogoType.IMAGE,
  //     logo: '/images/logo.png',
  //     logoLight: '/images/logo-light.png'
  // },
  logo: {
    type: LogoType.TEXT,
    logo: "Next Blog",
  },
  // navLinks are the main navbar links that apper on top of every page
  navLinks: [],
  // sideNavLinks are the links which appear when you open the side menu after clicking the burger menu icon.
  sideNavLinks: [],
  socials: [],
}

export const DEFAULT_SEO: iSEO = {
  title: "Nextjs simple blog template",
  description: "A simple blog template using NextJS and Typescript.",
  keywords:
    "Blog, next js, template, next js blog, blog setup, typescript, nextjs typescript, react js blog template, responsive blog template",
  url: WEBSITE_URL,
  author: `${KHANHND.name}, ${VIETCQ.name}`,
  twitterHandle: "@WebExpe",
  ogImage: "/public/images/og-image.jpg",
}
