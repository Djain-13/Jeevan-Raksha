import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import InternalNav from './InternalNav';
import API_URL from './config';

const BADGE_INFO = {
  quakeProof:      { label: 'Quake Proof',       emoji: '🔴', color: '#dc2626' },
  goBagGuru:       { label: 'Go-Bag Guru',        emoji: '🎒', color: '#d97706' },
  floodReady:      { label: 'Flood Ready',         emoji: '🌊', color: '#2563eb' },
  fireSafety:      { label: 'Fire Safety Pro',     emoji: '🔥', color: '#ea580c' },
  firstAid:        { label: 'First Aid Hero',      emoji: '❤️', color: '#e11d48' },
  cycloneSentinel: { label: 'Cyclone Sentinel',    emoji: '🌀', color: '#7c3aed' },
  preparedness:    { label: 'Preparedness Master', emoji: '⚡', color: '#0891b2' },
};

const MODULE_LABELS = {
  earthquake: { label: 'Earthquakes', icon: '🔴' },
  drought:    { label: 'Drought',     icon: '🏜️' },
  flood:      { label: 'Flood',       icon: '🌊' },
  wildfire:   { label: 'Wildfire',    icon: '🔥' },
};
const MODULE_TABS = ['prepare', 'during', 'after', 'resources'];

const DIFF_LABEL = { easy: '🟢 Beginner', medium: '🟡 Intermediate', hard: '🔴 Advanced' };

const UserProfile = ({ onBack, onLogout, onHome }) => {
  const [profile, setProfile]           = useState(null);  // from backend
  const [moduleProgress, setModuleProgress] = useState({});
  const [localQuiz, setLocalQuiz]       = useState({ level: 1, xp: 0, badgesEarned: [] });
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState('');

  useEffect(() => {
    // Always load local module progress (stored in browser)
    try {
      const mods = localStorage.getItem('jeevanraksha_module_progress');
      if (mods) setModuleProgress(JSON.parse(mods));
      const quiz = localStorage.getItem('disasterQuizUser');
      if (quiz) setLocalQuiz(JSON.parse(quiz));
    } catch {}

    // Fetch real profile from backend
    const token = localStorage.getItem('access_token');
    if (!token) { setLoading(false); return; }

    fetch(`${API_URL}/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Profile fetch failed');
        return res.json();
      })
      .then(data => { setProfile(data); setLoading(false); })
      .catch(err => { setError('Could not load profile from server.'); setLoading(false); });
  }, []);

  // Derived values
  const displayName = profile?.full_name || profile?.username
    || JSON.parse(localStorage.getItem('user') || '{}')?.username || 'Explorer';
  const initials = displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  const quizStats   = profile?.quiz_stats || {};
  const badgesEarned = quizStats.badges_earned || localQuiz.badgesEarned || [];
  const totalXP      = quizStats.total_xp ?? localQuiz.xp;
  const totalAttempts = quizStats.total_attempts ?? 0;

  // Module progress
  const totalModuleSections = 4 * 4;
  const visitedSections = Object.keys(moduleProgress).length;
  const moduleProgressPct = Math.round((visitedSections / totalModuleSections) * 100);

  const getModuleProgress = (disasterId) => {
    const done = MODULE_TABS.filter(t => moduleProgress[`${disasterId}_${t}`]).length;
    return { done, total: MODULE_TABS.length, pct: Math.round((done / MODULE_TABS.length) * 100) };
  };

  // XP bar (local game state)
  const xpToNextLevel = localQuiz.level * 100;
  const xpPct = Math.min(100, Math.round((localQuiz.xp % xpToNextLevel) / xpToNextLevel * 100));

  if (loading) {
    return (
      <div className="profile-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', color: '#64748b' }}>
          <div style={{ width: 40, height: 40, border: '3px solid rgba(59,130,246,0.15)', borderTop: '3px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 14px' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          Loading your profile...
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <InternalNav title="My Profile" onBack={onBack} onHome={onHome} onLogout={onLogout} showHome={true} />
      <header className="profile-header" style={{ paddingTop: '20px' }}>
        <h1>My Profile</h1>
        <p>Your disaster preparedness journey</p>
      </header>

      <div className="profile-content">

        {/* ── Avatar & Identity ── */}
        <div className="profile-card identity-card">
          <div className="avatar-circle">{initials}</div>
          <div className="identity-info">
            <h2>{displayName}</h2>
            {(profile?.email) && <p className="identity-email">{profile.email}</p>}
            {profile?.member_since && (
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '4px 0 0' }}>
                Member since {profile.member_since}
              </p>
            )}
            <span className="level-badge">Level {localQuiz.level} Responder</span>
          </div>
          {onLogout && (
            <button
              onClick={onLogout}
              style={{
                marginTop: 'auto', padding: '8px 18px',
                background: 'rgba(239,68,68,0.08)', color: '#dc2626',
                border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px',
                fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Logout
            </button>
          )}
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '12px 16px', color: '#dc2626', fontSize: '0.87rem', marginBottom: '12px' }}>
            ⚠️ {error} Showing locally saved data.
          </div>
        )}

        {/* ── Quiz Stats ── */}
        <div className="profile-card stats-card">
          <h3>🏆 Quiz Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">{localQuiz.level}</span>
              <span className="stat-label">Level</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{totalXP}</span>
              <span className="stat-label">Total XP</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{badgesEarned.length}</span>
              <span className="stat-label">Badges</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{totalAttempts}</span>
              <span className="stat-label">Attempts</span>
            </div>
          </div>

          {/* XP Progress bar */}
          <div className="xp-bar-section">
            <div className="xp-bar-label">
              <span>XP Progress to Level {localQuiz.level + 1}</span>
              <span style={{ fontWeight: 700, color: '#3b82f6' }}>{xpPct}%</span>
            </div>
            <div className="xp-bar-track">
              <div className="xp-bar-fill" style={{ width: `${xpPct}%` }} />
            </div>
          </div>

          {/* Best scores per difficulty from backend */}
          {quizStats.best_scores && Object.keys(quizStats.best_scores).length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '10px', fontWeight: 600 }}>Best Scores:</p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {Object.entries(quizStats.best_scores).map(([lvl, pct]) => (
                  <span key={lvl} style={{
                    background: 'rgba(59,130,246,0.08)', color: '#2563eb',
                    padding: '4px 14px', borderRadius: '20px', fontWeight: 600, fontSize: '0.8rem',
                    border: '1px solid rgba(59,130,246,0.15)'
                  }}>
                    {DIFF_LABEL[lvl] || lvl}: {pct}%
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Recent Quiz History (from backend) ── */}
        {quizStats.recent && quizStats.recent.length > 0 && (
          <div className="profile-card">
            <h3>📋 Recent Quiz Attempts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {quizStats.recent.slice(0, 5).map((attempt, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px', background: 'rgba(59,130,246,0.04)',
                  borderRadius: '10px', border: '1px solid rgba(59,130,246,0.08)',
                }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '0.88rem', color: '#1e293b' }}>
                      {DIFF_LABEL[attempt.difficulty] || attempt.difficulty}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8', marginLeft: '10px' }}>
                      {new Date(attempt.completed_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{
                      fontWeight: 700, fontSize: '0.88rem',
                      color: attempt.percentage >= 80 ? '#16a34a' : attempt.percentage >= 50 ? '#d97706' : '#dc2626'
                    }}>
                      {attempt.score}/{attempt.total} ({attempt.percentage}%)
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 600 }}>+{attempt.xp_earned} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Badges ── */}
        <div className="profile-card badges-card">
          <h3>🎖️ Badges Earned</h3>
          {badgesEarned.length > 0 ? (
            <div className="badges-grid">
              {badgesEarned.map(b => {
                const info = BADGE_INFO[b] || { label: b, emoji: '🏅', color: '#64748b' };
                return (
                  <div key={b} className="badge-chip" style={{ borderColor: info.color }}>
                    <span className="badge-emoji">{info.emoji}</span>
                    <span className="badge-label" style={{ color: info.color }}>{info.label}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <span style={{ fontSize: '2rem' }}>🎯</span>
              <p>Complete quizzes to earn badges!</p>
            </div>
          )}

          {/* Locked badges */}
          {badgesEarned.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px' }}>Locked badges:</p>
              <div className="badges-grid">
                {Object.entries(BADGE_INFO)
                  .filter(([key]) => !badgesEarned.includes(key))
                  .map(([key, info]) => (
                    <div key={key} className="badge-chip locked">
                      <span className="badge-emoji" style={{ filter: 'grayscale(1)' }}>{info.emoji}</span>
                      <span className="badge-label" style={{ color: '#94a3b8' }}>{info.label}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Module Progress ── */}
        <div className="profile-card modules-card">
          <h3>📚 Learning Progress</h3>
          <div className="overall-progress">
            <div className="xp-bar-label">
              <span>Overall Module Completion</span>
              <span style={{ fontWeight: 700, color: moduleProgressPct === 100 ? '#16a34a' : '#3b82f6' }}>
                {moduleProgressPct}%
              </span>
            </div>
            <div className="xp-bar-track">
              <div className="xp-bar-fill" style={{
                width: `${moduleProgressPct}%`,
                background: moduleProgressPct === 100 ? 'linear-gradient(90deg,#16a34a,#22c55e)' : undefined,
              }} />
            </div>
          </div>
          <div className="modules-progress-grid">
            {Object.entries(MODULE_LABELS).map(([id, { label, icon }]) => {
              const { done, total, pct } = getModuleProgress(id);
              return (
                <div key={id} className="module-progress-item">
                  <div className="module-progress-header">
                    <span>{icon} {label}</span>
                    <span style={{ fontWeight: 600, fontSize: '0.82rem', color: pct === 100 ? '#16a34a' : '#64748b' }}>
                      {pct === 100 ? '✓ Complete' : `${done}/${total} sections`}
                    </span>
                  </div>
                  <div className="xp-bar-track" style={{ height: '5px', marginTop: '6px' }}>
                    <div className="xp-bar-fill" style={{
                      width: `${pct}%`,
                      background: pct === 100 ? 'linear-gradient(90deg,#16a34a,#22c55e)' : undefined,
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
