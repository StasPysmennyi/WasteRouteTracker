# WasteRouteTracker

React Native app for visualizing waste collection routes. Displays pre-geocoded stops on a map with route polylines and collection schedule.

## Features

- Map view with route markers and polylines connecting stops in collection order
- Week navigation strip — browse routes day by day
- Schedule decoding: `xxx4xxx` = Thursday only, `xx3xxx7` = Wednesday + Sunday, etc.
- Frequency display: `1xn` = once a week, `1x2n` = once every 2 weeks
- Multiple routes per day — cycle between them with the route toggle button
- Route statistics: stops, total volume, bins per route

## Tech Stack

- React Native 0.85.3 (New Architecture enabled)
- TypeScript
- Redux Toolkit
- @maplibre/maplibre-react-native
- react-native-svg (icons)
- react-native-reanimated + react-native-worklets
- @react-navigation/bottom-tabs + native-stack
- Husky + lint-staged + ESLint + Prettier

## Data

Route data is stored in `src/assets/data/` — last full week of March 2026 (Mon 2026-03-23 → Sun 2026-03-29):

- 35 routes across 7 days
- ~6,400 stops total
- Addresses in Jelgava, Latvia

Addresses are pre-geocoded via Mapbox Geocoding API and stored in `src/assets/data/geocodingCache.json` (committed to git). The app loads the cache as Redux initial state — no runtime geocoding, no API calls on startup.

## Requirements

- Node >= 22.11.0
- Yarn 3.x
- Ruby + Bundler (iOS)
- Xcode (iOS) / Android Studio (Android)
- React Native environment: https://reactnative.dev/docs/set-up-your-environment

## Setup

This project uses **Yarn** — do not use `npm install`.

```bash
yarn install
```

### iOS

```bash
cd ios && bundle install && cd ..
cd ios && bundle exec pod install && cd ..
yarn ios
```

### Android

```bash
yarn android
```

## Scripts

```bash
yarn start        # start Metro bundler
yarn ios          # run on iOS simulator
yarn android      # run on Android emulator
yarn lint         # ESLint
yarn prettier     # Prettier format
yarn ts-check     # TypeScript check
yarn test         # Jest
```

## Geocoding (one-time, already done)

`scripts/geocodeAddresses.js` geocodes all addresses via Mapbox and writes `src/assets/data/geocodingCache.json`. The output is committed to git — other developers do not need to run this script.

To re-run (e.g. after updating route data), add a `MAPBOX_ACCESS_TOKEN` to `.env` (see `.env.example`) and run:

```bash
node scripts/geocodeAddresses.js
```

## Project Structure

```
src/
├── assets/
│   └── data/
│       ├── routes.json           # route data
│       └── geocodingCache.json   # pre-geocoded addresses (committed)
├── components/
│   ├── Icons/     # SVG icon components
│   ├── RouteCard/ # route list card
│   ├── StatsCard/ # stats display card
│   ├── TabBar/    # custom bottom tab bar
│   └── WeekStrip/ # day selector strip
├── constants/     # mapConfig, routeConfig, scheduleConfig, tabBarConfig
├── hooks/         # useRoutesByDate, useWeekNavigation, useAppDispatch/Selector
├── models/
│   ├── enums/     # DayOfWeek, ScreenNames, TabNames
│   └── types/     # Route, RouteStop, GeocodedRoute, Coordinate, ...
├── navigation/    # bottom tab navigator
├── screens/
│   ├── MapScreen/     # map with routes, polylines, week strip
│   ├── RoutesScreen/  # list of routes for selected day
│   └── StatsScreen/   # statistics and charts
├── store/
│   └── slices/
│       ├── routesSlice.ts    # routes data, selected date/route
│       └── geocodingSlice.ts # pre-geocoded cache as initial state
├── theme/         # colors, spacing, typography
└── utils/         # schedule parsing, map helpers
```

## Schedule Code Format

Each stop has a 7-character schedule code where each position represents a day (Mon – Sun):

- digit = service on that day
- `x` = no service

Examples:

- `xxx4xxx` → Thursday only
- `xx3xxx7` → Wednesday + Sunday
- `x2x4xx7` → Tuesday + Thursday + Sunday
- `1234567` → every day

## Frequency Codes

- `1xn` — once a week
- `1x2n` — once every 2 weeks
- `1x3n` — once every 3 weeks
- `1xnn` — once a week (variant)
