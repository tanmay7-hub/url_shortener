import express from 'express';
import { createShortUrl , redirectUrl} from '../controllers/url.controller.js';

const router= express.Router();

router.route("/shorten").post(createShortUrl);
router.route("/:shortenCode").get(redirectUrl);
export default router;