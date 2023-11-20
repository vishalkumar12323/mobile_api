import { Images } from "../models/image_api_schema.js";

//1. GET all mobile data
const getData = async (req, res) => {
  try {
    const data = await Images.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
};

//2. GET Filter mobile data
const getFilterData = async (req, res) => {
  try {
    const { name, company, price } = req.query;
    const queryObject = {};

    if (name) {
      queryObject.name = { $regex: name, $options: "i" };
    }
    if (company) {
      queryObject.company = company;
    }
    if (price) {
      queryObject.price = price;
    }
    console.log(queryObject);
    const data = await Images.find(queryObject);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
};

//3. POST mobile data
const creatMobileData = async (req, res) => {
  try {
    const data = new Images(req.body);
    const { name, price, rating, company } = data;
    const { Ram, Rom, Processer, Size, Camera, Battery } = data.features[0];
    if (
      name &&
      price &&
      rating &&
      company &&
      Ram &&
      Rom &&
      Processer &&
      Size &&
      Camera &&
      Battery
    ) {
      await data.save();
      console.log("success");
      res.status(201).json(data);
    } else {
      res.status(404).json({ error: "data not saved" });
    }
  } catch (error) {
    console.error(error);
  }
};

//4. UPDATE mobile data
const updateMobileData = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    console.log(updateData);
    const updateDocument = await Images.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updateDocument)
      return res.status(404).json({ error: "Document not found." });
    res.status(200).json(updateDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//5. DELETE mobile data
const deleteMobileData = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedDocument = await Images.findByIdAndDelete(id);

    if (!deletedDocument)
      return res.status(404).json({ msg: "Document not found." });
    res.status(200).json({ msg: "Document deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
};
export {
  getData,
  getFilterData,
  creatMobileData,
  updateMobileData,
  deleteMobileData,
};