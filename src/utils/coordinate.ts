import { Coordinate } from 'types/event';

const getDistanceCoordinate = (
  focusCoordinate: Coordinate,
  screenCoordinate: Coordinate,
) => {
  const degreeToradius = (degree: number) => {
    return degree * (Math.PI / 180);
  };

  const RADIUSE = 6371; // Radius of the earth in km
  const degreeLatitude = degreeToradius(
    screenCoordinate.latitude - focusCoordinate.latitude,
  ); // deg2rad below
  const degeeLongitude = degreeToradius(
    screenCoordinate.longitude - focusCoordinate.longitude,
  );
  const calcDegree =
    Math.sin(degreeLatitude / 2) * Math.sin(degreeLatitude / 2) +
    Math.cos(degreeToradius(focusCoordinate.latitude)) *
      Math.cos(degreeToradius(screenCoordinate.latitude)) *
      Math.sin(degeeLongitude / 2) *
      Math.sin(degeeLongitude / 2);
  const result =
    2 * Math.atan2(Math.sqrt(calcDegree), Math.sqrt(1 - calcDegree));
  const distance = RADIUSE * result; // Distance in km
  return distance;
};

export default getDistanceCoordinate;
