import { useContext } from "react";
import { Link } from "react-router-dom";
import { GiConfirmed } from "react-icons/gi";

import "./index.css";

import Header from "../Header";
import ItemsContext from "../../context/MyContext";

const Appointments = () => {
  const { itemsList } = useContext(ItemsContext);
  return (
    <div className="appointments-main-cont">
      <Header />
      {itemsList.length === 0 ? (
        <div className="emp-cont">
          <p>No Items</p>
        </div>
      ) : (
        <div className="appointments-btm-cont">
          <ul className="app-bottom-cont">
            {itemsList.map((i) => (
              <li key={i.id} className="app-list-item">
                <Link to={`/doctors/${i.id}`} className="app-link-cont">
                  <div className="app-profile-details-cont">
                    <img
                      src={i.profileUrl}
                      alt={i.name}
                      className="app-image"
                    />
                    <div className="app-details-cont">
                      <p className="app-name">{i.name}</p>
                      <p className="app-specialization">{i.specialization}</p>
                      <p className="app-hospital">&bull; {i.hospitalName}</p>
                    </div>
                  </div>
                  <div className="appointment-confired-msg-container">
                    <GiConfirmed className="con-icon" />
                    <p>Appointment Confirmed</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Appointments;
