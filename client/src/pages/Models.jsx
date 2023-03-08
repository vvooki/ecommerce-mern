import React, { useState } from 'react';
import productsData from '../data/productsData';
import ProductBox from '../components/ProductBox';
import FilterModal from '../components/Modals/FilterModal';
import SortModal from '../components/Modals/SortModal';

const Models = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSortModalOpen, setIiSortModalOpen] = useState(false);

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeSortModal = () => {
    setIiSortModalOpen(false);
  };

  const openSortModal = () => {
    setIiSortModalOpen(true);
  };

  return (
    <section className="models-section">
      <FilterModal
        isFilterModalOpen={isFilterModalOpen}
        closeFilterModal={closeFilterModal}
      />
      <SortModal
        isSortModalOpen={isSortModalOpen}
        closeSortModal={closeSortModal}
      />
      <div className="models-container max-width">
        <div className="section-title-container">
          <div className="section-title">
            <h3>3D Models</h3>
            <div className="sort-select-container">
              <form action="">
                Sort by:{' '}
                <select name="" id="" className="sort-select">
                  <option value="">most popular</option>
                  <option value="">from the cheapest</option>
                  <option value="">from the most expensive</option>
                </select>
              </form>
            </div>
          </div>
        </div>
        <div className="filter-buttons">
          <button onClick={openFilterModal}>Categories and filters</button>
          <button onClick={openSortModal}>Sort by: most popular</button>
        </div>
        <div className="models-content-container">
          <div className="filters-container">
            <h3>Models</h3>
            <p>Price</p>
            <p>Category</p>
            <ul>
              <li>category name 1</li>
              <li>category name 2</li>
              <li>category name 3</li>
            </ul>
            <p>Ready to print</p>
            <p>Editable in:</p>
          </div>
          <div className="products-container">
            {productsData.map((product) => {
              return <ProductBox key={product.id} {...product} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Models;
