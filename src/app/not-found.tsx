import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 - Page Not Found | DALLFI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: system-ui, -apple-system, sans-serif; }
        `}</style>
      </head>
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#fc0000' }}>
        <main style={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          color: '#ffffff'
        }}>
          <div style={{ maxWidth: '42rem', textAlign: 'center' }}>
            {/* Large Sad Face Icon */}
            <div style={{ marginBottom: '2rem' }}>
              <svg
                style={{ margin: '0 auto', width: '12rem', height: '12rem' }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="8" cy="9" r="0.8" fill="currentColor" stroke="none" />
                <circle cx="16" cy="9" r="0.8" fill="currentColor" stroke="none" />
                <path d="M8 16 Q12 14 16 16" />
              </svg>
            </div>

            {/* 404 Number */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h1 style={{
                fontSize: '8rem',
                lineHeight: '1',
                letterSpacing: '-0.025em',
                color: 'rgba(255, 255, 255, 0.2)',
                margin: 0,
                fontWeight: 700
              }}>
                404
              </h1>
            </div>

            {/* Title */}
            <h2 style={{
              fontSize: '2rem',
              letterSpacing: '-0.025em',
              color: '#ffffff',
              margin: 0,
              fontWeight: 600
            }}>
              Page not found
            </h2>

            {/* Description */}
            <p style={{
              marginTop: '1rem',
              fontSize: '1rem',
              lineHeight: '1.75',
              color: 'rgba(255, 255, 255, 0.9)'
            }}>
              The page you are looking for doesn&apos;t exist or has been moved.
            </p>

            {/* Actions */}
            <div style={{
              marginTop: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              <Link
                href="/"
                style={{
                  display: 'inline-flex',
                  height: '3rem',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ffffff',
                  border: '2px solid #ffffff',
                  padding: '0 2rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#fc0000',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s'
                }}
              >
                Back to home
              </Link>
              <Link
                href="/en/contact"
                style={{
                  display: 'inline-flex',
                  height: '3rem',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #ffffff',
                  padding: '0 2rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#ffffff',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s'
                }}
              >
                Contact us
              </Link>
            </div>

            {/* Quick Links */}
            <div style={{
              marginTop: '3rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              paddingTop: '2rem'
            }}>
              <p style={{
                marginBottom: '1rem',
                fontSize: '0.8125rem',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                Quick links
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1.5rem 1.5rem',
                fontSize: '0.875rem'
              }}>
                <Link href="/en/blog" style={{ color: 'rgba(255, 255, 255, 0.9)', textDecoration: 'none' }}>
                  Blog
                </Link>
                <Link href="/en/about" style={{ color: 'rgba(255, 255, 255, 0.9)', textDecoration: 'none' }}>
                  About
                </Link>
                <Link href="/en/membership" style={{ color: 'rgba(255, 255, 255, 0.9)', textDecoration: 'none' }}>
                  Membership
                </Link>
                <Link href="/en/partners" style={{ color: 'rgba(255, 255, 255, 0.9)', textDecoration: 'none' }}>
                  Partners
                </Link>
                <Link href="/en/events" style={{ color: 'rgba(255, 255, 255, 0.9)', textDecoration: 'none' }}>
                  Events
                </Link>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
