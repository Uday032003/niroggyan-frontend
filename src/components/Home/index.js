import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDoNotDisturbOn } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { PiCalendarDotsBold } from "react-icons/pi";
import { ClipLoader } from "react-spinners";

import "./index.css";

import Header from "../Header/";

const status = {
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Home = () => {
  const [doctorsList, setList] = useState([]);
  const [currentStatus, setStatus] = useState(status.loading);
  const [searchValue, changeInput] = useState("");

  const color = (val) => {
    if (val === "Available Today") {
      return "green";
    } else if (val === "Fully Booked") {
      return "orange";
    }
    return "red";
  };

  const iconElement = (val) => {
    if (val === "Available Today") {
      return <PiCalendarDotsBold className="sttus-icon" />;
    } else if (val === "Fully Booked") {
      return <MdBlock className="sttus-icon" />;
    }
    return <MdDoNotDisturbOn className="sttus-icon" />;
  };

  const loadingView = () => (
    <div className="loader-container">
      <ClipLoader color="#2c2e50" size={25} speedMultiplier={1.5} />
    </div>
  );

  const successView = () => {
    const filteredList = doctorsList.filter(
      (i) =>
        i.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        i.specialization.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (
      <ul className="list-container">
        <li className="heading-list-item">
          <h1 className="heading">
            {doctorsList.length} doctors available in Rajahmundry
          </h1>
        </li>
        {filteredList.map((i) => (
          <li key={i.id} className="list-item">
            <Link to={`/doctors/${i.id}`} className="link-cont">
              <div className="profile-details-cont">
                <img src={i.profileUrl} alt={i.name} className="home-image" />
                <div className="details-cont">
                  <p className="name">{i.name}</p>
                  <p className="specialization">{i.specialization}</p>
                  <p className="experience">
                    {i.experience} years experience overall
                  </p>
                  <p className="hospital">&bull; {i.hospitalName}</p>
                </div>
              </div>
              <p className="hover-text">
                Click to view Profile <br />
                and book appointment
              </p>
              <div className={`status ${color(i.availabilityStatus)}`}>
                {iconElement(i.availabilityStatus)}
                <p>{i.availabilityStatus}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  const failureView = () => (
    <div className="failure-container">
      <p>Failed to fetch data</p>
      <button>Retry</button>
    </div>
  );

  const renderView = () => {
    switch (currentStatus) {
      case status.loading:
        return loadingView();
      case status.failure:
        return failureView();
      case status.success:
        return successView();
      default:
        return null;
    }
  };

  const changingText = (event) => {
    changeInput(event.target.value);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const url = "https://niroggyan-backend-qj7c.onrender.com/doctors";
        const options = {
          method: "GET",
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const updatedData = data.map((i) => ({
            id: i.id,
            name: i.name,
            specialization: i.specialization,
            profileUrl: i.profile_url,
            availabilityStatus: i.availability_status,
            experience: i.experience,
            hospitalName: i.hospital_name,
          }));
          console.log(updatedData);
          setStatus(status.success);
          setList(updatedData);
        } else {
          setStatus(status.failure);
        }
      } catch (error) {
        console.log("Error Found: ", error);
      }
    };
    getData();
  }, []);
  return (
    <div className="home-container">
      <Header />
      <div className="home-bottom-container">
        <div className="bottom-cont">
          <div className="search-container">
            <IoSearch className="search-icon" />
            <input
              type="search"
              placeholder="Search by name or specialization"
              className="inputt"
              value={searchValue}
              onChange={changingText}
            />
          </div>
          {renderView()}
        </div>
      </div>
    </div>
  );
};

export default Home;
