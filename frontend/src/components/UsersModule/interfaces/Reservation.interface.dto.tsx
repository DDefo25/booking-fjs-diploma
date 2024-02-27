export interface IReservationDto {
  _id: string,
  startDate: string,
  endDate: string,
  hotelRoom: {
    description: string,
    images: string[]
  },
  hotel: {
    title: string,
    description: string
  }
}