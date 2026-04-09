import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
    problem:{
        type: String,
        default: ""
    },
    solution_1:{
        type: String,
        default: ""
    },
    solution_2:{
        type: String,
        default: ""
    },
    judge:{
        solution_1_score:{
            type: Number,
            default: 0
        },
        solution_2_score:{
            type: Number,
            default: 0
        },
        solution_1_reasoning:{
            type: String,
            default: ""
        },
        solution_2_reasoning:{
            type: String,
            default: ""
        }
    }
},{timestamps: true})

const responseModel = mongoose.model("Response", responseSchema);

export default responseModel;