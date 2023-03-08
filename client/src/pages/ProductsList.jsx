import React, { useState, useEffect } from 'react';
import ProductBox from '../components/ProductBox';
import FilterModal from '../components/Modals/FilterModal';
import SortModal from '../components/Modals/SortModal';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const location = useLocation();
  const category = location.pathname.split('/')[2];

  console.log(category);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const getProducts = async (link) => {
    try {
      if (link) {
        const res = await axios.get(link);
        setProducts(res.data);
      } else {
        const res = await axios.get(
          category
            ? `http://localhost:5000/api/products?category=${category}`
            : `http://localhost:5000/api/products`
        );
        setProducts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/categories`);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, [category]);

  if (category === 'Print') {
    console.log('gitara siema');
  }

  const defaultFormData = {
    priceFrom: '',
    priceTo: '',
    cat: category ? category : '',
    // isModel: category === 'Model' ? true : false,
    // isPrint: category === 'Print' ? true : false,
    small: false,
    medium: false,
    large: false,
    checkModel: false,
    checkPrint: false,
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const handleChangeRadio = (event) => {
    const { name, value, type, checked } = event.target;
    if (value === 'Print') {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          checkModel: false,
          checkPrint: true,
        };
      });
    } else {
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          checkPrint: false,
          checkModel: true,
        };
      });
    }
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value === 'Print' ? 'Print' : 'Model',
      };
    });
  };

  useEffect(() => {
    console.log('formData ', formData);
    let arrayTopic = [];
    for (let i = 8; i < Object.entries(formData).length; i++) {
      if (Object.values(formData)[i] === true) {
        arrayTopic.push(Object.keys(formData)[i]);
      }
    }

    let arraySize = [];
    if (formData.small) {
      arraySize.push('small');
    }
    if (formData.medium) {
      arraySize.push('medium');
    }
    if (formData.large) {
      arraySize.push('large');
    }

    let priceRange = '';
    if (formData.priceFrom !== '' && formData.priceTo === '') {
      priceRange = formData.priceFrom;
    }
    if (formData.priceFrom === '' && formData.priceTo !== '') {
      priceRange = '0+' + formData.priceTo;
    }
    if (formData.priceFrom !== '' && formData.priceTo !== '') {
      priceRange = formData.priceFrom + '+' + formData.priceTo;
    }

    let link = `http://localhost:5000/api/products?category=${
      formData.cat
    }&topic=${arrayTopic.join('+')}&size=${arraySize.join(
      '+'
    )}&price=${priceRange}&sort=${formData.sort}`;
    console.log(link);

    getProducts(link);
  }, [formData]);

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

  return (
    <section className="models-section">
      <FilterModal
        isFilterModalOpen={isFilterModalOpen}
        closeFilterModal={closeFilterModal}
        formData={formData}
        handleChange={handleChange}
        categories={categories}
        setFormData={setFormData}
        defaultFormData={defaultFormData}
        getProducts={getProducts}
      />
      <SortModal
        isSortModalOpen={isSortModalOpen}
        closeSortModal={closeSortModal}
      />
      <div className="models-container max-width">
        <div className="section-title-container">
          <div className="section-title">
            <h3>{category ? '3D ' + category : 'Models and Prints'}</h3>
            <div className="sort-select-container">
              <form action="">
                Sort by:{' '}
                <select
                  name="sort"
                  onChange={handleChange}
                  className="sort-select"
                >
                  <option value="">featured items</option>
                  <option value="price">from the cheapest</option>
                  <option value="-price">from the most expensive</option>
                  <option value="-createdAt">new items</option>
                </select>
              </form>
            </div>
          </div>
        </div>
        <div className="filter-buttons">
          <button onClick={openFilterModal}>Categories and filters</button>
          <select name="sort" onChange={handleChange}>
            <option value="">featured products</option>
            <option value="price">cheapest</option>
            <option value="-price">most expensive</option>
            <option value="-createdAt">new items</option>
          </select>
        </div>
        <div className="models-content-container">
          <div className="filters-container">
            <h3>Filters</h3>
            <form id="filter-form">
              <h4>Price range:</h4>
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
              <h4>Category:</h4>
              <div className="filters-checkboxes">
                <div>
                  <input
                    type="radio"
                    id="isModel"
                    onChange={handleChangeRadio}
                    name="cat"
                    checked={formData.checkModel}
                    value="Model"
                  />
                  <label htmlFor="isModel">Models</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="isPrint"
                    onChange={handleChangeRadio}
                    name="cat"
                    checked={formData.checkPrint}
                    value="Print"
                  />
                  <label htmlFor="isPrint">Prints</label>
                </div>
              </div>
              <h4>Tags: </h4>
              <div className="filters-checkboxes" id="filters-checkboxes">
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
                        // value={cat.name}
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
          <div className="products-container">
            {products.map((product) => {
              return <ProductBox key={product._id} {...product} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
