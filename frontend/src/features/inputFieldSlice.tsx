import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IHotel } from "../components/HotelsModule/interfaces/Hotel.interface.dto"
import { RootState } from "../store"

export function cardEditReducer (state: any, action: any) {
    switch (action.type) {
        case 'HANDLE INPUT TEXT': {
            return {
                ...state,
                [action.field]: action.payload
            }
        }
        case 'HANDLE ADD ITEM TO ARRAY': {
            return {
                ...state,
                [action.field]: [...state[action.field], action.payload]
            }
        }
        case 'HANDLE DELETE ITEM FROM ARRAY': {
            return {
                ...state,
                [action.field]: state[action.field].splice(action.payload, 1)
            }
        }
        default: 
            return state
    }
}

const initialFormState: IHotel = {
    title: '',
    description: '',
    images: [
        "https://picsum.photos/250/200",
        "https://picsum.photos/250/200"
    ]
};

export const inputSlice = createSlice({
    name: 'inputCard',
    initialState: initialFormState,
    reducers: {
      inputText: (state, action: PayloadAction<string>) => {
        state.title = action.payload
      },
    },
  })

export const { inputText } = inputSlice.actions

export const selectTitle = (state: RootState) => state.input.title

export default inputSlice.reducer