import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {

    const query = {};

    if (req.query.featured) {
      query.featured = req.query.featured === 'true';
    }

    if (req.query.min && !isNaN(req.query.min)) {
      query.cheapestPrice = { $gte: parseInt(req.query.min) }; // Filter hotels with minimum price
    }

    if (req.query.max && !isNaN(req.query.max)) {
      if (query.cheapestPrice) {
        query.cheapestPrice.$lte = parseInt(req.query.max); // Filter hotels with maximum price
      } else {
        query.cheapestPrice = { $lte: parseInt(req.query.max) };
      }
    }

    const limit = parseInt(req.query.limit);

    const hotels = await Hotel.find(query).limit(limit);
    
    // if (req.query.featured) {
    //   query.featured = req.query.featured === 'true'; // Parse 'featured' as boolean
    // }
    // const Limit = parseInt(req.query.limit);   
    // const hotels = await Hotel.find({query, cheapestPrice: { $gt: min | 1, $lt: max || 999 },}).limit(Limit);
    //  const hotels = await Hotel.find({
    //   ...others,
    //   cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    // }).limit(req.query.limit);
    res.status(200).json(hotels);
  
  } catch (err) {
    next(err);
  }
};
// cheapestPrice: { $gt: min | 1, $lt: max || 999 },
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "Hotels", count: hotelCount },
      { type: "Apartments", count: apartmentCount },
      { type: "Resorts", count: resortCount },
      { type: "Villas", count: villaCount },
      { type: "Cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};