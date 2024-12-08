import { useState } from "react"
import { MdOutlineClose } from "react-icons/md"

import { SORTED_ARTICLES_BY_DATE } from "../../NEWS_CONSTANTS/_ARTICLES_LIST"
import { combineClasses } from "../../utils/utils"
import SearchArticleCard from "../ArticleCards/SearchArticleCard"
import classes from "./Search.module.scss"

interface ISearch {
  closeSearch: () => void
}
const Search = ({ closeSearch }: ISearch) => {
  const [searchStr, setSearchStr] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const handleSearch = () => {
    const data = [...SORTED_ARTICLES_BY_DATE]
    const results = data.filter(
      (article) =>
        article.preview.tags
          .split(",")
          .join()
          .indexOf(searchStr.toLocaleLowerCase()) >= 0 ||
        article.preview.articleTitle.indexOf(searchStr.toLocaleLowerCase()) >= 0
    )
    setSearchResults(results)
  }

  return (
    <div
      className={combineClasses(
        "bg-slate-100 text-black dark:bg-slate-900 dark:text-white",
        classes?.search_container
      )}
    >
      <div className="container mx-auto" style={{ marginTop: "40px" }}>
        <div className="px-3">
          <div className="flex items-center justify-between pt-5 md:pt-10">
            <h1 className={"text-[45px] font-bold"}>Tìm kiếm</h1>
            <button
              name="search-button"
              aria-label="search button"
              type="button"
              className={classes.search_close_icon}
              onClick={closeSearch}
            >
              <MdOutlineClose className="text-4xl text-slate-800 dark:text-white" />
            </button>
          </div>
          <div className="mb-[40px] mt-3">
            <input
              className="w-full border-b border-gray-400 bg-inherit p-2 text-[20px] text-black dark:text-white"
              placeholder="Nhập từ khóa và phân cách bằng dấu phẩy"
              value={searchStr}
              onChange={(e) => setSearchStr(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
        </div>

        {searchResults?.length > 0 && (
          <div className="flex flex-wrap">
            {searchResults?.length > 0 &&
              searchResults?.map((article, i) => (
                <SearchArticleCard
                  article={article.preview}
                  key={i}
                  path={article.path}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
