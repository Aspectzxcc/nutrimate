"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChefHat,
  Wand2,
  Clock,
  DollarSign,
  Users,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
  Plus,
  Check,
  ShoppingCart,
  User,
  Calendar,
  Shuffle,
  Heart,
  Star,
  MessageCircle,
} from "lucide-react"

type Screen = "dietary" | "goals" | "kitchen" | "dashboard" | "loading" | "plan" | "recipe" | "grocery" | "profile" | "reviews"

interface UserProfile {
  dietary: string[]
  allergies: string
  goals: string[]
  budget: number
  cookingTime: number
  pantry: string
  dislikes: string
}

interface Recipe {
  id: string
  name: string
  image: string
  calories: number
  cost: number
  prepTime: number
  servings: number
  ingredients: string[]
  instructions: string[]
  tags: string[]
}

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  date: string
  helpful: number
  verified: boolean
}

const mockRecipes: Recipe[] = [
  {
    id: "1",
    name: "Mediterranean Quinoa Bowl",
    image: "/images/recipes/mediterranean-quinoa-bowl.jpg",
    calories: 420,
    cost: 180,
    prepTime: 25,
    servings: 2,
    ingredients: [
      "1 cup quinoa",
      "2 cups vegetable broth",
      "1 cucumber, diced",
      "1 cup cherry tomatoes",
      "1/2 red onion",
      "1/4 cup feta cheese",
      "2 tbsp olive oil",
      "1 lemon, juiced",
    ],
    instructions: [
      "Cook quinoa in vegetable broth",
      "Dice vegetables",
      "Combine all ingredients",
      "Drizzle with olive oil and lemon",
    ],
    tags: ["Vegetarian", "Mediterranean", "High Protein"],
  },
  {
    id: "2",
    name: "Grilled Salmon with Asparagus",
    image: "/images/recipes/grilled-salmon-asparagus.jpg",
    calories: 380,
    cost: 250,
    prepTime: 20,
    servings: 2,
    ingredients: [
      "2 salmon fillets",
      "1 lb asparagus",
      "2 tbsp olive oil",
      "1 lemon",
      "Salt and pepper",
      "2 cloves garlic",
    ],
    instructions: [
      "Preheat grill to medium-high",
      "Season salmon with salt and pepper",
      "Grill salmon 4-5 minutes per side",
      "Grill asparagus until tender",
    ],
    tags: ["High Protein", "Low Carb", "Omega-3"],
  },
  {
    id: "3",
    name: "Veggie Stir Fry",
    image: "/images/recipes/veggie-stir-fry.jpg",
    calories: 320,
    cost: 140,
    prepTime: 15,
    servings: 2,
    ingredients: [
      "2 cups mixed vegetables",
      "2 tbsp sesame oil",
      "2 cloves garlic",
      "1 tbsp soy sauce",
      "1 tsp ginger",
      "1 cup brown rice",
    ],
    instructions: [
      "Heat oil in wok",
      "Add garlic and ginger",
      "Stir fry vegetables",
      "Add soy sauce",
      "Serve over rice",
    ],
    tags: ["Vegan", "Quick", "Budget-Friendly"],
  },
]

const mockReviews: { [recipeId: string]: Review[] } = {
  "1": [
    {
      id: "r1",
      userId: "u1",
      userName: "Sarah M.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      title: "Perfect for meal prep!",
      comment: "This Mediterranean quinoa bowl has become my go-to lunch. The flavors are amazing and it keeps me full for hours. I make a big batch on Sunday and eat it all week.",
      date: "2024-01-15",
      helpful: 23,
      verified: true,
    },
    {
      id: "r2",
      userId: "u2",
      userName: "Mike Chen",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      title: "Great taste, easy to make",
      comment: "Really enjoyed this recipe! The instructions were clear and easy to follow. I substituted chickpeas for the feta to make it vegan-friendly. Would definitely make again.",
      date: "2024-01-12",
      helpful: 18,
      verified: true,
    },
    {
      id: "r3",
      userId: "u3",
      userName: "Jennifer L.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      title: "Healthy and delicious",
      comment: "Love how fresh and light this bowl is! Perfect for summer. The lemon dressing really ties everything together. My whole family enjoyed it.",
      date: "2024-01-10",
      helpful: 15,
      verified: false,
    },
    {
      id: "r4",
      userId: "u4",
      userName: "David K.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 3,
      title: "Good but needs more flavor",
      comment: "The recipe was okay but I felt it needed more seasoning. I added some oregano and red pepper flakes which helped. The portion size was good though.",
      date: "2024-01-08",
      helpful: 7,
      verified: true,
    },
  ],
  "2": [
    {
      id: "r5",
      userId: "u5",
      userName: "Lisa R.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      title: "Restaurant quality at home",
      comment: "This salmon recipe is incredible! The fish came out perfectly flaky and the asparagus was tender. Definitely restaurant quality. My husband was so impressed.",
      date: "2024-01-14",
      helpful: 31,
      verified: true,
    },
    {
      id: "r6",
      userId: "u6",
      userName: "Tom Wilson",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      title: "Quick and healthy dinner",
      comment: "Made this for a weeknight dinner and it was perfect. Takes exactly 20 minutes as stated. The garlic really makes a difference. Will add this to my regular rotation.",
      date: "2024-01-11",
      helpful: 12,
      verified: true,
    },
    {
      id: "r7",
      userId: "u7",
      userName: "Amanda J.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      title: "Great for special occasions",
      comment: "Made this for our anniversary dinner and it was wonderful. The presentation was beautiful and the taste was amazing. A bit pricey but worth it for special occasions.",
      date: "2024-01-09",
      helpful: 19,
      verified: false,
    },
  ],
  "3": [
    {
      id: "r8",
      userId: "u8",
      userName: "Rachel P.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      title: "Budget-friendly and tasty",
      comment: "This stir fry is amazing for the price! I can make it for under $7 and it feeds my family of 4. The kids love it too. We add different vegetables each time to keep it interesting.",
      date: "2024-01-13",
      helpful: 28,
      verified: true,
    },
    {
      id: "r9",
      userId: "u9",
      userName: "Carlos M.",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      title: "Quick and satisfying",
      comment: "Perfect for busy weeknights! I keep all the ingredients on hand and can whip this up in 15 minutes. The sesame oil really adds great flavor.",
      date: "2024-01-07",
      helpful: 14,
      verified: true,
    },
    {
      id: "r10",
      userId: "u10",
      userName: "Emily Chen",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      title: "My favorite vegan meal",
      comment: "As someone who's been vegan for 5 years, this is one of my favorite recipes. It's filling, nutritious, and so flavorful. I make it at least twice a week!",
      date: "2024-01-05",
      helpful: 22,
      verified: true,
    },
  ],
}

export default function NutriMateApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dietary")
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [loadingMessages, setLoadingMessages] = useState(0)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [userProfile, setUserProfile] = useState<UserProfile>({
    dietary: [],
    allergies: "",
    goals: [],
    budget: 200,
    cookingTime: 30,
    pantry: "",
    dislikes: "",
  })

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const dietaryOptions = ["Vegan", "Vegetarian", "Gluten-Free", "Keto", "Paleo", "Dairy-Free", "Pescatarian", "Low-Carb", "Mediterranean", "Whole30", "Other"]
  const goalOptions = ["Eat Healthier", "Save Money", "Lose Weight", "Try New Foods"]

  const loadingTexts = [
    "Analyzing your dietary needs...",
    "Factoring in your budget...",
    "Cross-referencing your pantry items...",
    "Finding delicious, healthy recipes...",
    "Finalizing your plan...",
  ]

  useEffect(() => {
    if (currentScreen === "loading") {
      const interval = setInterval(() => {
        setLoadingMessages((prev) => {
          if (prev >= loadingTexts.length - 1) {
            clearInterval(interval)
            setTimeout(() => setCurrentScreen("plan"), 1000)
            return prev
          }
          return prev + 1
        })
      }, 1500)
      return () => clearInterval(interval)
    }
  }, [currentScreen, loadingTexts.length])

  const toggleSelection = (item: string, field: "dietary" | "goals") => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: prev[field].includes(item) ? prev[field].filter((i) => i !== item) : [...prev[field], item],
    }))
  }

  const toggleGroceryItem = (item: string) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(item)) {
        newSet.delete(item)
      } else {
        newSet.add(item)
      }
      return newSet
    })
  }

  const weeklyPlan = {
    Monday: { breakfast: mockRecipes[0], lunch: mockRecipes[1], dinner: mockRecipes[2] },
    Tuesday: { breakfast: mockRecipes[1], lunch: mockRecipes[2], dinner: mockRecipes[0] },
    Wednesday: { breakfast: mockRecipes[2], lunch: mockRecipes[0], dinner: mockRecipes[1] },
    Thursday: { breakfast: mockRecipes[0], lunch: mockRecipes[2], dinner: mockRecipes[1] },
    Friday: { breakfast: mockRecipes[1], lunch: mockRecipes[0], dinner: mockRecipes[2] },
    Saturday: { breakfast: mockRecipes[2], lunch: mockRecipes[1], dinner: mockRecipes[0] },
    Sunday: { breakfast: mockRecipes[0], lunch: mockRecipes[1], dinner: mockRecipes[2] },
  }

  const groceryList = [
    { category: "Produce", items: ["Cucumber", "Cherry tomatoes", "Red onion", "Asparagus", "Mixed vegetables"] },
    { category: "Protein", items: ["Salmon fillets", "Feta cheese"] },
    { category: "Pantry", items: ["Quinoa", "Vegetable broth", "Olive oil", "Sesame oil", "Soy sauce"] },
    { category: "Herbs & Spices", items: ["Garlic", "Ginger", "Lemon"] },
  ]

  const renderDietaryScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <ChefHat className="w-16 h-16 mx-auto mb-4 text-green-600" />
          <h1 className="text-3xl font-bold text-green-900 mb-2">Welcome to NutriMate!</h1>
          <p className="text-green-700">
            Let&apos;s start by personalizing your plan. Select any dietary lifestyles or restrictions.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-base font-semibold mb-3 block">Dietary Preferences</Label>
            <div className="grid grid-cols-3 gap-2">
              {dietaryOptions.map((option) => (
                <Button
                  key={option}
                  variant={userProfile.dietary.includes(option) ? "default" : "outline"}
                  className="h-10 text-xs"
                  onClick={() => toggleSelection(option, "dietary")}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="allergies" className="text-base font-semibold">
              Allergies
            </Label>
            <Input
              id="allergies"
              placeholder="e.g., Peanuts, Shellfish"
              value={userProfile.allergies}
              onChange={(e) => setUserProfile((prev) => ({ ...prev, allergies: e.target.value }))}
              className="mt-2"
            />
          </div>

          <Button onClick={() => setCurrentScreen("goals")} className="w-full h-12 text-base" size="lg">
            Next <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  const renderGoalsScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <Button variant="ghost" onClick={() => setCurrentScreen("dietary")} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-900 mb-2">What are your main goals?</h1>
        </div>

        <div className="space-y-6">
          <div>
            <div className="grid grid-cols-1 gap-3">
              {goalOptions.map((goal) => (
                <Card
                  key={goal}
                  className={`cursor-pointer transition-all ${
                    userProfile.goals.includes(goal) ? "ring-2 ring-green-500 bg-green-50" : "hover:shadow-md"
                  }`}
                  onClick={() => toggleSelection(goal, "goals")}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{goal}</span>
                      {userProfile.goals.includes(goal) && <Check className="w-5 h-5 text-green-600" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-semibold mb-4 block">What&apos;s your average budget per meal?</Label>
            <div className="px-4">
              <Slider
                value={[userProfile.budget]}
                onValueChange={(value) => setUserProfile((prev) => ({ ...prev, budget: value[0] }))}
                max={500}
                min={100}
                step={50}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-green-700">
                <span>₱100</span>
                <span className="font-semibold text-green-600">₱{userProfile.budget}</span>
                <span>₱500+</span>
              </div>
            </div>
          </div>

          <Button onClick={() => setCurrentScreen("kitchen")} className="w-full h-12 text-base" size="lg">
            Next <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  const renderKitchenScreen = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-md mx-auto pt-8">
        <Button variant="ghost" onClick={() => setCurrentScreen("goals")} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-900 mb-2">Tell us about your kitchen & tastes</h1>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-base font-semibold mb-4 block">
              How much time do you like to spend cooking dinner?
            </Label>
            <div className="px-4">
              <Slider
                value={[userProfile.cookingTime]}
                onValueChange={(value) => setUserProfile((prev) => ({ ...prev, cookingTime: value[0] }))}
                max={60}
                min={5}
                step={5}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-green-700">
                <span>5 min</span>
                <span className="font-semibold text-green-600">{userProfile.cookingTime} min</span>
                <span>60+ min</span>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="pantry" className="text-base font-semibold">
              List some ingredients you already have:
            </Label>
            <Textarea
              id="pantry"
              placeholder="e.g., Rice, Olive oil, Garlic, Onions..."
              value={userProfile.pantry}
              onChange={(e) => setUserProfile((prev) => ({ ...prev, pantry: e.target.value }))}
              className="mt-2"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="dislikes" className="text-base font-semibold">
              Any ingredients you dislike?
            </Label>
            <Input
              id="dislikes"
              placeholder="e.g., Mushrooms, Cilantro..."
              value={userProfile.dislikes}
              onChange={(e) => setUserProfile((prev) => ({ ...prev, dislikes: e.target.value }))}
              className="mt-2"
            />
          </div>

          <Button onClick={() => setCurrentScreen("dashboard")} className="w-full h-12 text-base" size="lg">
            Finish Setup & Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )

  const renderDashboard = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-md mx-auto pt-16">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <ChefHat className="w-12 h-12 text-green-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-green-900 mb-2">You&apos;re all set!</h1>
            <p className="text-green-700 text-lg">
              Your personalized profile is ready. Let&apos;s create your first weekly meal plan.
            </p>
          </div>

          <div className="pt-8">
            <Button onClick={() => setCurrentScreen("loading")} className="w-full h-14 text-lg" size="lg">
              <Wand2 className="mr-3 w-5 h-5" />
              Generate My Weekly Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderLoading = () => (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <Wand2 className="w-12 h-12 text-green-600 animate-pulse" />
          </div>
          <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-green-900 mb-4">Crafting your perfect plan...</h2>
          <p className="text-green-700 text-lg min-h-[1.5rem]">{loadingTexts[loadingMessages]}</p>
        </div>
      </div>
    </div>
  )

  const renderPlan = () => (
    <div className="min-h-screen bg-green-50">
      <div className="bg-white border-b px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-green-900">This Week: Oct 23 - 29</h1>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Regenerate
          </Button>
        </div>
      </div>

      <div className="p-4">
        <ScrollArea className="w-full">
          <div className="flex space-x-2 pb-4">
            {days.map((day) => (
              <Button
                key={day}
                variant={selectedDay === day ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDay(day)}
                className="whitespace-nowrap"
              >
                {day.slice(0, 3)}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <div className="space-y-4">
          {["breakfast", "lunch", "dinner"].map((meal) => {
            const recipe = weeklyPlan[selectedDay as keyof typeof weeklyPlan][meal as keyof typeof weeklyPlan.Monday]
            return (
              <Card key={meal} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-green-700 uppercase tracking-wide">{meal}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => {
                      setSelectedRecipe(recipe)
                      setCurrentScreen("recipe")
                    }}
                  >
                    <Image
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-900">{recipe.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-green-700 mt-1">
                        <span>{recipe.calories} cal</span>
                        <span>₱{recipe.cost.toFixed(0)}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Shuffle className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around py-2">
          <Button variant="ghost" className="flex-col h-16 text-green-700" onClick={() => setCurrentScreen("plan")}>
            <Calendar className="w-5 h-5" />
            <span className="text-xs mt-1">Plan</span>
          </Button>
          <Button variant="ghost" className="flex-col h-16 text-green-700" onClick={() => setCurrentScreen("grocery")}>
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs mt-1">Grocery</span>
          </Button>
          <Button variant="ghost" className="flex-col h-16 text-green-700" onClick={() => setCurrentScreen("profile")}>
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )

  const renderRecipe = () => {
    if (!selectedRecipe) return null

    return (
      <div className="min-h-screen bg-white">
        <div className="relative">
          <Image
            src={selectedRecipe.image || "/placeholder.svg"}
            alt={selectedRecipe.name}
            width={400}
            height={256}
            className="w-full h-64 object-cover"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm"
            onClick={() => setCurrentScreen("plan")}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm">
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-green-900 mb-2">{selectedRecipe.name}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedRecipe.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <Clock className="w-5 h-5 mx-auto mb-1 text-green-700" />
              <div className="text-sm font-medium">{selectedRecipe.prepTime} min</div>
            </div>
            <div className="text-center">
              <Users className="w-5 h-5 mx-auto mb-1 text-green-700" />
              <div className="text-sm font-medium">{selectedRecipe.servings} servings</div>
            </div>
            <div className="text-center">
              <DollarSign className="w-5 h-5 mx-auto mb-1 text-green-700" />
              <div className="text-sm font-medium">₱{selectedRecipe.cost.toFixed(0)}</div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Ingredients</h2>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add to Grocery List
              </Button>
            </div>
            <ul className="space-y-2">
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {selectedRecipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-green-700">{instruction}</p>
                </li>
              ))}
            </ol>
          </div>

          <Separator className="my-6" />

          {/* Reviews Section */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Reviews</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentScreen("reviews")}
              >
                <Star className="w-4 h-4 mr-2" />
                View All Reviews
              </Button>
            </div>
            
            {(() => {
              const reviews = mockReviews[selectedRecipe.id] || []
              const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0
              
              return (
                <div className="space-y-4">
                  {/* Rating Summary */}
                  <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= averageRating
                              ? "fill-yellow-400 text-yellow-400"
                              : star - 0.5 <= averageRating
                              ? "fill-yellow-200 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-green-800">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-sm text-green-600">
                      ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                    </span>
                  </div>

                  {/* Latest Reviews Preview */}
                  {reviews.slice(0, 2).map((review) => (
                    <div key={review.id} className="p-4 border border-green-100 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-green-900">{review.userName}</h4>
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-3 h-3 ${
                                    star <= review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "fill-gray-200 text-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-green-700 line-clamp-2">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })()}
          </div>
        </div>
      </div>
    )
  }

  const renderGrocery = () => (
    <div className="min-h-screen bg-green-50">
      <div className="bg-white border-b px-4 py-4">
        <h1 className="text-xl font-bold text-green-900">Grocery List</h1>
        <p className="text-sm text-green-700">For this week&apos;s meal plan</p>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {groceryList.map((category) => (
          <Card key={category.category}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-900">{category.category}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {category.items.map((item) => {
                  const isChecked = checkedItems.has(item)
                  return (
                    <div
                      key={item}
                      className="flex items-center space-x-3 cursor-pointer hover:bg-green-50 p-2 rounded-lg transition-colors"
                      onClick={() => toggleGroceryItem(item)}
                    >
                      <div
                        className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                          isChecked
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300 hover:border-green-400"
                        }`}
                      >
                        <Check
                          className={`w-3 h-3 text-white transition-opacity ${
                            isChecked ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </div>
                      <span
                        className={`flex-1 transition-all ${
                          isChecked
                            ? "text-green-600 line-through opacity-60"
                            : "text-green-900"
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around py-2">
          <Button variant="ghost" className="flex-col h-16 text-green-700" onClick={() => setCurrentScreen("plan")}>
            <Calendar className="w-5 h-5" />
            <span className="text-xs mt-1">Plan</span>
          </Button>
          <Button variant="ghost" className="flex-col h-16 text-green-700" onClick={() => setCurrentScreen("grocery")}>
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs mt-1">Grocery</span>
          </Button>
          <Button variant="ghost" className="flex-col h-16 text-green-700" onClick={() => setCurrentScreen("profile")}>
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )

  const renderProfile = () => (
    <div className="min-h-screen bg-green-50">
      <div className="bg-white border-b px-4 py-4">
        <h1 className="text-xl font-bold text-green-900">Profile</h1>
      </div>

      <div className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-green-900">Welcome back!</h2>
                <p className="text-green-700">Your personalized meal planner</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-900">Your Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-green-800 font-medium">Dietary Restrictions</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {userProfile.dietary.length > 0 ? (
                  userProfile.dietary.map((diet) => (
                    <Badge key={diet} className="bg-green-100 text-green-800 border-green-200">
                      {diet}
                    </Badge>
                  ))
                ) : (
                  <span className="text-green-600 text-sm">None selected</span>
                )}
              </div>
            </div>

            <div>
              <Label className="text-green-800 font-medium">Goals</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {userProfile.goals.length > 0 ? (
                  userProfile.goals.map((goal) => (
                    <Badge key={goal} className="bg-green-100 text-green-800 border-green-200">
                      {goal}
                    </Badge>
                  ))
                ) : (
                  <span className="text-green-600 text-sm">None selected</span>
                )}
              </div>
            </div>

            <div>
              <Label className="text-green-800 font-medium">Budget per meal</Label>
              <p className="text-green-700 mt-1">₱{userProfile.budget}</p>
            </div>

            <div>
              <Label className="text-green-800 font-medium">Cooking time preference</Label>
              <p className="text-green-700 mt-1">{userProfile.cookingTime} minutes</p>
            </div>

            {userProfile.allergies && (
              <div>
                <Label className="text-green-800 font-medium">Allergies</Label>
                <p className="text-green-700 mt-1">{userProfile.allergies}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-green-900">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start border-green-200 text-green-800 hover:bg-green-50 bg-transparent"
            >
              <User className="w-4 h-4 mr-3" />
              Edit Profile
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-green-200 text-green-800 hover:bg-green-50 bg-transparent"
            >
              <ChefHat className="w-4 h-4 mr-3" />
              Dietary Preferences
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-green-200 text-green-800 hover:bg-green-50 bg-transparent"
            >
              <DollarSign className="w-4 h-4 mr-3" />
              Budget Settings
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-green-200 text-green-800 hover:bg-green-50 bg-transparent"
            >
              <ShoppingCart className="w-4 h-4 mr-3" />
              Grocery Preferences
            </Button>
          </CardContent>
        </Card>

        <div className="pb-20">
          <Button
            variant="outline"
            className="w-full border-green-200 text-green-800 hover:bg-green-50 bg-transparent"
            onClick={() => setCurrentScreen("dietary")}
          >
            Reset Onboarding
          </Button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around py-2">
          <Button variant="ghost" className="flex-col h-16 text-green-700" onClick={() => setCurrentScreen("plan")}>
            <Calendar className="w-5 h-5" />
            <span className="text-xs mt-1">Plan</span>
          </Button>
          <Button variant="ghost" className="flex-col h-16 text-green-700" onClick={() => setCurrentScreen("grocery")}>
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs mt-1">Grocery</span>
          </Button>
          <Button
            variant="ghost"
            className="flex-col h-16 text-green-600 bg-green-50"
            onClick={() => setCurrentScreen("profile")}
          >
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )

  const renderReviews = () => {
    if (!selectedRecipe) return null

    const reviews = mockReviews[selectedRecipe.id] || []
    const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

    const renderStars = (rating: number, size: "sm" | "lg" = "sm") => {
      const starSize = size === "lg" ? "w-5 h-5" : "w-4 h-4"
      return (
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`${starSize} ${
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : star - 0.5 <= rating
                  ? "fill-yellow-200 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen("recipe")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Recipe
            </Button>
          </div>
        </div>

        {/* Recipe Summary */}
        <div className="p-4 border-b bg-green-50">
          <div className="flex items-center space-x-3">
            <Image
              src={selectedRecipe.image || "/placeholder.svg"}
              alt={selectedRecipe.name}
              width={60}
              height={60}
              className="w-15 h-15 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-lg font-bold text-green-900">{selectedRecipe.name}</h1>
              <div className="flex items-center space-x-2 mt-1">
                {renderStars(averageRating, "lg")}
                <span className="text-lg font-semibold text-green-800">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-sm text-green-600">
                  ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="p-4">
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id} className="border border-green-100">
                <CardContent className="p-4">
                  {/* Review Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-green-900">{review.userName}</h3>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-xs text-green-600">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mb-3">
                    <h4 className="font-medium text-green-900 mb-2">{review.title}</h4>
                    <p className="text-green-700 text-sm leading-relaxed">{review.comment}</p>
                  </div>

                  {/* Review Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-green-100">
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                      <Heart className="w-4 h-4 mr-2" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700 hover:bg-green-50">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add Review Button */}
          <div className="mt-8 mb-20">
            <Button className="w-full h-12" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Write a Review
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const screens = {
    dietary: renderDietaryScreen,
    goals: renderGoalsScreen,
    kitchen: renderKitchenScreen,
    dashboard: renderDashboard,
    loading: renderLoading,
    plan: renderPlan,
    recipe: renderRecipe,
    grocery: renderGrocery,
    profile: renderProfile,
    reviews: renderReviews,
  }

  return <div className="max-w-md mx-auto bg-white min-h-screen">{screens[currentScreen]()}</div>
}
