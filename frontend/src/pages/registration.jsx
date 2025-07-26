import React, { useState, useEffect } from 'react';

// This component is passed `onRegister` prop from App.jsx
export default function Registration({ onRegister }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    healthGoals: '',
    terms: false,
    newsletter: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(''); // '', 'submitting', 'success'

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.terms) {
      alert('Please accept the Terms of Service and Privacy Policy to continue.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmissionStatus('submitting');
    
    setTimeout(() => {
      setSubmissionStatus('success');
      
      setTimeout(() => {
        // In a real app, you would redirect. Here we call the onRegister prop.
        if (onRegister) {
          onRegister(formData.firstName);
        }
      }, 1500);
    }, 2000);
  };

  const showTerms = () => alert('Terms of Service would open here in a real application.');
  const showPrivacy = () => alert('Privacy Policy would open here in a real application.');
  const showLogin = () => alert('Login page would open here in a real application.');

  const gradientStyle = {
    background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 30%, #1e293b 70%, #0f172a 100%)',
    minHeight: '100vh',
    width: '100vw',
    position: 'relative',
    overflowX: 'hidden',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
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
    pointerEvents: 'none',
    zIndex: 1,
  };

  return (
    <div style={gradientStyle}>
      <div style={mouseFollowStyle}></div>
      
      {/* Particles can be a separate component for cleanliness, but for now, this is fine */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            backgroundColor: 'rgba(16, 185, 129, 0.6)',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `pulse ${3 + Math.random() * 2}s infinite`,
            animationDelay: `${Math.random() * 3}s`,
            zIndex: 1,
          }}
        />
      ))}

      <div className="main-container">
        <div className="registration-container">
          <div className="logo-section">
            <div className="logo-wrapper">
              <div className="logo-glow"></div>
              <div className="logo">🧠</div>
            </div>
            <div className="brand-name">ELLORA</div>
            <p className="subtitle">Your next-generation AI health companion is ready to begin your wellness journey</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" required value={formData.firstName} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" required value={formData.lastName} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" placeholder="Enter your email address" required value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Create a secure password" required minLength="8" value={formData.password} onChange={handleChange} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input type="number" id="age" name="age" min="13" max="120" placeholder="Your age" required value={formData.age} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select id="gender" name="gender" required value={formData.gender} onChange={handleChange}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="healthGoals">Primary Health Goals</label>
              <select id="healthGoals" name="healthGoals" required value={formData.healthGoals} onChange={handleChange}>
                <option value="">Select your main goal</option>
                <option value="general-wellness">General Wellness</option>
                <option value="weight-management">Weight Management</option>
                <option value="fitness-improvement">Fitness Improvement</option>
                <option value="nutrition-tracking">Nutrition Tracking</option>
                <option value="chronic-condition">Chronic Condition Management</option>
                <option value="preventive-care">Preventive Care</option>
                <option value="mental-health">Mental Health Support</option>
              </select>
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="terms" name="terms" required checked={formData.terms} onChange={handleChange} />
              <label htmlFor="terms">
                I agree to the <a href="#" onClick={showTerms}>Terms of Service</a> and <a href="#" onClick={showPrivacy}>Privacy Policy</a>
              </label>
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="newsletter" name="newsletter" checked={formData.newsletter} onChange={handleChange} />
              <label htmlFor="newsletter">
                I'd like to receive health insights and wellness tips from Ellora
              </label>
            </div>

            <button type="submit" className="register-btn" disabled={isSubmitting}>
              {submissionStatus === 'submitting' ? 'Creating Your Account...' : submissionStatus === 'success' ? 'Welcome to Ellora! 🎉' : 'Begin Your Health Journey'}
              {submissionStatus === '' && <span className="sparkle">✨</span>}
            </button>
          </form>

          <div className="login-link">
            Already have an account? <a href="#" onClick={showLogin}>Sign in here</a>
          </div>

          <div className="health-features">
            <div className="feature">
              <div className="feature-icon">🧠</div>
              <div className="feature-text">Intelligent Health Insights</div>
            </div>
            <div className="feature">
              <div className="feature-icon">🛡️</div>
              <div className="feature-text">Privacy-First Architecture</div>
            </div>
            <div className="feature">
              <div className="feature-icon">📊</div>
              <div className="feature-text">Personalized Tracking</div>
            </div>
            <div className="feature">
              <div className="feature-icon">🎯</div>
              <div className="feature-text">Goal-Based Care</div>
            </div>
          </div>
        </div>
      </div>

      {/* The CSS from the original file is moved here. 
          In a real app, this would be in a separate .css file and imported.
          Or converted to Tailwind classes. For now, this is the most direct conversion.
      */}
      <style>{`
        .main-container {
            position: relative;
            z-index: 10;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 32px;
        }

        .registration-container {
            background: rgba(15, 23, 42, 0.7);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(16, 185, 129, 0.2);
            border-radius: 16px;
            padding: 40px;
            width: 100%;
            max-width: 480px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            transition: all 0.3s ease;
            animation: slideUp 0.8s ease-out;
        }

        .registration-container:hover {
            border-color: rgba(16, 185, 129, 0.4);
            transform: translateY(-4px);
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
        }

        .logo-section {
            text-align: center;
            margin-bottom: 32px;
        }

        .logo-wrapper {
            position: relative;
            display: inline-block;
            margin-bottom: 16px;
        }

        .logo-glow {
            position: absolute;
            inset: -16px;
            background: linear-gradient(90deg, #10b981, #f43f5e);
            border-radius: 50%;
            filter: blur(8px);
            opacity: 0.3;
            z-index: -1;
        }

        .logo {
            position: relative;
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(244, 63, 94, 0.2));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(8px);
            border: 1px solid rgba(16, 185, 129, 0.3);
            animation: logoFloat 3s ease-in-out infinite;
            font-size: 32px;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        @keyframes logoFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
        }

        .brand-name {
            font-size: 24px;
            font-weight: bold;
            background: linear-gradient(90deg, #10b981, #f43f5e);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            letter-spacing: 0.1em;
            margin-bottom: 8px;
        }

        .subtitle {
            color: rgba(167, 243, 208, 0.7);
            font-size: 16px;
            margin-bottom: 32px;
            font-weight: 300;
        }

        .form-group {
            margin-bottom: 24px;
        }

        .form-row {
            display: flex;
            gap: 16px;
        }

        .form-row .form-group {
            flex: 1;
        }

        label {
            display: block;
            color: #6ee7b7;
            font-weight: 500;
            margin-bottom: 8px;
            font-size: 14px;
        }

        input, select {
            width: 100%;
            padding: 16px 20px;
            border: 1px solid rgba(16, 185, 129, 0.2);
            border-radius: 12px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: rgba(15, 23, 42, 0.5);
            backdrop-filter: blur(8px);
            color: white;
        }

        input::placeholder {
            color: rgba(167, 243, 208, 0.5);
        }

        input:focus, select:focus {
            outline: none;
            border-color: rgba(16, 185, 129, 0.5);
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
            transform: translateY(-2px);
            background: rgba(15, 23, 42, 0.7);
        }

        select {
            cursor: pointer;
        }

        select option {
            background: #0f172a;
            color: white;
        }

        .checkbox-group {
            display: flex;
            align-items: flex-start;
            gap: 12px;
            margin-bottom: 24px;
        }

        .checkbox-group input[type="checkbox"] {
            width: 20px;
            height: 20px;
            margin: 0;
            accent-color: #10b981;
            border-radius: 4px;
            flex-shrink: 0;
            margin-top: 2px;
        }

        .checkbox-group label {
            margin: 0;
            font-size: 14px;
            line-height: 1.5;
            color: rgba(167, 243, 208, 0.7);
            font-weight: 300;
        }

        .checkbox-group a {
            color: #6ee7b7;
            text-decoration: none;
            font-weight: 500;
        }

        .checkbox-group a:hover {
            color: #10b981;
            text-decoration: underline;
        }

        .register-btn {
            width: 100%;
            padding: 20px;
            background: linear-gradient(90deg, #10b981 0%, #14b8a6 100%);
            color: white;
            border: none;
            border-radius: 50px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        .register-btn:disabled {
            cursor: not-allowed;
            background: linear-gradient(90deg, #059669 0%, #0891b2 100%);
        }

        .register-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s ease;
        }

        .register-btn:hover:not(:disabled)::before {
            left: 100%;
        }

        .register-btn:hover:not(:disabled) {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.25);
        }

        .register-btn:active:not(:disabled) {
            transform: translateY(-2px) scale(1);
        }

        .login-link {
            text-align: center;
            margin-top: 24px;
            color: rgba(167, 243, 208, 0.5);
            font-size: 14px;
        }

        .login-link a {
            color: #6ee7b7;
            text-decoration: none;
            font-weight: 500;
        }

        .login-link a:hover {
            color: #10b981;
            text-decoration: underline;
        }

        .health-features {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-top: 32px;
            padding-top: 32px;
            border-top: 1px solid rgba(16, 185, 129, 0.1);
        }

        .feature {
            text-align: center;
            padding: 16px;
            background: rgba(15, 23, 42, 0.3);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(16, 185, 129, 0.1);
            border-radius: 12px;
            transition: all 0.3s ease;
        }

        .feature:hover {
            transform: translateY(-4px);
            border-color: rgba(16, 185, 129, 0.3);
            background: rgba(15, 23, 42, 0.5);
        }

        .feature-icon {
            font-size: 24px;
            margin-bottom: 8px;
        }

        .feature-text {
            font-size: 12px;
            color: rgba(167, 243, 208, 0.7);
            font-weight: 400;
        }

        .sparkle {
            display: inline-block;
            animation: sparkle 2s infinite;
            margin-left: 8px;
        }

        @keyframes sparkle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.2); }
        }

        @media (max-width: 640px) {
            .registration-container {
                padding: 24px;
                margin: 16px;
            }
            
            .form-row {
                flex-direction: column;
                gap: 0;
            }
            
            .health-features {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
    </div>
  );
}
