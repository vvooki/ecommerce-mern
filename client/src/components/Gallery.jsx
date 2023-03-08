import React, { useState, useEffect } from 'react';
import { GoPrimitiveDot } from 'react-icons/go';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import GalleryFullScreen from './Modals/GalleryFullScreen';

const Gallery = ({ name, gallery }) => {
  const [value, setValue] = useState(0);
  const photo = gallery[value];
  const [isGalleryFullScreen, setIsGalleryFullScreen] = useState(false);

  useEffect(() => {
    if (isGalleryFullScreen) {
      document.body.style.overflow = 'hidden';
    } else document.body.style.overflow = 'unset';
  }, [isGalleryFullScreen]);

  //SWIPE FUNCTIONALITY
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
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

  useEffect(() => {
    const lastIndex = gallery.length - 1;
    if (value < 0) {
      setValue(lastIndex);
    }
    if (value > lastIndex) {
      setValue(0);
    }
    console.log('VALUE', value);
  }, [value, gallery]);

  const nextSlide = () => {
    setValue(value + 1);
  };

  const prevSlide = () => {
    setValue(value - 1);
  };

  const openFullScreen = () => {
    setIsGalleryFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsGalleryFullScreen(false);
  };

  const isActive = (index) => {
    if (value === index) {
      return true;
    } else return false;
  };

  return (
    <div className="gallery-container">
      <GalleryFullScreen
        gallery={gallery}
        value={value}
        setValue={setValue}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        photo={photo}
        name={name}
        isGalleryFullScreen={isGalleryFullScreen}
        closeFullScreen={closeFullScreen}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      />
      <div className="images">
        {gallery.map((image, index) => {
          let position = 'nextPhoto';
          if (index === value) {
            position = 'currentPhoto';
          }
          if (
            index === value - 1 ||
            (value === 0 && index === gallery.length - 1)
          ) {
            position = 'prevPhoto';
          }
          return (
            <div key={index} className={`gallery-image ${position}`}>
              <MdKeyboardArrowRight
                className="nextPhotoIcon"
                onClick={() => nextSlide()}
              />
              <MdKeyboardArrowLeft
                className="prevPhotoIcon"
                onClick={() => prevSlide()}
              />

              <img
                src={
                  image.includes('3dFiles/')
                    ? 'https://firebasestorage.googleapis.com/v0/b/e-commerce-v1-e7fbc.appspot.com/o/3d-view.png?alt=media&token=688d0e16-c2f8-49cd-bb4f-f8b1abba77a0'
                    : image
                }
                alt="3D_image"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onClick={openFullScreen}
              />
            </div>
          );
        })}
      </div>
      <div className="preview">
        {gallery.map((dot, index) => {
          return (
            <GoPrimitiveDot
              key={index}
              className={`${isActive(index) && 'preview-active'}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
