import React, { useState } from 'react';
import { BookOpen, Clock, ArrowRight, Heart, Zap, Apple, Target, Coffee, Salad, Droplet, Brain, Flame, Search, Filter } from 'lucide-react';

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const articles = [
    {
      id: 1,
      title: 'How to Eat Healthy: A Complete Guide',
      excerpt: 'Learn the fundamentals of nutrition, balanced meals, and sustainable eating habits that work for long-term health.',
      category: 'Nutrition Basics',
      readTime: '8 min',
      icon: Apple,
      color: 'from-green-500 to-emerald-500',
      url: 'https://www.healthline.com/nutrition/how-to-eat-healthy',
      source: 'Healthline'
    },
    {
      id: 2,
      title: '26 Foods High in Protein',
      excerpt: 'Discover the best protein sources to support muscle growth, recovery, and overall health with this comprehensive guide.',
      category: 'Protein & Fitness',
      readTime: '6 min',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      url: 'https://www.healthline.com/nutrition/20-delicious-high-protein-foods',
      source: 'Healthline'
    },
    {
      id: 3,
      title: "Intermittent Fasting 101: Beginner's Guide",
      excerpt: 'Explore popular fasting methods like 16/8, 5:2, and eat-stop-eat. Learn the benefits and how to start safely.',
      category: 'Diet Methods',
      readTime: '10 min',
      icon: Clock,
      color: 'from-purple-500 to-pink-500',
      url: 'https://www.healthline.com/nutrition/intermittent-fasting-guide',
      source: 'Healthline'
    },
    {
      id: 4,
      title: 'A Guide to Healthy Low Carb Eating',
      excerpt: 'Learn how to follow a healthy low-carb diet with practical tips, food lists, and meal ideas for weight loss.',
      category: 'Diet Methods',
      readTime: '7 min',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      url: 'https://www.healthline.com/nutrition/low-carb-diet-meal-plan-and-menu',
      source: 'Healthline'
    },
    {
      id: 5,
      title: 'The Mediterranean Diet: Complete Guide',
      excerpt: 'Discover why the Mediterranean diet is one of the healthiest eating patterns and how to follow it effectively.',
      category: 'Diet Plans',
      readTime: '9 min',
      icon: Salad,
      color: 'from-teal-500 to-emerald-500',
      url: 'https://www.healthline.com/nutrition/mediterranean-diet-meal-plan',
      source: 'Healthline'
    },
    {
      id: 6,
      title: 'What Are Macros? Complete Guide',
      excerpt: 'Understand protein, carbs, and fats - what they do, how much you need, and how to balance them properly.',
      category: 'Nutrition Science',
      readTime: '11 min',
      icon: Heart,
      color: 'from-rose-500 to-pink-500',
      url: 'https://www.healthline.com/nutrition/how-to-count-macros',
      source: 'Healthline'
    },
    {
      id: 7,
      title: 'How Much Water Should You Drink Per Day?',
      excerpt: 'Learn about proper hydration, how much water you need daily, and the signs of dehydration to watch for.',
      category: 'Hydration',
      readTime: '5 min',
      icon: Droplet,
      color: 'from-cyan-500 to-blue-500',
      url: 'https://www.healthline.com/nutrition/how-much-water-should-you-drink-per-day',
      source: 'Healthline'
    },
    {
      id: 8,
      title: '12 Best Foods for Your Brain',
      excerpt: 'Discover science-backed foods that boost brain health, improve memory, and support cognitive function.',
      category: 'Brain Health',
      readTime: '6 min',
      icon: Brain,
      color: 'from-indigo-500 to-purple-500',
      url: 'https://www.healthline.com/nutrition/11-brain-foods',
      source: 'Healthline'
    },
    {
      id: 9,
      title: 'How to Boost Your Metabolism Naturally',
      excerpt: 'Learn evidence-based strategies to increase your metabolic rate and burn more calories throughout the day.',
      category: 'Weight Loss',
      readTime: '8 min',
      icon: Flame,
      color: 'from-red-500 to-orange-500',
      url: 'https://www.healthline.com/nutrition/10-ways-to-boost-metabolism',
      source: 'Healthline'
    },
    {
      id: 10,
      title: 'Healthy Eating on a Budget',
      excerpt: 'Save money while eating nutritious foods with these practical tips for grocery shopping and meal planning.',
      category: 'Budget Tips',
      readTime: '7 min',
      icon: Coffee,
      color: 'from-amber-500 to-yellow-500',
      url: 'https://www.healthline.com/nutrition/19-ways-to-eat-healthy-on-a-budget',
      source: 'Healthline'
    },
    {
      id: 11,
      title: '15 Incredibly Heart-Healthy Foods',
      excerpt: 'Protect your cardiovascular health with these nutrient-rich foods backed by scientific research.',
      category: 'Heart Health',
      readTime: '6 min',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      url: 'https://www.healthline.com/nutrition/heart-healthy-foods',
      source: 'Healthline'
    },
    {
      id: 12,
      title: 'The Vegan Diet: Complete Guide',
      excerpt: 'Everything you need to know about following a healthy plant-based diet with proper nutrition.',
      category: 'Diet Plans',
      readTime: '12 min',
      icon: Apple,
      color: 'from-lime-500 to-green-500',
      url: 'https://www.healthline.com/nutrition/vegan-diet-guide',
      source: 'Healthline'
    }
  ];

  const categories = ['All', ...new Set(articles.map(a => a.category))];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900">
              Diet & Nutrition Articles
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Evidence-based articles from trusted health sources to guide your nutrition journey
          </p>

          {/* Search & Filter */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg shadow-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        {searchQuery && (
          <div className="text-center mb-6">
            <p className="text-gray-600">
              Found <span className="font-bold text-purple-600">{filteredArticles.length}</span> article{filteredArticles.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No articles found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => {
              const Icon = article.icon;
              return (
                <a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group text-left border border-gray-100 hover:scale-105 duration-300"
                >
                  <div className={`h-48 bg-gradient-to-br ${article.color} relative`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all" />
                    <div className="absolute bottom-6 left-6">
                      <Icon className="w-16 h-16 text-white drop-shadow-lg" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full text-xs font-bold">
                        {article.source}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                        {article.category}
                      </span>
                      <span className="text-gray-500 text-sm flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-gray-900 mb-4 group-hover:text-purple-600 transition-colors leading-tight">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                      {article.excerpt}
                    </p>

                    <div className="text-purple-600 font-bold flex items-center gap-2 text-sm">
                      Read Full Article
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 border-2 border-purple-200">
          <div className="flex items-start gap-4">
            <BookOpen className="w-8 h-8 text-purple-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">About These Articles</h3>
              <p className="text-purple-800 leading-relaxed">
                All articles are from <strong>Healthline</strong>, one of the most trusted sources for health and nutrition information. 
                Each article is medically reviewed and based on scientific evidence. Click any article to read the full content on their website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
