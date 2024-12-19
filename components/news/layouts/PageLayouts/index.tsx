import NextSeo from "next-seo"

import { DEFAULT_SEO } from "../../NEWS_CONSTANTS/_NEW_SETUP"
import Navbar from "../../news-components/Navbar"
import { iSEO } from "../../shared/interfaces"
import { useArticleDetails, useSEOConfig } from "../../utils/utils"
import Centered from "./BlogCentered"
import WithSidebar from "./BlogWithSidebar"
import HomeLayout from "./HomeLayout"

interface IBlogLayout {
  children: any
  PAGE_SEO?: iSEO
  blogwithsidebar?: boolean
  blogcentered?: boolean
  home?: boolean
  ads?: string[]
}

const PageLayout = ({
  children,
  PAGE_SEO,
  blogwithsidebar = false,
  blogcentered = false,
  home = false,
  ads = [],
}: IBlogLayout) => {
  const ARTICLE_DETAILS = useArticleDetails()
  const seoConfig = PAGE_SEO
    ? ARTICLE_DETAILS?.seo
      ? { ...ARTICLE_DETAILS.seo }
      : { ...DEFAULT_SEO, ...PAGE_SEO }
    : { ...DEFAULT_SEO }
  const SEO_CONFIG = useSEOConfig(seoConfig)

  const renderContent = () => {
    if (blogwithsidebar) {
      return <WithSidebar ads={ads}>{children}</WithSidebar>
    }
    if (blogcentered) {
      return <Centered>{children}</Centered>
    }
    return <HomeLayout>{children}</HomeLayout>
  }

  return (
    <>
      <NextSeo {...SEO_CONFIG} />
      <Navbar />
      {renderContent()}
    </>
  )
}

export default PageLayout
