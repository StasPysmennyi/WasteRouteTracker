# WasteRouteTracker

React Native app for visualizing waste collection routes from Excel data. Geocodes addresses, displays them on a map with route polylines, and shows collection schedule and statistics.

## Features

- Map view with route markers and polylines connecting stops in collection order
- Week navigation strip — browse routes day by day (Jan 1 – Mar 31, 2026)
- Schedule decoding: `xxx4xxx` = Thursday only, `xx3xxx7` = Wednesday + Sunday, etc.
- Frequency display: `1xn` = once a week, `1x2n` = once every 2 weeks
- Lazy geocoding via OpenStreetMap Nominatim (rate-limited, cached across sessions)
- Route statistics: stops per day of the week, top addresses, total volume/bins
- Multiple routes per day — cycle between them with the route toggle button

## Tech Stack

- React Native 0.85.3 (no Expo)
- TypeScript
- Redux Toolkit and redux-persist (geocoding cache persisted to AsyncStorage)
- axios (Nominatim geocoding API)
- react-native-maps
- react-native-svg (Icons)
- react-native-reanimated + react-native-worklets
- @react-navigation/bottom-tabs + native-stack
- Husky + lint-staged + ESLint + Prettier

## Data

Route data is pre-processed from the Excel file into `src/assets/data/routes.json`:
- Four hundred thirty routes across 90 days (Jan 1 – Mar 31, 2026)
- 79,552 stops total
- Addresses are in Jelgava, Latvia

Geocoding happens lazily for the currently selected day. Results are cached in AsyncStorage via redux-persist, so addresses are not re-geocoded on later launches.

## Requirements

- Node >= 22.11.0
- Yarn 3.x
- Ruby + Bundler (iOS)
- Xcode (iOS) / Android Studio (Android)
- React Native environment set up: https://reactnative.dev/docs/set-up-your-environment

## Setup

```bash
yarn install
```

### iOS

```bash
# First clone only — installs the CocoaPods version pinned in ios/Gemfile.lock
cd ios && bundle install && cd ..

# Every time native dependencies change
cd ios && bundle exec pod install && cd ..

yarn ios
```

> `bundle exec pod install` ensures all team members use the same CocoaPods version (pinned in `ios/Gemfile.lock`), avoiding subtle build differences between machines.

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

## Project Structure

```
src/
├── api/           # Nominatim geocoding API
├── assets/
│   └── data/
│       └── routes.json   # pre-processed Excel data
├── components/
│   ├── Icons/     # SVG icon components (BinIcon, RouteIcon, StatsIcon, ...)
│   ├── BinMarker/ # custom map marker
│   ├── RouteCard/ # route list card
│   ├── StatsCard/ # stats display card
│   ├── TabBar/    # custom bottom tab bar
│   └── WeekStrip/ # day selector strip
├── constants/     # mapConfig, routeConfig, scheduleConfig, tabBarConfig
├── hooks/         # useGeocoding, useRoutesByDate, useWeekNavigation, useAppDispatch/Selector
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
│       └── geocodingSlice.ts # geocoding cache
├── theme/         # colors, spacing, typography
└── utils/         # schedule parsing (parseSchedule)
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
