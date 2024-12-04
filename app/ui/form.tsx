'use client'

import { createPointOfInterest } from '@/app/actions';
import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useActionState, useEffect, useMemo, useRef, useState } from 'react';
import { GeocodeData } from '../interfaces/geocode';

const initialState = {
  message: '',
  errors: undefined,
}

export function Form() {

  // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#programmatic-form-submission
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      (['Enter', 'NumpadEnter'].includes(e.key))) {
        e.preventDefault();
        e.currentTarget.form?.requestSubmit();
    }
  }

  // https://github.com/visgl/react-google-maps/blob/27eff1395293989403954b0750853a119b007558/examples/autocomplete/src/autocomplete-classic.tsx
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [geocodeData, setGeocodeData] = 
    useState<GeocodeData | null>(null);
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  // https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#passing-additional-arguments
  const createPointOfInterestWithGeocoding =
    createPointOfInterest.bind(null, geocodeData!);

  const [state, formAction] = useActionState(
    createPointOfInterestWithGeocoding,
    initialState,
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary('places');
  const geocoding = useMapsLibrary('geocoding');

  const geocoder = useMemo(
    () => geocoding && new geocoding.Geocoder(),
    [geocoding],
  );

  useEffect(() => {
    if (
      !places ||
      !inputRef.current
    ) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places, inputRef]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener('place_changed', () => {
      const newPlace = placeAutocomplete.getPlace();
      setSelectedPlace(newPlace);
      geocoder?.geocode({ address: newPlace.formatted_address }, (results, status) => {
        if (status === 'OK' && results?.length) {
          const {
            place_id,
            formatted_address,
            geometry: { location: { lat, lng } },
            types } = results[0];
          setGeocodeData({
            place_id, formatted_address, lat: lat(), lng: lng(), types,
          });
        }
      });
    });

  }, [placeAutocomplete, selectedPlace, geocoder]);


  return (
    <form
      className="flex flex-col items-center"
      action={formAction} onKeyDown={handleKeyDown}
    >
      <div className="m-8 w-80">
        <div className="w-full">
          <div>
            <input
              id="place"
              name="place"
              ref={inputRef}
              className="appearance-none block w-full bg-blue-100 text-blue-700 border rounded p-4 focus:outline-none focus:bg-white"
            />
            {
              state?.errors?.place &&
              <span className="mt-2 text-sm text-red-500">
                { state.errors.place }
              </span>
            }
          </div>
        </div>
      </div>
      <p aria-live="polite">{state?.message}</p>
      <button
        type='submit'
        className='w-80 bg-blue-100 text-blue-700 border rounded p-4'
      >Create</button>
    </form>
  )
}
