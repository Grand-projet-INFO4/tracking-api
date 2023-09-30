import ResponseError from "@/helpers/response-error.helper";
import { getTrackerBySerialId } from "@/services/tracker.service";
import { NextFunction, Request, Response } from "express";

// Key of the tracking device's key from the request headers
const TRACKER_SERIAL_ID_HEADERS_KEY = "X-TRACKER-SERIAL-ID";
const TRACKER_SERIAL_ID_HEADERS_KEY_LOWERCASE = TRACKER_SERIAL_ID_HEADERS_KEY.toLowerCase();

/**
 * Requires a route to be authenticated with an existing tracking device by passing the tracking's device serial id along the headers.
 */
export async function authenticateTracker(req: Request, res: Response, next: NextFunction) {
  try {
    if (
      !(
        TRACKER_SERIAL_ID_HEADERS_KEY_LOWERCASE in req.headers || TRACKER_SERIAL_ID_HEADERS_KEY in req.headers
      )
    ) {
      return next(new ResponseError(401, "The tracking device's serial is missing"));
    }
    const serialId = (req.headers[TRACKER_SERIAL_ID_HEADERS_KEY_LOWERCASE] ??
      req.headers[TRACKER_SERIAL_ID_HEADERS_KEY]) as string;
    const tracker = await getTrackerBySerialId(`${serialId}`);
    res.locals = {
      ...res.locals,
      authTracker: tracker,
    };
    next();
  } catch (error) {
    next(error);
  }
}
