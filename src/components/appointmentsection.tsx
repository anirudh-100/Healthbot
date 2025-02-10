import React from 'react';

const AppointmentSection = ({ appointments }: { appointments: any }) => {
  return (
    <div className="appointments-section">
      <h2>Appointments</h2>
      <div className="appointments-list">
        {appointments?.map((appointment: any) => (
          <div key={appointment.id} className="appointment-item">
            <h3>{appointment.doctorName}</h3>
            <p>{appointment.dateTime}</p>
            <p>Status: {appointment.status}</p>
            <button>Cancel</button>
            <button>Reschedule</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentSection;
