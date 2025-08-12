import { useEffect, useState, useContext } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaLocationDot } from "react-icons/fa6";
import { MdDoNotDisturbOn } from "react-icons/md";
import { MdBlock } from "react-icons/md";
import { PiCalendarDotsBold } from "react-icons/pi";
import { IoFlash } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { IoCloseOutline } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";

import Header from "../Header";
import "./index.css";
import ItemsContext from "../../context/MyContext";

const status = {
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const DoctorProfile = () => {
  const { id } = useParams();
  const [currentStatus, setStatus] = useState(status.loading);
  const [doctorDetails, setDetails] = useState([]);
  const [length, setLength] = useState("less");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const { addItems, itemsList } = useContext(ItemsContext);

  const filteringList = itemsList.filter((i) => i.id === doctorDetails.id);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const url = `https://niroggyan-backend-qj7c.onrender.com/doctors/${id}`;
        const options = {
          method: "GET",
        };
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          const updatedData = {
            id: data.id,
            name: data.name,
            specialization: data.specialization,
            profileUrl: data.profile_url,
            availabilityStatus: data.availability_status,
            experience: data.experience,
            hospitalName: data.hospital_name,
            degree: data.degree,
            description: data.description,
            hospitalAddress: data.hospital_address,
            hospitalTimings: data.hospital_timings,
          };
          console.log(updatedData);
          setStatus(status.success);
          setDetails(updatedData);
        } else {
          setStatus(status.failure);
        }
      } catch (error) {
        console.log("Error Found: ", error);
      }
    };
    getData();
  }, [id]);

  const trimmedText = (text) => {
    if (text.length > 200) {
      const index = text.slice(0, 200).lastIndexOf(" ");
      return text.slice(0, index);
    }
    return text;
  };

  const loadingView = () => (
    <div className="loader-container">
      <ClipLoader color="#2c2e50" size={25} speedMultiplier={1.5} />
    </div>
  );

  const changingLength = () => {
    if (length === "full") {
      setLength("less");
    } else {
      setLength("full");
    }
  };

  const descriptionText = () => {
    if (doctorDetails.description.length < 200) {
      return doctorDetails.description;
    } else if (length === "less") {
      return trimmedText(doctorDetails.description);
    }
    return doctorDetails.description;
  };

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

  const clickedBack = () => {
    navigate("/");
  };

  const formSubmitted = (event, close) => {
    event.preventDefault();

    const today = new Date();
    let isValid = true;
    if (name === "") {
      setNameError("*Please Enter Patient Name");
      isValid = false;
    } else {
      setNameError("");
    }
    if (email === "") {
      setEmailError("*Please Enter Email");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (date === "") {
      setDateError("*Please Enter Date");
      isValid = false;
    } else {
      setDateError("");
    }
    if (time === "") {
      setTimeError("*Please Enter Time");
      isValid = false;
    } else {
      setTimeError("");
    }
    if (new Date(date) < today) {
      setDateError("*Please Enter Future Date");
      isValid = false;
    }

    if (isValid) {
      close();
      setName("");
      setEmail("");
      setDate("");
      setTime("");
      setConfirmation(true);

      setTimeout(() => {
        setConfirmation(false);
      }, 2000);
      addItems({
        id: doctorDetails.id,
        profileUrl: doctorDetails.profileUrl,
        name: doctorDetails.name,
        specialization: doctorDetails.specialization,
        hospitalName: doctorDetails.hospitalName,
      });
    }
  };

  const changingName = (event) => {
    setName(event.target.value);
    setNameError("");
  };

  const changingEmail = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const changingDate = (event) => {
    setDate(event.target.value);
    setDateError("");
  };

  const changingTime = (event) => {
    setTime(event.target.value);
    setTimeError("");
  };

  const successView = () => (
    <div className="profile-bottom-container">
      <div className="btm-cont">
        <div className="image-details-container">
          <img
            src={doctorDetails.profileUrl}
            alt={doctorDetails.name}
            className="profile-image"
          />
          <div className="details-container">
            <p className="profile-name">{doctorDetails.name}</p>
            <p className="profile-degree">{doctorDetails.degree}</p>
            <p className="profile-specialization">
              {doctorDetails.specialization}
            </p>
            <p className="profile-experience">
              {doctorDetails.experience} years of experience overall
            </p>
            <div className="profile-verified-cont">
              <VscVerifiedFilled className="tic-icon" />
              <p className="profile-verified">Medical Registration Verified</p>
            </div>
            <p className="profile-description">
              {descriptionText()}
              {doctorDetails.description.length > 200 && (
                <span className="trim-text" onClick={changingLength}>
                  {length === "less" ? " more.." : " [shrink]"}
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="hos-info-cont">
          <div className="hos-loc-cont">
            <h1 className="hos-info-head">Hospital: </h1>
            <p className="hos-name">&bull; {doctorDetails.hospitalName}</p>
            <div className="hos-add">
              <FaLocationDot className="loc-icon" />
              <p>{doctorDetails.hospitalAddress}</p>
            </div>
          </div>
          <div className="hos-tim-cont">
            <p className="mon-sat-head">Mon - Sat</p>
            <p className="mon-sat-time">
              {JSON.parse(doctorDetails.hospitalTimings)[0]}
            </p>
            <p className="sun-head">Sun</p>
            <p className="sun-time">
              {JSON.parse(doctorDetails.hospitalTimings)[1]}
            </p>
          </div>
          <div className={`stattus ${color(doctorDetails.availabilityStatus)}`}>
            {iconElement(doctorDetails.availabilityStatus)}
            <p>{doctorDetails.availabilityStatus}</p>
          </div>
        </div>
        {filteringList.length === 0 ? (
          <Popup
            modal
            trigger={
              <button type="button" className="book-btn">
                <IoFlash />
                Book Appointment
              </button>
            }
          >
            {(close) => (
              <form
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    formSubmitted(e, close);
                  }
                }}
                onSubmit={(event) => formSubmitted(event, close)}
                className="form-container"
              >
                <div className="btn-cont">
                  <button className="close-btn" onClick={() => close()}>
                    <IoCloseOutline />
                  </button>
                </div>
                <h1 className="form-head">Book Appointment</h1>
                <div className="patient-name-container">
                  <label className="patient-name-label" htmlFor="patient-name">
                    Patient Name* :
                  </label>
                  <input
                    id="patient-name"
                    type="text"
                    placeholder="Enter Patient Name"
                    className="patient-name-input"
                    value={name}
                    onChange={changingName}
                  />
                  <p className="error-msg">{nameError}</p>
                </div>
                <div className="patient-email-container">
                  <label
                    className="patient-email-label"
                    htmlFor="patient-email"
                  >
                    Email* :
                  </label>
                  <input
                    id="patient-email"
                    type="email"
                    placeholder="Enter Email"
                    className="patient-email-input"
                    value={email}
                    onChange={changingEmail}
                  />
                  <p className="error-msg">{emailError}</p>
                </div>
                <div className="patient-date-container">
                  <label className="patient-date-label" htmlFor="patient-date">
                    Date* :
                  </label>
                  <input
                    id="patient-date"
                    type="date"
                    className="patient-date-input"
                    value={date}
                    onChange={changingDate}
                  />
                  <p className="error-msg">{dateError}</p>
                </div>
                <div className="patient-time-container">
                  <label className="patient-time-label" htmlFor="patient-time">
                    Time* :
                  </label>
                  <input
                    id="patient-time"
                    type="time"
                    className="patient-time-input"
                    value={time}
                    onChange={changingTime}
                  />
                  <p className="error-msg">{timeError}</p>
                </div>
                <div className="btn-cont">
                  {doctorDetails.availabilityStatus === "Available Today" ? (
                    <button type="submit" className="submit-btn">
                      Submit
                    </button>
                  ) : (
                    "Not Available"
                  )}
                </div>
              </form>
            )}
          </Popup>
        ) : (
          <div className="appointment-confired-msg-cont">
            <GiConfirmed className="con-icon" />
            <p>Appointment Confirmed</p>
          </div>
        )}
        {confirmation && (
          <div className="confired-msg-cont">
            <GiConfirmed className="con-icon" />
            <p>Booking Confirmed</p>
          </div>
        )}
      </div>
    </div>
  );

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

  return (
    <div className="profile-main-container">
      <Header />
      <IoIosArrowRoundBack className="back-icon" onClick={clickedBack} />
      {renderView()}
    </div>
  );
};

export default DoctorProfile;
