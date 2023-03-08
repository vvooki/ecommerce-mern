import React, { useState, useEffect } from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import bannerData from '../data/bannersData';

const Slider = () => {
  //SWIPE FUNCTIONALITY
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // żądana długość od eventu touchStart do touchEnd, która ma być wykryta jako "swipe"
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe || isRightSwipe)
      console.log('swipe', isLeftSwipe ? 'left' : 'right');

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  //BUTTON FUNCTIONALITY

  const firstItem = bannerData.length - 1;
  const lastItem = firstItem - 4;
  const [bannerIndex, setBannerIndex] = useState(firstItem);
  const banner = bannerData[bannerIndex];

  const nextSlide = () => {
    if (bannerIndex - 1 >= lastItem) {
      setBannerIndex(bannerIndex - 1);
    } else {
      setBannerIndex(firstItem);
    }
  };

  const prevSlide = () => {
    if (bannerIndex + 1 <= firstItem) {
      setBannerIndex(bannerIndex + 1);
    } else {
      setBannerIndex(lastItem);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerIndex]);

  const isActive = (id) => {
    if (bannerIndex + 1 === id) {
      return true;
    } else return false;
  };

  return (
    <section className="slider-section">
      <div className="slider-container">
        <div
          className="banner-container"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <MdNavigateBefore
            className="banner-navigation previous"
            onClick={prevSlide}
          />
          <MdNavigateNext
            className="banner-navigation next"
            onClick={nextSlide}
          />
          <div className="banner-image">
            <h1>{banner.text}</h1>
          </div>
        </div>
        <div className="banner-categories">
          {bannerData
            .slice(0)
            .reverse()
            .map((category) => {
              if (category.id <= firstItem + 1 && category.id >= lastItem + 1)
                return (
                  <div
                    key={category.id}
                    className={`${isActive(category.id) ? 'line' : 'category'}`}
                    onClick={() => setBannerIndex(category.id - 1)}
                  >
                    {category.text}
                  </div>
                );
            })}
        </div>
      </div>
    </section>
  );
};

export default Slider;
