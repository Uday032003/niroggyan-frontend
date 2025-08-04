import React from "react";

const ItemsContext = React.createContext({
  itemsList: [],
  addItems: () => {},
});

export default ItemsContext;
