import LinkTo from "../LinkTo"

const ArticleCardCategory = ({ category }: { category?: string }) => {
  return (
    <>
      {category && (
        <>
          <p className="px-2 text-[14px] font-normal md:text-[16px]">in</p>
          <p className={"text-[14px] font-medium md:text-[16px]"}>
            <LinkTo href={"/blog?category=" + category}>{category}</LinkTo>
          </p>
        </>
      )}
    </>
  )
}

export default ArticleCardCategory
