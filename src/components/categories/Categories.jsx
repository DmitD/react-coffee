const Categories = (props) => {
  const { items } = props;
  return (
    <div className="categories">
      <ul>
        <li>
          Все
        </li>
        {items &&
          items.map((name, index) => (
            <li
              key={`${name}_${index}`}>
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Categories;