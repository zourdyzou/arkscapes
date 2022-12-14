export const shortenNumber = (num: number) => {
  const format = (value: number, postFix: string) => {
    const str = value.toString();
    let decimalPoint = 0;

    if (str.indexOf(".") > -1 && str[str.indexOf(".") + 1] !== "0") {
      decimalPoint = 1;
    }

    return `${value.toFixed(decimalPoint)}${postFix}`;
  };

  const limits = {
    THOUSAND: 1000,
    MILLION: 1000000,
    BILLION: 1000000000,
    TRILLION: 1000000000000,
  };

  if (num >= limits.TRILLION) return format(num / limits.TRILLION, "T");

  if (num >= limits.BILLION) return format(num / limits.BILLION, "B");

  if (num >= limits.MILLION) return format(num / limits.MILLION, "M");

  if (num >= limits.THOUSAND) return format(num / limits.THOUSAND, "K");

  return Number(num.toFixed(0));
};
