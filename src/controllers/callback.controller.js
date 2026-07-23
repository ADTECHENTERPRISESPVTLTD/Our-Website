const Callback = require("../models/callback.model");

// POST/api/callback

const createCallback = async (req, res) => {

    try{
        const callback = await Callback.create(req.body);

        res.status(201).json({

            success: true,
            message: "Callback request submitted successfully",
            data: callback,
        }); 
    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET/api/callback

const getCallbacks = async (req, res) => {

    try{
        const callbacks = await Callback.find().sort({ createdAt: -1});

        res.status(200).json({
            success: true,
            count: callbacks.length,
            data: callbacks,
        });
    } catch (error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createCallback,
    getCallbacks,
};