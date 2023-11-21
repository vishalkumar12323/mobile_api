import mongoose from "mongoose";

const mobileApiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  features: [
    {
      Ram: {
        type: String,
        required: true,
      },
      Rom: {
        type: String,
        required: true,
      },
      Processer: {
        type: String,
        required: true,
      },
      Size: {
        type: String,
        required: true,
      },
      Camera: {
        type: String,
        required: true,
      },
      Battery: {
        type: String,
        required: true,
      },
    },
  ],
  company: {
    type: String,
    required: true,
  },
});

const Mobiles = mongoose.model("mobile", mobileApiSchema);
export { Mobiles };
