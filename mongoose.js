const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/catalog', {useNewUrlParser: true, useUnifiedTopology: true });

// Create our Schemasdasdadasdasdas

const Schema = mongoose.Schema

const BrandsSchema = new Schema({
    brand_name : String,
    brand_url : String
    })

const CategoriesSchema = new Schema({
    category_name : String,
    subcategories : Array
    })

const ProductsSchema = new Schema({
    name : String,
    current_price : Number,
    raw_price : String,
    discount : Number,
    likes_count : Number,
    is_new : Boolean,
    variation_0_color : String,
    variation_1_color : String,
    variation_0_thumbnail : String,
    variation_0_image : String,
    variation_1_thumbnail : String,
    variation_1_image : String,
    url : String,
    brand : { type: Schema.Types.ObjectId, ref: 'Brand'},
    category : { type: Schema.Types.ObjectId, ref: 'Category'},
    subcategory : String
    })

//Create Models from our Schemas

const Model = mongoose.model;
exports.Brand = Model('Brand', BrandsSchema);
exports.Category = Model('Category', CategoriesSchema);
exports.Product = Model('Product', ProductsSchema);
