import { useEffect, useMemo, useRef, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { makeApi } from './api';
import Logo from './Logo.jsx';

const IDLE_MS = 15 * 60 * 1000;
const CATEGORIES = ['All', 'Support', 'People', 'Learn & grow', 'Wellbeing', 'Company'];
const controls = [
  ['Microsoft Entra ID sign-in', 'The same Microsoft account you already use. No new passwords to remember.'],
  ['Multi-factor authentication', 'Every sign-in is verified with a second step before the portal opens.'],
  ['Employees only', 'Access is limited to VUKA accounts. Guests and personal emails are blocked.'],
  ['Timeouts and audit trail', 'Idle sessions end automatically, and every launch of a service is logged.'],
];

export default function Portal() {
  const { instance, accounts } = useMsal();
  // getActiveAccount() returns a fresh object each call, so key everything on the stable account id.
  const accountId = (instance.getActiveAccount() || accounts[0])?.homeAccountId;
  const account = useMemo(() => instance.getAccountByHomeId(accountId), [instance, accountId]);
  const api = useMemo(() => makeApi(instance, account), [instance, account]);

  const [services, setServices] = useState(null);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const timer = useRef();

  useEffect(() => {
    api.me().catch(() => {});
    api.services().then((list) => { setError(''); setServices(list); }).catch(() => setError('Could not load your services. Is the API running?'));
  }, [api]);

  // Idle timeout: sign out after 15 minutes without activity.
  useEffect(() => {
    const reset = () => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => instance.logoutRedirect({ account }), IDLE_MS);
    };
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      clearTimeout(timer.current);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [instance, account]);

  const q = query.trim().toLowerCase();
  const shown = (services || []).filter(
    (s) => (cat === 'All' || s.category === cat) && (!q || `${s.name} ${s.description} ${s.category}`.toLowerCase().includes(q))
  );

  const launch = async (e, s) => {
    e.preventDefault();
    try {
      const { href } = await api.launch(s.id);
      if (href.startsWith('#')) { setError('Demo preview: this tile would open the real service.'); return; }
      window.open(href, '_blank', 'noopener');
    } catch {
      setError('You do not have access to that service.');
    }
  };

  const initials = (account?.name || '?').split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="portal">
      <nav className="topnav">
        <a href="#top" className="on">Home</a>
        <a href="#services">Services</a>
        <a href="#security">Security</a>
        <a href="#help">Help</a>
        <a href="https://wearevuka.com" target="_blank" rel="noopener noreferrer">wearevuka.com</a>
      </nav>

      <header className="brandrow" id="top">
        <div className="wrap brandrow-in">
          <Logo />
          <label className="search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4A4D52" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-4.3-4.3" /></svg>
            <input type="search" aria-label="Search services" placeholder="Search services, forms and tools" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <div className="user">
            <span className="pill-ok">Secure session</span>
            <div className="avatar">{initials}</div>
            <div className="who"><b>{account?.name}</b><small>VUKA Group</small></div>
            <button type="button" className="signout" onClick={() => instance.logoutRedirect({ account })}>Sign out</button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="wrap hero-in">
          <div className="eyebrow">WELCOME BACK, {(account?.name || '').split(' ')[0].toUpperCase()}</div>
          <h1>One place for everything you need at VUKA.</h1>
          <p>IT support, HR, payroll and company tools, all behind a single secure sign-in with your VUKA Microsoft account.</p>
          <a className="cta" href="#services">Browse services</a>
          <aside className="session" aria-label="Your session">
            <div className="session-title"><span className="live" aria-hidden="true" />Your session</div>
            <dl>
              <div><dt>Signed in as</dt><dd>{account?.username}</dd></div>
              <div><dt>Organisation</dt><dd>VUKA Group</dd></div>
              <div><dt>Auto sign-out</dt><dd>After 15 minutes idle</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <main className="wrap" id="services">
        <div className="svc-head">
          <div>
            <h2>Your services</h2>
            <div className="muted">{services ? `${shown.length} ${shown.length === 1 ? 'service' : 'services'} available to you` : 'Loading…'}</div>
          </div>
          <div className="chips" role="group" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} className={cat === c ? 'chip on' : 'chip'} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>

        {error && <p className="error" role="alert">{error}</p>}

        <div className="grid">
          {shown.map((s) => (
            <a key={s.id} className="tile" href={s.href} onClick={(e) => launch(e, s)} target="_blank" rel="noopener noreferrer">
              <div className="tile-top">
                <div className="tile-icon">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FDC722" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={s.icon} /></svg>
                </div>
                <span className="tile-cat">{s.category}</span>
              </div>
              <div className="tile-name">{s.name}</div>
              <div className="tile-desc">{s.description}</div>
              <div className="tile-foot"><span className="ok">{s.access}</span><span>Open ↗</span></div>
            </a>
          ))}
        </div>
        {services && shown.length === 0 && <div className="empty">No services match your search. Try a different word or choose All.</div>}
      </main>

      <div className="wrap lower">
        <section className="security" id="security">
          <h2>Secured by design</h2>
          <p>Vuka Connect sits in front of your existing services. You sign in once with Microsoft, and nobody outside VUKA gets in.</p>
          <div className="controls">
            {controls.map(([t, b]) => (<div key={t}><b>{t}</b><span>{b}</span></div>))}
          </div>
        </section>
        <section className="help" id="help">
          <h2>Need urgent help?</h2>
          <p>For IT emergencies, call the support line.</p>
          <a href="tel:0217003539">021 700 3539</a>
          <small>Standard tickets take 3 to 5 working days to resolve.</small>
        </section>
      </div>

      <footer><div className="wrap foot"><span>VUKA Group · Internal use only. Access is logged.</span><span>Vuka Connect</span></div></footer>
    </div>
  );
}
