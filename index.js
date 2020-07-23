const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: 'Spaghetti',
      level: 'Easy Peasy',
      ingredients: ['Tomatoes','Olive oil','Pasta'],
      cuisine: 'Italian',
      dishType: 'main_course',
      image: "https://images.media-allrecipes.com/images/75131.jpg",
      duration: 20,
      creator: 'Alessandro',
      created: Date.now()

    });
  })
  .then(()=>{
    Recipe.insertMany(data);
  })
  .then (() => {
    for(let i = 0;i < data.length;i++){
      console.log(data[i].title);
    }
   })
   .then(() => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100});
  })
  .then(()=>{
    console.log("recipe updated");
  })
  .then(() => {
    return Recipe.findOneAndDelete({title: "Carrot Cake"});
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .then(()=>{
    console.log("recipe deleted");
  })
  .then(()=>{
    return mongoose.disconnect();
  })
  .then(()=>{
    console.log("disconnected from mongoose");
  });