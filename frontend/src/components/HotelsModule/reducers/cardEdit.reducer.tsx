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