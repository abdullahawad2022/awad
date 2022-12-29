import React, { useEffect, useRef, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import Link from 'next/link';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);
  const [loopCount, setloopCount] = useState(1);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const handleVideo = (id) => {
    setActiveVideo(id);
    console.log(id);
    instanceRef.current?.moveToIdx(id);
  };

  useEffect(() => {
    setTimeout(() => {
      setActiveVideo(loopCount);
      instanceRef.current?.moveToIdx(loopCount);
      loopCount === 6 ? setloopCount(0) : setloopCount(loopCount + 1);
      console.log(loopCount);
    }, 7100);
  }, [loopCount]);

  return (
    <div className="relative">
      <div className="">
        <div
          ref={sliderRef}
          className="w-screen h-screen overflow-hidden keen-slider"
        >
          <Slide
            video_url={'/assets/loop_1.mp4'}
            title="Abdul Samad Al Qurashi"
            sub_title="Journey of Beauty"
            title_link="/"
          />
          <Slide
            video_url={'/assets/loop_2.mp4'}
            title="Arab Games"
            sub_title="I am Arabic"
            title_link="#"
          />
          <Slide
            video_url={'/assets/loop_3.mp4'}
            title="Sama Damas"
            sub_title="Be Brilliant"
            title_link="#"
          />
          <Slide
            video_url={'/assets/loop_4.mp4'}
            title="Jeep Cherokee"
            sub_title="Wildly Civilized"
            title_link="#"
          />
          <Slide
            video_url={'/assets/loop_5.mp4'}
            title="Zabeel"
            sub_title="Bedouin"
            title_link="#"
          />
          <Slide
            video_url={'/assets/loop_6.mp4'}
            title="Nissan Rogue"
            sub_title="World of distraction"
            title_link="#"
          />
          <Slide
            video_url={'/assets/loop_7.mp4'}
            title="Nissan"
            sub_title="ELECTRIFY EVERY DAY"
            title_link="#"
          />
        </div>
      </div>
      {loaded && instanceRef.current && (
        <div className="absolute md:bottom-6 bottom-12 mt-4 md:right-2 right-auto md:left-auto left-0 flex space-x-1 px-4 pb-4 md:justify-end md:pb-4 md:pr-14 md:pl-0">
          {[
            ...Array(instanceRef.current.track.details.slides.length).keys(),
          ].map((idx) => {
            return (
              <div
                onClick={() => {
                  handleVideo(idx);
                }}
                key={idx}
              >
                <CircularProgressbar
                  strokeWidth={activeVideo === idx ? '10' : '0'}
                  className={
                    'dot w-7 md:h-[2rem] h-[1.09em]  cursor-pointer' +
                    (currentSlide === idx ? ' active' : '')
                  }
                  value={idx === activeVideo && '100'}
                  text={`${idx + 1}`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Slide({ video_url, title, sub_title, title_link }) {
  const videoEl = useRef(null);
  var arr = [];
  const handleLoadedMetadata = () => {
    const video = videoEl.current;
    if (!video) return;
    console.log(`The video is ${video.duration} seconds long.`);
  };

  return (
    <div className={`relative keen-slider__slide `}>
      <video
        ref={videoEl}
        autoPlay="autoplay"
        muted
        preload="auto"
        loop
        onLoadedMetadata={handleLoadedMetadata}
        className="absolute inset-0 z-10 object-cover w-full h-screen"
      >
        <source src={video_url} />
      </video>

      <div className="absolute md:bottom-6 bottom-14 md:right-2 right-auto md:left-auto left-0 grid z-10 px-4 pb-4 text-[#F0E6CC] md:pb-8 md:pr-14 md:pl-0 md:text-right md:self-end">
        <h3 className="GroteskMedium text-[4.26vw] md:text-[1.38vw] leading-[1.2] mb-1 md:mb-2 tracking-[0.02em] font-medium">
          {title}
        </h3>
        <Link
          href={title_link}
          className="FormulaCondensed text-[8vw] md:text-[4.44vw] font-bold leading-[1.2] mb-2 md:mb-1 uppercase tracking-[0.02em] pointer-events-auto"
        >
          {sub_title}
        </Link>
      </div>
    </div>
  );
}

{
  /* <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToIdx(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              >
                {idx}
              </button> */
}
