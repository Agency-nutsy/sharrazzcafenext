const fs = require('fs');

const path = 'app/menu/page.tsx';
const code = fs.readFileSync(path, 'utf8');

const startIndex = code.indexOf('const menuData: MenuSection[] = [');
const endIndex = code.indexOf('];\n\n// ── CUSTOM HOOK: DETECT MOBILE ────────────────') + 1;

const arrayString = code.substring(startIndex + 'const menuData: MenuSection[] = '.length, endIndex);
const menuData = eval('(' + arrayString + ')');

const allCategories = {};
menuData.forEach(tab => {
    tab.categories.forEach(cat => {
        allCategories[cat.name] = cat.items;
    });
});

const newMenuData = [
  {
    tab: "Soup",
    categories: [
      { name: "Veg", items: allCategories["Soup (Veg)"] },
      { name: "Non Veg", items: allCategories["Soup (Non-Veg)"] }
    ]
  },
  {
    tab: "Salad",
    categories: [
      { name: "Veg", items: allCategories["Salad (Veg)"] },
      { name: "Non Veg", items: allCategories["Salad (Non-Veg)"] }
    ]
  },
  {
    tab: "Pizza",
    categories: [
      { name: "Veg", items: allCategories["Pizza (Veg)"] },
      { name: "Non Veg", items: allCategories["Pizza (Non-Veg)"] }
    ]
  },
  {
    tab: "Mexican",
    categories: [
      { name: "Mexican", items: allCategories["Mexican"] }
    ]
  },
  {
    tab: "Pasta",
    categories: [
      { name: "Pasta", items: allCategories["Pasta"] }
    ]
  },
  {
    tab: "Sandwich",
    categories: [
      { name: "Sandwich", items: allCategories["Sandwich"] }
    ]
  },
  {
    tab: "Burger",
    categories: [
      { name: "Burger", items: allCategories["Burger"] }
    ]
  },
  {
    tab: "Maggi",
    categories: [
      { name: "Maggi", items: allCategories["Maggi"] }
    ]
  },
  {
    tab: "Chinese",
    categories: [
      { name: "Veg Starters", items: allCategories["Chinese Veg Starters"] },
      { name: "Non-Veg Starters", items: allCategories["Chinese Non-Veg Starters"] }
    ]
  },
  {
    tab: "Rice & Noodles",
    categories: [
      { name: "Veg", items: allCategories["Rice and Noodles (Veg)"] },
      { name: "Non-Veg", items: allCategories["Rice and Noodles (Non-Veg)"] }
    ]
  },
  {
    tab: "Tandoori Items",
    categories: [
      { name: "Veg", items: allCategories["Tandoori Veg Items"] },
      { name: "Non-Veg", items: allCategories["Tandoori Non-Veg Items"] }
    ]
  },
  {
    tab: "Rolls",
    categories: [
      { name: "Rolls", items: allCategories["Roll"] }
    ]
  },
  {
    tab: "Momos",
    categories: [
      { name: "Momos", items: allCategories["Momos"] }
    ]
  },
  {
    tab: "Healthy",
    categories: [
      { name: "Healthy", items: allCategories["Healthy"] }
    ]
  },
  {
    tab: "Chinese Main Course",
    categories: [
      { name: "Chinese Main Course", items: allCategories["Chinese Main Course"] }
    ]
  },
  {
    tab: "Indian Cuisine",
    categories: [
      { name: "Veg Mains", items: allCategories["Veg Mains"] },
      { name: "Non-Veg Mains", items: allCategories["Non-Veg Mains"] }
    ]
  },
  {
    tab: "Breads",
    categories: [
      { name: "Breads", items: allCategories["Breads"] }
    ]
  },
  {
    tab: "Biryani",
    categories: [
      { name: "Biryani", items: allCategories["Biryani & Raita"].filter(i => i.name.toLowerCase().includes("biryani")) }
    ]
  },
  {
    tab: "Rice",
    categories: [
      { name: "Rice", items: allCategories["Biryani & Raita"].filter(i => i.name.toLowerCase().includes("rice")) }
    ]
  },
  {
    tab: "Raita",
    categories: [
      { name: "Raita", items: allCategories["Biryani & Raita"].filter(i => i.name.toLowerCase().includes("raita")) }
    ]
  },
  {
    tab: "Shakes",
    categories: [
      { name: "Shakes", items: allCategories["Shakes & Smoothies"] }
    ]
  },
  {
    tab: "Mocktails",
    categories: [
      { name: "Mocktails", items: allCategories["Mocktails"] }
    ]
  },
  {
    tab: "Juices & Coolers",
    categories: [
      { name: "Juices & Coolers", items: allCategories["Coolers & Juices"] }
    ]
  },
  {
    tab: "Pitchers",
    categories: [
      { name: "Pitchers", items: allCategories["Pitchers"] }
    ]
  },
  {
    tab: "Tea & Coffee",
    categories: [
      { name: "Tea & Coffee", items: allCategories["Tea and Coffee"] }
    ]
  }
];

function stringifyMenuData(data) {
  let str = "[\n";
  data.forEach(tab => {
    str += `  {\n    tab: "${tab.tab}",\n    categories: [\n`;
    tab.categories.forEach(cat => {
      str += `      {\n        name: "${cat.name}",\n        items: [\n`;
      cat.items.forEach(item => {
        str += `          { name: "${item.name}", price: "${item.price}" },\n`;
      });
      str += `        ],\n      },\n`;
    });
    str += `    ],\n  },\n`;
  });
  str += "]";
  return str;
}

const newArrayString = stringifyMenuData(newMenuData);
const newCode = code.substring(0, startIndex + 'const menuData: MenuSection[] = '.length) + newArrayString + '\n' + code.substring(endIndex);

fs.writeFileSync(path, newCode);
console.log('Successfully updated menu data');
