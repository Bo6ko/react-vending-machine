import React, { useState, useEffect } from "react";
import './InputCoin.css';

const InputCoin = ({ coin, onCoinChanged }) => {
  const [total, setTotal] = useState(coin);

  useEffect(() => {
    setTotal(coin);
  }, [coin]);

  const onItemClick = value => {
    const newTotal = total + value;
    setTotal(newTotal);
    onCoinChanged(newTotal);
  };
  const onCancel = () => {
    alert('refuse ' + parseFloat(total).toFixed(2));
    const newTotal = 0;
    setTotal(newTotal);
    onCoinChanged(newTotal);
  };
  return (
    <div className="input-coin">
      <div className="coins" onClick={() => onItemClick(0.1)}>0.1</div>
      <div className="coins" onClick={() => onItemClick(0.2)}>0.2</div>
      <div className="coins" onClick={() => onItemClick(0.5)}>0.5</div>
      <div className="coins" onClick={() => onItemClick(1)}>1</div>
      <div className="coins" onClick={() => onItemClick(2)}>2</div>
      <div className="coins" onClick={() => onItemClick(5)}>5</div>
      <div className="coins" onClick={() => onItemClick(10)}>10</div>
      <div className="coins" onClick={() => onItemClick(20)}>20</div>
      <div className="coins" onClick={() => onItemClick(50)}>50</div>

      <div className="clear"></div>
      
      <div className="total">{parseFloat(total).toFixed(2)}</div>
      <div className="cancel" onClick={onCancel}>Get change</div>
    </div>
  );
}

export default InputCoin;
