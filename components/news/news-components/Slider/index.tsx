import { A11y, Navigation, Pagination, Scrollbar } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/bundle"
import Image from "next/image"

import { transformImagePaths } from "../../utils/utils"
import classes from "./slider.module.scss"

const Slider = ({
  images,
  className,
}: {
  images: string[]
  className?: string
}) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      className={className}
      draggable={true}
    >
      {images.map((each, i) => (
        <SwiperSlide className={classes.slide} key={i}>
          <Image
            src={transformImagePaths(each)}
            alt="Slider"
            width={300}
            height={300}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
