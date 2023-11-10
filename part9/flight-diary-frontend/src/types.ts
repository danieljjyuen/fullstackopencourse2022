export interface FlightDiary {
    id: number;
    date: Date;
    weather: Weather;
    visibility: Visibility;
    comment: string;
}

export type NewFlightDiary = Omit<FlightDiary, 'id'>
export type FlightDiaryNoComment = Omit<FlightDiary,'comment'>

export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy',
  }

  export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor',
  }