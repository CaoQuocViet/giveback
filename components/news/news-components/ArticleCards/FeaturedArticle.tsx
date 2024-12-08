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

const FeaturedArticle = ({ article, path }: IProp) => {
  return (
    <>
      <div
        className={combineClasses(
          classes.featured_article,
          "md:border-l-[5px] border-b-[5px] md:border-b-0 border-blue-500 dark:bg-slate-800 dark:text-white dark:drop-shadow-lg cursor-pointer"
        )}
      >
        <div
          className={
            "w-full px-[15px] py-[20px] md:w-[55%] lg:px-[50px] lg:py-[40px]"
          }
        >
          <div className={"mb-[10px] mt-0 flex items-center"}>
            <div className={"flex items-center"}>
              <Avatar
                author={article.author}
                className="mr-3 size-[50px] text-xl"
              />
              <LinkTo
                href={"/blog?author=" + article.author.name}
                passHref
                className={combineClasses(
                  classes.author_name,
                  "text-[14px] md:text-[16px] my-0 font-medium"
                )}
              >
                {article.author.name}
              </LinkTo>
              {/* <p className={combineClasses(classes.author_name, 'text-[14px] md:text-[16px] my-0 font-medium')}>
                                {article.author.name}
                            </p> */}
            </div>
            <ArticleCardCategory category={article.category} />
          </div>
          <LinkTo href={transformPath(path)} passHref>
            <h1
              className={combineClasses(
                classes.featured_article__title,
                "text-[24px] font-bold mt-0 mb-[10px]"
              )}
            >
              {article.articleTitle}
            </h1>
          </LinkTo>
          <p
            className={combineClasses(
              classes.featured_article__intro,
              "text-[14px] font-regular mt-0 mb-[10px]"
            )}
          >
            {article.shortIntro.slice(0, 150)} ...
          </p>
          <ArticleTags tags={article.tags} />
          <p
            className={combineClasses(
              classes.featured_article__date,
              "font-normal text-xs pt-3 mb-0"
            )}
          >
            {article.date}
          </p>
        </div>
        <div
          className={combineClasses(
            classes.featured_article__image,
            "rounded-sm overflow-hidden"
          )}
        >
          {/* style={{ background: `url(${transformImagePaths(article.thumbnail)})` }} */}
          <img
            src={transformImagePaths(article.thumbnail)}
            alt={article.articleTitle}
            className="size-full object-cover"
          />
        </div>
      </div>
    </>
  )
}

export default FeaturedArticle
