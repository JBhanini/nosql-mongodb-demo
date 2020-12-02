const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const { Brand, Category, Product } = require('./mongoose');

const results = [];

const rowHasBrandAndBrandURL = row => row.brand.length > 0 && row.brand_url.length > 0;

const toImport = [
    'accessories.csv',
    'bags.csv',
    'beauty.csv',
    'house.csv',
    'jewelry.csv',
    'kids.csv',
    'men.csv',
    'shoes.csv',
    'women.csv'
];

let ctr = 0;

function onEnd() {
    console.log("Progress", ctr + 1, toImport.length);
    if (++ctr != toImport.length) {
        return;
    }

    const filtered = results.filter(rowHasBrandAndBrandURL);



    const categories = {};
    const brands = {};
    const items = [];

    filtered.forEach((row) => {
        const { category, subcategory, brand, brand_url, id, is_new, ...item } = row;
        if (!categories[category]) {
            categories[category] = [];
        }

        if (!categories[category].includes(subcategory)) {
            categories[category].push(subcategory);
        }

        if (!brands[brand]) {
            brands[brand] = brand_url;
        }

        items.push({
            ...item,
            brand,
            category,
            subcategory,
            is_new: is_new === "TRUE"
        })
    });

    const cArr = [];

    for (const [key, value] of Object.entries(categories)) {
        cArr.push({
            category_name: key,
            subcategories: value
        });
    }

    const bArr = [];

    for (const [key, value] of Object.entries(brands)) {
        bArr.push({
            brand_name: key,
            brand_url: value
        });
    }



    console.log("Saving to db ...");
    // clear all existing documents from the collections
    Brand.find().remove();
    Category.find().remove();
    Product.find().remove();

    const bPromises = bArr.map(brand => new Brand(brand).save());
    const cPromises = cArr.map(category =>  new Category(category).save());
   

    Promise.all(bPromises, cPromises).then(() => {
        console.log("Done b and c")
        const pPromises = items.map(async ({brand, category, ...rest}) => {
            return new Product({
                brand: (await Brand.findOne({ brand_name: brand }))._id,
                category: (await Category.findOne({ category_name: category }))._id,
                ...rest
            }).save();
        });

        Promise.all(pPromises).then(() => {
            console.log("Done")
        })
    });

}


toImport.map(file => `./csv/${file}`)
    .forEach(path => {
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', data => {
                results.push(data);
            })
            .on('end', onEnd);
    })
