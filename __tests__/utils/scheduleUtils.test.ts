import {
  formatDate,
  getDateDayCode,
  isScheduledOnDay,
  parseSchedule,
} from 'src/utils/scheduleUtils';

describe('parseSchedule', () => {
  it('returns empty array for empty string', () => {
    expect(parseSchedule('')).toEqual([]);
  });

  it('returns empty array for string shorter than 7 chars', () => {
    expect(parseSchedule('xx3xx')).toEqual([]);
  });

  it('parses xx3xxx7 as Wednesday and Sunday', () => {
    expect(parseSchedule('xx3xxx7')).toEqual(['3', '7']);
  });

  it('parses xxx4xxx as Thursday only', () => {
    expect(parseSchedule('xxx4xxx')).toEqual(['4']);
  });

  it('parses 1xxxxxx as Monday only', () => {
    expect(parseSchedule('1xxxxxx')).toEqual(['1']);
  });

  it('parses 1234567 as all seven days', () => {
    expect(parseSchedule('1234567')).toEqual(['1', '2', '3', '4', '5', '6', '7']);
  });

  it('returns empty array for xxxxxxx (no service days)', () => {
    expect(parseSchedule('xxxxxxx')).toEqual([]);
  });

  it('parses x2xxx6x as Tuesday and Saturday', () => {
    expect(parseSchedule('x2xxx6x')).toEqual(['2', '6']);
  });
});

describe('isScheduledOnDay', () => {
  it('returns true when day is in schedule', () => {
    expect(isScheduledOnDay('xx3xxx7', '3')).toBe(true);
    expect(isScheduledOnDay('xx3xxx7', '7')).toBe(true);
  });

  it('returns false when day is not in schedule', () => {
    expect(isScheduledOnDay('xx3xxx7', '1')).toBe(false);
    expect(isScheduledOnDay('xx3xxx7', '4')).toBe(false);
  });

  it('returns false for empty schedule', () => {
    expect(isScheduledOnDay('', '1')).toBe(false);
  });

  it('returns false for all-x schedule', () => {
    expect(isScheduledOnDay('xxxxxxx', '5')).toBe(false);
  });
});

describe('formatDate', () => {
  it('formats ISO date string to readable format', () => {
    const result = formatDate('2026-01-05');
    expect(result).toMatch(/05.*Jan.*2026/);
  });

  it('formats another date correctly', () => {
    const result = formatDate('2026-03-31');
    expect(result).toMatch(/31.*Mar.*2026/);
  });
});

describe('getDateDayCode', () => {
  it('returns 1 for a Monday', () => {
    expect(getDateDayCode('2026-01-05')).toBe('1');
  });

  it('returns 5 for a Friday', () => {
    expect(getDateDayCode('2026-01-09')).toBe('5');
  });

  it('returns 7 for a Sunday', () => {
    expect(getDateDayCode('2026-01-11')).toBe('7');
  });

  it('returns 6 for a Saturday', () => {
    expect(getDateDayCode('2026-01-10')).toBe('6');
  });
});
