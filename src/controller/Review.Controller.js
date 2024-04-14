


import { Review } from "../models/Review.model.js";
import { ApiError } from "../utilis/ApiError.utilis.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { uploadCloudinary } from "../utilis/Cloudinary.utilis.js";
import { asyncHandler } from "../utilis/asyncHandler.utilis.js";


// ! controller for create review 
const createReview = asyncHandler(async (req, res) => {


    // console.log("req .body into create review function  ", req.body)
    // console.log("review Image  create review function  ", req.file)
    const { name, description, company } = req.body;
    // console.log("Into create review function. Review Name:", name);
    // console.log("Review Description:", description);
    // console.log("Review company:", company);


    // * Checking the Review name is already present or not 
    const reviewFind = await Review.findOne({ name })
    // console.log(" reviewFind : ", reviewFind)
    if (reviewFind != null) {
        throw new ApiError(400, "Reivew is already Exists")
    }
    // valiate the image 
    const reviewImagePath = req.file?.path; // Contains information about the uploaded file

    if (!reviewImagePath) {
        throw new ApiError(400, "Review image  is not find Succesfully")
    }



    // * upload file on cloudinary and generate url 
    const reviewImageLink = await uploadCloudinary(reviewImagePath)
    // console.log("print the url of the review image after uplad to cloudinary ", reviewImageLink)

    // * create new Review 
    const createReviewDb = await Review.create({
        name,
        description,
        company,
        reviewImage: reviewImageLink?.url

    })


    //  * return the respones 

    console.log("createReviewDb :  ", createReviewDb)


    res.status(201).json(
        new ApiResponse(200, "Review is created ")
    )
})

// ! Controller for fetch review 


const fetchReview = asyncHandler(async (req , res) => {


    const fetchReviewDb = await Review.find();

    res.status(200).json(new ApiResponse(200, "Review is Fetched ", fetchReviewDb))

})

export { createReview, fetchReview }