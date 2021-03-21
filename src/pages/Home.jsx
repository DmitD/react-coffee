import React from 'react';
import { useSelector, useDispatch } from "react-redux";

import { fetchCoffee } from '../redux/actions/coffee';
import Categories from "../components/categories";
import SortPopup from "../components/sortpopup";
import CoffeeBlock from "../components/coffeeblock";

const categoryNames = ['Зерновой', 'Молотый', 'Органический', 'Без кофеина'];
const sortItems = [
  { name: 'популярности', type: 'rating', order: 'desc' },
  { name: 'цене', type: 'price', order: 'desc' },
  { name: 'алфавиту', type: 'name', order: 'asc' },
];

const Home = () => {

  const dispatch = useDispatch();
  const items = useSelector(({ coffee }) => coffee.items);

  React.useEffect(() => {
    dispatch(fetchCoffee());
  }, []);

  console.log(items);

  return (
    <div className="container">
      <div className="content__top">
        <Categories items={categoryNames} />
        <SortPopup items={sortItems} />
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