import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { CharityBrand } from "@/types/charity-brand"

const SingleBrand = ({ brand }: { brand: CharityBrand }) => {
  const { image, href, name, imageLight, id } = brand

  return (
    <>
      <motion.a
        variants={{
          hidden: {
            opacity: 0,
            y: -20,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 1, delay: id }}
        viewport={{ once: true }}
        href={href}
        className="animate_top mx-w-full relative mx-8 block h-[100px] w-[140px]" // Thêm mx-4 để tạo khoảng cách giữa các logo
      >
        <Image
          className="opacity-65 transition-all duration-300 hover:opacity-100 dark:hidden"
          src={image}
          alt={name}
          width={800}
          height={800}
        />
        <Image
          className="hidden opacity-50 transition-all duration-300 hover:opacity-100 dark:block"
          src={imageLight}
          alt={name}
          width={800}
          height={800}
        />
      </motion.a>
    </>
  )
}

export default SingleBrand
