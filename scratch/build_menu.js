const fs = require('fs');

const raw = {
  AERATED_DRINKS: [
    ["Coke / Sprite / Fanta", "119"],
    ["Redbull", "249"],
    ["Soda Flavour", "99"],
    ["Mineral Water", "49"],
    ["Ice Tea", "159"]
  ],
  JUICE: [
    ["Orange", "169"],
    ["Mix Juice", "169"],
    ["Cranberry", "169"],
    ["Pineapple", "169"],
    ["Mango", "169"]
  ],
  BIRYANI: [
    ["Veg Biryani", "279"],
    ["Non Veg Biryani", "299"]
  ],
  RICE: [
    ["Plain Rice", "159"],
    ["Jeera Rice", "179"]
  ],
  RAITA: [
    ["Plain Raita", "60"],
    ["Boondi Raita", "80"],
    ["Mix Raita", "80"],
    ["Pineapple Raita", "90"]
  ],
  SMOOTHIE: [
    ["Mango", "189"],
    ["Strawberry", "189"],
    ["Banana", "189"],
    ["Kiwi", "189"]
  ],
  PITCHERS: [
    ["Coke / Sprite / Fanta", "399"],
    ["Virgin Mojito Pitcher", "499"],
    ["Water Melon Mojito Pitcher", "499"],
    ["Green Apple Mojito Pitcher", "499"],
    ["Ice Tea Pitcher", "499"]
  ],
  TEA_AND_COFFEE: [
    ["Tea", "59"],
    ["Black Tea", "99"],
    ["Lemon Tea", "99"],
    ["Masala Tea", "79"],
    ["Green Tea", "100"],
    ["Black Hot Coffee", "150"],
    ["Coffee", "99"],
    ["Cappuccino", "149"],
    ["Irish Coffee", "179"],
    ["Hazel Nut Cappuccino", "199"],
    ["Ice Tea", "199"]
  ],
  INDIAN_MAIN_VEG: [
    ["Dal Makhani", "289"],
    ["Shahi Paneer", "289"],
    ["Kadai Panner", "289"],
    ["Panner Butter Masala", "299"],
    ["Soya Chaap Masala", "279"],
    ["Mix Vegetables", "259"],
    ["Dal Tadka", "259"],
    ["Dal Fry", "239"]
  ],
  INDIAN_MAIN_NON_VEG: [
    ["Butter Chicken", "399"],
    ["Kadhai Chicken", "399"],
    ["Butter Chicken Boneless", "439"],
    ["Kadhai Chicken Boneless", "439"],
    ["Matka Chicken", "439"],
    ["Chicken Do Pyaza", "439"],
    ["Chicken Curry", "379"],
    ["Keema Rara", "439"]
  ],
  BREADS: [
    ["Tandoori Roti", "30"],
    ["Tandoori Butter Roti", "40"],
    ["Lacha Parantha", "50"],
    ["Pudina Parantha", "55"],
    ["Mirchi Parantha", "60"],
    ["Cream Parantha", "65"],
    ["Plain Naan", "60"],
    ["Butter Naan", "70"],
    ["Garlic Naan", "75"],
    ["Papad", "15"],
    ["Masala Papad", "25"],
    ["Stuffed Naan", "85"]
  ],
  DESERTS: [
    ["Ice Cream N Hot Chocolate", "240"],
    ["Brownie With Ice Cream", "229"]
  ],
  MOCKTAILS: [
    ["Fresh Lime Soda", "179"],
    ["Virgin Mojito", "239"],
    ["Green Apple Mojito", "239"],
    ["Peach Mojito", "239"],
    ["Cranberry Mojito", "239"],
    ["Watermelon Ice Mojito Mocktail", "239"],
    ["Sharrazz Mojito", "239"],
    ["Ice Cream Soda", "239"],
    ["Green Apple Ice Cream Soda", "239"],
    ["Kiwi Ice Cream Soda", "239"],
    ["Water Melon Ice Cream Soda", "239"], // Fixed typo from Malon
    ["Blue Lagoon", "249"],
    ["Kuch Bhi", "239"],
    ["Cola Mojito", "239"],
    ["Passion Fruit", "239"]
  ],
  SHAKES: [
    ["Chocolate Brownie", "259"],
    ["Oreo Shake", "239"],
    ["Kitkat Shake", "239"],
    ["Blueberry Shake", "239"],
    ["Butter Scotch Shake", "239"],
    ["Oreo Chocolate Shake (Vanila)", "239"], // Fixed Oero
    ["Oreo Chocolate Shake (Strawberry)", "239"],
    ["Black Current Shake", "239"],
    ["Nutella Brownie Shake", "299"], // Fixed Nutrella
    ["Cold Coffee", "199"],
    ["Mocha", "199"],
    ["Fruit Punch", "249"]
  ],
  HEALTHY: [
    ["Cottage Cheese Steak With Rice", "349"],
    ["Grilled Chicken Steak With Sauté Veggie-Demi Glaze Peri Peri Mushroom", "449"],
    ["Grilled Chicken With Rice And Vegetables", "449"]
  ],
  CONTINENTAL_VEG: [
    ["Falafel", "399"],
    ["Hummus & Pita", "499"],
    ["Mozzarella Stick", "349"],
    ["Mushroom Duplex", "349"],
    ["Tacos", "239"],
    ["Mezze Platter", "449"]
  ],
  CONTINENTAL_NON_VEG: [
    ["Mezze Platter", "649"],
    ["Tacos", "339"],
    ["Chicken Drum Stick", "339"]
  ],
  CHINESE_MAIN_VEG: [
    ["Chilli Paneer Gravy", "359"],
    ["Manchurian Gravy", "329"],
    ["Chilli Mushroom Gravy", "329"]
  ],
  CHINESE_MAIN_NON_VEG: [
    ["Chilli Chicken Gravy", "389"],
    ["Manchurian Gravy", "389"],
    ["Lemon Chicken Gravy", "389"]
  ],
  ROLL_VEG: [
    ["Soya Tikka Roll", "249"],
    ["Chaap Roll", "229"],
    ["Panner Tikka Roll", "249"],
    ["Arizona Veg Roll", "249"],
    ["Arizona Chaap Roll", "249"],
    ["Peri Peri Chaap Roll", "249"]
  ],
  ROLL_NON_VEG: [
    ["Chicken Tikka", "269"],
    ["Butter Chicken", "269"],
    ["Seekh Roll", "249"],
    ["Peri Peri Chicken Roll", "289"],
    ["Egg Roll", "249"],
    ["Chicken Egg Roll", "289"]
  ],
  MOMOS_VEG: [
    ["Veg Momos", "229"],
    ["Paneer Momos", "299"],
    ["Chilli Momos", "329"],
    ["Tandoori Momos", "329"],
    ["Malai Momos", "339"],
    ["Achari Momos", "339"],
    ["Kurkure Momos", "329"],
    ["Veg Fry", "249"]
  ],
  MOMOS_NON_VEG: [
    ["Chicken Momos", "299"],
    ["Chicken Peri Peri", "299"],
    ["Tandoori Momos", "349"],
    ["Malai Momos", "359"],
    ["Achari Momos", "359"],
    ["Kurkure Momos", "349"],
    ["Fry Chicken", "349"]
  ],
  TANDOORI_VEG: [
    ["Hara Bhara Kabab", "389"],
    ["Mushroom Tikka", "359"],
    ["Paneer Tikka", "359"],
    ["Paneer Malai Tikka", "379"],
    ["Tandoori Chaap", "329"],
    ["Soya Malai Chaap", "349"],
    ["Dahi Ke Sholy", "349"],
    ["Tandoori Broccoli", "349"],
    ["Broccoli Cheese Kabab", "449"],
    ["Seekh Kabab", "349"],
    ["Tandoori Aloo", "349"],
    ["Achari Panner Tikka", "379"],
    ["Peri Peri Soya Chaap", "349"],
    ["Veg Platter", "449"]
  ],
  TANDOORI_NON_VEG: [
    ["Chicken Tikka", "349"],
    ["Chicken Malai Tikka", "370"],
    ["Tandoori Chicken", "349"],
    ["Afghani Chicken", "349"],
    ["Seekh Kabab", "410"],
    ["Peri Peri Chicken", "430"],
    ["Chicken Achari", "360"],
    ["Chicken Wings", "349"],
    ["Galouti Kabab", "389"],
    ["Bhatti Murg", "439"],
    ["Lasooni Dhaniya Murg Tikka", "439"],
    ["Spl Reshmi Murg Tikka", "449"],
    ["Whole Chicken", "1300"],
    ["Tangri Kabab", "429"],
    ["Reshmi Kabab", "429"],
    ["Non Veg Platter", "699"],
    ["Khasta Chicken", "900"]
  ],
  MAGGI_VEG: [
    ["Maggi", "99"],
    ["Vegetable Maggi", "169"]
  ],
  MAGGI_NON_VEG: [
    ["Chicken Maggi", "219"]
  ],
  CHINESE_VEG: [
    ["French Fries", "239"],
    ["Peri Peri Fries", "269"],
    ["Dip French Fries", "299"],
    ["Cheesy Fries", "279"],
    ["Chilli Potato", "279"],
    ["Honeychilli Potato", "299"],
    ["Veg Manchurian", "299"],
    ["Chilli Paneer", "299"],
    ["Spring Roll", "269"],
    ["Chilli Mushroom", "269"],
    ["Cheese Ball", "339"],
    ["Cigar Roll", "299"],
    ["Chilli Salt & Pepper", "299"],
    ["Chilli Soya Chaap", "279"],
    ["Crispy Corn", "279"],
    ["Paneer Finger", "339"],
    ["Potato Wedges", "N/A"]
  ],
  CHINESE_NON_VEG: [
    ["Chilli Chicken", "339"],
    ["Lemon Chicken", "349"],
    ["Chicken Finger", "339"],
    ["Chicken Sticks", "339"],
    ["Drums Of Heaven", "339"],
    ["Crispy Honey Chicken", "359"],
    ["Hot Garlic Chicken", "359"],
    ["White Sauce Chicken", "359"],
    ["Chicken Orley", "359"],
    ["Chicken Popcorn", "359"],
    ["Chicken 65", "359"],
    ["Golden Fired Chicken", "359"],
    ["White Chicken Lollipop", "359"],
    ["Chicken Lollipop", "339"],
    ["Chicken Hongkong", "389"],
    ["Cigar Roll", "349"],
    ["Chicken Spring Roll", "339"]
  ],
  RICE_NOODLES_VEG: [
    ["Fried Rice", "199"],
    ["Paneer Fried Rice", "229"],
    ["Singapore Rice", "229"],
    ["Chilli Garlic Rice", "229"],
    ["Noodles", "229"],
    ["Paneer Noodles", "269"],
    ["Hakka Noodles", "269"],
    ["Singapore Noodles", "269"],
    ["Chilli Garlic Noodles", "269"]
  ],
  RICE_NOODLES_NON_VEG: [
    ["Fried Rice", "229"],
    ["Singapore Rice", "269"],
    ["Chilli Garlic Rice", "269"],
    ["Noodles", "269"],
    ["Hakka Noodles", "299"],
    ["Singapore Noodles", "299"],
    ["Chilli Garlic Noodles", "299"]
  ],
  SANDWICH_VEG: [
    ["Veg Club Sandwich", "249"],
    ["Cheese Sandwich", "299"],
    ["Paneer Grill Sandwich", "299"],
    ["American Sandwich", "299"]
  ],
  SANDWICH_NON_VEG: [
    ["American Sandwich", "329"],
    ["Cheese Sandwich", "329"],
    ["Salted Chicken Sandwich", "329"]
  ],
  BURGER_VEG: [
    ["Veg Burger", "169"],
    ["Veg Cheese Burger", "199"],
    ["Paneer Tikka Burger", "219"]
  ],
  BURGER_NON_VEG: [
    ["Non Veg Burger", "229"],
    ["Non Veg Cheese Burger", "259"],
    ["Fish Burger", "259"],
    ["Chicken Tikka Burger", "239"]
  ],
  MEXICAN_VEG: [
    ["Addictive Nachos", "239"],
    ["Baked Nachos", "279"],
    ["Addictive Garlic Bread", "149"],
    ["Bruschetta", "349"],
    ["Cheese Garlic Bread", "249"] // Fixed Chesse
  ],
  MEXICAN_NON_VEG: [
    ["Baked Nachos", "324"],
    ["Bruschetta", "449"]
  ],
  PASTA_VEG: [
    ["Alfredo Pasta", "299"],
    ["Arrabiata Pasta", "299"],
    ["Mix Sauce Pasta", "329"],
    ["Four Cheese Pasta", "321"],
    ["Spaghetti Pasta", "349"],
    ["Lasagna Pasta", "349"]
  ],
  PASTA_NON_VEG: [
    ["Alfredo Pasta", "329"],
    ["Arrabiata Pasta", "329"],
    ["Mix Sauce Pasta", "349"],
    ["Four Cheese Pasta", "349"],
    ["Lasagna Pasta", "379"],
    ["Spaghetti Pasta", "379"]
  ],
  PIZZA_VEG: [
    ["Margherita Pizza (Mozzarella & Tomato)", "269"],
    ["Double Cheese Margherita", "329"],
    ["Chilli Cottage Cheese", "339"],
    ["Farm House", "359"],
    ["Mexican Pizza (Jalapeno, Black Olive, Sweet Corn, Bell Pepper)", "359"],
    ["Peri Peri Pizza", "359"],
    ["Golden Delight Pizza", "359"]
  ],
  PIZZA_NON_VEG: [
    ["Peri Peri Pizza", "389"],
    ["Golden Delight Pizza", "389"],
    ["Chicken Tikka Pizza", "389"],
    ["Butter Chicken Pizza", "389"],
    ["BBQ Chicken Pizza", "389"],
    ["Pizza-E-Kabab", "399"]
  ],
  SOUP_VEG: [
    ["Tomato Soup", "149"],
    ["Creamy Mushroom", "149"],
    ["Hot N Sour", "149"],
    ["Manchow Soup", "149"]
  ],
  SOUP_NON_VEG: [
    ["Hot N Sour", "179"],
    ["Chicken Soup", "189"]
  ],
  SALAD_VEG: [
    ["Greek Salad", "150"],
    ["Paneer Tikka Salad", "229"],
    ["Nachos Salad", "209"],
    ["Corn Salad", "209"],
    ["Caesar Salad", "209"],
    ["Peanut Masala", "249"],
    ["Paneer Tikka Salad", "249"]
  ],
  SALAD_NON_VEG: [
    ["Green Chicken Salad", "210"],
    ["Nachos Salad", "220"]
  ]
};

const mapToItems = (arr) => arr.map(([name, price]) => ({ name, price: price === "N/A" ? undefined : "₹" + price }));

const finalMenu = [
  {
    tab: "Soups & Salads",
    categories: [
      { name: "Soup (Veg)", items: mapToItems(raw.SOUP_VEG) },
      { name: "Soup (Non-Veg)", items: mapToItems(raw.SOUP_NON_VEG) },
      { name: "Salad (Veg)", items: mapToItems(raw.SALAD_VEG) },
      { name: "Salad (Non-Veg)", items: mapToItems(raw.SALAD_NON_VEG) },
      { name: "Healthy", items: mapToItems(raw.HEALTHY) }
    ]
  },
  {
    tab: "Bites & Snacks",
    categories: [
      { name: "Sandwich", items: [...mapToItems(raw.SANDWICH_VEG), ...mapToItems(raw.SANDWICH_NON_VEG)] },
      { name: "Burger", items: [...mapToItems(raw.BURGER_VEG), ...mapToItems(raw.BURGER_NON_VEG)] },
      { name: "Maggi", items: [...mapToItems(raw.MAGGI_VEG), ...mapToItems(raw.MAGGI_NON_VEG)] },
      { name: "Roll", items: [...mapToItems(raw.ROLL_VEG), ...mapToItems(raw.ROLL_NON_VEG)] },
      { name: "Momos", items: [...mapToItems(raw.MOMOS_VEG), ...mapToItems(raw.MOMOS_NON_VEG)] },
      { name: "Mexican", items: [...mapToItems(raw.MEXICAN_VEG), ...mapToItems(raw.MEXICAN_NON_VEG)] }
    ]
  },
  {
    tab: "Starters",
    categories: [
      { name: "Chinese Veg Starters", items: mapToItems(raw.CHINESE_VEG) },
      { name: "Chinese Non-Veg Starters", items: mapToItems(raw.CHINESE_NON_VEG) },
      { name: "Tandoori Veg Items", items: mapToItems(raw.TANDOORI_VEG) },
      { name: "Tandoori Non-Veg Items", items: mapToItems(raw.TANDOORI_NON_VEG) },
      { name: "Continental", items: [...mapToItems(raw.CONTINENTAL_VEG), ...mapToItems(raw.CONTINENTAL_NON_VEG)] }
    ]
  },
  {
    tab: "Pizza & Pasta",
    categories: [
      { name: "Pizza (Veg)", items: mapToItems(raw.PIZZA_VEG) },
      { name: "Pizza (Non-Veg)", items: mapToItems(raw.PIZZA_NON_VEG) },
      { name: "Pasta", items: [...mapToItems(raw.PASTA_VEG), ...mapToItems(raw.PASTA_NON_VEG)] }
    ]
  },
  {
    tab: "Indian Mains",
    categories: [
      { name: "Veg Mains", items: mapToItems(raw.INDIAN_MAIN_VEG) },
      { name: "Non-Veg Mains", items: mapToItems(raw.INDIAN_MAIN_NON_VEG) },
      { name: "Breads", items: mapToItems(raw.BREADS) }
    ]
  },
  {
    tab: "Rice & Noodles",
    categories: [
      { name: "Rice and Noodles (Veg)", items: mapToItems(raw.RICE_NOODLES_VEG) },
      { name: "Rice and Noodles (Non-Veg)", items: mapToItems(raw.RICE_NOODLES_NON_VEG) },
      { name: "Biryani & Raita", items: [...mapToItems(raw.BIRYANI), ...mapToItems(raw.RICE), ...mapToItems(raw.RAITA)] },
      { name: "Chinese Main Course", items: [...mapToItems(raw.CHINESE_MAIN_VEG), ...mapToItems(raw.CHINESE_MAIN_NON_VEG)] }
    ]
  },
  {
    tab: "Beverages & Desserts",
    categories: [
      { name: "Mocktails", items: mapToItems(raw.MOCKTAILS) },
      { name: "Shakes & Smoothies", items: [...mapToItems(raw.SHAKES), ...mapToItems(raw.SMOOTHIE)] },
      { name: "Pitchers", items: mapToItems(raw.PITCHERS) },
      { name: "Tea and Coffee", items: mapToItems(raw.TEA_AND_COFFEE) },
      { name: "Coolers & Juices", items: [...mapToItems(raw.AERATED_DRINKS), ...mapToItems(raw.JUICE)] },
      { name: "Desserts", items: mapToItems(raw.DESERTS) }
    ]
  }
];

function stringifyMenuData(data) {
  return JSON.stringify(data, null, 2);
}

const path = 'app/menu/page.tsx';
const code = fs.readFileSync(path, 'utf8');

const startIndex = code.indexOf('const menuData: MenuSection[] = [');
const endIndex = code.indexOf('// ── CUSTOM HOOK: DETECT MOBILE ────────────────');

if (startIndex !== -1 && endIndex !== -1) {
  const newArrayString = stringifyMenuData(finalMenu);
  const newCode = code.substring(0, startIndex + 'const menuData: MenuSection[] = '.length) + newArrayString + ';\n\n' + code.substring(endIndex);
  fs.writeFileSync(path, newCode);
  console.log('Successfully updated menu data');
} else {
  console.log('Could not find boundaries to replace', startIndex, endIndex);
}
