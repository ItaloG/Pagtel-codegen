export function logger({ message, type }: Params) {
  const colors = {
    info: "yellow",
    error: "red",
    success: "lightgreen",
  };

  return console.log(
    `%c${type} %c${message}`,
    `color: ${colors[type]}`,
    "color: white"
  );
}

type Params = {
  type: "info" | "error" | "success";
  message: string;
};
