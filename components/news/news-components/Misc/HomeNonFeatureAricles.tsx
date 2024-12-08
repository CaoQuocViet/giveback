import { SORTED_ARTICLES_BY_DATE } from "../../NEWS_CONSTANTS/_ARTICLES_LIST"
import { iArticle } from "../../shared/interfaces"
import ArticleCard from "../ArticleCards/ArticleCard"
import LinkTo from "../LinkTo"

const HomeNonFeatureArticles = () => {
  const restArticles = SORTED_ARTICLES_BY_DATE.filter(
    (article: iArticle) => !article.featureArticle
  )
  const articlesToDisplay = 9
  return (
    <>
      {restArticles.length
        ? restArticles
            .slice(0, articlesToDisplay)
            .map((each, i) => (
              <ArticleCard
                article={each.preview}
                path={each.path}
                key={each.path + i}
              />
            ))
        : null}

      {restArticles.length > articlesToDisplay ? (
        <div className="flex w-full items-center">
          <LinkTo
            href="/news/all-news"
            className="
                                    mx-auto size-auto rounded-full bg-blue-500 px-10
                                    py-3 text-center
                                    text-sm font-bold text-white transition-all hover:!text-blue-900
                                    dark:bg-slate-800 dark:hover:!text-slate-400"
          >
            View All Articles
          </LinkTo>
        </div>
      ) : null}
    </>
  )
}

export default HomeNonFeatureArticles
