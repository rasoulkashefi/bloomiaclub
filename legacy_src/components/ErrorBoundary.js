import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          fontFamily: 'IRANYekan, sans-serif',
          direction: 'rtl',
        }}>
          <h2 style={{ fontSize: '1.6rem', color: '#1f3d3a', marginBottom: '1rem' }}>
            متأسفانه مشکلی در بارگذاری این بخش رخ داده است
          </h2>
          <p style={{ color: '#666', marginBottom: '1.5rem', maxWidth: '450px', lineHeight: '1.6' }}>
            لطفاً صفحه را بازنشانی فرمایید یا به صفحه اصلی بازگردید.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#1f3d3a',
                color: '#fff',
                border: 'none',
                padding: '0.6rem 1.4rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.95rem',
              }}
            >
              بارگذاری مجدد صفحه
            </button>
            <a
              href="/"
              style={{
                background: '#f3f4f6',
                color: '#333',
                textDecoration: 'none',
                padding: '0.6rem 1.4rem',
                borderRadius: '8px',
                fontSize: '0.95rem',
              }}
            >
              صفحه اصلی
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
