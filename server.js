var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var path = require('path');
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, '/static')));
app.use(express.static( __dirname + '/angular-app/dist'));
// app.set('views', path.join(__dirname, '/views'));
// app.set('view engine', 'ejs');
var mongoose = require('mongoose'); //require mongoose
mongoose.connect('mongodb://localhost/belt2db');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var RestaurantSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: [3, "Restaurant names must be at least 3 characters"]},
    cuisine: {type: String, required: true, minlength: [3, "Cuisine type must be at least 3 characters"]},
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
}, {timestamps: true})

mongoose.model('Restaurant', RestaurantSchema);
var Restaurant = mongoose.model('Restaurant');

var ReviewSchema = new mongoose.Schema({
    _restaurant: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
    name: {type: String, required: [true, "Review cannot be annonymous"], minlength: [3, "Reviewer names must be at least 3 characters"]},
    text: {type: String, required: [true, "Review cannot be blank"], minlength: [3, "Reviews must be at least 3 characters"]}, 
    stars: {type: Number, required: [true, "Please specify the star rating"]}
}, {timestamps: true})

mongoose.model('Review', ReviewSchema);
var Review = mongoose.model('Review');

app.get('/restaurants', function(req, res){  //Get All listings
    Restaurant.find({}, function(err, data){
        if(err){
            res.json({message: 'Error', error: err})
        }
        else{
            res.json({message: 'Success', restaurants: data})
        }
    })
})

app.post('/restaurants', function(req, res){
    Restaurant.find({name: req.body.name}, function(err, restaurants){
        if(restaurants.length == 0){
            let new_restaurant = new Restaurant();
            new_restaurant.name = req.body.name,
            new_restaurant.cuisine = req.body.cuisine,
            new_restaurant.save(function(err){
                if(err){
                    console.log('New Restaurant error', err);
                    res.json({message: 'Error', error: err})
                }
                else{
                    res.json({message: `Added ${new_restaurant.name} to db`})
                    console.log('Restaurant Added');
                }
            })
        }
        else{
            res.json({message: 'Restaurant already exists sucka'})
        }
    })
})

app.get('/restaurants/:id', function(req, res){
    Restaurant.findOne({_id: req.params.id}, function(err, restaurants){
        if(err){
            res.json({message: 'Error', error: err})
        }
        else{
            res.json({message: 'Success', data: restaurants})
        }
    })
})

app.delete('/restaurants/:id', function(req, res){
    Restaurant.remove({_id: req.params.id}, function(err, restaurants){
        if(err){
            res.json({message: 'Error', error: err})
        }
        else{
            res.json({message: 'Restaurant Deleted', data: restaurants})
        }
    })
})

app.put('/restaurants/:id', function(req, res){ //Update Restaurant
    Restaurant.update({_id: req.params.id}, {
        name: req.body.name,
        cuisine: req.body.cuisine
    }, function(err, data){
        if(err){
            res.json({message: 'Error', error: err})
        }
        else{
            res.json({message: 'Success', restaurants: data})
        }
    })
})

app.get('/review/:id', function(req, res){  //Get Reviews for a restaurant
    Restaurant.findOne({_id: req.params.id}).populate('reviews').exec(function(err, restaurants){
        if(err){
            res.json({message: 'Error', error: err})
        }
        else{
            res.json({message: 'Success: ', data: restaurants})
        }
    })
})

app.post('/review/:id', function(req, res){ //Add review to a restaurant
    Restaurant.findOne({_id: req.params.id}, function(err, restaurant){
        var review = new Review(req.body);
        review._restaurant = restaurant._id;
        restaurant.reviews.push(review);
        review.save(function(err){
            // console.log("made it to server", err);
            if(err){
                res.json({message: 'Review Error', error: err})
            }
            else{
                console.log("Review saved successfully");
                restaurant.save(function(err){
                    if(err){
                        
                        res.json({message: 'Error saving restaurant', error: err})
                        
                    }
                    else{
                        res.json({message: `Added ${review.name} to db`})
                        res.json({message: 'Review:', data: restaurant})
                    }
                })
            }
        })
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular-app/dist/index.html"))
});


app.listen(8000, function(){
    console.log("Listening on port 8000");
})
