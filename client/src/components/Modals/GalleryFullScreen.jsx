import React, { useState, useEffect } from 'react';
import { CgClose, CgPhotoscan } from 'react-icons/cg';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { OBJModel } from 'react-3d-viewer';
const GalleryFullScreen = ({
  name,
  gallery,
  value,
  setValue,
  nextSlide,
  prevSlide,
  photo,
  closeFullScreen,
  isGalleryFullScreen,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}) => {
  const isActive = (index) => {
    if (value === index) {
      return true;
    } else return false;
  };

  const [size, setSize] = useState(window.innerWidth);

  const checkSize = () => {
    setSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', checkSize);
    return () => {
      console.log('cleanup');
      window.removeEventListener('resize', checkSize);
    };
  });

  return (
    <section
      className={`galleryFullScreen-section ${
        isGalleryFullScreen ? 'openTab' : 'closeTab'
      }`}
    >
      <div className="closeIcon" onClick={closeFullScreen}>
        <CgClose />
      </div>
      <MdKeyboardArrowRight
        className="nextPhotoIcon"
        onClick={() => nextSlide()}
      />
      <MdKeyboardArrowLeft
        className="prevPhotoIcon"
        onClick={() => prevSlide()}
      />
      <div
        className="photo"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* {console.log(photo)} */}
        {photo && photo.includes('3dFiles/') ? (
          size > 650 ? (
            <div className="obj-div">
              <OBJModel
                // className="obj-model"
                width={1000}
                position={{ x: 0, y: -100, z: 0 }}
                src="https://dwqdaiwenqi.github.io/react-3d-viewer/site/src/lib/model/freedom.obj"
              />
            </div>
          ) : (
            <div className="obj-div" /*style={{ padding: '10rem 0' }}*/>
              {/* <h1 style={{ padding: '0 6rem', textAlign: 'center' }}>
                3D View is not sup
                ported on mobile devices
              </h1> */}
              <OBJModel
                // className="obj-model"
                width={1000}
                position={{ x: -150, y: -100, z: 100 }}
                src="https://dwqdaiwenqi.github.io/react-3d-viewer/site/src/lib/model/freedom.obj"
              />
            </div>
          )
        ) : (
          <img src={photo} alt="" />
        )}
      </div>

      <div className="photoInfo">
        <p>{name}</p>
        <div className="photoList">
          {gallery.map((photo, index) => {
            return (
              <div
                className={`${isActive(index) ? 'box box-active' : 'box'}`}
                key={index}
                onClick={() => setValue(index)}
              >
                <img
                  src={
                    photo.includes('3dFiles/')
                      ? 'https://firebasestorage.googleapis.com/v0/b/e-commerce-v1-e7fbc.appspot.com/o/3d-view.png?alt=media&token=688d0e16-c2f8-49cd-bb4f-f8b1abba77a0'
                      : photo
                  }
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GalleryFullScreen;
