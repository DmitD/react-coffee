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
  return (
    <div className="container">
      <div className="content__top">
        <Categories items={categoryNames} />
        <SortPopup items={sortItems} />
      </div>
      <h2 className="content__title">Весь кофе</h2>
      <div className="content__items">
        <CoffeeBlock />
      </div>
    </div>
  );
};

export default Home;