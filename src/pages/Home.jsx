import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import Categories from "../components/categories";
import SortPopup from "../components/sortpopup";
import CoffeeBlock from "../components/coffeeblock";
import { fetchCoffee } from '../redux/actions/coffee';
import { setCategory, setSortBy } from '../redux/actions/filters';


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

  React.useEffect(() => {
    dispatch(fetchCoffee(category, sortBy));
  }, [category, sortBy]);

  const onSelectCategory = (index) => {
    dispatch(setCategory(index));
  };

  const onSelectSortType = (type) => {
    dispatch(setSortBy(type));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories 
          items={categoryNames} 
          activeCategory={category} 
          onClickCategory={onSelectCategory}/>
        <SortPopup 
          items={sortItems} 
          activeSortType={sortBy.type}
          onClickSortType={onSelectSortType}/>
      </div>
      <h2 className="content__title">Весь кофе</h2>
      <div className="content__items">
        {items.map((obj) => (
          <CoffeeBlock
            key={obj.id}
            {...obj}
          />))}
      </div>
    </div>
  );
};

export default Home;