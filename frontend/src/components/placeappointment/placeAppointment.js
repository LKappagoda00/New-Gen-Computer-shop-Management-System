import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const PlaceAppointment = () => {
  const [appointment, setAppointment] = useState({
    appointmentId: "",
    username: "",
    phone: "",
    repairtype: "",
    issue: "",
    date: "",
    description: "",
  });

  const navigate = useNavigate();

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "date" ? new Date(value).toISOString().split("T")[0] : value;
    setAppointment({ ...appointment, [name]: newValue });
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    if (
      !appointment.appointmentId ||
      !appointment.username ||
      !validatePhoneNumber(appointment.phone) ||
      !appointment.repairtype ||
      !appointment.issue ||
      !appointment.date ||
      !appointment.description
    ) {
      toast.error("All fields are required or invalid", {
        position: "top-right",
      });
      return false;
    }
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5000/api/appointments/create", appointment);
      toast.success("Appointment created successfully", { position: "top-right" });
      navigate("/viewappointment");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "50px auto",
        background: "linear-gradient(135deg, #0F0F3E, #3A1C71)",
        padding: "40px",
        borderRadius: "15px",
        boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
        color: "#fff",
      }}
    >
      <Link
        to={"/viewappointment"}
        style={{
          textDecoration: "none",
          color: "#fff",
          fontSize: "18px",
          marginBottom: "20px",
          display: "inline-block",
        }}
      >
        Back
      </Link>
      <h3 style={{ marginBottom: "30px", fontSize: "32px", fontWeight: "bold" }}>
        Add Appointment
      </h3>
      <form onSubmit={submitForm} style={{ textAlign: "left" }}>
        {[
          { label: "Appointment ID", name: "appointmentId" },
          { label: "User Name", name: "username" },
          { label: "Phone Number", name: "phone", type: "tel" },
          { label: "Repair Type", name: "repairtype" },
          { label: "Issue", name: "issue" },
          { label: "Date", name: "date", type: "date" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name} style={{ marginBottom: "20px" }}>
            <label htmlFor={name} style={{ display: "block", marginBottom: "5px", fontSize: "18px" }}>
              {label}:
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={appointment[name]}
              onChange={inputChangeHandler}
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "rgba(255,255,255,0.1)",
                color: "#fff",
                outline: "none",
              }}
              required
            />
          </div>
        ))}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="description" style={{ display: "block", marginBottom: "5px", fontSize: "18px" }}>
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={appointment.description}
            onChange={inputChangeHandler}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#fff",
              outline: "none",
              resize: "none",
              height: "100px",
            }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            background: "linear-gradient(90deg, #6A11CB, #2575FC)",
            color: "#fff",
            padding: "12px 25px",
            fontSize: "18px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "0.3s ease",
            width: "100%",
          }}
        >
          Add Appointment
        </button>
      </form>
    </div>
  );
};

export default PlaceAppointment;
