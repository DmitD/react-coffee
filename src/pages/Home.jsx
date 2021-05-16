import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import Categories from "../components/categories";
import SortPopup from "../components/sort-popup";
import CoffeeBlock from "../components/coffee-block";
import CoffeeLoader from "../components/coffee-loader";
import ModalOrder from "../components/modal-order";
import ErrorIndicator from "../components/error-indicator"
import { fetchCoffee } from "../redux/actions/coffee";
import { setCategory, setSortBy } from "../redux/actions/filters";
import { openModalProduct, closeModalProduct } from "../redux/actions/modal";
import { addItemToCart } from "../redux/actions/cart";

const categoryNames = ['Зерновой', 'Молотый', 'Органический', 'Без кофеина'];
const sortItems = [
  { name: 'популярности', type: 'rating', order: 'desc' },
  { name: 'цене', type: 'details.sm.price', order: 'desc' },
  { name: 'алфавиту', type: 'title', order: 'asc' },
];

const Home = () => {

  const dispatch = useDispatch();
  const items = useSelector(({ coffee }) => coffee.items);
  const { category, sortBy } = useSelector(({ filters }) => filters);
  const isLoader = useSelector(({ coffee }) => coffee.isLoader);
  const isError = useSelector(({ coffee }) => coffee.isError);
  const isModalOpen = useSelector(({ modal }) => modal.isModalOpen);

  React.useEffect(() => {
    dispatch(fetchCoffee(category, sortBy));
  }, [category, sortBy]);

  React.useEffect(() => {
    const header = document.querySelector('.header');
    const content = document.querySelector('.content');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
      let scrollDistance = window.scrollY;

      if (scrollDistance > headerHeight) {
        header.classList.add('header-fixed');
        content.style.marginTop = `${headerHeight}px`;
      }
      if (scrollDistance <= headerHeight) {
        header.classList.remove('header-fixed');
        content.style.marginTop = null;
      }
    })
  }, []);

  const onSelectCategory = React.useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const onSelectSortType = React.useCallback((type) => {
    dispatch(setSortBy(type));
  }, []);

  const modalProductOpen = (obj) => {
    dispatch(openModalProduct(obj));
  };

  const modalProductClose = () => {
    dispatch(closeModalProduct())
  }

  const handleAddItemToCart = (obj) => {
    dispatch(addItemToCart(obj));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          items={categoryNames}
          activeCategory={category}
          onClickCategory={onSelectCategory} />
        <SortPopup
          items={sortItems}
          activeSortType={sortBy.type}
          onClickSortType={onSelectSortType} />
      </div>
      <h2 className="content__title">Весь кофе</h2>
      <div className="content__items">
        {isError
          ? <ErrorIndicator />
          : isLoader
            ? items.map((obj) => (
              <CoffeeBlock
                modalProductOpen={modalProductOpen}
                key={obj.id}
                {...obj}
              />
            ))
            : Array(12)
              .fill(0)
              .map((_, index) => <CoffeeLoader key={index} />)}
      </div>
      {isModalOpen &&
        <ModalOrder closeModal={modalProductClose}
          onClickAddItem={handleAddItemToCart} />}
    </div>
  );
};

export default Home;