import { pgTable, point, varchar } from 'drizzle-orm/pg-core';

export const pointsOfInterest = pgTable(
  'points-of-interest',
  {
    placeId: varchar().notNull().unique(),
    formattedAddress: varchar().notNull(),
    location: point(
      'location',
      {
        mode: 'tuple'
      },
    ).notNull(),
    type: varchar(),
  },
);
