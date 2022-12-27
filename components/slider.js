import React, { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from "next/image"
import Link from "next/link"



export default function Slider() {

  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <div className="bg-slate-600 relative">
      <div className="">
        <div ref={sliderRef} className="w-screen h-screen overflow-hidden keen-slider h-screen-ios">
          <Slide number_slide='number-slide1'
          video_url={"/assets/loop1.mp4"}
          title="Abdul Samad Al Qurashi"
          sub_title="Journey of Beauty"
          title_link="/"
          />
          <Slide number_slide='number-slide2'
          video_url={"/assets/loop2.mp4"}
          title="sama damas"
          sub_title="Be Brilliant"
          title_link="#"
          />
        </div>

      </div>
      {loaded && instanceRef.current && (
        <div className="absolute bottom-10 md:right-5 right-auto md:left-auto left-0 flex space-x-1 px-4 pb-4 md:justify-end md:pb-4 md:pr-14 md:pl-0">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx)
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              >{idx}</button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Slide({number_slide, video_url, title, sub_title, title_link}) {
  return (
    <div className={`relative keen-slider__slide ${number_slide}`}>
      <video autoPlay loop className="absolute z-10 object-cover w-full h-full">
        <source src={video_url} />
      </video>

      <div className="absolute md:bottom-10 bottom-14 md:right-5 right-auto md:left-auto left-0 grid z-10 px-4 pb-4 text-[#F0E6CC] md:pb-8 md:pr-14 md:pl-0 md:text-right md:self-end">
        <h3 className="text-[4.26vw] md:text-[1.38vw] leading-[1.2] mb-1 md:mb-2 font-grotesk tracking-[-0.01em] font-medium">
          {title}
        </h3>
        <Link href={title_link}
        className="text-[8vw] md:text-[4.44vw] font-bold leading-[1.2] mb-2 md:mb-1 font-formula uppercase tracking-[0.02em] pointer-events-auto">
        {sub_title}
        </Link>
      </div>
    </div>
  )
}