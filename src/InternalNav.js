import React, { useState } from 'react';

/**
 * Shared top navbar for all internal pages (Home, Quiz, Drill, Modules, Profile, SOS, Alert).
 * Props:
 *   title        – page title shown in the center
 *   onBack       – called when "← Back" is clicked (optional)
 *   onHome       – called when "🏠 Home" is clicked (optional)
 *   onProfile    – called when avatar/name is clicked (optional)
 *   onLogout     – called when "Logout" is clicked (optional)
 *   showHome     – show the Home button? (default true)
 */
const InternalNav = ({ title, onBack, onHome, onProfile, onLogout, showHome = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch { return {}; }
  })();
  const displayName = user.full_name || user.username || 'User';
  const initials = displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <>
      <style>{`
        .inav {
          position: sticky;
          top: 0;
          z-index: 9000;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(0,0,0,0.07);
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 58px;
          gap: 12px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.05);
        }
        .inav-left { display: flex; align-items: center; gap: 10px; }
        .inav-back-btn {
          display: flex; align-items: center; gap: 6px;
          background: rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.08);
          border-radius: 10px; padding: 6px 14px;
          font-size: 0.85rem; font-weight: 600; color: #475569;
          cursor: pointer; transition: all 0.18s;
        }
        .inav-back-btn:hover { background: rgba(0,0,0,0.08); color: #0f172a; }
        .inav-title {
          font-size: 1rem; font-weight: 700; color: #0f172a;
          letter-spacing: -0.2px; white-space: nowrap;
        }
        .inav-right { display: flex; align-items: center; gap: 10px; position: relative; }
        .inav-home-btn {
          display: flex; align-items: center; gap: 5px;
          background: rgba(59,130,246,0.08); border: 1px solid rgba(59,130,246,0.15);
          border-radius: 10px; padding: 6px 14px;
          font-size: 0.82rem; font-weight: 600; color: #2563eb;
          cursor: pointer; transition: all 0.18s;
        }
        .inav-home-btn:hover { background: rgba(59,130,246,0.18); }
        .inav-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #06b6d4);
          color: #fff; font-weight: 700; font-size: 0.8rem;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; border: 2px solid rgba(59,130,246,0.2);
          transition: all 0.18s; flex-shrink: 0;
          user-select: none;
        }
        .inav-avatar:hover { transform: scale(1.08); border-color: #3b82f6; }
        .inav-dropdown {
          position: absolute; top: 44px; right: 0;
          background: #fff; border: 1px solid rgba(0,0,0,0.08);
          border-radius: 14px; box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          padding: 8px; min-width: 170px; z-index: 9999;
          animation: inavDropIn 0.18s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes inavDropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .inav-dd-item {
          display: flex; align-items: center; gap: 8px;
          padding: 9px 12px; border-radius: 10px;
          font-size: 0.85rem; font-weight: 500; color: #334155;
          cursor: pointer; transition: background 0.15s;
          border: none; background: none; width: 100%; text-align: left;
        }
        .inav-dd-item:hover { background: rgba(0,0,0,0.05); }
        .inav-dd-item.danger { color: #dc2626; }
        .inav-dd-item.danger:hover { background: rgba(239,68,68,0.07); }
        .inav-dd-separator { height: 1px; background: rgba(0,0,0,0.06); margin: 4px 0; }
        @media (max-width: 480px) {
          .inav-title { display: none; }
          .inav-home-btn span { display: none; }
        }
      `}</style>

      <nav className="inav">
        <div className="inav-left">
          {onBack && (
            <button className="inav-back-btn" onClick={onBack}>
              ← Back
            </button>
          )}
          <span className="inav-title">{title}</span>
        </div>

        <div className="inav-right">
          {showHome && onHome && (
            <button className="inav-home-btn" onClick={onHome}>
              🏠 <span>Home</span>
            </button>
          )}

          {/* Avatar / dropdown */}
          <div
            className="inav-avatar"
            title={displayName}
            onClick={() => setMenuOpen(o => !o)}
          >
            {initials || '?'}
          </div>

          {menuOpen && (
            <>
              {/* Click-away backdrop */}
              <div
                style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
                onClick={() => setMenuOpen(false)}
              />
              <div className="inav-dropdown">
                <div style={{ padding: '6px 12px 8px', fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>
                  {displayName}
                </div>
                <div className="inav-dd-separator" />
                {onProfile && (
                  <button className="inav-dd-item" onClick={() => { setMenuOpen(false); onProfile(); }}>
                    👤 My Profile
                  </button>
                )}
                {onHome && (
                  <button className="inav-dd-item" onClick={() => { setMenuOpen(false); onHome(); }}>
                    🏠 Dashboard
                  </button>
                )}
                {onLogout && (
                  <>
                    <div className="inav-dd-separator" />
                    <button className="inav-dd-item danger" onClick={() => { setMenuOpen(false); onLogout(); }}>
                      🚪 Logout
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default InternalNav;
