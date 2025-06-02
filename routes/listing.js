const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

router
  .route("/")
  .get(wrapAsync(listingController.index)) //// Index Route - all listings
  .post(
    // Create Route
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );


// New route - new listing create // always keep above show route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router
  .route("/:id") // Show route - specific listing with respect to id
  .get(wrapAsync(listingController.showListing))
  .put(  //Update Route
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete( //Delete Route
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
