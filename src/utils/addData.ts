import Category from "@/schemas/Category";
import Product from "@/schemas/Product";
import mongoose from "mongoose";

export const addData = async () => {
  const categoriesData = [
    {
      name: "Sushi Rolls",
      description: "Classic sushi rolls with various fillings and flavors.",
    },
    {
      name: "Nigiri",
      description: "Slices of fresh fish over pressed vinegared rice.",
    },
    {
      name: "Sashimi",
      description: "Thinly sliced raw fish or seafood without rice.",
    },
    {
      name: "Specialty Rolls",
      description: "Chef's special rolls with unique ingredients and sauces.",
    },
  ];

  const categories = await Category.insertMany(categoriesData);
  console.log("Categories added:", categories);

  const categoriesMap = categories.reduce((acc, category) => {
    acc[category.name] = category._id as mongoose.Types.ObjectId;
    return acc;
  }, {} as { [key: string]: mongoose.Types.ObjectId });

  console.log("Categories Map:", categoriesMap);

  const productsData = [
    {
      name: "California Roll",
      description: "Crab stick, avocado, cucumber, and tobiko.",
      price: 8.99,
      categoryId: categoriesMap["Sushi Rolls"],
      ingredients: ["crab stick", "avocado", "cucumber", "tobiko"],
      image: "/images/california_roll.jpg",
    },
    {
      name: "Spicy Tuna Roll",
      description: "Fresh tuna, spicy mayo, and cucumber.",
      price: 9.99,
      categoryId: categoriesMap["Sushi Rolls"],
      ingredients: ["tuna", "spicy mayo", "cucumber"],
      image: "/images/spicy_tuna_roll.jpg",
    },
    {
      name: "Salmon Nigiri",
      description: "Fresh slice of salmon over vinegared rice.",
      price: 4.5,
      categoryId: categoriesMap["Nigiri"],
      ingredients: ["salmon", "rice"],
      image: "/images/salmon_nigiri.jpg",
    },
    {
      name: "Tuna Sashimi",
      description: "Thin slices of fresh tuna.",
      price: 12.99,
      categoryId: categoriesMap["Sashimi"],
      ingredients: ["tuna"],
      image: "/images/tuna_sashimi.jpg",
    },
    {
      name: "Dragon Roll",
      description: "Eel, cucumber, avocado, and drizzled eel sauce.",
      price: 14.99,
      categoryId: categoriesMap["Specialty Rolls"],
      ingredients: ["eel", "cucumber", "avocado", "eel sauce"],
      image: "/images/dragon_roll.jpg",
    },
    {
      name: "Rainbow Roll",
      description: "Crab stick, avocado, cucumber, topped with assorted fish.",
      price: 13.5,
      categoryId: categoriesMap["Specialty Rolls"],
      ingredients: ["crab stick", "avocado", "cucumber", "assorted fish"],
      image: "/images/rainbow_roll.jpg",
    },
  ];

  await Product.insertMany(productsData);
  console.log("Products added successfully");
};
