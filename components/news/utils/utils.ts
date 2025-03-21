import { usePathname } from "next/navigation"
import { useRouter } from "next/router"

import { SORTED_ARTICLES_BY_DATE } from "../NEWS_CONSTANTS/_ARTICLES_LIST"
import { WEBSITE_NAME, WEBSITE_URL } from "../NEWS_CONSTANTS/_NEW_SETUP"
import { MOCK_ARTICLES_LIST } from "../constants/mocks"
import { GAEvent } from "../google"
import { THEMES } from "../shared/enums"
import { iArticle, iSEO } from "../shared/interfaces"

// env
const env = process.env.NODE_ENV
export const IS_DEV_MODE = env === "development" ? true : false

/**
 *
 * @param classes string
 * @returns string
 */
export const combineClasses = function (...classes: any): string {
  return classes.filter((item: any) => !!item).join(" ")
}

/**
 * Changes Dark / Light Theme
 */
export const changeTheme = (): void => {
  const lsTheme = localStorage.getItem("theme")
  localStorage.setItem(
    "theme",
    lsTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
  )

  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }

  location.reload()
}

/**
 * Returns Device Type tablet , mobile, desktop
 * @returns string
 */
export const getDeviceType = (): string => {
  const ua = typeof window !== "undefined" ? navigator.userAgent : "desktop"
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet"
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile"
  }
  return "desktop"
}

/**
 * Returns true if desktop
 * @returns boolean
 */
export const isDesktopDevice = (): boolean => {
  if (getDeviceType() === "desktop") {
    return true
  } else {
    return false
  }
}

/**
 * Returns true if mobile
 * @returns boolean
 */
export const isMobileDevice = (): boolean => {
  if (getDeviceType() === "mobile") {
    return true
  } else {
    return false
  }
}

/**
 * Add no scroll class to body when modal isopen
 */
export const addBodyNoScroll = (): void => {
  document.body.classList.add("no-scroll")
}

/**
 * Removes no scroll class to body when modal isopen
 */
export const removeBodyNoScroll = (): void => {
  document.body.classList.remove("no-scroll")
}

/**
 * Returns Article details from SORTED_ARTICLES_BY_DATE wrt the path
 * @returns iArticle
 */
export function useArticleDetails(): iArticle {
  const pathname = usePathname()
  const articlePath = "/pages" + pathname + ".tsx"

  return (
    MOCK_ARTICLES_LIST.filter((each) => each.path.includes(articlePath))[0] ||
    SORTED_ARTICLES_BY_DATE.filter((each) => each.path.includes(articlePath))[0]
  )
}

/**
 * Returns list of categories from SORTED_ARTICLES_BY_DATE
 * @returns string[]
 */
export const getCategories = (): string[] => {
  let categories: string[] = []
  SORTED_ARTICLES_BY_DATE.forEach((each) => {
    if (each.preview.category && !categories.includes(each.preview.category)) {
      categories.push(each.preview.category)
    }
  })
  return categories
}

/**
 * Removes /pages from article path
 * @param path
 * @returns
 */
export const transformPath = (path = ""): string => {
  return path.replace("/pages", "").replace(".tsx", "")
}

/**
 * Removes /public from images path
 * @param path
 * @returns string
 */
export const transformImagePaths = (path = ""): string => {
  return path.replace("/public", "")
}

/**
 * Creates SEO Config from ArticleDetails.preview || ArticleDetails.seo ||  PAGE_SEO
 * @param PAGE_SEO : iSEO
 * @returns SEO config
 */
export function useSEOConfig(PAGE_SEO: iSEO) {
  const pathname = usePathname()
  const articleDetails = useArticleDetails()

  // set url and path
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : ""
  const LOCAL_URL = IS_DEV_MODE ? origin : WEBSITE_URL ? WEBSITE_URL : origin
  const LOCAL_PATH = articleDetails
    ? transformPath(articleDetails.path)
    : pathname

  const meta_description =
    articleDetails?.preview?.shortIntro || PAGE_SEO.description

  const keywords = PAGE_SEO?.keywords || articleDetails?.preview?.tags
  const ogUrl = `${LOCAL_URL}${LOCAL_PATH}`

  const ogImage = PAGE_SEO.ogImage
    ? `${LOCAL_URL}${transformImagePaths(PAGE_SEO?.ogImage)}`
    : `${LOCAL_URL}${
        articleDetails?.preview.thumbnail
          ? transformImagePaths(articleDetails?.preview.thumbnail)
          : null
      }`

  const twitterHandle = PAGE_SEO?.twitterHandle || ""
  const author = articleDetails
    ? articleDetails?.preview.author.name
    : PAGE_SEO?.author

  const title =
    pathname === "/"
      ? `${
          articleDetails
            ? articleDetails?.preview?.articleTitle
            : PAGE_SEO?.title
        } ${author ? "| " + author : null}`
      : `${
          articleDetails
            ? articleDetails?.preview?.articleTitle
            : PAGE_SEO?.title
        } | ${WEBSITE_NAME} ${author ? "| " + author : null}`

  let seo_config = {
    title: title,
    description: meta_description,
    canonical: "https://webexpe.com/",
    additionalMetaTags: [
      {
        property: "keywords",
        content: keywords,
      },
      {
        property: "al:web:url",
        content: ogUrl,
      },
    ],
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: ogUrl,
      site_name: WEBSITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      handle: twitterHandle,
      site: ogUrl,
      cardType: "summary_large_image",
    },
  }
  return seo_config
}

/**
 * Share link or article method
 * @returns false if desktop else open share window on mobile devices
 */
export const webShare = () => {
  const pageTitle = document.title
  const url = typeof window !== "undefined" ? window.location.href : WEBSITE_URL

  GAEvent({
    action: "share_clicked",
    event_category: "click",
    label: url,
    value: null,
  })

  if (isDesktopDevice()) {
    return false
  } else {
    if (typeof window !== "undefined" && navigator) {
      navigator
        .share({
          text: pageTitle,
          url: url,
        })
        .catch(console.error)
      return true
    } else {
      return false
    }
  }
}

interface SEOConfigProps {
  title?: string
  description?: string
  url?: string
  ogImage?: string
}

export const CREATE_SEO_CONFIG = ({
  title = "GiveBack News - Tin tức từ thiện",
  description = "Cập nhật tin tức mới nhất về hoạt động từ thiện và cứu trợ thiên tai",
  url = "https://giveback.vn/news",
  ogImage = "/news_imp_assets/og-image.jpg",
}: SEOConfigProps = {}) => {
  return {
    title,
    description,
    canonical: url,
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      handle: "@giveback",
      site: "@giveback",
      cardType: "summary_large_image",
    },
    additionalMetaTags: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
    ],
  }
}
