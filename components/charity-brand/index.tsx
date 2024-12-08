"use client"

import React from "react"

import SingleBrand from "./SingleBrand"
import brandData from "./brandData"

const CharityBrand = () => {
  return (
    <>
      {/* <!-- ===== Clients Start ===== --> */}
      <section className="border-y-stroke bg-alabaster dark:border-y-strokedark border border-x-0 py-11 dark:bg-black">
        <div className="max-w-c-1390 mx-auto px-4 md:px-8 2xl:px-0">
          <div className="flex flex-wrap items-center justify-center gap-20">
            {brandData.map((brand, key) => (
              <SingleBrand brand={brand} key={key} />
            ))}
          </div>
        </div>
      </section>
      {/* <!-- ===== Clients End ===== --> */}
    </>
  )
}

export default CharityBrand
