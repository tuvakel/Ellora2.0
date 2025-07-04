import React, { useState } from 'react';
import Welcome from './pages/welcome';
import Registration from './pages/registration';
import ChatMessage from './components/ChatMessage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
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
  const [activeTab, setActiveTab] = useState('chat');
  const [userName, setUserName] = useState('Sarah');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      message: `Hello ${userName}! How can I help you with your health journey today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [reminders, setReminders] = useState([
    { id: 1, text: 'Take morning vitamins', time: '08:00', completed: false },
    { id: 2, text: 'Drink 8 glasses of water', time: '12:00', completed: true },
    { id: 3, text: 'Evening meditation', time: '19:00', completed: false },
    { id: 4, text: 'Track weight', time: '07:00', completed: false }
  ]);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newReminder, setNewReminder] = useState({ text: '', time: '' });
  const chartData = [
    { name: 'Week 1', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Week 2', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Week 3', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Week 4', uv: 2780, pv: 3908, amt: 2000 },
  ];

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
          message: getAIResponse(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const getAIResponse = () => {
    const responses = [
      "I understand you're looking for health guidance. Based on your profile, I'd recommend focusing on consistent sleep patterns and regular hydration.",
      "That's a great question! Let me analyze your recent health data to provide personalized recommendations.",
      "I can help you track that. Would you like me to set up a reminder or add it to your health dashboard?",
      "Based on your goals, I suggest breaking this into smaller, manageable steps. Here's what I recommend...",
      "Your progress has been excellent this week! Let's build on this momentum with your next health milestone."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };

  const addReminder = () => {
    if (newReminder.text && newReminder.time) {
      setReminders([...reminders, {
        id: Date.now(),
        text: newReminder.text,
        time: newReminder.time,
        completed: false
      }]);
      setNewReminder({ text: '', time: '' });
      setShowAddReminder(false);
    }
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const NavButton = ({ label, tabKey, isActive, onClick }) => (
    <button
      onClick={() => onClick(tabKey)}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full ${
        isActive 
          ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400' 
          : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-300'
      }`}
    >
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
            icon={BarChart3} 
            label="Health Analytics" 
            tabKey="analytics" 
            isActive={activeTab === 'analytics'} 
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
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Welcome Header */}
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-200 mb-2">
                      Welcome back, {userName}! 
                      <span className="ml-2 text-emerald-400">✨</span>
                    </h2>
                    <p className="text-slate-400">Here's your health overview for today</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Today</p>
                    <p className="text-lg font-semibold text-slate-200">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Health Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { icon: Activity, label: 'Steps', value: '8,432', target: '10,000', color: 'emerald' },
                  { icon: Heart, label: 'Heart Rate', value: '72 bpm', target: 'Normal', color: 'pink' },
                  { icon: Zap, label: 'Calories', value: '1,840', target: '2,100', color: 'blue' },
                  { icon: Target, label: 'Goals', value: '3/5', target: 'Completed', color: 'purple' }
                ].map((stat, index) => (
                  <div key={index} className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 bg-gradient-to-r from-${stat.color}-500/20 to-${stat.color}-600/20 rounded-lg flex items-center justify-center border border-${stat.color}-500/30`}>
                        <stat.icon className={`w-4 h-4 text-${stat.color}-400`} />
                      </div>
                      <span className="text-sm text-slate-400">{stat.label}</span>
                    </div>
                    <p className="text-xl font-bold text-slate-200">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.target}</p>
                  </div>
                ))}
              </div>

              {/* Schedule & Reminders */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Schedule */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-slate-200">Today's Schedule</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { time: '07:00', activity: 'Morning Workout', type: 'exercise' },
                      { time: '12:00', activity: 'Healthy Lunch', type: 'meal' },
                      { time: '15:00', activity: 'Doctor Checkup', type: 'appointment' },
                      { time: '19:00', activity: 'Evening Walk', type: 'exercise' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-200">{item.activity}</p>
                          <p className="text-xs text-slate-400">{item.time}</p>
                        </div>
                        <Clock className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reminders */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-lg font-semibold text-slate-200">Reminders</h3>
                    </div>
                    <button
                      onClick={() => setShowAddReminder(!showAddReminder)}
                      className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center hover:from-emerald-700 hover:to-teal-700 transition-all duration-300"
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {showAddReminder && (
                    <div className="bg-slate-800/30 rounded-xl p-4 mb-4">
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Reminder text"
                          value={newReminder.text}
                          onChange={(e) => setNewReminder({...newReminder, text: e.target.value})}
                          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500/50"
                        />
                        <input
                          type="time"
                          value={newReminder.time}
                          onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={addReminder}
                            className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors"
                          >
                            Add
                          </button>
                          <button
                            onClick={() => setShowAddReminder(false)}
                            className="flex-1 bg-slate-600 text-white py-2 rounded-lg text-sm hover:bg-slate-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {reminders.map((reminder) => (
                      <div key={reminder.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                        <button
                          onClick={() => toggleReminder(reminder.id)}
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                            reminder.completed 
                              ? 'bg-emerald-600 border-emerald-600' 
                              : 'border-slate-400 hover:border-emerald-500'
                          }`}
                        >
                          {reminder.completed && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </button>
                        <div className="flex-1">
                          <p className={`text-sm ${reminder.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                            {reminder.text}
                          </p>
                          <p className="text-xs text-slate-500">{reminder.time}</p>
                        </div>
                        <button
                          onClick={() => deleteReminder(reminder.id)}
                          className="text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Health Analytics */}
        {activeTab === 'analytics' && (
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-slate-200 mb-2">Health Analytics</h2>
                <p className="text-slate-400">Comprehensive insights into your health journey</p>
              </div>

              {/* Analytics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Progress Chart */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-slate-200">Weekly Progress</h3>
                  </div>
                  <div className="h-48 bg-slate-800/30 rounded-xl flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-slate-200">Recent Achievements</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { title: '7-Day Streak', desc: 'Completed daily goals', date: '2 days ago' },
                      { title: 'Hydration Master', desc: 'Drank 8 glasses daily', date: '1 week ago' },
                      { title: 'Step Counter', desc: 'Reached 10,000 steps', date: '2 weeks ago' }
                    ].map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30">
                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                          <Award className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-200">{achievement.title}</p>
                          <p className="text-xs text-slate-400">{achievement.desc}</p>
                        </div>
                        <p className="text-xs text-slate-500">{achievement.date}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Health Metrics */}
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 lg:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-lg font-semibold text-slate-200">Health Metrics Overview</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: 'Average Heart Rate', value: '72 bpm', change: '+2%', trend: 'up' },
                      { label: 'Sleep Quality', value: '8.2/10', change: '+5%', trend: 'up' },
                      { label: 'Active Minutes', value: '145 min', change: '-3%', trend: 'down' },
                      { label: 'Stress Level', value: 'Low', change: '-12%', trend: 'down' },
                      { label: 'Hydration', value: '92%', change: '+8%', trend: 'up' },
                      { label: 'Nutrition Score', value: '8.5/10', change: '+1%', trend: 'up' }
                    ].map((metric, index) => (
                      <div key={index} className="bg-slate-800/30 rounded-xl p-4">
                        <p className="text-sm text-slate-400 mb-1">{metric.label}</p>
                        <p className="text-xl font-bold text-slate-200 mb-2">{metric.value}</p>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            metric.trend === 'up' 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {metric.change}
                          </span>
                          <span className="text-xs text-slate-500">vs last week</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
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