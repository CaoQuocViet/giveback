import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"

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
          <div className="relative aspect-video w-full">
            <Image
              src={transformImagePaths(each)}
              alt="Slider"
              width={800}
              height={450}
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
