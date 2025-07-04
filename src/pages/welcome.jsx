import React, { useState, useEffect } from 'react';
import { Heart, Shield, Brain, Sparkles } from 'lucide-react';

export default function Welcome({ onContinue }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const gradientStyle = {
    background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 30%, #1e293b 70%, #0f172a 100%)',
    minHeight: '100vh',
    width: '100vw',
    position: 'relative',
    overflow: 'hidden'
  };

  const mouseFollowStyle = {
    position: 'absolute',
    width: '384px',
    height: '384px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(244, 63, 94, 0.1) 50%, transparent 70%)',
    filter: 'blur(60px)',
    left: mousePosition.x - 192,
    top: mousePosition.y - 192,
    transition: 'all 1s ease-out',
    pointerEvents: 'none'
  };

  const cardStyle1 = {
    position: 'relative',
    background: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    borderRadius: '16px',
    padding: '32px',
    transition: 'all 0.3s ease',
  };

  const cardStyle2 = {
    position: 'relative',
    background: 'rgba(15, 23, 42, 0.7)',
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(244, 63, 94, 0.2)',
    borderRadius: '16px',
    padding: '32px',
    transition: 'all 0.3s ease',
  };

  const buttonStyle = {
    background: 'linear-gradient(90deg, #10b981 0%, #14b8a6 100%)',
    color: 'white',
    fontWeight: '600',
    padding: '24px 48px',
    borderRadius: '50px',
    fontSize: '20px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <div style={gradientStyle}>
      {/* Animated Background */}
      <div style={mouseFollowStyle}></div>

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            backgroundColor: 'rgba(16, 185, 129, 0.6)',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `pulse ${3 + Math.random() * 2}s infinite`,
            animationDelay: `${Math.random() * 3}s`
          }}
        />
      ))}

      {/* Main Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '32px' 
      }}>
        
        {/* Logo Section */}
        <div style={{ 
          marginBottom: '32px', 
          transform: isLoaded ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.9)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 1s ease-out'
        }}>
          <div style={{ position: 'relative', textAlign: 'center' }}>
            <div style={{
              position: 'absolute',
              inset: '-16px',
              background: 'linear-gradient(90deg, #10b981, #f43f5e)',
              borderRadius: '50%',
              filter: 'blur(8px)',
              opacity: 0.3,
              zIndex: -1
            }}></div>
            <div style={{
              position: 'relative',
              width: '96px',
              height: '96px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(244, 63, 94, 0.2))',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              margin: '0 auto'
            }}>
              <Brain style={{ width: '48px', height: '48px', color: '#6ee7b7', strokeWidth: 1.5 }} />
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #10b981, #f43f5e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.1em'
            }}>
              ELLORA
            </h2>
          </div>
        </div>

        {/* Hero Section */}
        <div style={{ 
          textAlign: 'center', 
          maxWidth: '1200px',
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 1s ease-out 0.2s'
        }}>
          <h1 style={{
            fontSize: 'clamp(48px, 8vw, 128px)',
            fontWeight: 'bold',
            marginBottom: '32px',
            lineHeight: 1.2,
            color: 'white'
          }}>
            <span>Hey there,</span>
            <br />
            <span>I'm </span>
            <span style={{
              background: 'linear-gradient(90deg, #10b981, #14b8a6, #f43f5e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'pulse 2s infinite'
            }}>
              Ellora
            </span>
            <span>.</span>
          </h1>
          
          <p style={{
            fontSize: 'clamp(20px, 3vw, 32px)',
            color: 'rgba(167, 243, 208, 0.8)',
            marginBottom: '64px',
            fontWeight: 300,
            lineHeight: 1.6,
            maxWidth: '800px',
            margin: '0 auto 64px auto'
          }}>
            Your next-generation AI health companion for 
            <span style={{ color: '#6ee7b7', fontWeight: 500 }}> wellness tracking</span>, 
            <span style={{ color: '#5eead4', fontWeight: 500 }}> health insights</span>, and 
            <span style={{ color: '#fda4af', fontWeight: 500 }}> personalized care</span>.
          </p>
        </div>

        {/* Feature Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '32px', 
          maxWidth: '1200px', 
          width: '100%', 
          marginBottom: '64px',
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 1s ease-out 0.4s'
        }}>
          
          {/* Card 1 */}
          <div style={cardStyle1} onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
            e.currentTarget.style.transform = 'translateY(-8px)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.2))',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                flexShrink: 0
              }}>
                <Heart style={{ width: '32px', height: '32px', color: '#6ee7b7', strokeWidth: 1.5 }} />
              </div>
              <div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  Intelligent Health Insights
                  <Sparkles style={{ width: '20px', height: '20px', color: '#10b981', marginLeft: '8px' }} />
                </h3>
                <p style={{
                  color: 'rgba(167, 243, 208, 0.7)',
                  fontSize: '18px',
                  lineHeight: 1.6
                }}>
                  Advanced AI algorithms analyze your health patterns, providing personalized recommendations and early insights to optimize your wellbeing journey.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div style={cardStyle2} onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.4)';
            e.currentTarget.style.transform = 'translateY(-8px)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.2)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.2), rgba(236, 72, 153, 0.2))',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                flexShrink: 0
              }}>
                <Shield style={{ width: '32px', height: '32px', color: '#fda4af', strokeWidth: 1.5 }} />
              </div>
              <div>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  Privacy-First Architecture
                  <Sparkles style={{ width: '20px', height: '20px', color: '#f43f5e', marginLeft: '8px' }} />
                </h3>
                <p style={{
                  color: 'rgba(253, 164, 175, 0.7)',
                  fontSize: '18px',
                  lineHeight: 1.6
                }}>
                  Your health data is encrypted end-to-end with zero-knowledge architecture. We never see your personal information - your privacy is built into our core.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div style={{
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 1s ease-out 0.6s'
        }}>
          <button 
            style={buttonStyle}
            onClick={onContinue}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(16, 185, 129, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)';
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              Begin Your Health Journey
              <Sparkles style={{ width: '20px', height: '20px', marginLeft: '8px', animation: 'pulse 1s infinite' }} />
            </span>
          </button>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '64px',
          textAlign: 'center',
          transform: isLoaded ? 'translateY(0)' : 'translateY(32px)',
          opacity: isLoaded ? 1 : 0,
          transition: 'all 1s ease-out 0.8s'
        }}>
          <p style={{ color: 'rgba(167, 243, 208, 0.5)', fontSize: '14px' }}>
            Powered by advanced AI • Designed for your wellbeing
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}