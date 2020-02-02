import React from "react";

const FavoriteItem = ({ value, isSelected, handleClick, handleRemove }) => {
  let styles = "list-group-item list-group-item-action col";
  if (isSelected) {
    styles += " active";
  }
  return (
    <li className="row">
      <div className={styles} onClick={() => handleClick(value)}>
        {value}
      </div>
      <div className="btn btn-danger" onClick={() => handleRemove(value)}>
        X
      </div>
    </li>
  );
};

const FavoritesList = ({ items, selected, handleClick, handleRemove }) => {
  if (items === undefined || items.size === 0) {
    return "No Favorites";
  }
  return (
    <ul className="list-group">
      {Array.from(items).map(zipcode => (
        <FavoriteItem
          value={zipcode}
          isSelected={zipcode === selected}
          handleClick={handleClick}
          handleRemove={handleRemove}
          key={zipcode}
        />
      ))}
    </ul>
  );
};

export default FavoritesList;
