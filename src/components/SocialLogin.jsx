const iconButton = { padding: 0, border: 0, background: 'transparent', cursor: 'pointer', display: 'flex' };

const SocialLogin = ({ onClick }) => (
  <div className="text-center" style={{ marginTop: '26px' }}>
    <p style={{ margin: '0 0 14px', fontSize: '14px', color: 'var(--dark-gray-2)' }}>Ou faça login com</p>
    <div className="flex align-items-center justify-content-center" style={{ gap: '20px' }}>
      <button type="button" aria-label="Entrar com Gmail" onClick={onClick} style={iconButton}>
        <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z" />
          <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z" />
          <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17" />
          <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z" />
          <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0C43.076,8,45,9.924,45,12.298z" />
        </svg>
      </button>
      <button type="button" aria-label="Entrar com Facebook" onClick={onClick} style={iconButton}>
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="12" fill="#1877F2" />
          <path fill="#fff" d="M16.67 15.47l.53-3.47h-3.33V9.75c0-.95.47-1.88 1.96-1.88h1.51V4.92s-1.37-.23-2.68-.23c-2.74 0-4.53 1.66-4.53 4.67V12H7.08v3.47h3.05V24h3.74v-8.53z" />
        </svg>
      </button>
    </div>
  </div>
);

export default SocialLogin;
