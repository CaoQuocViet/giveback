import Link from "next/link"

import { IAuthor, iArticle } from "../../shared/interfaces"
import {
  combineClasses,
  isDesktopDevice,
  transformImagePaths,
  transformPath,
} from "../../utils/utils"
import LinkTo from "../LinkTo"
import SocialShare from "../SocialShare/SocialShare"
import Avatar from "./Avatar"

const ArticleMoreFromAuthor = ({
  author,
  relatedArticles,
  articleGrid = false,
}: {
  author: IAuthor
  relatedArticles: iArticle[]
  articleGrid?: boolean
}) => {
  const wrapperClasses =
    "bg-white dark:bg-slate-800 dark:border-none border-slate-100 shadow-lg border md:rounded-[8px] px-[15px] py-[10px] mb-[30px] overflow-hidden"
  return (
    <>
      <div className={wrapperClasses}>
        <div className="flex items-center">
          <Avatar author={author} className="mr-3 size-[60px] text-xl" />
          <div className="font-semibold">
            <p className={"my-0  text-[20px]"}>{author.name}</p>
            <p className="my-0 text-xs">{author.designation}</p>
          </div>
        </div>
        <p className="mt-2 text-[16px]">{author.bio}</p>
        {author.social?.length && (
          <div className="mt-3 flex flex-wrap items-center">
            {author.social.map((each, i) => (
              <a
                href={each.link}
                key={i}
                target="_blank"
                className="mr-[15px] text-[32px]"
                rel="noopener noreferrer"
              >
                {each.icon}
              </a>
            ))}
          </div>
        )}
      </div>

      {isDesktopDevice() && (
        <div className={wrapperClasses}>
          <p className="mb-3 w-full border-b border-gray-300 pb-2 font-medium">
            Share this article
          </p>
          <SocialShare />
        </div>
      )}

      {relatedArticles.length && (
        <div className={wrapperClasses}>
          <p className="mb-3 w-full border-b border-gray-300 pb-2 font-medium">
            More from Author
          </p>
          <div className={articleGrid ? "flex flex-wrap" : ""}>
            {relatedArticles.slice(0, 3).map((each, i) => (
              <Link href={transformPath(each.path)} key={i} passHref>
                <div
                  className={combineClasses(
                    "mb-3 cursor-pointer",
                    articleGrid ? "lg:w-1/3 md:w-1/2 w-full md:pr-2" : "w-full"
                  )}
                  key={each.path}
                >
                  <div
                    className="
                                            flex items-center
                                            overflow-hidden rounded-[3px] border
                                            border-slate-200 shadow-lg hover:shadow-md
                                            dark:border-slate-900 dark:bg-slate-800
                                        "
                  >
                    <div className={"shrink-0 object-cover"}>
                      <img
                        src={transformImagePaths(each.preview.thumbnail)}
                        className="mr-2 h-[70px] w-[120px] object-cover"
                        alt={each.preview.articleTitle}
                      />
                    </div>
                    <div className="pr-1 text-[16px] font-semibold hover:text-blue-500">
                      {each.preview.articleTitle}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {relatedArticles.length > 3 ? (
              <LinkTo
                href={"/blog?author=" + author.name}
                passHref
                className="block rounded bg-blue-500 px-2 py-3 text-center text-sm font-bold text-white transition-all hover:!text-blue-900 dark:bg-slate-900 dark:hover:!text-slate-400"
              >
                <p>All articles from {author.name}</p>
              </LinkTo>
            ) : null}
          </div>
        </div>
      )}
    </>
  )
}

export default ArticleMoreFromAuthor
