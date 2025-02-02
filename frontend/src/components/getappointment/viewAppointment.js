import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import "./ViewAppointmennt.css"; // Importing the CSS file

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/appointments/getall");
        setAppointments(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  const filteredAppointments = appointments.filter(appointment =>
    appointment.appointmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="appointment-container">
      <h2 className="title">Appointment List</h2>
      <div className="controls">
        <input type="text" className="search-box" placeholder="Search by ID or Name" value={searchTerm} onChange={handleSearch} />
        <Link to="/appointmentadd" className="add-button">Add Appointment</Link>
      </div>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>A.No.</th>
            <th>ID</th>
            <th>User Name</th>
            <th>Phone Number</th>
            <th>Repair Type</th>
            <th>Issue</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment, index) => (
            <tr key={appointment._id}>
              <td>{index + 1}</td>
              <td>{appointment.appointmentId}</td>
              <td>{appointment.username}</td>
              <td>{appointment.phone}</td>
              <td>{appointment.repairtype}</td>
              <td>{appointment.issue}</td>
              <td>{new Date(appointment.date).toLocaleDateString('en-GB')}</td>
              <td>{appointment.status}</td>
              <td>
                <Link to={`/viewReport/${appointment._id}`} className="view-report">View Report</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ViewAppointment;