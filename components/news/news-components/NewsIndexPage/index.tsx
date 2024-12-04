import ArticleCard from "../ArticleCards/ArticleCard";
import { SORTED_ARTICLES_BY_DATE } from "../../NEWS_CONSTANTS/_ARTICLES_LIST";
import { useEffect, useState } from "react";
import { PageLayout } from "..";
import { combineClasses } from "../../utils/utils";
import ReactPaginate from "react-paginate";
import { iArticle } from "../../shared/interfaces";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import { usePathname } from "next/navigation";
import './pagination.scss'; // Import file SCSS

const NewsIndexPage = ({ articlesPerPage = 6 }: { articlesPerPage?: number }) => {
  const pathname = usePathname();
  const searchParams = new URLSearchParams(window.location.search);

  const category = searchParams.get('category');
  const author = searchParams.get('author');

  const categoryArticles = SORTED_ARTICLES_BY_DATE.filter(
    (each) => each.preview.category === category
  );
  const authorArticles = SORTED_ARTICLES_BY_DATE.filter(
    (each) => each.preview.author.name === author
  );

  const [ARTICLES, setARTICLES] = useState(SORTED_ARTICLES_BY_DATE);

  useEffect(() => {
    setARTICLES(
      category
        ? categoryArticles
        : author
        ? authorArticles
        : SORTED_ARTICLES_BY_DATE
    );
  }, [category, author]);

  const [currentItems, setCurrentItems] = useState(ARTICLES);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + articlesPerPage;
    setCurrentItems(ARTICLES.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(ARTICLES.length / articlesPerPage));
  }, [itemOffset, articlesPerPage, ARTICLES]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * articlesPerPage) % ARTICLES.length;
    setItemOffset(newOffset);
  };

  return (
    <PageLayout home>
      <div
        className={combineClasses(
          "container mt-10 md:pt-0 px-0 md:px-3",
          category ? "pt-10" : "pt-14"
        )}
      >
        {category || author ? (
          <h1
            className="px-2 mb-[30px] text-[45px] font-bold"
            style={{ textTransform: "capitalize" }}
          >
            {category || author}
            <hr className="mt-[10px]" />
          </h1>
        ) : null}

        <div className="flex flex-wrap">
          {currentItems.map((each: iArticle, i: any) => (
            <ArticleCard article={each.preview} path={each.path} key={i} />
          ))}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel={<AiFillCaretRight />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel={<AiFillCaretLeft />}
          containerClassName="pagination"
          activeClassName="active"
          pageClassName="pagination-item"
          previousClassName="pagination-item"
          nextClassName="pagination-item"
          breakClassName="pagination-item"
        />
      </div>
    </PageLayout>
  );
};

export default NewsIndexPage;
