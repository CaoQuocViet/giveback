import { IArticleHeaderData } from "../../shared/interfaces"
import { combineClasses } from "../../utils/utils"
import ArticleTags from "../Misc/ArticleTags"
import classes from "./ArticleHeader.module.scss"

interface IProps {
  headerData: IArticleHeaderData
}

const ArticleHeaderCenter = ({ headerData }: IProps) => {
  return (
    <div className="mb-[30px]">
      <h1
        className={combineClasses(
          classes.articleTitle,
          "text-center text-2xl md:text-4xl font-medium mt-[20px] mb-[5px]"
        )}
      >
        {headerData.articleTitle}
      </h1>
      <ArticleTags tags={headerData.tags} center />
    </div>
  )
}

export default ArticleHeaderCenter
