export const formatPhoneNumber = (numString: string) => {
  if (numString.length >= 11) {
    return (
      numString.slice(0, 3) +
      '-' +
      numString.slice(3, 7) +
      '-' +
      numString.slice(7)
    );
  } else return numString;
};

export const addComma = (num: number) => {
  const regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ',');
};

export const addCommaInNumberString = (str: string) => {
  if (str.length <= 0) return str;
  const regexp = /\B(?=(\d{3})+(?!\d))/g;
  return str.replace(regexp, ',');
};
