export enum TokenSymbol {
  STEP = "STEP",
  xSTEP = "xSTEP",
}

export const getTokenIconSrc = (symbol: TokenSymbol) => {
  if (symbol === TokenSymbol.STEP) {
    return "/step-token-icon.png";
  } else if (symbol === TokenSymbol.xSTEP) {
    return "/xstep-token-icon.png";
  } else {
    throw new Error("Symbol is not implemented!");
  }
};
