import Auction from './controller/Auction.js';
import Images from './controller/Images.js';
import Lots from './controller/Lots.js';

const images = {
  get: Images.get,
  add: Images.add
};

const auction = {
  create: Auction.create,
  get: Auction.get,
  setState: Auction.setState,
  getById: Auction.getById,
  winner: Auction.winner
};

const lots = {
  create: Lots.create
};

export default {
  images,
  auction,
  lots
};
