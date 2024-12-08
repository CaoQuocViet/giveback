const HomeLayout = ({ children }: { children: any }) => {
  return (
    <>
      <div
        className={
          "font-regular bg-slate-100 pb-[20px] text-lg leading-relaxed text-black dark:bg-slate-900 dark:text-white md:min-h-screen"
        }
      >
        {children}
      </div>
    </>
  )
}

export default HomeLayout
