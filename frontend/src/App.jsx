import React, { useState } from 'react';
import useLocalStorage from './utils/useLocalStorage';
import Welcome from './pages/welcome';
import Registration from './pages/registration';
import ChatMessage from './components/ChatMessage';
import Dashboard from './pages/Dashboard';

import { 
  MessageCircle, 
  Calendar, 
  Bell, 
  Plus, 
  BarChart3, 
  User, 
  Settings, 
  Heart, 
  Brain, 
  Activity, 
  Target, 
  Clock, 
  Trash2,
  Send,
  Home,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';

export default function ElloraHealthApp() {
  const [step, setStep] = useState('welcome');
  const [activeTab, setActiveTab] = useLocalStorage('activeTab', 'chat');
  const [userName, setUserName] = useLocalStorage('userName', 'Sarah');
  const [chatMessages, setChatMessages] = useLocalStorage('chatMessages', [
    {
      id: 1,
      sender: 'ai',
      message: `Hello Sarah! How can I help you with your health journey today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [reminders, setReminders] = useLocalStorage('reminders', [
    { id: 1, text: 'Take morning vitamins', time: '08:00', completed: false },
    { id: 2, text: 'Drink 8 glasses of water', time: '12:00', completed: true },
    { id: 3, text: 'Evening meditation', time: '19:00', completed: false },
    { id: 4, text: 'Track weight', time: '07:00', completed: false }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        sender: 'user',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages([...chatMessages, userMessage]);
      setNewMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: chatMessages.length + 2,
          sender: 'ai',
          message: getAIResponse(userMessage.message),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const getAIResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return "Hello there! How can I assist you today?";
    }
    if (lowerCaseMessage.includes('how are you')) {
      return "I'm just a program, but I'm functioning well and ready to help you!";
    }
    if (lowerCaseMessage.includes('sleep')) {
      return "Sleep is crucial for health. Are you having trouble sleeping, or would you like some tips?";
    }
    if (lowerCaseMessage.includes('food') || lowerCaseMessage.includes('eat') || lowerCaseMessage.includes('diet')) {
      return "Nutrition is key! What kind of food-related questions do you have?";
    }
    if (lowerCaseMessage.includes('exercise') || lowerCaseMessage.includes('workout')) {
      return "Great to hear you're thinking about exercise! What's your fitness goal?";
    }
    if (lowerCaseMessage.includes('reminder')) {
      return "I can help with reminders. What would you like to be reminded about?";
    }
    if (lowerCaseMessage.includes('goal')) {
      return "Setting goals is a great step! What personal health goal are you working on?";
    }
    if (lowerCaseMessage.includes('activity')) {
      return "Logging activities helps track progress. What activity did you complete?";
    }
    if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
      return "You're welcome! I'm here to help.";
    }

    const responses = [
      "I understand you're looking for health guidance. Based on your profile, I'd recommend focusing on consistent sleep patterns and regular hydration.",
      "That's a great question! Let me analyze your recent health data to provide personalized recommendations.",
      "I can help you track that. Would you like me to set up a reminder or add it to your health dashboard?",
      "Based on your goals, I suggest breaking this into smaller, manageable steps. Here's what I recommend...",
      "Your progress has been excellent this week! Let's build on this momentum with your next health milestone."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const NavButton = ({ icon: Icon, label, tabKey, isActive, onClick }) => (
    <button
      onClick={() => onClick(tabKey)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full transform transition-transform duration-200 ease-in-out ${
        isActive 
          ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 scale-100' 
          : 'hover:bg-slate-800/50 hover:scale-105 active:scale-95 text-slate-400 hover:text-slate-300'
      }`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="font-medium">{label}</span>
    </button>
  );

  if (step === 'welcome') {
    return <Welcome onContinue={() => setStep('registration')} />;
  }
  if (step === 'registration') {
    return <Registration onRegister={(name) => {
      setUserName(name);
      setStep('main');
      setChatMessages([
        {
          id: 1,
          sender: 'ai',
          message: `Hello ${name}! How can I help you with your health journey today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }} />;
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900/50 backdrop-blur-xl border-r border-slate-700/50 p-4 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-pink-500 rounded-full blur-md opacity-30"></div>
            <div className="relative w-10 h-10 bg-gradient-to-r from-emerald-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
              <Brain className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-pink-400 bg-clip-text text-transparent">
              ELLORA
            </h1>
            <p className="text-xs text-slate-400">AI Health Assistant</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <NavButton 
            icon={MessageCircle} 
            label="AI Chat" 
            tabKey="chat" 
            isActive={activeTab === 'chat'} 
            onClick={setActiveTab} 
          />
          <NavButton 
            icon={Home} 
            label="Dashboard" 
            tabKey="dashboard" 
            isActive={activeTab === 'dashboard'} 
            onClick={setActiveTab} 
          />
          
          <NavButton 
            icon={Settings} 
            label="Settings" 
            tabKey="settings" 
            isActive={activeTab === 'settings'} 
            onClick={setActiveTab} 
          />
        </nav>

        {/* User Profile */}
        <div className="border-t border-slate-700/50 pt-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-slate-200">{userName}</p>
              <p className="text-xs text-slate-400">Health Journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Chat Interface */}
        {activeTab === 'chat' && (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="bg-slate-900/50 backdrop-blur-xl border-b border-slate-700/50 p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-200">Ellora AI</h2>
                  <p className="text-xs text-emerald-400">Online • Ready to help</p>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg) => (
                <ChatMessage key={msg.id} msg={msg} />
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-slate-900/50 backdrop-blur-xl border-t border-slate-700/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask Ellora about your health..."
                  className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
                />
                <button
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-3 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 hover:scale-105"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <Dashboard 
            userName={userName} 
            reminders={reminders} 
            setReminders={setReminders} 
          />
        )}

        

        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-slate-200 mb-2">Settings</h2>
                <p className="text-slate-400">Customize your Ellora experience</p>
              </div>

              {/* Settings Options */}
              <div className="space-y-4">
                {[
                  { title: 'Profile Settings', desc: 'Update your personal information' },
                  { title: 'Notification Preferences', desc: 'Manage alerts and reminders' },
                  { title: 'Privacy & Security', desc: 'Control your data and privacy' },
                  { title: 'Health Goals', desc: 'Update your wellness objectives' },
                  { title: 'Data Export', desc: 'Download your health data' },
                  { title: 'Help & Support', desc: 'Get assistance and documentation' }
                ].map((setting, index) => (
                  <div key={index} className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 hover:bg-slate-800/30 transition-colors cursor-pointer">
                    <h3 className="text-lg font-medium text-slate-200">{setting.title}</h3>
                    <p className="text-sm text-slate-400">{setting.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}