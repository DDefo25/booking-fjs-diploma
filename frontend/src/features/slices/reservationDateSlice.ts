import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export interface ReservationDateState {
  dateStart: string,
  dateEnd: string
}

const initialState: ReservationDateState = {
  dateStart: '',
  dateEnd: '',
};


export const slice = createSlice({
  name: 'reservationDate',
  initialState,
  reducers: {
    editReservationDate: (state: ReservationDateState, { payload: { target: { name, value } } }: PayloadAction<React.ChangeEvent<HTMLInputElement>>) => {
      state[ name as keyof ReservationDateState ] = value; 
    },
    clearReservationDate: (state: ReservationDateState): void => {
      state = { ...initialState };
    },
  },
});

export const { editReservationDate, clearReservationDate } = slice.actions;
export const selectReservationDates = (state: RootState) => state.reservationDate;
export default slice.reducer;