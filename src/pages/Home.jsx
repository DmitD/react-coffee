import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import Categories from "../components/categories";
import SortPopup from "../components/sort-popup";
import CoffeeBlock from "../components/coffee-block";
import CoffeeLoader from "../components/coffee-loader";
import { fetchCoffee } from "../redux/actions/coffee";
import { setCategory, setSortBy } from "../redux/actions/filters";
import { openModalProduct, closeModalProduct } from "../redux/actions/modal";
import ModalOrder from "../components/modal-order/ModalOrder";


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
  const isLoaded = useSelector(({ coffee }) => coffee.isLoaded);
  const isModalOpen = useSelector(({ modal }) => modal.isModalOpen);

  React.useEffect(() => {
    dispatch(fetchCoffee(category, sortBy));
  }, [category, sortBy]);

  const onSelectCategory = (index) => {
    dispatch(setCategory(index));
  };

  const onSelectSortType = (type) => {
    dispatch(setSortBy(type));
  };

  const modalProductOpen = (obj) => {
    dispatch(openModalProduct(obj));
  };

  const modalProductClose = () => {
    dispatch(closeModalProduct())
  }

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
        {isLoaded
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
      {/* <ModalOrder openModal={isModalOpen} closeModal={modalProductClose} /> */}
      {isModalOpen && <ModalOrder closeModal={modalProductClose} />}
    </div>
  );
};

export default Home;