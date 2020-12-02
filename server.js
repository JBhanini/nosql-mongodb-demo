const { Brand, Category, Product } = require('./mongoose');
const mongoose = require('mongoose');

// Query products by category and discount rate
function searcProductByCategory(categoryName, sortBy, groupBy) {
  const category = getCategoryByName(categoryName);

  if (!category) {
    return [];
  }

  let query = Product.find({
    category
  });

  if (sortBy) {
    query = query.sort(sortBy);
  }

  if (groupBy) {
    query = query.group(groupBy);
  }

  return query;
}

function searchProductByBrand(brandName, sortBy, groupBy) {
  const brand = getBrandByName(brandName);

  if (!brand) {
    return [];
  }

  let query = Product.find({
    brand
  });

  if (sortBy) {
    query = query.sort(sortBy);
  }

  if (groupBy) {
    query = query.group(groupBy);
  }

  return query;
}

function getCategoryByName(name) {
  return Category.findOne({ category_name: name });
}

function getAllCategories() {
  return Category.find({});
}


function getBrandByName(name) {
  return Brand.findOne({ brand_name: name });
}

function getAllBrands() {
  return Brand.find({});
}


const productsByCategory = searcProductByCategory("Men", ['likes_count', 1], 'subcategory');
const productsByBrand = searchProductByBrand("Lacoste", ['likes_count', 1], 'category');
