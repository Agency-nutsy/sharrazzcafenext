"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Wine, UtensilsCrossed, Coffee as CoffeeIcon } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";

// ── MASSIVE EXTRACTED MENU DATA ────────────────
type MenuItem = {
  name: string;
  price?: string;
  description?: string;
};

type MenuCategory = {
  name: string;
  items: MenuItem[];
};

type MenuSection = {
  tab: string;
  icon?: any; // Added this in case you are using icons in the menu
  categories: MenuCategory[];
};
const menuData: MenuSection[] = [
  {
    "tab": "Soups & Salads",
    "categories": [
      {
        "name": "Soup (Veg)",
        "items": [
          {
            "name": "Tomato Soup",
            "price": "₹149"
          },
          {
            "name": "Creamy Mushroom",
            "price": "₹149"
          },
          {
            "name": "Hot N Sour",
            "price": "₹149"
          },
          {
            "name": "Manchow Soup",
            "price": "₹149"
          }
        ]
      },
      {
        "name": "Soup (Non-Veg)",
        "items": [
          {
            "name": "Hot N Sour",
            "price": "₹179"
          },
          {
            "name": "Chicken Soup",
            "price": "₹189"
          }
        ]
      },
      {
        "name": "Salad (Veg)",
        "items": [
          {
            "name": "Greek Salad",
            "price": "₹150"
          },
          {
            "name": "Paneer Tikka Salad",
            "price": "₹229"
          },
          {
            "name": "Nachos Salad",
            "price": "₹209"
          },
          {
            "name": "Corn Salad",
            "price": "₹209"
          },
          {
            "name": "Caesar Salad",
            "price": "₹209"
          },
          {
            "name": "Peanut Masala",
            "price": "₹249"
          },
          {
            "name": "Paneer Tikka Salad",
            "price": "₹249"
          }
        ]
      },
      {
        "name": "Salad (Non-Veg)",
        "items": [
          {
            "name": "Green Chicken Salad",
            "price": "₹210"
          },
          {
            "name": "Nachos Salad",
            "price": "₹220"
          }
        ]
      },
      {
        "name": "Healthy",
        "items": [
          {
            "name": "Cottage Cheese Steak With Rice",
            "price": "₹349"
          },
          {
            "name": "Grilled Chicken Steak With Sauté Veggie-Demi Glaze Peri Peri Mushroom",
            "price": "₹449"
          },
          {
            "name": "Grilled Chicken With Rice And Vegetables",
            "price": "₹449"
          }
        ]
      }
    ]
  },
  {
    "tab": "Bites & Snacks",
    "categories": [
      {
        "name": "Sandwich",
        "items": [
          {
            "name": "Veg Club Sandwich",
            "price": "₹249"
          },
          {
            "name": "Cheese Sandwich",
            "price": "₹299"
          },
          {
            "name": "Paneer Grill Sandwich",
            "price": "₹299"
          },
          {
            "name": "American Sandwich",
            "price": "₹299"
          },
          {
            "name": "American Sandwich",
            "price": "₹329"
          },
          {
            "name": "Cheese Sandwich",
            "price": "₹329"
          },
          {
            "name": "Salted Chicken Sandwich",
            "price": "₹329"
          }
        ]
      },
      {
        "name": "Burger",
        "items": [
          {
            "name": "Veg Burger",
            "price": "₹169"
          },
          {
            "name": "Veg Cheese Burger",
            "price": "₹199"
          },
          {
            "name": "Paneer Tikka Burger",
            "price": "₹219"
          },
          {
            "name": "Non Veg Burger",
            "price": "₹229"
          },
          {
            "name": "Non Veg Cheese Burger",
            "price": "₹259"
          },
          {
            "name": "Fish Burger",
            "price": "₹259"
          },
          {
            "name": "Chicken Tikka Burger",
            "price": "₹239"
          }
        ]
      },
      {
        "name": "Maggi",
        "items": [
          {
            "name": "Maggi",
            "price": "₹99"
          },
          {
            "name": "Vegetable Maggi",
            "price": "₹169"
          },
          {
            "name": "Chicken Maggi",
            "price": "₹219"
          }
        ]
      },
      {
        "name": "Roll",
        "items": [
          {
            "name": "Soya Tikka Roll",
            "price": "₹249"
          },
          {
            "name": "Chaap Roll",
            "price": "₹229"
          },
          {
            "name": "Panner Tikka Roll",
            "price": "₹249"
          },
          {
            "name": "Arizona Veg Roll",
            "price": "₹249"
          },
          {
            "name": "Arizona Chaap Roll",
            "price": "₹249"
          },
          {
            "name": "Peri Peri Chaap Roll",
            "price": "₹249"
          },
          {
            "name": "Chicken Tikka",
            "price": "₹269"
          },
          {
            "name": "Butter Chicken",
            "price": "₹269"
          },
          {
            "name": "Seekh Roll",
            "price": "₹249"
          },
          {
            "name": "Peri Peri Chicken Roll",
            "price": "₹289"
          },
          {
            "name": "Egg Roll",
            "price": "₹249"
          },
          {
            "name": "Chicken Egg Roll",
            "price": "₹289"
          }
        ]
      },
      {
        "name": "Momos",
        "items": [
          {
            "name": "Veg Momos",
            "price": "₹229"
          },
          {
            "name": "Paneer Momos",
            "price": "₹299"
          },
          {
            "name": "Chilli Momos",
            "price": "₹329"
          },
          {
            "name": "Tandoori Momos",
            "price": "₹329"
          },
          {
            "name": "Malai Momos",
            "price": "₹339"
          },
          {
            "name": "Achari Momos",
            "price": "₹339"
          },
          {
            "name": "Kurkure Momos",
            "price": "₹329"
          },
          {
            "name": "Veg Fry",
            "price": "₹249"
          },
          {
            "name": "Chicken Momos",
            "price": "₹299"
          },
          {
            "name": "Chicken Peri Peri",
            "price": "₹299"
          },
          {
            "name": "Tandoori Momos",
            "price": "₹349"
          },
          {
            "name": "Malai Momos",
            "price": "₹359"
          },
          {
            "name": "Achari Momos",
            "price": "₹359"
          },
          {
            "name": "Kurkure Momos",
            "price": "₹349"
          },
          {
            "name": "Fry Chicken",
            "price": "₹349"
          }
        ]
      },
      {
        "name": "Mexican",
        "items": [
          {
            "name": "Addictive Nachos",
            "price": "₹239"
          },
          {
            "name": "Baked Nachos",
            "price": "₹279"
          },
          {
            "name": "Addictive Garlic Bread",
            "price": "₹149"
          },
          {
            "name": "Bruschetta",
            "price": "₹349"
          },
          {
            "name": "Cheese Garlic Bread",
            "price": "₹249"
          },
          {
            "name": "Baked Nachos",
            "price": "₹324"
          },
          {
            "name": "Bruschetta",
            "price": "₹449"
          }
        ]
      }
    ]
  },
  {
    "tab": "Starters",
    "categories": [
      {
        "name": "Chinese Veg Starters",
        "items": [
          {
            "name": "French Fries",
            "price": "₹239"
          },
          {
            "name": "Peri Peri Fries",
            "price": "₹269"
          },
          {
            "name": "Dip French Fries",
            "price": "₹299"
          },
          {
            "name": "Cheesy Fries",
            "price": "₹279"
          },
          {
            "name": "Chilli Potato",
            "price": "₹279"
          },
          {
            "name": "Honeychilli Potato",
            "price": "₹299"
          },
          {
            "name": "Veg Manchurian",
            "price": "₹299"
          },
          {
            "name": "Chilli Paneer",
            "price": "₹299"
          },
          {
            "name": "Spring Roll",
            "price": "₹269"
          },
          {
            "name": "Chilli Mushroom",
            "price": "₹269"
          },
          {
            "name": "Cheese Ball",
            "price": "₹339"
          },
          {
            "name": "Cigar Roll",
            "price": "₹299"
          },
          {
            "name": "Chilli Salt & Pepper",
            "price": "₹299"
          },
          {
            "name": "Chilli Soya Chaap",
            "price": "₹279"
          },
          {
            "name": "Crispy Corn",
            "price": "₹279"
          },
          {
            "name": "Paneer Finger",
            "price": "₹339"
          },
          {
            "name": "Potato Wedges"
          }
        ]
      },
      {
        "name": "Chinese Non-Veg Starters",
        "items": [
          {
            "name": "Chilli Chicken",
            "price": "₹339"
          },
          {
            "name": "Lemon Chicken",
            "price": "₹349"
          },
          {
            "name": "Chicken Finger",
            "price": "₹339"
          },
          {
            "name": "Chicken Sticks",
            "price": "₹339"
          },
          {
            "name": "Drums Of Heaven",
            "price": "₹339"
          },
          {
            "name": "Crispy Honey Chicken",
            "price": "₹359"
          },
          {
            "name": "Hot Garlic Chicken",
            "price": "₹359"
          },
          {
            "name": "White Sauce Chicken",
            "price": "₹359"
          },
          {
            "name": "Chicken Orley",
            "price": "₹359"
          },
          {
            "name": "Chicken Popcorn",
            "price": "₹359"
          },
          {
            "name": "Chicken 65",
            "price": "₹359"
          },
          {
            "name": "Golden Fired Chicken",
            "price": "₹359"
          },
          {
            "name": "White Chicken Lollipop",
            "price": "₹359"
          },
          {
            "name": "Chicken Lollipop",
            "price": "₹339"
          },
          {
            "name": "Chicken Hongkong",
            "price": "₹389"
          },
          {
            "name": "Cigar Roll",
            "price": "₹349"
          },
          {
            "name": "Chicken Spring Roll",
            "price": "₹339"
          }
        ]
      },
      {
        "name": "Tandoori Veg Items",
        "items": [
          {
            "name": "Hara Bhara Kabab",
            "price": "₹389"
          },
          {
            "name": "Mushroom Tikka",
            "price": "₹359"
          },
          {
            "name": "Paneer Tikka",
            "price": "₹359"
          },
          {
            "name": "Paneer Malai Tikka",
            "price": "₹379"
          },
          {
            "name": "Tandoori Chaap",
            "price": "₹329"
          },
          {
            "name": "Soya Malai Chaap",
            "price": "₹349"
          },
          {
            "name": "Dahi Ke Sholy",
            "price": "₹349"
          },
          {
            "name": "Tandoori Broccoli",
            "price": "₹349"
          },
          {
            "name": "Broccoli Cheese Kabab",
            "price": "₹449"
          },
          {
            "name": "Seekh Kabab",
            "price": "₹349"
          },
          {
            "name": "Tandoori Aloo",
            "price": "₹349"
          },
          {
            "name": "Achari Panner Tikka",
            "price": "₹379"
          },
          {
            "name": "Peri Peri Soya Chaap",
            "price": "₹349"
          },
          {
            "name": "Veg Platter",
            "price": "₹449"
          }
        ]
      },
      {
        "name": "Tandoori Non-Veg Items",
        "items": [
          {
            "name": "Chicken Tikka",
            "price": "₹349"
          },
          {
            "name": "Chicken Malai Tikka",
            "price": "₹370"
          },
          {
            "name": "Tandoori Chicken",
            "price": "₹349"
          },
          {
            "name": "Afghani Chicken",
            "price": "₹349"
          },
          {
            "name": "Seekh Kabab",
            "price": "₹410"
          },
          {
            "name": "Peri Peri Chicken",
            "price": "₹430"
          },
          {
            "name": "Chicken Achari",
            "price": "₹360"
          },
          {
            "name": "Chicken Wings",
            "price": "₹349"
          },
          {
            "name": "Galouti Kabab",
            "price": "₹389"
          },
          {
            "name": "Bhatti Murg",
            "price": "₹439"
          },
          {
            "name": "Lasooni Dhaniya Murg Tikka",
            "price": "₹439"
          },
          {
            "name": "Spl Reshmi Murg Tikka",
            "price": "₹449"
          },
          {
            "name": "Whole Chicken",
            "price": "₹1300"
          },
          {
            "name": "Tangri Kabab",
            "price": "₹429"
          },
          {
            "name": "Reshmi Kabab",
            "price": "₹429"
          },
          {
            "name": "Non Veg Platter",
            "price": "₹699"
          },
          {
            "name": "Khasta Chicken",
            "price": "₹900"
          }
        ]
      },
      {
        "name": "Continental",
        "items": [
          {
            "name": "Falafel",
            "price": "₹399"
          },
          {
            "name": "Hummus & Pita",
            "price": "₹499"
          },
          {
            "name": "Mozzarella Stick",
            "price": "₹349"
          },
          {
            "name": "Mushroom Duplex",
            "price": "₹349"
          },
          {
            "name": "Tacos",
            "price": "₹239"
          },
          {
            "name": "Mezze Platter",
            "price": "₹449"
          },
          {
            "name": "Mezze Platter",
            "price": "₹649"
          },
          {
            "name": "Tacos",
            "price": "₹339"
          },
          {
            "name": "Chicken Drum Stick",
            "price": "₹339"
          }
        ]
      }
    ]
  },
  {
    "tab": "Pizza & Pasta",
    "categories": [
      {
        "name": "Pizza (Veg)",
        "items": [
          {
            "name": "Margherita Pizza (Mozzarella & Tomato)",
            "price": "₹269"
          },
          {
            "name": "Double Cheese Margherita",
            "price": "₹329"
          },
          {
            "name": "Chilli Cottage Cheese",
            "price": "₹339"
          },
          {
            "name": "Farm House",
            "price": "₹359"
          },
          {
            "name": "Mexican Pizza (Jalapeno, Black Olive, Sweet Corn, Bell Pepper)",
            "price": "₹359"
          },
          {
            "name": "Peri Peri Pizza",
            "price": "₹359"
          },
          {
            "name": "Golden Delight Pizza",
            "price": "₹359"
          }
        ]
      },
      {
        "name": "Pizza (Non-Veg)",
        "items": [
          {
            "name": "Peri Peri Pizza",
            "price": "₹389"
          },
          {
            "name": "Golden Delight Pizza",
            "price": "₹389"
          },
          {
            "name": "Chicken Tikka Pizza",
            "price": "₹389"
          },
          {
            "name": "Butter Chicken Pizza",
            "price": "₹389"
          },
          {
            "name": "BBQ Chicken Pizza",
            "price": "₹389"
          },
          {
            "name": "Pizza-E-Kabab",
            "price": "₹399"
          }
        ]
      },
      {
        "name": "Pasta",
        "items": [
          {
            "name": "Alfredo Pasta",
            "price": "₹299"
          },
          {
            "name": "Arrabiata Pasta",
            "price": "₹299"
          },
          {
            "name": "Mix Sauce Pasta",
            "price": "₹329"
          },
          {
            "name": "Four Cheese Pasta",
            "price": "₹321"
          },
          {
            "name": "Spaghetti Pasta",
            "price": "₹349"
          },
          {
            "name": "Lasagna Pasta",
            "price": "₹349"
          },
          {
            "name": "Alfredo Pasta",
            "price": "₹329"
          },
          {
            "name": "Arrabiata Pasta",
            "price": "₹329"
          },
          {
            "name": "Mix Sauce Pasta",
            "price": "₹349"
          },
          {
            "name": "Four Cheese Pasta",
            "price": "₹349"
          },
          {
            "name": "Lasagna Pasta",
            "price": "₹379"
          },
          {
            "name": "Spaghetti Pasta",
            "price": "₹379"
          }
        ]
      }
    ]
  },
  {
    "tab": "Indian Mains",
    "categories": [
      {
        "name": "Veg Mains",
        "items": [
          {
            "name": "Dal Makhani",
            "price": "₹289"
          },
          {
            "name": "Shahi Paneer",
            "price": "₹289"
          },
          {
            "name": "Kadai Panner",
            "price": "₹289"
          },
          {
            "name": "Panner Butter Masala",
            "price": "₹299"
          },
          {
            "name": "Soya Chaap Masala",
            "price": "₹279"
          },
          {
            "name": "Mix Vegetables",
            "price": "₹259"
          },
          {
            "name": "Dal Tadka",
            "price": "₹259"
          },
          {
            "name": "Dal Fry",
            "price": "₹239"
          }
        ]
      },
      {
        "name": "Non-Veg Mains",
        "items": [
          {
            "name": "Butter Chicken",
            "price": "₹399"
          },
          {
            "name": "Kadhai Chicken",
            "price": "₹399"
          },
          {
            "name": "Butter Chicken Boneless",
            "price": "₹439"
          },
          {
            "name": "Kadhai Chicken Boneless",
            "price": "₹439"
          },
          {
            "name": "Matka Chicken",
            "price": "₹439"
          },
          {
            "name": "Chicken Do Pyaza",
            "price": "₹439"
          },
          {
            "name": "Chicken Curry",
            "price": "₹379"
          },
          {
            "name": "Keema Rara",
            "price": "₹439"
          }
        ]
      },
      {
        "name": "Breads",
        "items": [
          {
            "name": "Tandoori Roti",
            "price": "₹30"
          },
          {
            "name": "Tandoori Butter Roti",
            "price": "₹40"
          },
          {
            "name": "Lacha Parantha",
            "price": "₹50"
          },
          {
            "name": "Pudina Parantha",
            "price": "₹55"
          },
          {
            "name": "Mirchi Parantha",
            "price": "₹60"
          },
          {
            "name": "Cream Parantha",
            "price": "₹65"
          },
          {
            "name": "Plain Naan",
            "price": "₹60"
          },
          {
            "name": "Butter Naan",
            "price": "₹70"
          },
          {
            "name": "Garlic Naan",
            "price": "₹75"
          },
          {
            "name": "Papad",
            "price": "₹15"
          },
          {
            "name": "Masala Papad",
            "price": "₹25"
          },
          {
            "name": "Stuffed Naan",
            "price": "₹85"
          }
        ]
      }
    ]
  },
  {
    "tab": "Rice & Noodles",
    "categories": [
      {
        "name": "Rice and Noodles (Veg)",
        "items": [
          {
            "name": "Fried Rice",
            "price": "₹199"
          },
          {
            "name": "Paneer Fried Rice",
            "price": "₹229"
          },
          {
            "name": "Singapore Rice",
            "price": "₹229"
          },
          {
            "name": "Chilli Garlic Rice",
            "price": "₹229"
          },
          {
            "name": "Noodles",
            "price": "₹229"
          },
          {
            "name": "Paneer Noodles",
            "price": "₹269"
          },
          {
            "name": "Hakka Noodles",
            "price": "₹269"
          },
          {
            "name": "Singapore Noodles",
            "price": "₹269"
          },
          {
            "name": "Chilli Garlic Noodles",
            "price": "₹269"
          }
        ]
      },
      {
        "name": "Rice and Noodles (Non-Veg)",
        "items": [
          {
            "name": "Fried Rice",
            "price": "₹229"
          },
          {
            "name": "Singapore Rice",
            "price": "₹269"
          },
          {
            "name": "Chilli Garlic Rice",
            "price": "₹269"
          },
          {
            "name": "Noodles",
            "price": "₹269"
          },
          {
            "name": "Hakka Noodles",
            "price": "₹299"
          },
          {
            "name": "Singapore Noodles",
            "price": "₹299"
          },
          {
            "name": "Chilli Garlic Noodles",
            "price": "₹299"
          }
        ]
      },
      {
        "name": "Biryani & Raita",
        "items": [
          {
            "name": "Veg Biryani",
            "price": "₹279"
          },
          {
            "name": "Non Veg Biryani",
            "price": "₹299"
          },
          {
            "name": "Plain Rice",
            "price": "₹159"
          },
          {
            "name": "Jeera Rice",
            "price": "₹179"
          },
          {
            "name": "Plain Raita",
            "price": "₹60"
          },
          {
            "name": "Boondi Raita",
            "price": "₹80"
          },
          {
            "name": "Mix Raita",
            "price": "₹80"
          },
          {
            "name": "Pineapple Raita",
            "price": "₹90"
          }
        ]
      },
      {
        "name": "Chinese Main Course",
        "items": [
          {
            "name": "Chilli Paneer Gravy",
            "price": "₹359"
          },
          {
            "name": "Manchurian Gravy",
            "price": "₹329"
          },
          {
            "name": "Chilli Mushroom Gravy",
            "price": "₹329"
          },
          {
            "name": "Chilli Chicken Gravy",
            "price": "₹389"
          },
          {
            "name": "Manchurian Gravy",
            "price": "₹389"
          },
          {
            "name": "Lemon Chicken Gravy",
            "price": "₹389"
          }
        ]
      }
    ]
  },
  {
    "tab": "Beverages & Desserts",
    "categories": [
      {
        "name": "Mocktails",
        "items": [
          {
            "name": "Fresh Lime Soda",
            "price": "₹179"
          },
          {
            "name": "Virgin Mojito",
            "price": "₹239"
          },
          {
            "name": "Green Apple Mojito",
            "price": "₹239"
          },
          {
            "name": "Peach Mojito",
            "price": "₹239"
          },
          {
            "name": "Cranberry Mojito",
            "price": "₹239"
          },
          {
            "name": "Watermelon Ice Mojito Mocktail",
            "price": "₹239"
          },
          {
            "name": "Sharrazz Mojito",
            "price": "₹239"
          },
          {
            "name": "Ice Cream Soda",
            "price": "₹239"
          },
          {
            "name": "Green Apple Ice Cream Soda",
            "price": "₹239"
          },
          {
            "name": "Kiwi Ice Cream Soda",
            "price": "₹239"
          },
          {
            "name": "Water Melon Ice Cream Soda",
            "price": "₹239"
          },
          {
            "name": "Blue Lagoon",
            "price": "₹249"
          },
          {
            "name": "Kuch Bhi",
            "price": "₹239"
          },
          {
            "name": "Cola Mojito",
            "price": "₹239"
          },
          {
            "name": "Passion Fruit",
            "price": "₹239"
          }
        ]
      },
      {
        "name": "Shakes & Smoothies",
        "items": [
          {
            "name": "Chocolate Brownie",
            "price": "₹259"
          },
          {
            "name": "Oreo Shake",
            "price": "₹239"
          },
          {
            "name": "Kitkat Shake",
            "price": "₹239"
          },
          {
            "name": "Blueberry Shake",
            "price": "₹239"
          },
          {
            "name": "Butter Scotch Shake",
            "price": "₹239"
          },
          {
            "name": "Oreo Chocolate Shake (Vanila)",
            "price": "₹239"
          },
          {
            "name": "Oreo Chocolate Shake (Strawberry)",
            "price": "₹239"
          },
          {
            "name": "Black Current Shake",
            "price": "₹239"
          },
          {
            "name": "Nutella Brownie Shake",
            "price": "₹299"
          },
          {
            "name": "Cold Coffee",
            "price": "₹199"
          },
          {
            "name": "Mocha",
            "price": "₹199"
          },
          {
            "name": "Fruit Punch",
            "price": "₹249"
          },
          {
            "name": "Mango",
            "price": "₹189"
          },
          {
            "name": "Strawberry",
            "price": "₹189"
          },
          {
            "name": "Banana",
            "price": "₹189"
          },
          {
            "name": "Kiwi",
            "price": "₹189"
          }
        ]
      },
      {
        "name": "Pitchers",
        "items": [
          {
            "name": "Coke / Sprite / Fanta",
            "price": "₹399"
          },
          {
            "name": "Virgin Mojito Pitcher",
            "price": "₹499"
          },
          {
            "name": "Water Melon Mojito Pitcher",
            "price": "₹499"
          },
          {
            "name": "Green Apple Mojito Pitcher",
            "price": "₹499"
          },
          {
            "name": "Ice Tea Pitcher",
            "price": "₹499"
          }
        ]
      },
      {
        "name": "Tea and Coffee",
        "items": [
          {
            "name": "Tea",
            "price": "₹59"
          },
          {
            "name": "Black Tea",
            "price": "₹99"
          },
          {
            "name": "Lemon Tea",
            "price": "₹99"
          },
          {
            "name": "Masala Tea",
            "price": "₹79"
          },
          {
            "name": "Green Tea",
            "price": "₹100"
          },
          {
            "name": "Black Hot Coffee",
            "price": "₹150"
          },
          {
            "name": "Coffee",
            "price": "₹99"
          },
          {
            "name": "Cappuccino",
            "price": "₹149"
          },
          {
            "name": "Irish Coffee",
            "price": "₹179"
          },
          {
            "name": "Hazel Nut Cappuccino",
            "price": "₹199"
          },
          {
            "name": "Ice Tea",
            "price": "₹199"
          }
        ]
      },
      {
        "name": "Coolers & Juices",
        "items": [
          {
            "name": "Coke / Sprite / Fanta",
            "price": "₹119"
          },
          {
            "name": "Redbull",
            "price": "₹249"
          },
          {
            "name": "Soda Flavour",
            "price": "₹99"
          },
          {
            "name": "Mineral Water",
            "price": "₹49"
          },
          {
            "name": "Ice Tea",
            "price": "₹159"
          },
          {
            "name": "Orange",
            "price": "₹169"
          },
          {
            "name": "Mix Juice",
            "price": "₹169"
          },
          {
            "name": "Cranberry",
            "price": "₹169"
          },
          {
            "name": "Pineapple",
            "price": "₹169"
          },
          {
            "name": "Mango",
            "price": "₹169"
          }
        ]
      },
      {
        "name": "Desserts",
        "items": [
          {
            "name": "Ice Cream N Hot Chocolate",
            "price": "₹240"
          },
          {
            "name": "Brownie With Ice Cream",
            "price": "₹229"
          }
        ]
      }
    ]
  }
];

// ── CUSTOM HOOK: DETECT MOBILE ────────────────
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

// Utility to create safe IDs for navigation
const makeSectionId = (name: string) =>
  `section-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

const Menu = () => {
  const [activeTab, setActiveTab] = useState(menuData[0].tab);
  const isMobile = useIsMobile();
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Smooth scroll to a specific section when a top tab is clicked
  const scrollToSection = (tabName: string) => {
    const sectionEl = document.getElementById(makeSectionId(tabName));
    if (!sectionEl) return;

    // Account for sticky header height
    const yOffset = isMobile ? 120 : 150; 
    const y = sectionEl.getBoundingClientRect().top + window.scrollY - yOffset;
    
    window.scrollTo({ top: y, behavior: "smooth" });
    setActiveTab(tabName);
  };

  // Scrollspy: Automatically update the active tab and scroll the nav container
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentTab = entry.target.getAttribute("data-section-tab");
            if (currentTab) {
              setActiveTab(currentTab);
              
              // Automatically scroll the top horizontal nav to show the active pill
              const activeBtn = navContainerRef.current?.querySelector(`button[data-tab-name="${currentTab}"]`);
              if (activeBtn && navContainerRef.current) {
                activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
              }
            }
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" } // Triggers when the section hits the upper 20% of screen
    );

    menuData.forEach((section) => {
      const el = document.getElementById(makeSectionId(section.tab));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="pt-32 pb-24 relative aura-bg text-foreground min-h-screen">
      
      {/* SHARRAZZ AURA ANIMATION CSS */}
      <style>{`
        @keyframes auraBreath {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 50% 100%; }
        }
        .aura-bg {
          background-color: transparent;
          background-image: 
            radial-gradient(circle at 15% 50%, rgba(255, 45, 133, 0.15), transparent 50%),
            radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.15), transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(212, 175, 55, 0.1), transparent 60%);
          background-attachment: fixed;
          background-size: 200% 200%;
          animation: auraBreath 12s ease-in-out infinite alternate;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Isolated Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <section className="px-4 text-center mb-8 relative z-10">
        <SectionReveal>
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-6xl md:text-8xl text-primary tracking-[0.15em] mb-4 drop-shadow-[0_0_15px_rgba(255,45,133,0.5)]">SHARRAZZ MENU</h1>
            <p className="text-muted-foreground text-xs md:text-sm tracking-[0.4em] uppercase">Rooftop Flavors. Late Night Cravings.</p>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8 shadow-[0_0_10px_rgba(255,45,133,0.8)]" />
          </motion.div>
        </SectionReveal>
      </section>

      {/* --- FIXED STICKY CRYSTAL CAPSULE TABS --- */}
      <section className="sticky top-20 z-[90] px-4 py-4 mb-12 pointer-events-none">
        <div className="max-w-5xl mx-auto flex justify-center pointer-events-auto">
          <div 
            ref={navContainerRef}
            className="flex flex-nowrap md:flex-wrap overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-2 p-2 bg-[#0f050a]/80 backdrop-blur-xl md:rounded-full rounded-2xl border border-primary/20 shadow-[0_20px_40px_rgba(0,0,0,0.8)] w-full max-w-full"
          >
            {menuData.map((section) => {
              const isActive = activeTab === section.tab;
              return (
                <button
                  key={section.tab}
                  data-tab-name={section.tab}
                  onClick={() => scrollToSection(section.tab)}
                  className={`relative shrink-0 snap-start px-6 py-3 rounded-full text-xs tracking-[0.2em] uppercase font-bold transition-all duration-500 overflow-hidden ${
                    isActive ? "text-[#0f050a]" : "text-foreground/60 hover:text-primary"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-primary shadow-[0_0_15px_rgba(255,45,133,0.6)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {section.tab.toLowerCase().includes("beverage") ? (
                      <Wine size={14} className={isActive ? "text-[#0f050a]" : "text-primary"} />
                    ) : section.tab.toLowerCase().includes("bakery") ? (
                      <CoffeeIcon size={14} className={isActive ? "text-[#0f050a]" : "text-primary"} />
                    ) : (
                      <UtensilsCrossed size={14} className={isActive ? "text-[#0f050a]" : "text-primary"} />
                    )}
                    {section.tab}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- CONTINUOUS SCROLL MENU CONTENT --- */}
      <section className="px-4 relative z-10 min-h-[800px]">
        <div className="max-w-5xl mx-auto relative">
          
          {menuData.map((section) => (
            <div 
              key={section.tab} 
              id={makeSectionId(section.tab)}
              data-section-tab={section.tab}
              className="pt-10 mb-16 scroll-mt-[180px]"
            >
              {section.categories.map((cat, ci) => (
                <div key={cat.name} className="mb-20">
                  
                  {/* Category Header (Dynamically Glows as you scroll past it) */}
                  <motion.div 
                    initial="idle"
                    whileInView="active"
                    viewport={{ margin: "-20% 0px -60% 0px" }}
                    variants={{
                      idle: { opacity: 0.7, scale: 1, filter: "drop-shadow(0 0 5px rgba(255,45,133,0.3))" },
                      active: { opacity: 1, scale: 1.05, filter: "drop-shadow(0 0 15px rgba(255,45,133,0.8))" }
                    }}
                    className="flex items-center gap-4 mb-10 transition-all duration-500"
                  >
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-primary/50" />
                    <h3 className="font-serif text-3xl md:text-4xl text-primary tracking-widest text-center">
                      {cat.name}
                    </h3>
                    <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-primary/50" />
                  </motion.div>

                  {/* Menu Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
                    {cat.items.map((item, ii) => (
                      <motion.div
                        key={ii}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: ii * 0.02, duration: 0.4 }}
                      >
                        {/* YOUR EXACT ORIGINAL DISH HIGHLIGHT LOGIC */}
                        <motion.div
                          initial="idle"
                          whileHover="active"
                          whileInView="active"
                          viewport={{ margin: "-40% 0px -40% 0px" }}
                          variants={{
                            idle: { backgroundColor: "transparent", borderColor: "transparent", boxShadow: "none" },
                            active: { backgroundColor: "rgba(15, 5, 10, 0.6)", borderColor: "rgba(255, 45, 133, 0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }
                          }}
                          className="relative flex flex-col justify-between p-4 -mx-4 rounded-xl border backdrop-blur-sm cursor-default"
                        >
                          {/* The Active Marker (Left Vertical Bar) */}
                          <motion.div 
                            variants={{ idle: { scaleY: 0 }, active: { scaleY: 1 } }}
                            className="absolute left-0 top-1/4 h-1/2 w-[2px] bg-primary origin-center shadow-[0_0_10px_rgba(255,45,133,0.8)] transition-transform duration-500" 
                          />

                          {/* The Row Container (Slides right slightly) */}
                          <motion.div 
                            variants={{ idle: { x: 0 }, active: { x: 12 } }}
                            className="flex items-baseline justify-between gap-4 mb-2 transition-transform duration-500"
                          >
                            {/* Original White Text -> Primary Color */}
                            <motion.h4 
                              variants={{ idle: { color: "#ffffff" }, active: { color: "#ff2d85" } }}
                              className="font-serif text-xl transition-colors duration-300"
                            >
                              {item.name}
                            </motion.h4>
                            
                            {/* The Dotted Line & Solid Line Streak */}
                            <div className="flex-grow border-b border-dotted border-white/20 relative top-[-6px]">
                              <motion.div 
                                variants={{ idle: { width: "0%" }, active: { width: "100%" } }}
                                className="absolute top-[1px] left-0 h-[1px] bg-primary shadow-[0_0_10px_rgba(255,45,133,0.8)] transition-all duration-700 ease-out" 
                              />
                            </div>
                            
                            {/* Price Scaling & Glow */}
                            {item.price && (
                              <motion.span 
                                variants={{
                                  idle: { scale: 1, filter: "drop-shadow(0px 0px 0px rgba(255,45,133,0))" },
                                  active: { scale: 1.1, filter: "drop-shadow(0px 0px 12px rgba(255,45,133,0.8))" }
                                }}
                                className="font-serif text-xl text-primary tracking-wider whitespace-nowrap transition-all duration-500"
                              >
                                {item.price}
                              </motion.span>
                            )}
                          </motion.div>
                          
                          {/* Description Text */}
                          {item.description && (
                            <motion.p 
                              variants={{
                                idle: { x: 0, color: "rgba(255, 255, 255, 0.5)" },
                                active: { x: 12, color: "rgba(255, 255, 255, 0.8)" }
                              }}
                              className="text-xs tracking-wide leading-relaxed pr-8 transition-all duration-500"
                            >
                              {item.description}
                            </motion.p>
                          )}
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Call to Action Footer */}
          <SectionReveal>
            <div className="text-center mt-24 pt-16 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent shadow-[0_0_10px_rgba(255,45,133,0.5)]" />
              <p className="text-muted-foreground text-xs uppercase tracking-[0.3em] mb-8">Ready to secure a rooftop table?</p>
              <a
                href="tel:+919315049698"
                className="relative inline-flex items-center gap-3 px-10 py-4 overflow-hidden group border border-primary/30 rounded-sm hover:shadow-[0_0_20px_rgba(255,45,133,0.4)] transition-all duration-500"
              >
                <span className="absolute inset-0 bg-primary/10 group-hover:bg-primary transition-colors duration-500" />
                <Phone className="w-4 h-4 text-primary group-hover:text-[#0f050a] relative z-10 transition-colors duration-500" />
                <span className="text-xs tracking-[0.2em] uppercase font-bold text-primary group-hover:text-[#0f050a] relative z-10 transition-colors duration-500">
                  Call for Reservations
                </span>
              </a>
            </div>
          </SectionReveal>
          
        </div>
      </section>
    </main>
  );
};

export default Menu;