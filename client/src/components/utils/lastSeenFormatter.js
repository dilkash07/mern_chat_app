export const formattedLastSeen = (lastSeenTimestamp) => {
  const lastSeenDate = new Date(lastSeenTimestamp);
  const now = new Date();

  // Calculate time difference in milliseconds
  const diffTime = now - lastSeenDate;
  const oneDay = 24 * 60 * 60 * 1000;

  // Define format options
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
  const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

  if (diffTime < oneDay && now.getDate() === lastSeenDate.getDate()) {
    // Today
    return `today at ${lastSeenDate.toLocaleTimeString([], timeOptions)}`;
  } else if (
    diffTime < 2 * oneDay &&
    now.getDate() - lastSeenDate.getDate() === 1
  ) {
    // Yesterday
    return `yesterday at ${lastSeenDate.toLocaleTimeString([], timeOptions)}`;
  } else if (diffTime < 7 * oneDay) {
    // Last week, show day of the week
    const dayOptions = { weekday: "long" };
    return `${lastSeenDate.toLocaleDateString(
      [],
      dayOptions
    )} at ${lastSeenDate.toLocaleTimeString([], timeOptions)}`;
  } else {
    // Older than a week, show full date
    return `${lastSeenDate.toLocaleDateString(
      [],
      dateOptions
    )} at ${lastSeenDate.toLocaleTimeString([], timeOptions)}`;
  }
};
