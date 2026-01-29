import React, { useState, useEffect } from 'react';
import { 
  Calculator, TrendingUp, TrendingDown, Activity, AlertCircle,
  History, BarChart3, Target, Calendar, Download
} from 'lucide-react';
import { auth, saveBMIRecord, getBMIHistory } from '../firebase-config';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [bmiHistory, setBmiHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('calculator'); // 'calculator', 'history', 'progress'

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const loadHistory = async () => {
      const result = await getBMIHistory(user.uid);
      if (result.success) {
        setBmiHistory(result.records);
      }
    };
    loadHistory();
  }, []);

  const calculateBMI = async (e) => {
    e.preventDefault();
    
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height) / 100; // convert cm to meters
    
    if (weightNum > 0 && heightNum > 0) {
      const bmiValue = (weightNum / (heightNum * heightNum)).toFixed(1);
      
      // Determine category
      let cat = '';
      let recs = [];
      
      if (bmiValue < 18.5) {
        cat = 'Underweight';
        recs = [
          'Increase calorie intake with nutrient-dense foods',
          'Include more protein-rich foods in your diet',
          'Consider strength training exercises',
          'Consult with a nutritionist for a personalized meal plan'
        ];
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        cat = 'Normal Weight';
        recs = [
          'Maintain your current healthy eating habits',
          'Continue regular physical activity',
          'Stay hydrated with 8-10 glasses of water daily',
          'Get adequate sleep (7-9 hours per night)'
        ];
      } else if (bmiValue >= 25 && bmiValue < 30) {
        cat = 'Overweight';
        recs = [
          'Create a moderate calorie deficit (300-500 cal/day)',
          'Increase physical activity to 150+ minutes per week',
          'Focus on whole foods and reduce processed foods',
          'Practice portion control and mindful eating'
        ];
      } else {
        cat = 'Obese';
        recs = [
          'Consult with a healthcare provider for personalized advice',
          'Start with gradual lifestyle changes',
          'Consider working with a registered dietitian',
          'Aim for sustainable weight loss of 0.5-1 kg per week'
        ];
      }
      
      const user = auth.currentUser;
      if (user) {
        await saveBMIRecord(user.uid, {
          weight: weightNum,
          height: heightNum * 100,
          bmi: parseFloat(bmiValue),
          category: cat,
          date: new Date().toISOString()
        });
        
        // Reload history
        const result = await getBMIHistory(user.uid);
        if (result.success) {
          setBmiHistory(result.records);
        }
      }
      
      setBmi(bmiValue);
      setCategory(cat);
      setRecommendations(recs);
    }
  };

  const getCategoryColor = () => {
    if (!category) return 'from-gray-400 to-gray-500';
    if (category === 'Underweight') return 'from-blue-400 to-cyan-500';
    if (category === 'Normal Weight') return 'from-teal-400 to-emerald-500';
    if (category === 'Overweight') return 'from-orange-400 to-amber-500';
    return 'from-red-400 to-rose-500';
  };

  const getCategoryIcon = () => {
    if (category === 'Underweight') return TrendingDown;
    if (category === 'Normal Weight') return Activity;
    if (category === 'Overweight' || category === 'Obese') return TrendingUp;
    return AlertCircle;
  };

  const CategoryIcon = getCategoryIcon();

  // Calculate BMI change
  const getBMIChange = () => {
    if (bmiHistory.length < 2) return null;
    const latest = bmiHistory[0].bmi;
    const previous = bmiHistory[1].bmi;
    const change = latest - previous;
    return {
      value: Math.abs(change).toFixed(1),
      direction: change > 0 ? 'increased' : 'decreased',
      isPositive: change < 0
    };
  };

  const bmiChange = getBMIChange();

  // Export history as CSV
  const exportHistory = () => {
    const csvContent = [
      ['Date', 'Weight (kg)', 'Height (cm)', 'BMI', 'Category'],
      ...bmiHistory.map(record => [
        new Date(record.date).toLocaleDateString(),
        record.weight,
        record.height,
        record.bmi,
        record.category
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bmi-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Calculator className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900">
              BMI Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculate your Body Mass Index and track your progress over time
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'calculator'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calculator className="w-5 h-5" />
              Calculator
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'history'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <History className="w-5 h-5" />
              History
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'progress'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Progress
            </button>
          </div>
        </div>

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="max-w-4xl mx-auto">
            {/* Calculator Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
              <form onSubmit={calculateBMI} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="70"
                      required
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="170"
                      required
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all"
                >
                  Calculate BMI
                </button>
              </form>
            </div>

            {/* Results */}
            {bmi && (
              <div className="space-y-6">
                {/* BMI Result Card */}
                <div className={`bg-gradient-to-br ${getCategoryColor()} rounded-3xl p-8 text-white shadow-xl`}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-white/80 font-semibold mb-2">Your BMI</p>
                      <p className="text-6xl font-black">{bmi}</p>
                      {bmiChange && (
                        <p className="text-sm mt-2 text-white/80">
                          {bmiChange.direction} by {bmiChange.value} since last measurement
                        </p>
                      )}
                    </div>
                    <CategoryIcon className="w-20 h-20 text-white/30" />
                  </div>
                  <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl px-6 py-4">
                    <CategoryIcon className="w-6 h-6" />
                    <span className="font-bold text-lg">{category}</span>
                  </div>
                </div>

                {/* BMI Scale */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">BMI Scale</h3>
                  <div className="space-y-3">
                    <ScaleItem range="< 18.5" category="Underweight" color="bg-blue-500" current={parseFloat(bmi) < 18.5} />
                    <ScaleItem range="18.5 - 24.9" category="Normal Weight" color="bg-teal-500" current={parseFloat(bmi) >= 18.5 && parseFloat(bmi) < 25} />
                    <ScaleItem range="25 - 29.9" category="Overweight" color="bg-orange-500" current={parseFloat(bmi) >= 25 && parseFloat(bmi) < 30} />
                    <ScaleItem range="≥ 30" category="Obese" color="bg-red-500" current={parseFloat(bmi) >= 30} />
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommendations</h3>
                  <div className="space-y-4">
                    {recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-teal-600 font-bold text-sm">{idx + 1}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-amber-900 mb-2">Important Note</p>
                      <p className="text-amber-800 text-sm leading-relaxed">
                        BMI is a screening tool and doesn't directly measure body fat. It may not be accurate for athletes, 
                        elderly, or pregnant women. Always consult with a healthcare provider for personalized advice.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">BMI History</h2>
                {bmiHistory.length > 0 && (
                  <button
                    onClick={exportHistory}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Export CSV
                  </button>
                )}
              </div>

              {bmiHistory.length === 0 ? (
                <div className="text-center py-12">
                  <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No BMI records yet. Calculate your first BMI!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bmiHistory.map((record, idx) => (
                    <div key={record.id} className="border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-3">
                            <div className={`w-16 h-16 bg-gradient-to-br ${
                              record.bmi < 18.5 ? 'from-blue-400 to-cyan-500' :
                              record.bmi < 25 ? 'from-teal-400 to-emerald-500' :
                              record.bmi < 30 ? 'from-orange-400 to-amber-500' :
                              'from-red-400 to-rose-500'
                            } rounded-xl flex items-center justify-center shadow`}>
                              <span className="text-2xl font-black text-white">{record.bmi}</span>
                            </div>
                            <div>
                              <p className="text-lg font-bold text-gray-900">{record.category}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(record.date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-xs text-gray-500 mb-1">Weight</p>
                              <p className="text-lg font-bold text-gray-900">{record.weight} kg</p>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <p className="text-xs text-gray-500 mb-1">Height</p>
                              <p className="text-lg font-bold text-gray-900">{record.height} cm</p>
                            </div>
                          </div>
                        </div>

                        {idx < bmiHistory.length - 1 && (
                          <div className="ml-6 text-right">
                            {(() => {
                              const change = record.bmi - bmiHistory[idx + 1].bmi;
                              const isPositive = change < 0;
                              return (
                                <div className={`px-4 py-2 rounded-lg ${
                                  isPositive ? 'bg-green-50' : 'bg-red-50'
                                }`}>
                                  <div className="flex items-center gap-2">
                                    {isPositive ? (
                                      <TrendingDown className="w-5 h-5 text-green-600" />
                                    ) : (
                                      <TrendingUp className="w-5 h-5 text-red-600" />
                                    )}
                                    <span className={`font-bold ${
                                      isPositive ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                      {isPositive ? '-' : '+'}{Math.abs(change).toFixed(1)}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">vs previous</p>
                                </div>
                              );
                            })()}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="max-w-6xl mx-auto space-y-8">
            {bmiHistory.length < 2 ? (
              <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 text-center">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Record at least 2 BMI measurements to see your progress</p>
              </div>
            ) : (
              <>
                {/* Progress Overview */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-8 h-8" />
                      <h3 className="font-bold text-lg">Current BMI</h3>
                    </div>
                    <p className="text-4xl font-black mb-2">{bmiHistory[0].bmi}</p>
                    <p className="text-sm text-white/80">{bmiHistory[0].category}</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingDown className="w-8 h-8" />
                      <h3 className="font-bold text-lg">Total Change</h3>
                    </div>
                    <p className="text-4xl font-black mb-2">
                      {(bmiHistory[0].bmi - bmiHistory[bmiHistory.length - 1].bmi).toFixed(1)}
                    </p>
                    <p className="text-sm text-white/80">Since first measurement</p>
                  </div>

                  <div className="bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="w-8 h-8" />
                      <h3 className="font-bold text-lg">Measurements</h3>
                    </div>
                    <p className="text-4xl font-black mb-2">{bmiHistory.length}</p>
                    <p className="text-sm text-white/80">Total records</p>
                  </div>
                </div>

                {/* BMI Trend Chart */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">BMI Trend</h3>
                  
                  <div className="space-y-4">
                    {bmiHistory.slice().reverse().map((record, idx) => {
                      const maxBMI = Math.max(...bmiHistory.map(r => r.bmi));
                      const minBMI = Math.min(...bmiHistory.map(r => r.bmi));
                      const range = maxBMI - minBMI || 1;
                      const position = ((record.bmi - minBMI) / range) * 100;
                      
                      return (
                        <div key={record.id}>
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>
                              {new Date(record.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="font-bold">{record.bmi} BMI</span>
                          </div>
                          <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`absolute top-0 left-0 h-full bg-gradient-to-r ${
                                record.bmi < 18.5 ? 'from-blue-400 to-cyan-500' :
                                record.bmi < 25 ? 'from-teal-400 to-emerald-500' :
                                record.bmi < 30 ? 'from-orange-400 to-amber-500' :
                                'from-red-400 to-rose-500'
                              } rounded-full transition-all duration-500`}
                              style={{ width: `${position}%` }}
                            ></div>
                            <div className="absolute inset-0 flex items-center px-4">
                              <span className="text-xs font-semibold text-gray-700">
                                {record.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Weight Progress */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Weight Progress</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 rounded-xl p-6">
                      <p className="text-sm text-gray-600 mb-2">Starting Weight</p>
                      <p className="text-3xl font-black text-blue-600">
                        {bmiHistory[bmiHistory.length - 1].weight} kg
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(bmiHistory[bmiHistory.length - 1].date).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6">
                      <p className="text-sm text-gray-600 mb-2">Current Weight</p>
                      <p className="text-3xl font-black text-purple-600">
                        {bmiHistory[0].weight} kg
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(bmiHistory[0].date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Weight Change</p>
                        <p className="text-4xl font-black text-gray-900">
                          {Math.abs(bmiHistory[0].weight - bmiHistory[bmiHistory.length - 1].weight).toFixed(1)} kg
                        </p>
                      </div>
                      {bmiHistory[0].weight < bmiHistory[bmiHistory.length - 1].weight ? (
                        <div className="text-green-600">
                          <TrendingDown className="w-12 h-12" />
                          <p className="text-sm font-semibold mt-1">Lost</p>
                        </div>
                      ) : (
                        <div className="text-orange-600">
                          <TrendingUp className="w-12 h-12" />
                          <p className="text-sm font-semibold mt-1">Gained</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ScaleItem({ range, category, color, current }) {
  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
      current ? 'bg-gray-100 ring-2 ring-teal-500' : 'bg-gray-50'
    }`}>
      <div className={`w-4 h-4 ${color} rounded-full ${current ? 'ring-4 ring-offset-2 ring-teal-300' : ''}`}></div>
      <div className="flex-1">
        <p className={`font-bold ${current ? 'text-gray-900' : 'text-gray-700'}`}>{category}</p>
        <p className="text-sm text-gray-500">BMI {range}</p>
      </div>
      {current && (
        <div className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-bold">
          You are here
        </div>
      )}
    </div>
  );
}
