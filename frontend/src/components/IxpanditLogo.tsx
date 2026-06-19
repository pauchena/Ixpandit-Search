export default function IxpanditLogo(): JSX.Element {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gradient definition */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D9A3" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      
      {/* "i" - vertical line with dot */}
      <circle cx="6" cy="5" r="2" fill="url(#logoGradient)" />
      <rect x="5" y="9" width="2" height="14" fill="url(#logoGradient)" />
      
      {/* "x" - crossing lines */}
      <line x1="13" y1="9" x2="21" y2="23" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round" />
      <line x1="21" y1="9" x2="13" y2="23" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
