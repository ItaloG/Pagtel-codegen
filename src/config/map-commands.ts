export const mapCommands = async (
  mappedCommands: any,
  commands: any
): Promise<void> => {
  const mappedCommandKeys = Object.keys(mappedCommands);
  const promises: Array<Promise<void>> = [];
  mappedCommandKeys.forEach((mappedCommand) => {
    if (!commands[mappedCommand]) return;
    promises.push(mappedCommands[mappedCommand]({ ...commands }));
  });

  await Promise.all(promises);
};
