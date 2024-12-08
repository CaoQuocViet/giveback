import { IArticleHeaderData } from "../../shared/interfaces"
import { combineClasses } from "../../utils/utils"
import ArticleTags from "../Misc/ArticleTags"
import classes from "./ArticleHeader.module.scss"

interface IProps {
  /*...*/
}

const ArticleHeaderDefault = ({ headerData }: IProps) => {
  return (
    <div className="mb-[30px]">
      <h1 className="mb-[5px] mt-[20px] text-2xl font-semibold md:text-4xl">
        {headerData.articleTitle}
      </h1>
      <ArticleTags tags={headerData.tags} />
    </div>
  )
}

export default ArticleHeaderDefault
