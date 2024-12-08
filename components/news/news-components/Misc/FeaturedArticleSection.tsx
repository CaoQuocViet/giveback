import { SORTED_ARTICLES_BY_DATE } from "../../NEWS_CONSTANTS/_ARTICLES_LIST"
import { iArticle } from "../../shared/interfaces"
import FeaturedArticle from "../ArticleCards/FeaturedArticle"
import Seperator from "../Seperator"
import Text from "../Text"

const FeaturedArticleSection = () => {
  const featureArticles = SORTED_ARTICLES_BY_DATE.filter(
    (article: iArticle) => article.featureArticle === true
  )
  return featureArticles.length ? (
    <>
      <Text
        subtitle
        className="mb-5 w-full px-3 text-3xl !font-medium md:!text-4xl"
      >
        Các bài viết nổi bật
      </Text>
      <hr className="border-1 mx-auto mb-5 w-[98%]" />

      {featureArticles.map((each, i) => (
        <FeaturedArticle
          article={each.preview}
          path={each.path}
          key={each.path + i}
        />
      ))}

      <Seperator />
    </>
  ) : null
}

export default FeaturedArticleSection
