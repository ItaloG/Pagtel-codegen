export function logger({ message, type }: Params) {
  const tags = {
    info: "[INFO]".yellow,
    error: "[ERROR]".red,
    success: "[SUCCESS]".green,
  };

  return console.log(tags[type], message);
}

type Params = {
  type: "info" | "error" | "success";
  message: string;
};
