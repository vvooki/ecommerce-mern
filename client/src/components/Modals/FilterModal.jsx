import React from 'react';
import { GoChevronLeft } from 'react-icons/go';
import { GrClose } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const FilterModal = ({
  isFilterModalOpen,
  closeFilterModal,
  formData,
  handleChange,
  categories,
  setFormData,
  defaultFormData,
  getProducts,
}) => {
  return (
    <section
      className={`filter-modal-section modal-section ${
        isFilterModalOpen ? 'open-modal' : 'close-modal'
      }`}
    >
      <div className="modal-container">
        <div className="modal-top-area">
          <div>
            <button onClick={closeFilterModal}>
              <GrClose />
            </button>
            <h2>Filters</h2>
          </div>
          <div>
            <button
              className="reset-filters-btn"
              onClick={() => {
                setFormData(defaultFormData);
                getProducts('http://localhost:5000/api/products');
                document.getElementById('filter-form').reset();
              }}
            >
              <Link to="/products">reset filters</Link>
            </button>
          </div>
        </div>
        <div className="modal-content">
          <form id="filter-form">
            <h4>Sort by:</h4>
            <select
              name="sort"
              onChange={handleChange}
              className="sort-select-modal"
            >
              <option value="">featured products</option>
              <option value="price">from the cheapest</option>
              <option value="-price">from the most expensive</option>
              <option value="-createdAt">new items</option>
            </select>
            <h4>Price range:</h4>
            <div className="price-range">
              <input
                type="number"
                placeholder="from"
                onChange={handleChange}
                name="priceFrom"
                value={formData.priceFrom}
              />
              <input
                type="number"
                placeholder="to"
                onChange={handleChange}
                name="priceTo"
                value={formData.priceTo}
              />
            </div>
            <h4>Category:</h4>
            <div className="filters-checkboxes">
              <div>
                <input
                  type="radio"
                  id="isModel"
                  onChange={handleChange}
                  name="cat"
                  value="Model"
                />
                <label htmlFor="isModel">Models</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="isPrint"
                  onChange={handleChange}
                  name="cat"
                  value="Print"
                />
                <label htmlFor="isPrint">Prints</label>
              </div>
            </div>
            <h4>Tags: </h4>
            <div className="filters-checkboxes">
              {categories.map((cat) => {
                return (
                  <div>
                    <input
                      type="checkbox"
                      id={cat.name}
                      onChange={handleChange}
                      name={cat.name}
                      key={cat._id}
                      checked={formData[cat.name]}
                    />
                    <label htmlFor={cat.name}>{cat.name}</label>
                  </div>
                );
              })}
            </div>
            <h4>Size: </h4>
            <div className="filters-checkboxes">
              <div>
                <input
                  type="checkbox"
                  id="small"
                  checked={formData.small}
                  onChange={handleChange}
                  name="small"
                />
                <label htmlFor="small">Small</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="medium"
                  checked={formData.medium}
                  onChange={handleChange}
                  name="medium"
                />
                <label htmlFor="medium">Medium</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="large"
                  checked={formData.large}
                  onChange={handleChange}
                  name="large"
                />
                <label htmlFor="large">Large</label>
              </div>
            </div>
          </form>

          <button className="submit-filters-btn" onClick={closeFilterModal}>
            submit
          </button>
        </div>
      </div>
    </section>
  );
};

export default FilterModal;
