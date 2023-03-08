import React from 'react';
import './css/featuredInfo.css';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
const FeaturedInfo = () => {
  return (
    <section className="featured-info-section">
      <article className="featured-item">
        <span className="featured-title">Revenue</span>
        <div className="featured-stats">
          <span className="featured-money">$2424</span>
          <span className="featured-rate">
            -11.4 <TrendingDownIcon className="arrow-down" />
          </span>
        </div>
        <span className="featured-desc">Compared to last month</span>
      </article>

      <article className="featured-item">
        <span className="featured-title">Sales</span>
        <div className="featured-stats">
          <span className="featured-money">$1201</span>
          <span className="featured-rate">
            4.1 <TrendingUpIcon className="arrow-up" />
          </span>
        </div>
        <span className="featured-desc">Compared to last month</span>
      </article>

      <article className="featured-item">
        <span className="featured-title">Cost</span>
        <div className="featured-stats">
          <span className="featured-money">$360</span>
          <span className="featured-rate">
            2 <TrendingUpIcon className="arrow-up" />
          </span>
        </div>
        <span className="featured-desc">Compared to last month</span>
      </article>
    </section>
  );
};

export default FeaturedInfo;
