import React from 'react';

const RewardSection = ({ rewards }: { rewards: any }) => {
  return (
    <div className="reward-section">
      <h2>Rewards</h2>
      <p>Current Points: {rewards?.points}</p>
      <button>Redeem Points</button>
    </div>
  );
};

export default RewardSection;
