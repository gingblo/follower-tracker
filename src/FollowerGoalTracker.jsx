import React, { useState, useEffect } from 'react';

// Dummy icons as SVGs (replace with real icons or icon library as needed)
const platformIcons = {
  instagram: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#E1306C">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="5" fill="#fff" />
      <circle cx="18" cy="6" r="1.5" fill="#fff" />
    </svg>
  ),
  facebook: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F3">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <text x="12" y="17" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="Arial" fontWeight="bold">f</text>
    </svg>
  ),
  linkedin: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#0077B5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <rect x="6" y="10" width="2" height="6" fill="#fff" />
      <rect x="10" y="10" width="2" height="6" fill="#fff" />
      <rect x="6" y="6" width="2" height="2" fill="#fff" />
      <rect x="10" y="6" width="2" height="2" fill="#fff" />
    </svg>
  ),
};

// Dummy API simulation for follower counts (replace with real API calls)
const fetchFollowerCount = async (platform, handle) => {
  const base = {
    instagram: 2500,
    facebook: 1800,
    linkedin: 1200,
  };
  const randomGrowth = Math.floor(Math.random() * 10);
  return base[platform] + randomGrowth;
};

const accountsInitial = [
  { platform: 'instagram', handle: '@myinsta', goal: 5000, followers: 0 },
  { platform: 'facebook', handle: 'myfbpage', goal: 3000, followers: 0 },
  { platform: 'linkedin', handle: 'my-linkedin', goal: 2000, followers: 0 },
];

function ProgressBar({ percent }) {
  return (
    <div style={{
      background: '#eee',
      borderRadius: 8,
      height: 24,
      width: '100%',
      margin: '8px 0',
      overflow: 'hidden',
      boxShadow: 'inset 0 1px 2px #ccc'
    }}>
      <div style={{
        width: `${percent}%`,
        height: '100%',
        background: 'linear-gradient(90deg, #4e54c8, #8f94fb)',
        transition: 'width 0.5s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        color: '#fff',
        fontWeight: 'bold',
        paddingRight: 8,
        fontSize: 14
      }}>
        {percent}%
      </div>
    </div>
  );
}

function AccountCard({ account, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editHandle, setEditHandle] = useState(account.handle);
  const [editGoal, setEditGoal] = useState(account.goal);

  const percent = Math.min(100, Math.round((account.followers / account.goal) * 100));

  const handleSave = () => {
    const updatedGoal = Number(editGoal);
    if (editHandle.trim() === '' || isNaN(updatedGoal) || updatedGoal <= 0) return;
    onUpdate(account.platform, { handle: editHandle.trim(), goal: updatedGoal });
    setIsEditing(false);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
      padding: 20,
      marginBottom: 20,
      maxWidth: 420
    }}>
      <div style={{ marginRight: 18 }}>
        {platformIcons[account.platform]}
      </div>
      <div style={{ flex: 1 }}>
        {isEditing ? (
          <>
            <input type="text" value={editHandle} onChange={e => setEditHandle(e.target.value)} style={{ fontWeight: 600, fontSize: 18, marginBottom: 6, width: '100%', padding: '4px 8px', borderRadius: 6, border: '1px solid #ccc' }} />
            <input type="number" value={editGoal} onChange={e => setEditGoal(e.target.value)} min={1} style={{ width: '100%', padding: '4px 8px', borderRadius: 6, border: '1px solid #ccc', marginBottom: 6, fontSize: 14 }} />
            <button onClick={handleSave} style={{ background: '#4e54c8', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', fontWeight: 'bold', fontSize: 14 }}>Save</button>
          </>
        ) : (
          <>
            <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 2 }}>{account.handle}</div>
            <ProgressBar percent={percent} />
            <div style={{ fontSize: 15, color: '#555' }}>{account.followers.toLocaleString()} / {account.goal.toLocaleString()} followers</div>
            <button onClick={() => setIsEditing(true)} style={{ marginTop: 8, background: 'transparent', border: '1px solid #4e54c8', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', color: '#4e54c8', fontWeight: 'bold', fontSize: 14 }}>Edit</button>
          </>
        )}
      </div>
    </div>
  );
}

export default function FollowerGoalTracker() {
  const [accounts, setAccounts] = useState(accountsInitial);
  const [newPlatform, setNewPlatform] = useState('instagram');
  const [newHandle, setNewHandle] = useState('');
  const [newGoal, setNewGoal] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function updateFollowers() {
      const updated = await Promise.all(accounts.map(async acc => {
        const followers = await fetchFollowerCount(acc.platform, acc.handle);
        return { ...acc, followers };
      }));
      if (isMounted) setAccounts(updated);
    }
    updateFollowers();
    const interval = setInterval(updateFollowers, 5000);
    return () => { isMounted = false; clearInterval(interval); };
  }, [accounts]);

  const handleAddAccount = (e) => {
    e.preventDefault();
    const trimmedHandle = newHandle.trim();
    const parsedGoal = Number(newGoal);
    if (!trimmedHandle || isNaN(parsedGoal) || parsedGoal <= 0) return;
    if (accounts.some(acc => acc.platform === newPlatform && acc.handle === trimmedHandle)) return;
    setAccounts(prev => [...prev, { platform: newPlatform, handle: trimmedHandle, goal: parsedGoal, followers: 0 }]);
    setNewHandle('');
    setNewGoal('');
  };

  const handleUpdateAccount = (platform, updates) => {
    setAccounts(prev =>
      prev.map(acc => (acc.platform === platform ? { ...acc, ...updates } : acc))
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 30, color: '#333' }}>Social Follower Growth Tracker</h1>
      <form onSubmit={handleAddAccount} style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', marginBottom: 30, maxWidth: 420, width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <label style={{ fontWeight: 600, fontSize: 14, color: '#333' }}>
          Platform:
          <select value={newPlatform} onChange={e => setNewPlatform(e.target.value)} style={{ marginTop: 4, padding: '6px 8px', borderRadius: 6, border: '1px solid #ccc', width: '100%', fontSize: 14 }}>
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="linkedin">LinkedIn</option>
          </select>
        </label>
        <label style={{ fontWeight: 600, fontSize: 14, color: '#333' }}>
          Handle:
          <input type="text" value={newHandle} onChange={e => setNewHandle(e.target.value)} placeholder="Enter handle" style={{ marginTop: 4, padding: '6px 8px', borderRadius: 6, border: '1px solid #ccc', width: '100%', fontSize: 14 }} />
        </label>
        <label style={{ fontWeight: 600, fontSize: 14, color: '#333' }}>
          Goal:
          <input type="number" value={newGoal} onChange={e => setNewGoal(e.target.value)} min={1} placeholder="Enter follower goal" style={{ marginTop: 4, padding: '6px 8px', borderRadius: 6, border: '1px solid #ccc', width: '100%', fontSize: 14 }} />
        </label>
        <button type="submit" style={{ background: '#4e54c8', color: '#fff', border: 'none', borderRadius: 6, padding: '10px', cursor: 'pointer', fontWeight: 'bold', fontSize: 16, marginTop: 8 }}>Add Account</button>
      </form>
      <div>
        {accounts.map(acc => (
          <AccountCard key={acc.platform} account={acc} onUpdate={handleUpdateAccount} />
        ))}
      </div>
      <div style={{ marginTop: 40, color: '#888', fontSize: 14, maxWidth: 420, textAlign: 'center' }}>
        Connect your Instagram, Facebook, and LinkedIn accounts to track your progress toward your goals!
      </div>
    </div>
    // trigger deploy
  );
}