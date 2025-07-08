import React, { useState, useCallback } from 'react';
import useLocalStorage from '../utils/useLocalStorage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Calendar,
  Bell,
  Plus,
  Activity,
  Heart,
  Zap,
  Target,
  Clock,
  Trash2,
  TrendingUp,
  Award,
  Brain,
  User,
  MessageCircle,
  Home,
  BarChart3,
  Settings,
  Send
} from 'lucide-react';

export default function Dashboard({ userName, reminders, setReminders }) {
  const [newReminder, setNewReminder] = useState('');
  const [showAddReminder, setShowAddReminder] = useState(false);
  const chartData = [
    { name: 'Week 1', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Week 2', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Week 3', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Week 4', uv: 2780, pv: 3908, amt: 2000 },
  ];
  // New state for interactive health stats
  const [steps, setSteps] = useLocalStorage('steps', 8432);
  const [heartRate, setHeartRate] = useLocalStorage('heartRate', 72);
  const [calories, setCalories] = useLocalStorage('calories', 1840);
  // New state for personalized goals
  const [personalGoals, setPersonalGoals] = useLocalStorage('personalGoals', [
    { id: 1, text: 'Run 5k', completed: false },
    { id: 2, text: 'Meditate daily', completed: true },
  ]);
  const [newGoalText, setNewGoalText] = useState('');
  // New state for activity log
  const [activities, setActivities] = useLocalStorage('activities', [
    { id: 1, text: 'Walked 30 minutes', timestamp: new Date().toLocaleString() },
    { id: 2, text: 'Drank 2 liters of water', timestamp: new Date().toLocaleString() },
  ]);
  const [newActivityText, setNewActivityText] = useState('');
  // New state for health tips
  const [healthTips] = useState([
    "Stay hydrated! Drink at least 8 glasses of water a day.",
    "Aim for 7-9 hours of quality sleep each night.",
    "Incorporate a variety of fruits and vegetables into your diet.",
    "Take short breaks and stretch if you sit for long periods.",
    "Practice mindfulness or meditation for a few minutes daily.",
    "Get at least 30 minutes of moderate exercise most days of the week.",
    "Limit processed foods and sugary drinks.",
    "Spend time outdoors to boost your mood and Vitamin D.",
    "Connect with loved ones regularly for social well-being.",
    "Listen to your body and rest when needed."
  ]);
  const [currentTip, setCurrentTip] = useState('');

  // Function to get a random health tip
  const getRandomTip = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * healthTips.length);
    setCurrentTip(healthTips[randomIndex]);
  }, [healthTips]);

  // Initialize with a random tip when component mounts
  React.useEffect(() => {
    getRandomTip();
  }, [getRandomTip]);

  // Functions for activity log
  const addActivity = () => {
    if (newActivityText.trim()) {
      setActivities([...activities, { id: Date.now(), text: newActivityText, timestamp: new Date().toLocaleString() }]);
      setNewActivityText('');
    }
  };

  const deleteActivity = (id) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  // Functions to update health stats
  const handleStepsChange = (e) => setSteps(Number(e.target.value));
  const handleHeartRateChange = (e) => setHeartRate(Number(e.target.value));
  const handleCaloriesChange = (e) => setCalories(Number(e.target.value));

  // Functions for personalized goals
  const addGoal = () => {
    if (newGoalText.trim()) {
      setPersonalGoals([...personalGoals, { id: Date.now(), text: newGoalText, completed: false }]);
      setNewGoalText('');
    }
  };

  const toggleGoalCompletion = (id) => {
    setPersonalGoals(personalGoals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id) => {
    setPersonalGoals(personalGoals.filter(goal => goal.id !== id));
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

  return (
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
          {/* Steps */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-sm text-slate-400">Steps</span>
            </div>
            <input
              type="number"
              value={steps}
              onChange={handleStepsChange}
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50"
            />
            <p className="text-xs text-slate-500">Target: 10,000</p>
          </div>

          {/* Heart Rate */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500/20 to-pink-600/20 rounded-lg flex items-center justify-center border border-pink-500/30">
                <Heart className="w-4 h-4 text-pink-400" />
              </div>
              <span className="text-sm text-slate-400">Heart Rate</span>
            </div>
            <input
              type="number"
              value={heartRate}
              onChange={handleHeartRateChange}
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-pink-500/50"
            />
            <p className="text-xs text-slate-500">Target: Normal</p>
          </div>

          {/* Calories */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                <Zap className="w-4 h-4 text-blue-400" />
              </div>
              <span className="text-sm text-slate-400">Calories</span>
            </div>
            <input
              type="number"
              value={calories}
              onChange={handleCaloriesChange}
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50"
            />
            <p className="text-xs text-slate-500">Target: 2,100</p>
          </div>

          {/* Goals */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                <Target className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-sm text-slate-400">Goals</span>
            </div>
            <p className="text-xl font-bold text-slate-200">{personalGoals.filter(goal => goal.completed).length}/{personalGoals.length}</p>
            <p className="text-xs text-slate-500">Completed</p>
          </div>
        </div>

        {/* Personalized Goals Section */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-slate-200">Personalized Goals</h3>
            </div>
            <button
              onClick={addGoal}
              className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center hover:from-emerald-700 hover:to-teal-700 transition-all duration-300"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add a new goal"
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addGoal()}
              className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <div className="space-y-2">
            {personalGoals.map((goal) => (
              <div key={goal.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                <button
                  onClick={() => toggleGoalCompletion(goal.id)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    goal.completed
                      ? 'bg-emerald-600 border-emerald-600'
                      : 'border-slate-400 hover:border-emerald-500'
                  }`}
                >
                  {goal.completed && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </button>
                <div className="flex-1">
                  <p className={`text-sm ${goal.completed ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                    {goal.text}
                  </p>
                </div>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
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

        {/* Activity Log */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-slate-200">Activity Log</h3>
            </div>
            <button
              onClick={addActivity}
              className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center hover:from-emerald-700 hover:to-teal-700 transition-all duration-300"
            >
              <Plus className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Log a new activity"
              value={newActivityText}
              onChange={(e) => setNewActivityText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addActivity()}
              className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <div className="space-y-2">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-200">{activity.text}</p>
                  <p className="text-xs text-slate-500">{activity.timestamp}</p>
                </div>
                <button
                  onClick={() => deleteActivity(activity.id)}
                  className="text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Health Tips */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-slate-200">Health Tip of the Day</h3>
            </div>
            <button
              onClick={getRandomTip}
              className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition-colors"
            >
              New Tip
            </button>
          </div>
          <p className="text-slate-300 text-md italic">{currentTip}</p>
        </div>

        {/* Health Analytics */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-slate-200 mb-2">Health Analytics</h2>
          <p className="text-slate-400">Comprehensive insights into your health journey</p>

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
    </div>
  );
}