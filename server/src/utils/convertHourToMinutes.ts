const convertHourToMinutes = (time: string) => {
  const [hour, minutes] = time.split(":").map(Number);
  return 60 * hour + minutes;
};

export default convertHourToMinutes;
