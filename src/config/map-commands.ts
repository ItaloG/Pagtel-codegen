export const mapCommands = async (
  mappedCommands: any,
  commands: any
): Promise<void> => {
  const mappedCommandKeys = Object.keys(mappedCommands);
  const promises: Array<Promise<void>> = [];
  mappedCommandKeys.forEach((mappedCommand) => {
    console.log(commands);
    console.log(mappedCommand);
    console.log(commands[mappedCommand]);

    if (!commands[mappedCommand]) return;
    promises.push(commands[mappedCommand]({ ...commands }));
  });

  await Promise.all(promises);
};
