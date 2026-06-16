import { type TYPES } from 'src/models';

export const mapRawRoutes = (raw: TYPES.RawRoute[]): TYPES.Route[] =>
  raw.map(rawRoute => ({
    id: rawRoute.id,
    date: rawRoute.date,
    stops: rawRoute.stops.map(rawStop => ({
      order: rawStop.o,
      address: rawStop.a,
      binCode: rawStop.b,
      schedule: rawStop.s,
      frequency: rawStop.f,
      volume: rawStop.v,
      containers: rawStop.c,
    })),
  }));
