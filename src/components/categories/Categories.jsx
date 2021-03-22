const Categories = (props) => {
  const { items, activeCategory, onClickCategory } = props;
  return (
    <div className="categories">
      <ul>
        <li 
          className={activeCategory === null ? 'active' : ''}
          onClick={() => onClickCategory(null)}>
          Все
        </li>
        {items &&
          items.map((name, index) => (
            <li
              key={`${name}_${index}`}
              className={activeCategory === index ? 'active' : ''}
              onClick={() => onClickCategory(index)}>
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;