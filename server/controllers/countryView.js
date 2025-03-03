const countries = require("../models/CountriesModel");
const CountriesModel=require("../models/CountriesModel");
const DestinationsModel = require("../models/DestinationsModel");
const packageModel = require("../models/PackageModel");
const mongoose=require("mongoose")
const countryWisegridView = async (req, res) => {
    try {
        const countries = await CountriesModel.aggregate([
            {
                $match: { gridViewStatus: true }
            },
            {
                $lookup: {
                    from: "packages",
                    localField: "_id",
                    foreignField: "countryId",
                    as: "packages"
                }
            },
            {
                $project: {

                    countryId: "$_id",
                    name:"$name",
                    gridViewStatus: "$gridViewStatus",
                    heading: "$coverHeading",
                    paragraph: "$coverParagraph",
                    image: "$homeFetaureImage",
                    Packages: {
                        $filter: {
                            input: "$packages",
                            as: "pkg",
                            cond: { $eq: ["$$pkg.countryViewStatus", true] }
                        }
                    }
                }
            },
            {
                $project: {
                    "Packages._id": 0
                }
            }
        ]);

        return res.status(200).json({ countryDetails: countries });

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

module.exports={countryWisegridView}