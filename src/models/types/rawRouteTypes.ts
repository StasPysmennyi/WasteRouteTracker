export type RawStop = {
  o: number;
  a: string;
  b: string;
  s: string;
  f: string;
  v: number;
  c: number;
};

export type RawRoute = {
  id: string;
  date: string;
  stops: RawStop[];
};
