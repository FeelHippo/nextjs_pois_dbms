'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod';
import { GeocodeData } from "./interfaces/geocode";
import DB from './data/storage';
import { pointsOfInterest } from './data/schema';

const schema = z.object({
  place: z.string({
    message: 'Place is Required.'
  }),
  placeId: z.string(),
  formattedAddress: z.string(),
  lat: z.number(),
  lng: z.number(),
  type: z.string(),
});

export async function createPointOfInterest(
  geocoding: GeocodeData,
  _prevState: unknown,
  formData: FormData,
) {

  const {
    placeId,
    formattedAddress,
    lat,
    lng,
    type,
  } = geocoding;
  const validatedFields = schema.safeParse({
    place: formData.get('place'),
    placeId,
    formattedAddress,
    lat,
    lng,
    type,
  });

  if(!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (!geocoding) {
    return { message: 'Invalid Data' };
  }

  const result = await DB.insert(pointsOfInterest).values({
    placeId,
    formattedAddress,
    location: [lat, lng],
    type,
  });
  console.log('### result', result, '###')

  const result_select = await DB.select().from(pointsOfInterest);
  console.log('### result_select', result_select, '###')

  revalidatePath('/points-of-interest');
  redirect('/dashboard'); // /points-of-interest/new_id

}
