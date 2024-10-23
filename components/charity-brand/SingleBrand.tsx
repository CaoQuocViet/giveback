import React from "react";
import Image from "next/image";
import { CharityBrand } from "@/types/charity-brand";
import { motion } from "framer-motion";

const SingleBrand = ({ brand }: { brand: CharityBrand }) => {
  const { image, href, name, imageLight, id } = brand;

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
        className="animate_top mx-w-full relative block h-[200px] w-[140px] mx-8" // Thêm mx-4 để tạo khoảng cách giữa các logo
      >
        <Image
          className="opacity-65 transition-all duration-300 hover:opacity-100 dark:hidden"
          src={image}
          alt={name}
          fill
        />
        <Image
          className="hidden opacity-50 transition-all duration-300 hover:opacity-100 dark:block"
          src={imageLight}
          alt={name}
          fill
        />
      </motion.a>
    </>
  );
};

export default SingleBrand;
