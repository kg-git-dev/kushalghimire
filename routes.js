const routes = require("next-routes")();

routes
  .add("/auctions", "/auctions/auctionList")
  .add("/auctions/:address", "/auctions/show")
  .add("/campaigns/new", "/campaigns/new")
  .add("/campaigns/:address", "/campaigns/show")
  .add("/campaigns/:address/requests", "/campaigns/requests/index")
  .add("/campaigns/:address/requests/new", "/campaigns/requests/new");

module.exports = routes;
