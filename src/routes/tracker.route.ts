import { Router, Response, NextFunction, Request } from "express";

import { authenticateTracker } from "@/middlewares/authenticate-tracker.middleware";
import { TrackingDeviceDocument } from "@/schemas/tracking-device.schema";
import { updateTrackerData } from "@/services/tracker.service";
import { ReqLocals } from "@/types/req-locals";

const trackerRouter = Router();

// Tracker authentication
trackerRouter.use(authenticateTracker);

// Creates a new entry of the tracking device's data
trackerRouter.post("/entries", async (req, res, next) => {
  try {
    res.json({ messager: "New tracking device data entry added" });
  } catch (error) {
    next(error);
  }
});

// Updates the tracking device's data
trackerRouter.put(
  "/",
  authenticateTracker,
  async (req: Request, res: Response<TrackingDeviceDocument, ReqLocals>, next: NextFunction) => {
    try {
      const [longitude, latitude, speed] = (req.body as { data: string }).data.split(",");
      const tracker = await updateTrackerData(res.locals.authTracker, {
        position: [parseFloat(longitude), parseFloat(latitude)],
        speed: parseFloat(speed),
      });
      res.json(tracker);
    } catch (error) {
      next(error);
    }
  },
);

export default trackerRouter;
