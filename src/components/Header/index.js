import { MdCalendarMonth } from "react-icons/md";
import { Link } from "react-router-dom";

import ItemsContext from "../../context/MyContext";
import "./index.css";

const Header = () => (
  <ItemsContext.Consumer>
    {(value) => {
      const { itemsList } = value;
      console.log(itemsList);
      return (
        <div className="header-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dnxaaxcjv/image/upload/v1754196764/Gemini_Generated_Image_icqg9gicqg9gicqg-removebg-preview_pryszi.png"
              alt="logo"
              className="header-logo"
            />
          </Link>
          <div className="icon-container">
            <Link to="/appointments">
              <button className="cal-btn" type="button">
                <MdCalendarMonth className="iconn" />
              </button>
            </Link>
            {itemsList.length > 0 && (
              <span className="span-item">{itemsList.length}</span>
            )}
          </div>
        </div>
      );
    }}
  </ItemsContext.Consumer>
);

export default Header;
