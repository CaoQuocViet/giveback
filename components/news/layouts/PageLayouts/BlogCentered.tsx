"use client"

import Link from "next/link"

import { SORTED_ARTICLES_BY_DATE } from "../../NEWS_CONSTANTS/_ARTICLES_LIST"
import ArticleHeader from "../../news-components/ArticleHeader"
import ArticleMoreFromAuthor from "../../news-components/Misc/ArticleMoreFromAuthor"
import Avatar from "../../news-components/Misc/Avatar"
import Seperator from "../../news-components/Seperator"
import {
  combineClasses,
  useArticleDetails,
  transformImagePaths,
  transformPath,
} from "../../utils/utils"
import classes from "./PageLayout.module.scss"

const Centered = ({ children }: any) => {
  const ARTICLE_DETAILS = useArticleDetails()
  const author = ARTICLE_DETAILS.preview.author
  const relatedArticles = SORTED_ARTICLES_BY_DATE.filter(
    (each) => each.preview.author === author
  )

  return (
    <section
      className={combineClasses(
        classes.centered_article_wrapper,
        "dark:bg-slate-900 dark:text-white"
      )}
    >
      <div className="container px-0 py-[50px] md:px-[15px]">
        <article
          className={combineClasses(
            classes.article_content,
            "pb-[30px] px-3 bg-white dark:bg-slate-800 dark:border-none dark:drop-shadow-lg dark:text-white pt-10 md:pt-0 mx-auto font-regular text-lg leading-relaxed"
          )}
        >
          <ArticleHeader ARTICLE_DETAILS={ARTICLE_DETAILS} centered />
          {children}
        </article>
        <Seperator />
        <div className={combineClasses(classes.author_and_more, "mx-auto")}>
          <ArticleMoreFromAuthor
            author={author}
            relatedArticles={relatedArticles}
            articleGrid
          />
        </div>
      </div>
    </section>
  )
}

export default Centered
