import Auction from './controller/Auction.js';
import Images from './controller/Images.js';

const images = {
  get: Images.get,
  add: Images.add
};

const auction = {
  create: Auction.create
};

export default {
  images,
  auction
};
