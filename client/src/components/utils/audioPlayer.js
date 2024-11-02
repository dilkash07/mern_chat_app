export const playNotification = (notificationSound) => {
  const audio = new Audio(notificationSound);
  audio.play();
};
