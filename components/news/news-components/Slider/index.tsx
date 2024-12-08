import { A11y, Navigation, Pagination, Scrollbar } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/bundle"
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
          <img
            src={transformImagePaths(each)}
            width="100%"
            className={"block cursor-grab"}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
