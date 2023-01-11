export const mapCommands = async (
  mappedCommands: any,
  commands: string[],
  args: any
): Promise<void> => {
  const promises: Array<Promise<void>> = [];
  commands.forEach((command) =>
    promises.push(mappedCommands[command]({ ...args }))
  );

  await Promise.all(promises);
};
