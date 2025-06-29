"use client"

import { useState, useEffect } from "react"
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
} from "lucide-react"

type Screen = "dietary" | "goals" | "kitchen" | "dashboard" | "loading" | "plan" | "recipe" | "grocery" | "profile"

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

const mockRecipes: Recipe[] = [
  {
    id: "1",
    name: "Mediterranean Quinoa Bowl",
    image: "/placeholder.svg?height=200&width=300",
    calories: 420,
    cost: 8.5,
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
    image: "/placeholder.svg?height=200&width=300",
    calories: 380,
    cost: 12.0,
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
    image: "/placeholder.svg?height=200&width=300",
    calories: 320,
    cost: 6.75,
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

export default function NutriMateApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dietary")
  const [selectedDay, setSelectedDay] = useState("Monday")
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [loadingMessages, setLoadingMessages] = useState(0)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    dietary: [],
    allergies: "",
    goals: [],
    budget: 10,
    cookingTime: 30,
    pantry: "",
    dislikes: "",
  })

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const dietaryOptions = ["Vegan", "Vegetarian", "Gluten-Free", "Keto", "Paleo", "Dairy-Free"]
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
  }, [currentScreen])

  const toggleSelection = (item: string, field: "dietary" | "goals") => {
    setUserProfile((prev) => ({
      ...prev,
      [field]: prev[field].includes(item) ? prev[field].filter((i) => i !== item) : [...prev[field], item],
    }))
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
            Let's start by personalizing your plan. Select any dietary lifestyles or restrictions.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <Label className="text-base font-semibold mb-3 block">Dietary Preferences</Label>
            <div className="grid grid-cols-2 gap-3">
              {dietaryOptions.map((option) => (
                <Button
                  key={option}
                  variant={userProfile.dietary.includes(option) ? "default" : "outline"}
                  className="h-12 text-sm"
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
            <Label className="text-base font-semibold mb-4 block">What's your average budget per meal?</Label>
            <div className="px-4">
              <Slider
                value={[userProfile.budget]}
                onValueChange={(value) => setUserProfile((prev) => ({ ...prev, budget: value[0] }))}
                max={25}
                min={5}
                step={2.5}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-green-700">
                <span>$5</span>
                <span className="font-semibold text-green-600">${userProfile.budget}</span>
                <span>$25+</span>
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
                min={15}
                step={5}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-green-700">
                <span>15 min</span>
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
            <h1 className="text-3xl font-bold text-green-900 mb-2">You're all set!</h1>
            <p className="text-green-700 text-lg">
              Your personalized profile is ready. Let's create your first weekly meal plan.
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
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-900">{recipe.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-green-700 mt-1">
                        <span>{recipe.calories} cal</span>
                        <span>${recipe.cost.toFixed(2)}</span>
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
          <img
            src={selectedRecipe.image || "/placeholder.svg"}
            alt={selectedRecipe.name}
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
              <div className="text-sm font-medium">${selectedRecipe.cost.toFixed(2)}</div>
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

          <div className="mb-20">
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
        </div>
      </div>
    )
  }

  const renderGrocery = () => (
    <div className="min-h-screen bg-green-50">
      <div className="bg-white border-b px-4 py-4">
        <h1 className="text-xl font-bold text-green-900">Grocery List</h1>
        <p className="text-sm text-green-700">For this week's meal plan</p>
      </div>

      <div className="p-4 space-y-6">
        {groceryList.map((category) => (
          <Card key={category.category}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-green-900">{category.category}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {category.items.map((item) => (
                  <div key={item} className="flex items-center space-x-3">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600 opacity-0" />
                    </div>
                    <span className="flex-1">{item}</span>
                  </div>
                ))}
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
              <p className="text-green-700 mt-1">${userProfile.budget}</p>
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
  }

  return <div className="max-w-md mx-auto bg-white min-h-screen">{screens[currentScreen]()}</div>
}
