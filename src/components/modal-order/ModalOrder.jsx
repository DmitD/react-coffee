import React from "react";
import classNames from "classnames";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

import Button from "../button";


const ModalOrder = (props) => {

  const availableTypes = ['зерно', 'молотый'];
  const availableWeight = ["sm", "md", "lg"];
  const { openModal, closeModal, onClickAddItem } = props;
  const currentItem = useSelector(({ modal }) => modal.openedItem);
  const { id, title, imageUrl, types, ingredients, description, details } = currentItem;
  const [activeType, setActiveType] = React.useState(types[0]);
  const [activeWeight, setActiveWeight] = React.useState(0);
  const [itemsCount, setItemsCount] = React.useState(1);

  const onSelectType = (index) => {
    setActiveType(index);
  };

  const onSelectWeight = (index) => {
    setActiveWeight(index);
  };

  const changeCount = (val) => {
    if (val === 'inc') {
      setItemsCount(itemsCount + 1)
    }
    if (val === 'dec') {
      if (itemsCount > 1) {
        setItemsCount(itemsCount - 1)
      }
    }
  };

  const currentPrice = details[availableWeight[activeWeight]].price * itemsCount;

  const onAddItemToCart = () => {
    const obj = {
      id,
      title,
      imageUrl,
      type: availableTypes[activeType],
      weight: details[availableWeight[activeWeight]].weight,
      price: currentPrice,
      count: itemsCount,
    };
    onClickAddItem(obj)
    closeModal();
  };

  return (
    // <div className={openModal ? "modal modal-open" : "modal"}>
    //   <div className={openModal ? "modal-order active" : "modal-order"}>
    <div className="modal modal-open">
      <div className="modal-order active">
        <div className="modal-order__remove">
          <span>Добавить товар в корзину</span>
          <div className="modal-order__remove__button">
            <Button className="button--circle" outline onClick={() => closeModal()}>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                  fill="#EB5A1E"
                />
                <path
                  d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                  fill="#EB5A1E"
                />
              </svg>
            </Button>
          </div>
        </div>
        <div className="modal-order__main-block">
          <img src={imageUrl} alt="Coffee" />
          <div className="modal-order__content">
            <h2>{title}</h2>
            <p>{ingredients}</p>
            <p>{description}</p>
            <div className="modal-order__selector">
              <ul>
                {availableTypes.map((type, index) => (
                  <li
                    key={type}
                    onClick={() => onSelectType(index)}
                    className={classNames({
                      active: activeType === index,
                      disabled: !types.includes(index),
                    })}>
                    {type}
                  </li>
                ))}
              </ul>
              <ul>
                {availableWeight.map((currentWeight, index) => (
                  details.hasOwnProperty(currentWeight) &&
                  <li
                    key={currentWeight}
                    onClick={() => onSelectWeight(index)}
                    className={classNames({
                      active: activeWeight === index,
                      //disabled: !details.hasOwnProperty(currentWeight),
                    })}>
                    {details[currentWeight].weight} г
                  </li>
                ))}
              </ul>
            </div>
            <div className='modal-order__number'>
              <p>Количество:</p>
              <div className="modal-order__number__item">
                <Button
                  className="button button--outline button--circle modal-order__number__item-minus"
                  onClick={() => changeCount('dec')}>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                      fill="#EB5A1E"
                    />
                    <path
                      d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                      fill="#EB5A1E"
                    />
                  </svg>
                </Button>
                <b>{itemsCount}</b>
                <Button
                  className="button button--outline button--circle modal-order__number__item-plus"
                  onClick={() => changeCount('inc')}>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"
                      fill="#EB5A1E"
                    />
                    <path
                      d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"
                      fill="#EB5A1E"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            <div className="modal-order__price">
              <p>Всего:</p>
              <b>{currentPrice} грн</b>
            </div>
          </div>
        </div>
        <div className="modal-order__bottom-buttons">
          <Button className="button button--outline go-back-btn" onClick={() => closeModal()}>
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Вернуться назад</span>
          </Button>
          <Link to="/cart">
            <Button className="button pay-btn"
              onClick={onAddItemToCart}>
              <span>В корзину</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ModalOrder;
