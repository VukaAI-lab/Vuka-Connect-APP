import { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from './authConfig';
import Logo from './Logo.jsx';

const points = [
  'Single sign-on with Microsoft Entra ID',
  'Multi-factor authentication on every sign-in',
  'Employees only, with a full audit trail',
];
const inside = [
  ['IT Support', 'Hardware and software requests', 'M3 5h18v11H3zM8 20h8M12 16v4'],
  ['HR Tickets', 'Queries, requests and issues', 'M16 8a4 4 0 1 0-8 0 4 4 0 0 0 8 0zM4 21c0-4 3.6-6 8-6s8 2 8 6'],
  ['Dynamics Payroll', 'Leave and employee details', 'M3 7h17a1 1 0 0 1 1 1v11H4a1 1 0 0 1-1-1zM3 7l13-3v3M16 13h3'],
  ['VUKA Website', 'Portfolio, events and careers', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18'],
];
const steps = [
  'Microsoft verifies who you are.',
  'You approve the second step on your phone.',
  'You land on your services, already signed in.',
];

export default function Login() {
  const { instance } = useMsal();
  const [error, setError] = useState('');

  const signIn = () =>
    instance.loginRedirect(loginRequest).catch(() => setError('Sign-in could not start. Please try again.'));

  return (
    <div className="login">
      <section className="login-brand">
        <Logo dark />
        <div className="inside" aria-label="Services inside Vuka Connect">
          <div className="inside-title">Inside Vuka Connect</div>
          <div className="inside-grid">
            {inside.map(([name, desc, icon]) => (
              <div className="inside-tile" key={name}>
                <span className="inside-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FDC722" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icon} /></svg>
                </span>
                <span><b>{name}</b><small>{desc}</small></span>
              </div>
            ))}
          </div>
        </div>
        <div className="login-pitch">
          <h1>
            Every VUKA service. <span>One secure door.</span>
          </h1>
          <p>IT support, HR, payroll and company tools, together in one place behind your Microsoft sign-in.</p>
        </div>
        <ul className="login-points">
          {points.map((p) => (
            <li key={p}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FDC722" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5" /></svg>
              {p}
            </li>
          ))}
        </ul>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <h2>Sign in</h2>
          <p className="muted">Use your VUKA Microsoft account to continue.</p>
          <button type="button" className="ms-btn" onClick={signIn}>
            <span className="ms-logo" aria-hidden="true"><i /><i /><i /><i /></span>
            Sign in with Microsoft
          </button>
          {error && <p className="error" role="alert">{error}</p>}
          <div className="divider"><span>What happens next</span></div>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s}><b>{i + 1}</b><span>{s}</span></li>
            ))}
          </ol>
          <div className="notice">Access is limited to VUKA employees. All sign-ins are logged.</div>
          <p className="muted small">Can't sign in? Call IT support on <a href="tel:0217003539">021 700 3539</a>.</p>
        </div>
      </section>
    </div>
  );
}
