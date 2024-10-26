import { IArticleHeaderData } from "../../shared/interfaces"
import { combineClasses } from "../../utils/utils"
import ArticleTags from "../Misc/ArticleTags"
import classes from './ArticleHeader.module.scss'
interface IProps {/*...*/}

const ArticleHeaderDefault = ({ headerData }: IProps) => {
    return (
        <div className="mb-[30px]">
            <h1 className="text-2xl md:text-4xl font-semibold mt-[20px] mb-[5px]">
                {headerData.articleTitle}
            </h1>
            <ArticleTags tags={headerData.tags} />
        </div>
    )
}

export default ArticleHeaderDefault
