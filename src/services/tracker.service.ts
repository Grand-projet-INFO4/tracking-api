import ResponseError from "@/helpers/response-error.helper";
import { TrackingDeviceModel, TrackingDeviceDocument } from "@/schemas/tracking-device.schema";

/**
 * Gets a tracking device by its serial id
 *
 * @param serialId The tracking device's serial id
 */
export async function getTrackerBySerialId(serialId: string) {
  const tracker = await TrackingDeviceModel.findOne({
    serialId,
  });
  if (!tracker) {
    throw new ResponseError(404, "Could not find the tracker having the given tracker id");
  }
  return tracker;
}

/**
 * Updates a given tracking device's data (Position + Speed)
 *
 * @param payload The tracker data payload
 */
export async function updateTrackerData(
  tracker: TrackingDeviceDocument,
  payload: {
    position: [number, number];
    speed: number;
    // In case the tracker has just got connected to the server
    connected?: true;
  },
) {
  tracker.position = {
    type: "Point",
    coordinates: payload.position,
  };
  tracker.speed = payload.speed;
  payload.connected && (tracker.connected = true);
  await tracker.save();
  return tracker;
}
