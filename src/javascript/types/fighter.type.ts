export type FighterType = {
  _id: string;
  name: string;
  source: string;
};

export type FighterDetails = FighterType & {
  health: number;
  attack: number;
  defense: number;
};
