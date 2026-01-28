import React, { useState } from 'react';
import { BookOpen, Clock, ArrowLeft, TrendingUp, Heart, Zap, Apple, Target, Coffee } from 'lucide-react';

export default function Articles() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: 'Complete Guide to Healthy Eating for Beginners',
      excerpt: 'Learn the fundamentals of nutrition, balanced meals, and sustainable eating habits that work for your lifestyle.',
      category: 'Nutrition Basics',
      readTime: '8 min',
      icon: Apple,
      color: 'from-green-500 to-emerald-500',
      content: `
# Complete Guide to Healthy Eating for Beginners

Starting a healthy eating journey doesn't have to be overwhelming. This comprehensive guide will help you understand the basics of nutrition and make sustainable changes.

## Understanding Macronutrients

**Proteins:** Essential for building and repairing tissues. Aim for 0.8-1g per kg of body weight daily.
- Sources: Chicken, fish, eggs, legumes, tofu, Greek yogurt
- Benefits: Muscle growth, satiety, immune function

**Carbohydrates:** Your body's main energy source. Focus on complex carbs.
- Sources: Whole grains, oats, quinoa, sweet potatoes, fruits
- Benefits: Energy, fiber, essential nutrients

**Fats:** Necessary for hormone production and nutrient absorption.
- Sources: Avocado, nuts, olive oil, fatty fish
- Benefits: Brain health, vitamin absorption, satiety

## Building a Balanced Plate

The simple plate method:
- 50% vegetables and fruits
- 25% lean protein
- 25% whole grains or complex carbs
- Small amount of healthy fats

## Practical Tips for Success

1. **Meal Prep**: Dedicate 2-3 hours on Sunday to prep meals for the week
2. **Hydration**: Drink 8-10 glasses of water daily
3. **Portion Control**: Use smaller plates and listen to hunger cues
4. **Read Labels**: Check ingredients and nutritional information
5. **Cook at Home**: Gives you control over ingredients and portions

## Common Mistakes to Avoid

- Skipping meals (leads to overeating later)
- Eliminating entire food groups unnecessarily
- Relying on processed "diet" foods
- Not eating enough protein
- Drinking calories (sugary beverages)

## Creating Sustainable Habits

Remember, healthy eating is a marathon, not a sprint. Focus on progress, not perfection. Small, consistent changes lead to lasting results.

Start with one or two changes per week and build from there. Track your meals, stay consistent, and celebrate your wins!
      `
    },
    {
      id: 2,
      title: 'High-Protein Foods for Muscle Building',
      excerpt: 'Discover the best protein sources and optimal timing for maximum muscle growth and recovery.',
      category: 'Fitness Nutrition',
      readTime: '6 min',
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      content: `
# High-Protein Foods for Muscle Building

Protein is the building block of muscle tissue. Whether you're trying to build muscle or maintain it while losing fat, adequate protein intake is crucial.

## How Much Protein Do You Need?

For muscle building:
- **Beginners**: 1.6-2.0g per kg of body weight
- **Advanced**: 2.0-2.4g per kg of body weight
- **During cutting**: Up to 2.5g per kg to preserve muscle

Example: A 70kg person should consume 112-168g of protein daily.

## Top Protein Sources

### Animal-Based Proteins (Complete Proteins)

**Chicken Breast** - 31g protein per 100g
- Lean, versatile, affordable
- Best for: Meal prep, grilling, stir-fries

**Salmon** - 25g protein per 100g
- Rich in omega-3 fatty acids
- Best for: Heart health, anti-inflammatory benefits

**Greek Yogurt** - 10g protein per 100g
- Contains probiotics for gut health
- Best for: Breakfast, snacks, post-workout

**Eggs** - 13g protein per 100g
- Contains all essential amino acids
- Best for: Breakfast, any time protein boost

**Lean Beef** - 26g protein per 100g
- High in iron and B vitamins
- Best for: Building strength, iron deficiency

### Plant-Based Proteins

**Lentils** - 9g protein per 100g cooked
- High in fiber and iron
- Best for: Budget-friendly protein

**Tofu** - 8g protein per 100g
- Low in calories, versatile
- Best for: Vegetarian/vegan diets

**Quinoa** - 4g protein per 100g cooked
- Complete protein (rare in plants)
- Best for: Side dishes, salads

**Chickpeas** - 9g protein per 100g
- Rich in fiber and nutrients
- Best for: Curries, salads, hummus

## Protein Timing for Muscle Growth

**Pre-Workout** (1-2 hours before)
- 20-30g protein
- Easy to digest options: Greek yogurt, protein shake

**Post-Workout** (within 2 hours)
- 20-40g protein
- Fast-absorbing: Whey protein, chicken breast

**Before Bed**
- 30-40g slow-digesting protein
- Best options: Casein protein, Greek yogurt, cottage cheese

## Protein Distribution Throughout the Day

Spread protein intake across 4-5 meals:
- Breakfast: 25-30g
- Lunch: 30-40g
- Snack: 15-20g
- Dinner: 30-40g
- Before bed: 20-30g

## Protein Supplements

**Whey Protein**: Fast-absorbing, ideal post-workout
**Casein Protein**: Slow-digesting, ideal before bed
**Plant Protein**: Pea, rice, or hemp for vegans

Remember: Whole foods should be your primary protein source. Supplements are just that – supplementary.

## Maximizing Protein Absorption

- Don't exceed 40g per meal (excess isn't absorbed efficiently)
- Combine with carbs post-workout for better absorption
- Stay hydrated to support protein metabolism
- Get adequate sleep for muscle recovery
      `
    },
    {
      id: 3,
      title: 'Intermittent Fasting: Complete Beginner\'s Guide',
      excerpt: 'Learn about different IF protocols, health benefits, and how to start your fasting journey safely.',
      category: 'Diet Methods',
      readTime: '10 min',
      icon: Clock,
      color: 'from-purple-500 to-pink-500',
      content: `
# Intermittent Fasting: Complete Beginner's Guide

Intermittent fasting (IF) is an eating pattern that cycles between periods of fasting and eating. It's not about what you eat, but when you eat.

## Popular IF Protocols

### 16/8 Method (Most Popular)
- **Fast**: 16 hours
- **Eat**: 8-hour window
- **Example**: Eat between 12pm-8pm, fast from 8pm-12pm
- **Best for**: Beginners, sustainable long-term

### 5:2 Diet
- **Eat normally**: 5 days per week
- **Restrict**: 500-600 calories on 2 non-consecutive days
- **Best for**: Those who prefer flexibility

### Eat-Stop-Eat
- **Fast**: 24 hours once or twice per week
- **Example**: Dinner to dinner
- **Best for**: Experienced fasters

### Alternate Day Fasting
- **Alternate**: Between fasting days and eating days
- **Fasting days**: 500 calories or complete fast
- **Best for**: Advanced practitioners

## Health Benefits of IF

### Weight Loss and Fat Loss
- Creates calorie deficit naturally
- Increases metabolism by 3.6-14%
- Helps preserve muscle mass while losing fat

### Metabolic Health
- Improves insulin sensitivity
- Reduces inflammation
- May reduce risk of type 2 diabetes

### Brain Health
- Increases BDNF (brain-derived neurotrophic factor)
- May protect against Alzheimer's disease
- Improves focus and mental clarity

### Cellular Health
- Triggers autophagy (cellular cleanup)
- May increase longevity
- Reduces oxidative stress

## How to Start IF Safely

### Week 1-2: Ease Into It
- Start with 12-hour fasts (7pm-7am)
- Stay hydrated during fasting
- Eat normally during eating window

### Week 3-4: Extend Gradually
- Increase to 14-hour fast
- Monitor energy levels
- Adjust if needed

### Week 5+: Find Your Rhythm
- Progress to 16/8 or chosen protocol
- Maintain consistent schedule
- Track how you feel

## What You Can Have While Fasting

**Allowed:**
- Water (encouraged!)
- Black coffee
- Plain tea (green, black, herbal)
- Sparkling water
- Apple cider vinegar (diluted)

**Not Allowed:**
- Any food
- Drinks with calories
- Milk or cream in coffee
- Sugar or artificial sweeteners
- Bone broth

## Breaking Your Fast

**Best First Foods:**
- Bone broth or soup
- Eggs
- Avocado
- Nuts and seeds
- Fermented foods

**Avoid:**
- Large heavy meals
- Processed foods
- High-sugar foods
- Overeating

## Common Mistakes

1. **Not drinking enough water** - Aim for 2-3 liters daily
2. **Overeating during eating window** - Still maintain calorie awareness
3. **Choosing wrong protocol** - Start with 16/8, not extreme fasts
4. **Giving up too soon** - Takes 2-4 weeks to adapt
5. **Ignoring nutrient quality** - Whole foods still matter

## Who Should NOT Try IF

- Pregnant or breastfeeding women
- People with eating disorders
- Children and teenagers
- Those with diabetes (consult doctor first)
- People on certain medications

## Combining IF with Exercise

**Fasted Cardio**: Safe for most people
**Fasted Strength Training**: May reduce performance
**Best Practice**: Schedule workouts near end of fast or after breaking fast

## Tips for Success

1. **Stay busy** during fasting hours
2. **Drink plenty of water**
3. **Start on weekends** when schedule is flexible
4. **Track your progress** with apps
5. **Be patient** - adaptation takes time
6. **Listen to your body** - adjust as needed

Remember: IF is a tool, not a magic solution. It works best when combined with healthy eating, regular exercise, and adequate sleep.
      `
    },
    {
      id: 4,
      title: 'Counting Calories: The Complete Guide',
      excerpt: 'Master calorie counting with practical tips for tracking, calculating your needs, and achieving your goals.',
      category: 'Weight Management',
      readTime: '7 min',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      content: `
# Counting Calories: The Complete Guide

Understanding calorie counting is fundamental to achieving any weight goal – whether losing, gaining, or maintaining weight.

## Understanding Calories

A calorie is a unit of energy. Your body needs calories for:
- Basic functions (breathing, circulation)
- Physical activity
- Digestion (thermic effect of food)
- Growth and repair

## Calculating Your Calorie Needs

### Step 1: Calculate BMR (Basal Metabolic Rate)

**Mifflin-St Jeor Equation:**

For Men:
BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5

For Women:
BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161

### Step 2: Calculate TDEE (Total Daily Energy Expenditure)

Multiply BMR by activity factor:
- **Sedentary** (little/no exercise): BMR × 1.2
- **Lightly active** (1-3 days/week): BMR × 1.375
- **Moderately active** (3-5 days/week): BMR × 1.55
- **Very active** (6-7 days/week): BMR × 1.725
- **Extremely active** (athlete): BMR × 1.9

### Step 3: Adjust for Your Goal

**Weight Loss**: TDEE - 500 calories (lose ~0.5kg/week)
**Muscle Gain**: TDEE + 300-500 calories
**Maintenance**: Eat at TDEE

## Macronutrient Distribution

Once you know your calorie target, distribute as:

**For Weight Loss:**
- Protein: 30-35% (1.6-2.0g per kg)
- Carbs: 30-40%
- Fats: 25-35%

**For Muscle Gain:**
- Protein: 25-30% (1.6-2.2g per kg)
- Carbs: 45-55%
- Fats: 20-30%

## Tools for Tracking

### Best Calorie Tracking Apps
1. **MyFitnessPal** - Largest food database
2. **Lose It!** - User-friendly interface
3. **Cronometer** - Most accurate micronutrient tracking
4. **Yazio** - Great for meal planning

### Measuring Portions

**Essential Tools:**
- Digital food scale
- Measuring cups
- Measuring spoons

**Portion Size Guides:**
- Protein: Palm of hand (~100g)
- Carbs: Cupped hand (~100g)
- Fats: Thumb (~1 tablespoon)
- Vegetables: Fist (~100g)

## Common Calorie Counting Mistakes

### 1. Not Weighing Food
Eyeballing portions can lead to 20-50% errors. Always weigh for accuracy.

### 2. Forgetting Cooking Oils
1 tablespoon of oil = 120 calories. Track everything!

### 3. Not Counting Liquid Calories
- Smoothies, juices, alcohol, coffee drinks add up quickly

### 4. Underestimating Restaurant Portions
Restaurant meals often contain 2-3× more calories than homemade.

### 5. "Forgetting" Snacks
Every bite counts. Track taste-testing, samples, and nibbles.

## Smart Calorie-Saving Swaps

**Breakfast:**
- Regular yogurt → Greek yogurt (save 50 cal)
- Juice → Whole fruit (save 80 cal)

**Lunch:**
- Mayo → Mustard (save 90 cal)
- White bread → Whole grain (same cal, more fiber)

**Dinner:**
- Pasta → Zucchini noodles (save 150 cal)
- Ground beef → Ground turkey (save 100 cal)

**Snacks:**
- Chips → Air-popped popcorn (save 120 cal)
- Ice cream → Greek yogurt with fruit (save 150 cal)

## When to Adjust Calories

**Increase calories if:**
- Energy levels are very low
- Losing more than 1kg per week
- Can't complete workouts
- Feeling constantly hungry

**Decrease calories if:**
- Weight loss has stalled for 2+ weeks
- Currently in surplus but not gaining muscle

**Reassess every:**
- 4-6 weeks
- After losing/gaining 5kg
- When activity level changes

## Beyond the Numbers

While calories are important, remember:
- **Food quality matters** - 100 cal of broccoli ≠ 100 cal of candy
- **Satiety varies** - Protein and fiber keep you full longer
- **Micronutrients** - Essential for health beyond weight
- **Sustainability** - Find an approach you can maintain

## Sample Day (2000 Calories)

**Breakfast (500 cal)**
- 3 eggs scrambled
- 2 slices whole wheat toast
- 1 medium avocado
- Black coffee

**Lunch (600 cal)**
- Grilled chicken breast (150g)
- Quinoa (1 cup cooked)
- Mixed vegetables
- Olive oil dressing

**Snack (200 cal)**
- Greek yogurt
- Handful of berries
- 10 almonds

**Dinner (600 cal)**
- Salmon (150g)
- Sweet potato (200g)
- Steamed broccoli
- Side salad

**Snack (100 cal)**
- Apple with 1 tbsp peanut butter

## Final Tips

1. **Be consistent** - Track every day, even "cheat" days
2. **Plan ahead** - Pre-log meals to stay on track
3. **Use recipes** - Cook in batches for easy tracking
4. **Be patient** - It takes practice to get accurate
5. **Don't obsess** - It's a tool, not a life sentence

Remember: Calorie counting is a skill that improves with practice. Start simple, stay consistent, and adjust as you learn!
      `
    },
    {
      id: 5,
      title: 'Meal Prep Mastery: Weekly Planning Guide',
      excerpt: 'Save time and eat healthy with strategic meal prep. Complete guide with shopping lists and storage tips.',
      category: 'Meal Planning',
      readTime: '9 min',
      icon: Coffee,
      color: 'from-teal-500 to-emerald-500',
      content: `
# Meal Prep Mastery: Weekly Planning Guide

Meal prepping is the secret weapon for maintaining a healthy diet while saving time and money. Here's your complete guide to meal prep success.

## Benefits of Meal Prepping

- **Saves time**: 2-3 hours on Sunday saves 10+ hours during the week
- **Saves money**: Buying in bulk reduces food costs by 30-40%
- **Portion control**: Pre-portioned meals prevent overeating
- **Reduces stress**: No daily "what's for dinner?" decisions
- **Healthier choices**: Less temptation for takeout

## Essential Meal Prep Equipment

### Containers
- **Glass containers**: Best for reheating, longest lasting
- **BPA-free plastic**: Lighter, more portable
- **Portion control containers**: Built-in compartments

### Kitchen Tools
- Slow cooker or Instant Pot
- Large cutting board
- Quality knife set
- Baking sheets (2-3)
- Large pots and pans
- Food scale

## The 4-Step Meal Prep System

### Step 1: Plan (30 minutes)

**Choose Your Meals:**
- 2-3 breakfast options
- 3-4 lunch options
- 3-4 dinner options
- 2-3 snack options

**Consider:**
- Foods you enjoy
- Nutritional balance
- Variety in flavors and textures
- Shelf life (prep earlier in week first)

### Step 2: Shop (60 minutes)

**Organize Your List by Section:**
- Proteins
- Carbs
- Vegetables
- Fruits
- Pantry staples
- Snacks

**Money-Saving Tips:**
- Buy in bulk when possible
- Choose seasonal produce
- Check sales and use coupons
- Avoid shopping hungry

### Step 3: Prep (2-3 hours)

**Efficient Prep Order:**

1. **Start longest cooking items first**
   - Roast vegetables (45 min)
   - Cook grains (rice, quinoa)
   - Bake proteins

2. **While those cook:**
   - Chop vegetables
   - Prepare sauces/dressings
   - Cook eggs (if needed)

3. **Assembly:**
   - Portion into containers
   - Label with dates
   - Store properly

### Step 4: Store

**Refrigerator (3-4 days):**
- Cooked proteins
- Prepared vegetables
- Assembled salads (dressing separate)
- Cut fruits

**Freezer (2-3 months):**
- Soups and stews
- Cooked grains
- Breakfast burritos
- Cookie dough portions

## Sample Week Meal Prep

### Breakfast Options

**Option 1: Overnight Oats (5 servings)**
- 2.5 cups oats
- 2.5 cups milk
- Toppings: berries, nuts, honey

**Option 2: Egg Muffins (12 servings)**
- 12 eggs
- Vegetables (spinach, peppers, onions)
- Cheese
- Bake 25 min at 350°F

### Lunch Options

**Option 1: Chicken Bowls (4 servings)**
- 600g chicken breast
- 4 cups cooked rice
- 4 cups roasted vegetables
- 4 portions sauce

**Option 2: Mason Jar Salads (4 servings)**
- Layer: dressing, hard vegetables, proteins, leafy greens

### Dinner Options

**Option 1: Sheet Pan Dinners (4 servings)**
- Protein + vegetables on one pan
- Season, roast 25-30 min

**Option 2: Slow Cooker Chili (6 servings)**
- Ground turkey
- Beans
- Tomatoes
- Spices
- Cook on low 6-8 hours

## Food Storage Guidelines

### How Long Foods Last

**Refrigerator:**
- Cooked chicken/meat: 3-4 days
- Cooked fish: 1-2 days
- Cooked grains: 3-5 days
- Raw cut vegetables: 2-3 days
- Prepared salads: 2-3 days

**Freezer:**
- Most cooked foods: 2-3 months
- Soups/stews: 3-4 months
- Bread/baked goods: 3 months

### Proper Storage Tips

1. **Cool before storing**: Prevents condensation
2. **Use airtight containers**: Prevents freezer burn
3. **Label everything**: Date and contents
4. **Leave headspace**: Foods expand when frozen
5. **Stack efficiently**: Oldest items in front

## Meal Prep Strategies

### Batch Cooking
Cook large quantities of one item:
- Grill 10 chicken breasts
- Roast 5 lbs of vegetables
- Cook 6 cups of rice

### Ingredient Prep
Prepare ingredients to mix and match:
- Washed, chopped vegetables
- Cooked proteins
- Prepared grains
- Made sauces

### Full Meals
Complete meals ready to heat:
- Casseroles
- Stir-fries
- Pasta dishes

## Time-Saving Meal Prep Hacks

1. **Double recipes**: Freeze half for later
2. **Use kitchen gadgets**: Instant Pot, air fryer
3. **Buy pre-cut**: When time > money
4. **Multi-task**: Use stove, oven, slow cooker simultaneously
5. **Prep snacks**: Pre-portion nuts, cut vegetables

## Common Meal Prep Mistakes

**Mistake 1: Too ambitious**
Start with 3-4 days, not full week

**Mistake 2: No variety**
Rotate proteins and vegetables to prevent boredom

**Mistake 3: Wrong containers**
Invest in quality, microwave-safe containers

**Mistake 4: Not accounting for taste**
Some foods don't reheat well (crispy items)

**Mistake 5: Skipping labels**
Always date your containers

## Budget-Friendly Meal Prep

**Cheap Protein Sources:**
- Eggs: $0.20-0.30 per egg
- Chicken thighs: $2-3 per lb
- Ground turkey: $3-4 per lb
- Canned tuna: $1-2 per can
- Beans/lentils: $1-2 per lb

**Cheap Carbs:**
- Rice: $0.50-1 per lb
- Oats: $2-3 per lb
- Pasta: $1-2 per lb
- Sweet potatoes: $1-2 per lb

**Cheap Vegetables:**
- Frozen mixed vegetables: $1-2 per lb
- Cabbage: $0.50-1 per lb
- Carrots: $1-2 per lb
- Broccoli: $2-3 per lb

## Meal Prep for Different Goals

### Weight Loss
- Focus on high volume, low calorie foods
- Prep vegetables in large quantities
- Pre-portion snacks to avoid overeating

### Muscle Building
- Prep high-protein meals
- Include complex carbs
- Don't skip healthy fats

### Busy Professionals
- Focus on quick reheat meals
- Breakfast options that travel well
- Portable lunch containers

### Families
- Make kid-friendly options
- Prep ingredients for easy dinner assembly
- Include variety to please everyone

## Your First Meal Prep Checklist

- [ ] Choose 3-4 simple recipes
- [ ] Make shopping list
- [ ] Buy containers (6-8 to start)
- [ ] Block 3 hours on Sunday
- [ ] Prep workspace (clean kitchen)
- [ ] Cook and portion meals
- [ ] Label containers with dates
- [ ] Store properly
- [ ] Enjoy stress-free week!

Remember: Meal prep gets faster and easier with practice. Start simple, find what works for you, and adjust your system as you go!
      `
    },
    {
      id: 6,
      title: 'Understanding Macros: The Complete Guide',
      excerpt: 'Deep dive into proteins, carbs, and fats. Learn how to calculate and adjust your macros for optimal results.',
      category: 'Nutrition Science',
      readTime: '11 min',
      icon: Heart,
      color: 'from-rose-500 to-pink-500',
      content: `
# Understanding Macros: The Complete Guide

Macronutrients (macros) are the nutrients your body needs in large amounts: protein, carbohydrates, and fats. Understanding how to balance them is key to reaching your health and fitness goals.

## The Three Macronutrients

### Protein
**Calories per gram:** 4

**Primary Functions:**
- Building and repairing muscle tissue
- Enzyme and hormone production
- Immune system support
- Satiety and appetite control

**Daily Requirements:**
- Sedentary: 0.8g per kg body weight
- Active: 1.2-1.6g per kg
- Muscle building: 1.6-2.2g per kg
- Fat loss: 1.8-2.5g per kg

**Best Sources:**
- Animal: Chicken, fish, beef, eggs, dairy
- Plant: Beans, lentils, tofu, tempeh, quinoa

### Carbohydrates
**Calories per gram:** 4

**Primary Functions:**
- Primary energy source
- Brain and nervous system fuel
- Glycogen storage for workouts
- Fiber for digestive health

**Types:**
- **Simple carbs**: Quick energy, minimal nutrients (sugar, white bread)
- **Complex carbs**: Sustained energy, rich in nutrients (oats, brown rice, vegetables)

**Daily Requirements:**
- Low carb: 50-150g
- Moderate: 150-300g
- High carb (athletes): 300-500g+

**Best Sources:**
- Whole grains: Oats, brown rice, quinoa
- Starchy vegetables: Sweet potato, squash
- Fruits: Berries, apples, bananas
- Legumes: Beans, lentils

### Fats
**Calories per gram:** 9

**Primary Functions:**
- Hormone production (testosterone, estrogen)
- Vitamin absorption (A, D, E, K)
- Brain health and function
- Cell membrane structure
- Satiety

**Types:**
- **Saturated**: Solid at room temp (butter, coconut oil)
- **Monounsaturated**: Heart-healthy (olive oil, avocado)
- **Polyunsaturated**: Essential fatty acids (fish, nuts, seeds)
- **Trans fats**: AVOID (processed foods)

**Daily Requirements:**
- Minimum: 0.3-0.5g per kg body weight
- Optimal: 0.8-1.2g per kg

**Best Sources:**
- Avocados
- Nuts and nut butters
- Olive oil
- Fatty fish (salmon, mackerel)
- Seeds (chia, flax, hemp)

## Calculating Your Macros

### Step 1: Determine Total Calories
Use TDEE calculator or multiply body weight by:
- Weight loss: 22-26 calories per kg
- Maintenance: 28-33 calories per kg
- Muscle gain: 35-40 calories per kg

### Step 2: Set Protein Target
Choose based on goal:
- Weight loss: 2.0-2.5g per kg
- Muscle gain: 1.6-2.2g per kg
- Maintenance: 1.2-1.6g per kg

Calculate calories: Protein (g) × 4 = protein calories

### Step 3: Set Fat Target
Recommended: 0.8-1.2g per kg body weight
Calculate calories: Fat (g) × 9 = fat calories

### Step 4: Fill Remaining with Carbs
Remaining calories = Total calories - Protein calories - Fat calories
Carbs (g) = Remaining calories ÷ 4

## Example Macro Calculations

**Example: 70kg person, weight loss goal, 2000 calories**

**Protein:**
- Target: 2.0g per kg
- 70kg × 2.0g = 140g protein
- 140g × 4 cal = 560 calories

**Fats:**
- Target: 1.0g per kg  
- 70kg × 1.0g = 70g fat
- 70g × 9 cal = 630 calories

**Carbs:**
- Remaining: 2000 - 560 - 630 = 810 calories
- 810 ÷ 4 = 202.5g carbs

**Final Macros:**
- Protein: 140g (28%)
- Carbs: 203g (41%)
- Fats: 70g (31%)

## Macro Ratios for Different Goals

### Fat Loss
**High Protein:**
- Protein: 30-40%
- Carbs: 25-35%
- Fats: 30-35%

**Moderate:**
- Protein: 25-30%
- Carbs: 35-45%
- Fats: 25-30%

### Muscle Building
**Balanced:**
- Protein: 25-30%
- Carbs: 45-55%
- Fats: 20-25%

### Maintenance
**Flexible:**
- Protein: 20-30%
- Carbs: 40-50%
- Fats: 25-35%

### Keto/Low Carb
**High Fat:**
- Protein: 20-25%
- Carbs: 5-10%
- Fats: 70-75%

## Macro Timing Strategies

### Pre-Workout (1-2 hours before)
- Moderate protein (20-30g)
- Higher carbs (30-50g)
- Lower fat (keeps digestion easy)

**Example:** Banana with peanut butter, oatmeal with protein

### Post-Workout (within 2 hours)
- Higher protein (30-40g)
- Higher carbs (40-80g)
- Moderate fat

**Example:** Chicken and rice, protein shake with fruit

### Before Bed
- Higher protein (slow-digesting)
- Lower carbs
- Moderate fat

**Example:** Greek yogurt, casein protein, cottage cheese

## Adjusting Macros

### Signs You Need More Carbs:
- Low energy during workouts
- Poor workout performance
- Mood swings, irritability
- Can't complete high-intensity exercise

### Signs You Need More Protein:
- Not recovering from workouts
- Losing muscle mass
- Constantly hungry
- Weak, brittle nails and hair

### Signs You Need More Fats:
- Dry skin
- Hormone imbalances
- Always hungry shortly after meals
- Poor vitamin absorption

## Tracking Macros

### Best Apps:
1. **MyFitnessPal** - Most comprehensive database
2. **Cronometer** - Most accurate nutritional data
3. **MacroFactor** - AI-powered adjustments
4. **Carbon Diet Coach** - Science-based coaching

### Tips for Accurate Tracking:
1. **Weigh everything raw** when possible
2. **Log before eating** to stay accountable
3. **Create frequent meals** for easy logging
4. **Verify database entries** for accuracy
5. **Be honest** - track everything

## Flexible Dieting (IIFYM)

"If It Fits Your Macros" allows food flexibility within macro targets.

**Benefits:**
- Sustainable long-term
- No forbidden foods
- Teaches moderation
- Reduces diet-related stress

**Important:**
- 80-90% whole foods
- 10-20% flexible choices
- Don't sacrifice micronutrients
- Fiber still matters (25-35g daily)

## Common Macro Mistakes

### Mistake 1: Neglecting Fiber
Even hitting macros, aim for 25-35g fiber daily from vegetables, fruits, whole grains.

### Mistake 2: Ignoring Food Quality
200 calories of chicken ≠ 200 calories of candy for health and satiety.

### Mistake 3: Being Too Rigid
Small deviations are fine. Focus on weekly averages, not daily perfection.

### Mistake 4: Not Adjusting
Reassess macros every 4-6 weeks or after losing/gaining 5kg.

### Mistake 5: Forgetting Micronutrients
Vitamins and minerals matter for health, even if macros are perfect.

## Sample Macro-Friendly Meals

### High Protein Breakfast (40g protein)
- 3 whole eggs
- 100g egg whites
- 2 slices whole wheat toast
- 1/2 avocado

### Balanced Lunch (35g protein, 50g carbs)
- 150g grilled chicken
- 1 cup quinoa
- Large mixed salad
- Olive oil dressing

### Pre-Workout Snack (20g protein, 40g carbs)
- Protein shake
- 1 banana
- 1 tbsp peanut butter

### Post-Workout Dinner (45g protein, 60g carbs)
- 200g salmon
- 200g sweet potato
- Steamed broccoli

### Evening Snack (25g protein, low carb)
- Greek yogurt
- Handful of almonds
- Berries

## Beyond the Basics

Remember:
- **Consistency > Perfection**
- **Weekly averages matter more than daily**
- **Quality of food still important**
- **Adjust based on how you feel and perform**
- **Sustainability is key**

Mastering macros takes practice, but once you understand the fundamentals, you'll have powerful knowledge to reach any health or fitness goal!
      `
    }
  ];

  if (selectedArticle) {
    const article = articles.find(a => a.id === selectedArticle);
    const ArticleIcon = article.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Articles
          </button>

          <article className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className={`w-20 h-20 bg-gradient-to-br ${article.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
              <ArticleIcon className="w-10 h-10 text-white" />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Clock className="w-4 h-4" />
                {article.readTime} read
              </span>
            </div>

            <div className="prose prose-lg max-w-none">
              {article.content.split('\n').map((line, idx) => {
                if (line.startsWith('# ')) {
                  return <h1 key={idx} className="text-4xl font-black text-gray-900 mb-6 mt-8">{line.substring(2)}</h1>;
                } else if (line.startsWith('## ')) {
                  return <h2 key={idx} className="text-3xl font-bold text-gray-900 mb-4 mt-8">{line.substring(3)}</h2>;
                } else if (line.startsWith('### ')) {
                  return <h3 key={idx} className="text-2xl font-bold text-gray-900 mb-3 mt-6">{line.substring(4)}</h3>;
                } else if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={idx} className="font-bold text-gray-900 mb-2 mt-4">{line.replace(/\*\*/g, '')}</p>;
                } else if (line.startsWith('- ')) {
                  return <li key={idx} className="text-gray-700 ml-6 mb-1">{line.substring(2)}</li>;
                } else if (line.trim() === '') {
                  return <div key={idx} className="h-2"></div>;
                } else {
                  return <p key={idx} className="text-gray-700 leading-relaxed mb-4">{line}</p>;
                }
              })}
            </div>
          </article>
        </div>
      </div>
    );
  }

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
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Evidence-based guides to help you make informed decisions about your health
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const ArticleIcon = article.icon;
            return (
              <button
                key={article.id}
                onClick={() => setSelectedArticle(article.id)}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group text-left border border-gray-100"
              >
                <div className={`h-48 bg-gradient-to-br ${article.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all"></div>
                  <div className="absolute bottom-6 left-6">
                    <ArticleIcon className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-sm flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 mb-4 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="text-purple-600 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                    Read Article
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
