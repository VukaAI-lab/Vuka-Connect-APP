// Text stand-in for the VUKA logo. Replace with the real logo file when available.
export default function Logo({ dark }) {
  return (
    <span className={`logo ${dark ? 'logo-dark' : ''}`}>
      <span className="logo-word">
        VUKA<span className="logo-dot" />
      </span>
      <span className="logo-tag">
        <strong>CONNECT</strong>
      </span>
    </span>
  );
}
