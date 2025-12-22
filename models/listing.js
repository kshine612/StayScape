const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const defaultimg = "https://unsplash.com/illustrations/a-picture-of-a-house-with-trees-around-it-M11Lpq205EI";

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: defaultimg,
        //set: (v) => v===""? "/home.png" : v,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },

    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review", 
    },],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;