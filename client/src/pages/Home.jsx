import React from 'react';
import Slider from '../components/Slider';
import BestSellers from '../components/BestSellers';
import Carousel from '../components/Carousel';
const Home = () => {
  return (
    <main>
      <Slider />
      <BestSellers />
      <Carousel />
    </main>
  );
};

export default Home;
