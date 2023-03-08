import React from 'react';
import { Chart } from '../components/charts/Chart';
import FeaturedInfo from '../components/FeaturedInfo';
import { data } from '../data';
const Home = () => {
  return (
    <>
      <FeaturedInfo />
      <Chart title={'Analitics'} data={data} dataKey="uv" grid />
    </>
  );
};

export default Home;
