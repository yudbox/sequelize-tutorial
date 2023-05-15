module.exports = (str, tail = 4, asterisksNumber = 8) => {
  const asterisks = "".padEnd(asterisksNumber, "*");

  return str
    ? str.length < asterisksNumber
      ? asterisks
      : str.slice(0, tail) + asterisks + (tail === 0 ? "" : str.slice(-tail))
    : str === null
    ? str
    : "";
};
