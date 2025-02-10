import React from 'react';

const RecentActivitySection = ({ activities }: { activities: any }) => {
  return (
    <div className="recent-activity-section">
      <h2>Recent Activity</h2>
      <div className="activity-list">
        {activities?.map((activity: any) => (
          <div key={activity.id} className="activity-item">
            <h3>{activity.action}</h3>
            <p>{activity.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivitySection;
