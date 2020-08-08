const formatTime = (time: string) => {
  let [hours, minutes] = time.split(" ")[0].split(":").map(Number);
  if (time[time.length - 2] === "P") hours += 12;
  return `${hours >= 10 ? hours : hours + "0"}:${
    minutes >= 10 ? minutes : minutes + "0"
  }`;
};

export default formatTime;
