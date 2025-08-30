/* import React from 'react';


export default function Header({ user, onLogout }) {
return (
<div className="header card">
<div className="logo">Notes</div>
<div>
{user ? (
<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
{user.avatar ? (
<img src={user.avatar} alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%' }} />
) : null}
<span className="badge">{user.email}</span>
<button className="btn" onClick={onLogout}>Logout</button>
</div>
) : (
<a className="link" href="#">Welcome</a>
)}
</div>
</div>
);
} */
import React from "react";

export default function Header({ user, onLogout }) {
  return (
    <>
      <style>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 24px;
          background: #ffffff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          margin-bottom: 20px;
          position: relative;
        }

        .logo {
          font-size: 22px;
          font-weight: 700;
          color: #367AFF;
          letter-spacing: -0.02em;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #367AFF;
          box-shadow: 0 0 6px rgba(0,0,0,0.1);
        }

        .badge {
          font-size: 14px;
          font-weight: 500;
          color: #232323;
          background: #eef3ff;
          padding: 5px 12px;
          border-radius: 6px;
        }

        .btn-logout {
          background: linear-gradient(135deg, #ff4d4f, #d9363e);
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 6px rgba(217,54,62,0.3);
        }

        .btn-logout:hover {
          background: linear-gradient(135deg, #e33b3d, #b82c32);
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(217,54,62,0.4);
        }

        .link {
          text-decoration: none;
          font-weight: 500;
          color: #367AFF;
          font-size: 15px;
          transition: color 0.2s ease;
        }

        .link:hover {
          color: #265acc;
        }
      `}</style>

      <header className="header">
        <div className="logo">📝 Notes</div>

        <div className="header-right">
          {user ? (
            <div className="user-info">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="avatar"
                />
              )}
              <span className="badge">{user.email}</span>
              <button className="btn-logout" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <a className="link" href="#">
              Welcome
            </a>
          )}
        </div>
      </header>
    </>
  );
}

