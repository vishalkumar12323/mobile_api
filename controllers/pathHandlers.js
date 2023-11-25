import { Mobiles } from "../models/image_api_schema.js";

//1. GET all mobile data
const getData = async (req, res) => {
  try {
    const data = await Mobiles.find();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
};

//2. GET Filter mobile data
const getFilterData = async (req, res) => {
  try {
    const { name, company, price, rating, sort, select } = req.query;
    const queryObject = {};

    if (name) {
      queryObject.name = { $regex: name, $options: "i" };
    }
    if (company) {
      queryObject.company = { $regex: company, $options: "i" };
    }
    if (price) {
      queryObject.price = price;
    }
    if (rating) {
      queryObject.rating = rating;
    }

    let apiData = Mobiles.find(queryObject);
    if (sort) {
      let sortedData = sort.split(",").join(" ");
      apiData.sort(sortedData);
    }

    if (select) {
      let selectedData = select.split(",").join(" ");
      apiData.select(selectedData);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;

    let skip = (page - 1) * limit;
    apiData = apiData.skip(skip).limit(limit);
    const data = await apiData;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
};

//3. POST mobile data
const creatMobileData = async (req, res) => {
  try {
    const data = new Mobiles(req.body);
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

//4. REPLACE mobile data
const replaceMobileData = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      price,
      rating,
      company,
      ram,
      rom,
      processer,
      size,
      camera,
      battery,
    } = req.body;
    const data = await Mobiles.findById({ _id: id });
    data.name = name;
    data.price = price;
    data.rating = rating;
    data.features.forEach((value) => {
      value.Ram = ram;
      value.Rom = rom;
      value.Processer = processer;
      value.Size = size;
      value.Camera = camera;
      value.Battery = battery;
    });
    data.company = company;
    if (!data) return res.status(404).json({ msg: "Document not updated." });
    data.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//5. UPDATE mobile data
const updateMobileData = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const updateDocument = await Mobiles.findByIdAndUpdate(id, updateData, {
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

//6. DELETE mobile data
const deleteMobileData = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedDocument = await Mobiles.findByIdAndDelete(id);

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
  replaceMobileData,
  deleteMobileData,
};
