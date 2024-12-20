import Image from "next/image"

import { IArticleHeaderData } from "../../shared/interfaces"
import {
  combineClasses,
  transformImagePaths,
  transformPath,
} from "../../utils/utils"
import LinkTo from "../LinkTo"
import ArticleCardCategory from "../Misc/ArticleCardCategory"
import ArticleTags from "../Misc/ArticleTags"
import Avatar from "../Misc/Avatar"
import classes from "./ArticleCard.module.scss"

interface IProp {
  article: IArticleHeaderData
  path: string
}

const ArticleCard = ({ article, path }: IProp) => {
  // set url and path
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : ""

  const imgLoader = ({ src, width, quality }: any) => {
    return `${origin}${src}?w=${width}&q=${quality || 75}`
  }

  return (
    <div className={"mb-[30px] w-full px-2 md:w-1/2 md:px-[15px] lg:w-1/3"}>
      <LinkTo
        href={transformPath(path)}
        passHref
        className={combineClasses(
          classes.article_card,
          "border-b-[5px] border-blue-500 dark:bg-slate-800 dark:text-white dark:drop-shadow-lg flex flex-col justify-between"
        )}
      >
        <div>
          <div className={"relative h-[200px] overflow-hidden rounded-t-[4px]"}>
            <Image
              src={transformImagePaths(article.thumbnail)}
              alt={article.articleTitle}
              width={800}
              height={800}
              quality={100}
              objectFit="cover"
              loader={imgLoader}
            />
          </div>

          <div className={"d-block px-[15px] py-0"}>
            <p className={"mb-0 pt-3 text-xs font-normal md:mb-3"}>
              {article.date}
            </p>
            <LinkTo href={transformPath(path)} passHref>
              <h1
                className={
                  "cursor-pointer text-[22px] font-bold tracking-wide hover:text-blue-600"
                }
              >
                {article.articleTitle}
              </h1>
            </LinkTo>
            <p
              className={combineClasses(
                classes.article_card__intro,
                "text-sm font-normal mt-2 md:mt-1"
              )}
            >
              {article.shortIntro.slice(0, 100)} ...
            </p>
            <ArticleTags tags={article.tags} />
          </div>
        </div>
        <div
          className={combineClasses(
            classes.article_card_footer,
            "mt-4 mb-3 flex items-center px-3"
          )}
        >
          <div className={"flex items-center"}>
            <Avatar
              author={article.author}
              className="mr-3 size-[40px] text-xl"
            />
            <LinkTo
              href={"/blog?author=" + article.author.name}
              passHref
              className={combineClasses(
                classes.author_name,
                "text-sm font-medium"
              )}
            >
              {article.author.name}
            </LinkTo>
            {/* <p className={combineClasses(classes.author_name, 'text-sm font-medium')}>
              {article.author.name}
            </p> */}
          </div>
          <ArticleCardCategory category={article.category} />
        </div>
      </LinkTo>
    </div>
  )
}

export default ArticleCard
