import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./components/Home";
import DoctorProfile from "./components/DoctorProfile";
import ItemsContext from "./context/MyContext";
import Appointments from "./components/Appointments";

const App = () => {
  const [itemsList, setItemsList] = useState([]);
  const addItems = (obj) => {
    const filterItem = itemsList.filter((i) => i.id === obj.id);
    if (filterItem.length === 0) {
      setItemsList([...itemsList, obj]);
    }
  };
  return (
    <ItemsContext.Provider value={{ itemsList, addItems: addItems }}>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/doctors/:id" Component={DoctorProfile} />
        <Route exact path="/appointments" Component={Appointments} />
      </Routes>
    </ItemsContext.Provider>
  );
};

export default App;
