type TimeSlot = string; // "HH:mm" format (e.g., "12:30")

/**
 * Converts a time string (e.g., "12:30") into minutes since midnight.
 * @param time - Time in "HH:mm" format
 * @returns The total minutes since midnight
 */
function convertToMinutes(time: TimeSlot): number {
  const [hours, minutes] = time?.split(":")?.map(Number) || [0, 0];
  return hours * 60 + minutes;
}

/**
 * Finds the nearest time slot from the current time and a list of time slots.
 * @param currentTime - The current time in "HH:mm" format
 * @param timeSlots - Array of time slots in "HH:mm" format
 * @returns The nearest time slot
 */
export function findNearestTimeSlot({
  currentTime,
  timeSlots,
}: {
  currentTime: TimeSlot;
  timeSlots: TimeSlot[];
}): TimeSlot {
  const currentTimeInMinutes = convertToMinutes(currentTime);

  // Convert all time slots to minutes and find the closest one
  let nearestTimeSlot = timeSlots[0];
  let minDifference = Math.abs(
    currentTimeInMinutes - convertToMinutes(nearestTimeSlot),
  );

  for (let i = 1; i < timeSlots.length; i++) {
    const timeSlotInMinutes = convertToMinutes(timeSlots[i]);
    const difference = Math.abs(currentTimeInMinutes - timeSlotInMinutes);

    // If this time slot is closer, update the nearest time slot
    if (difference < minDifference) {
      nearestTimeSlot = timeSlots[i];
      minDifference = difference;
    }
  }

  return nearestTimeSlot;
}
