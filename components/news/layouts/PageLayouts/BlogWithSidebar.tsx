import { SORTED_ARTICLES_BY_DATE } from "../../NEWS_CONSTANTS/_ARTICLES_LIST"
import ArticleHeader from "../../news-components/ArticleHeader"
import ArticleMoreFromAuthor from "../../news-components/Misc/ArticleMoreFromAuthor"
import {
  combineClasses,
  useArticleDetails,
  transformImagePaths,
  transformPath,
} from "../../utils/utils"
import classes from "./PageLayout.module.scss"

const WithSidebar = ({ children, ads }: { children: any; ads?: string[] }) => {
  const ARTICLE_DETAILS = useArticleDetails()
  const author = ARTICLE_DETAILS.preview.author
  const relatedArticles = SORTED_ARTICLES_BY_DATE.filter(
    (each) => each.preview.author === author
  )

  return (
    <>
      <section
        className={combineClasses(
          classes.withSidebar_article_wrapper,
          "dark:bg-slate-900 dark:text-white"
        )}
      >
        <div className="container px-0 py-[50px] md:px-[15px] lg:flex">
          <article
            className={combineClasses(
              classes.article_content,
              "pb-[20px] px-3 text-black bg-white dark:bg-slate-800 dark:border-none dark:drop-shadow-lg dark:text-white pt-10 md:pt-0 font-regular text-lg leading-relaxed"
            )}
          >
            <ArticleHeader ARTICLE_DETAILS={ARTICLE_DETAILS} />
            {children}
          </article>
          <div className={classes.article_sidebar_wrapper}>
            <ArticleMoreFromAuthor
              author={author}
              relatedArticles={relatedArticles}
            />
            {ads && ads.length ? (
              <div className="flex flex-wrap">
                {ads.map((each: string, i: any) => (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `${each}`,
                    }}
                    key={i}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}

export default WithSidebar
