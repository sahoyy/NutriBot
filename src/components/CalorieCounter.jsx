import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Plus, Trash2, Search, Apple, Coffee, Utensils, Pizza,
  Calendar, BarChart3, History, Download, Filter, ChevronLeft, ChevronRight
} from 'lucide-react';
import {
  auth,
  saveCalorieEntry,
  getCalorieEntriesByDate,
  deleteCalorieEntry,
  updateCalorieQuantity
} from '../firebase-config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase-config';

export default function CalorieCounter() {
  const today = new Date().toISOString().split('T')[0];
  
  const [selectedDate, setSelectedDate] = useState(today);
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddFood, setShowAddFood] = useState(false);
  const [customFood, setCustomFood] = useState({ name: '', calories: '', serving: '' });
  
  // History & Statistics States
  const [activeTab, setActiveTab] = useState('today'); // 'today', 'history', 'statistics'
  const [historyData, setHistoryData] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const foodDatabase = [
    { name: 'Banana', calories: 105, serving: '1 medium (118g)', icon: Apple },
    { name: 'Apple', calories: 95, serving: '1 medium (182g)', icon: Apple },
    { name: 'Chicken Breast', calories: 165, serving: '100g', icon: Utensils },
    { name: 'Brown Rice', calories: 215, serving: '1 cup cooked', icon: Utensils },
    { name: 'Egg', calories: 78, serving: '1 large', icon: Utensils },
    { name: 'Avocado', calories: 234, serving: '1 whole', icon: Apple },
    { name: 'Oatmeal', calories: 150, serving: '1 cup cooked', icon: Coffee },
    { name: 'Greek Yogurt', calories: 100, serving: '170g', icon: Coffee },
    { name: 'Almonds', calories: 164, serving: '28g (23 almonds)', icon: Apple },
    { name: 'Sweet Potato', calories: 112, serving: '1 medium', icon: Apple },
    { name: 'Salmon', calories: 206, serving: '100g', icon: Utensils },
    { name: 'Broccoli', calories: 55, serving: '1 cup', icon: Apple },
    { name: 'Whole Wheat Bread', calories: 69, serving: '1 slice', icon: Coffee },
    { name: 'Pasta', calories: 220, serving: '1 cup cooked', icon: Pizza },
    { name: 'Milk', calories: 103, serving: '1 cup', icon: Coffee },
  ];

  // Load data for selected date
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const loadData = async () => {
      setLoading(true);
      const res = await getCalorieEntriesByDate(user.uid, selectedDate);
      if (res.success) {
        setFoods(
          res.entries.map(e => ({
            id: e.id,
            name: e.foodName,
            calories: e.calories,
            serving: e.serving || '1 serving',
            quantity: e.quantity || 1,
            icon: Utensils
          }))
        );
      }
      setLoading(false);
    };

    loadData();
  }, [selectedDate]);

  // Load history data
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const loadHistory = async () => {
      try {
        const entriesQuery = query(
          collection(db, 'calorieEntries'),
          where('userId', '==', user.uid),
          orderBy('date', 'desc')
        );
        
        const querySnapshot = await getDocs(entriesQuery);
        const allEntries = [];
        querySnapshot.forEach((doc) => {
          allEntries.push({ id: doc.id, ...doc.data() });
        });

        // Group by date
        const groupedByDate = {};
        allEntries.forEach(entry => {
          const date = entry.date;
          if (!groupedByDate[date]) {
            groupedByDate[date] = {
              date,
              entries: [],
              totalCalories: 0
            };
          }
          groupedByDate[date].entries.push(entry);
          groupedByDate[date].totalCalories += (entry.calories * (entry.quantity || 1));
        });

        const history = Object.values(groupedByDate).sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        );

        setHistoryData(history);
        calculateStatistics(history);
      } catch (error) {
        console.error('Error loading history:', error);
      }
    };

    loadHistory();
  }, [foods]); // Reload when foods change

  const calculateStatistics = (history) => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Weekly stats
    const weekData = history.filter(h => new Date(h.date) >= sevenDaysAgo);
    setWeeklyStats(weekData);

    // Monthly stats
    const monthData = history.filter(h => new Date(h.date) >= thirtyDaysAgo);
    setMonthlyStats(monthData);
  };

  const filteredFoods = foodDatabase.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addFood = async (food) => {
    const user = auth.currentUser;
    if (!user) return;

    const entry = {
      foodName: food.name,
      calories: food.calories,
      serving: food.serving,
      quantity: 1,
      date: selectedDate
    };

    const res = await saveCalorieEntry(user.uid, entry);
    if (res.success) {
      setFoods(prev => [
        ...prev,
        { id: res.id, ...entry, name: entry.foodName, icon: food.icon }
      ]);
    }
  };

  const addCustomFood = async () => {
    const user = auth.currentUser;
    if (!user || !customFood.name || !customFood.calories) return;

    const entry = {
      foodName: customFood.name,
      calories: parseInt(customFood.calories),
      serving: customFood.serving || '1 serving',
      quantity: 1,
      date: selectedDate
    };

    const res = await saveCalorieEntry(user.uid, entry);
    if (res.success) {
      setFoods(prev => [
        ...prev,
        {
          id: res.id,
          name: entry.foodName,
          calories: entry.calories,
          serving: entry.serving,
          quantity: 1,
          icon: Utensils
        }
      ]);
      setCustomFood({ name: '', calories: '', serving: '' });
      setShowAddFood(false);
    }
  };

  const removeFood = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    await deleteCalorieEntry(user.uid, id);
    setFoods(prev => prev.filter(food => food.id !== id));
  };

  const updateQuantity = async (id, newQuantity) => {
    const user = auth.currentUser;
    if (!user) return;

    const quantity = Math.max(1, newQuantity);
    await updateCalorieQuantity(user.uid, id, quantity);

    setFoods(prev =>
      prev.map(food =>
        food.id === id ? { ...food, quantity } : food
      )
    );
  };

  const changeDate = (direction) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + direction);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  const totalCalories = foods.reduce(
    (sum, f) => sum + f.calories * (f.quantity || 1),
    0
  );

  const targetCalories = 2000;
  const percentageConsumed = Math.min((totalCalories / targetCalories) * 100, 100);

  // Statistics calculations
  const avgWeeklyCalories = weeklyStats.length > 0 
    ? Math.round(weeklyStats.reduce((sum, d) => sum + d.totalCalories, 0) / weeklyStats.length)
    : 0;

  const avgMonthlyCalories = monthlyStats.length > 0
    ? Math.round(monthlyStats.reduce((sum, d) => sum + d.totalCalories, 0) / monthlyStats.length)
    : 0;

  const exportData = () => {
    const csvContent = [
      ['Date', 'Food', 'Calories', 'Quantity', 'Total Calories'],
      ...historyData.flatMap(day => 
        day.entries.map(entry => [
          day.date,
          entry.foodName,
          entry.calories,
          entry.quantity || 1,
          entry.calories * (entry.quantity || 1)
        ])
      )
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calorie-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900">
              Calorie Counter
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track your daily calorie intake and reach your fitness goals
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'today'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Today
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <History className="w-5 h-5" />
              History
            </button>
            <button
              onClick={() => setActiveTab('statistics')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'statistics'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Statistics
            </button>
          </div>
        </div>

        {/* Today Tab */}
        {activeTab === 'today' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Food Search & Add */}
            <div className="lg:col-span-2 space-y-6">
              {/* Date Selector */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => changeDate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                  </button>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Selected Date</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Date(selectedDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => changeDate(1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    disabled={selectedDate >= today}
                  >
                    <ChevronRight className={`w-6 h-6 ${selectedDate >= today ? 'text-gray-300' : 'text-gray-600'}`} />
                  </button>
                </div>
                
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  max={today}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Search Bar */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search foods..."
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => setShowAddFood(!showAddFood)}
                    className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Custom
                  </button>
                </div>

                {/* Custom Food Form */}
                {showAddFood && (
                  <div className="bg-orange-50 rounded-xl p-4 space-y-3 mb-4">
                    <input
                      type="text"
                      placeholder="Food name"
                      value={customFood.name}
                      onChange={(e) => setCustomFood({ ...customFood, name: e.target.value })}
                      className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        placeholder="Calories"
                        value={customFood.calories}
                        onChange={(e) => setCustomFood({ ...customFood, calories: e.target.value })}
                        className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      <input
                        type="text"
                        placeholder="Serving size"
                        value={customFood.serving}
                        onChange={(e) => setCustomFood({ ...customFood, serving: e.target.value })}
                        className="w-full px-4 py-2 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <button
                      onClick={addCustomFood}
                      className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                    >
                      Add Food
                    </button>
                  </div>
                )}

                {/* Food Search Results */}
                {searchQuery && (
                  <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto">
                    {filteredFoods.map((food, idx) => (
                      <button
                        key={idx}
                        onClick={() => addFood(food)}
                        className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                      >
                        <food.icon className="w-8 h-8 text-orange-500" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{food.name}</p>
                          <p className="text-sm text-gray-500">{food.serving}</p>
                        </div>
                        <p className="font-bold text-orange-600">{food.calories} cal</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Added Foods List */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Foods for {new Date(selectedDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </h3>
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-gray-500 mt-4">Loading...</p>
                  </div>
                ) : foods.length === 0 ? (
                  <div className="text-center py-12">
                    <Pizza className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No foods added yet. Start tracking!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {foods.map((food) => (
                      <div key={food.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <food.icon className="w-8 h-8 text-orange-500" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{food.name}</p>
                          <p className="text-sm text-gray-500">{food.serving}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            value={food.quantity}
                            onChange={(e) => updateQuantity(food.id, parseInt(e.target.value) || 1)}
                            className="w-16 px-2 py-1 border-2 border-gray-200 rounded-lg text-center font-semibold"
                            min="1"
                          />
                          <p className="font-bold text-orange-600 w-20 text-right">
                            {food.calories * food.quantity} cal
                          </p>
                          <button
                            onClick={() => removeFood(food.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="space-y-6">
              {/* Daily Summary */}
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg">
                <p className="text-white/80 font-semibold mb-2">Total Calories</p>
                <p className="text-5xl font-black mb-6">{totalCalories}</p>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Daily Goal</span>
                    <span className="font-bold">{targetCalories} cal</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-white h-full rounded-full transition-all duration-300"
                      style={{ width: `${percentageConsumed}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-white/80 mt-2">
                    {targetCalories - totalCalories > 0
                      ? `${targetCalories - totalCalories} cal remaining`
                      : `${totalCalories - targetCalories} cal over limit`}
                  </p>
                </div>

                <div className="text-sm text-white/80">
                  <p className="mb-1">Daily target: {targetCalories} calories</p>
                  <p>Progress: {percentageConsumed.toFixed(0)}%</p>
                </div>
              </div>

              {/* Macro Breakdown */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Recommended Breakdown</h3>
                <div className="space-y-3">
                  <MacroBar label="Protein" percentage={30} color="bg-blue-500" />
                  <MacroBar label="Carbs" percentage={40} color="bg-orange-500" />
                  <MacroBar label="Fats" percentage={30} color="bg-yellow-500" />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">7-Day Avg</span>
                    <span className="font-bold text-gray-900">{avgWeeklyCalories} cal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">30-Day Avg</span>
                    <span className="font-bold text-gray-900">{avgMonthlyCalories} cal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Days Tracked</span>
                    <span className="font-bold text-gray-900">{historyData.length}</span>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-6">
                <h3 className="font-bold text-teal-900 mb-3">Quick Tips</h3>
                <ul className="space-y-2 text-sm text-teal-800">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">•</span>
                    <span>Track everything you eat and drink</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">•</span>
                    <span>Measure portions accurately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">•</span>
                    <span>Stay consistent with tracking</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Calorie History</h2>
                <button
                  onClick={exportData}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export CSV
                </button>
              </div>

              {historyData.length === 0 ? (
                <div className="text-center py-12">
                  <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No history data yet. Start tracking your calories!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {historyData.map((day, idx) => (
                    <div key={idx} className="border-2 border-gray-100 rounded-xl p-6 hover:border-orange-200 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {new Date(day.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </h3>
                          <p className="text-sm text-gray-500">{day.entries.length} items</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-black text-orange-600">{day.totalCalories}</p>
                          <p className="text-sm text-gray-500">calories</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {day.entries.map((entry, entryIdx) => (
                          <div key={entryIdx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Utensils className="w-5 h-5 text-orange-500" />
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 text-sm">{entry.foodName}</p>
                              <p className="text-xs text-gray-500">{entry.serving}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-orange-600 text-sm">
                                {entry.calories * (entry.quantity || 1)} cal
                              </p>
                              {entry.quantity > 1 && (
                                <p className="text-xs text-gray-500">x{entry.quantity}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Progress bar for the day */}
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all"
                            style={{ width: `${Math.min((day.totalCalories / targetCalories) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {((day.totalCalories / targetCalories) * 100).toFixed(0)}% of daily goal
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'statistics' && (
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Weekly Stats Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Weekly Stats</h3>
                    <p className="text-sm text-gray-500">Last 7 days</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Average Calories/Day</p>
                    <p className="text-3xl font-black text-blue-600">{avgWeeklyCalories}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">Days Tracked</p>
                      <p className="text-2xl font-bold text-gray-900">{weeklyStats.length}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">Total Calories</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {weeklyStats.reduce((sum, d) => sum + d.totalCalories, 0)}
                      </p>
                    </div>
                  </div>

                  {/* Weekly chart */}
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Daily Breakdown</p>
                    <div className="space-y-2">
                      {weeklyStats.slice(0, 7).map((day, idx) => {
                        const percentage = (day.totalCalories / targetCalories) * 100;
                        return (
                          <div key={idx}>
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                              <span className="font-semibold">{day.totalCalories} cal</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Stats Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Monthly Stats</h3>
                    <p className="text-sm text-gray-500">Last 30 days</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                    <p className="text-sm text-gray-600 mb-1">Average Calories/Day</p>
                    <p className="text-3xl font-black text-purple-600">{avgMonthlyCalories}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">Days Tracked</p>
                      <p className="text-2xl font-bold text-gray-900">{monthlyStats.length}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">Total Calories</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {monthlyStats.reduce((sum, d) => sum + d.totalCalories, 0)}
                      </p>
                    </div>
                  </div>

                  {/* Consistency tracker */}
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Tracking Consistency</p>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 28 }, (_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() - (27 - i));
                        const dateStr = date.toISOString().split('T')[0];
                        const hasData = monthlyStats.some(d => d.date === dateStr);
                        
                        return (
                          <div
                            key={i}
                            className={`aspect-square rounded-lg ${
                              hasData
                                ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                                : 'bg-gray-200'
                            }`}
                            title={dateStr}
                          ></div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                      <span>28 days ago</span>
                      <span>Today</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Insights & Recommendations</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-green-900 mb-2">Great Consistency!</h4>
                  <p className="text-sm text-green-800">
                    You've tracked {weeklyStats.length} out of 7 days this week. Keep it up!
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-blue-900 mb-2">Average Intake</h4>
                  <p className="text-sm text-blue-800">
                    {avgWeeklyCalories < targetCalories ? 
                      `You're ${targetCalories - avgWeeklyCalories} cal below your daily goal on average.` :
                      `You're ${avgWeeklyCalories - targetCalories} cal above your daily goal on average.`
                    }
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-orange-900 mb-2">Streak</h4>
                  <p className="text-sm text-orange-800">
                    You've been tracking for {historyData.length} days total. Keep building your habit!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MacroBar({ label, percentage, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-semibold text-gray-700">{label}</span>
        <span className="text-gray-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`${color} h-full rounded-full`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}


