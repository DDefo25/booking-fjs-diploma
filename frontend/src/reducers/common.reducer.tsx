export function reducer (state: any, action: any) {
    switch (action.type) {
        case 'HANDLE CUSTOM FIELD': {
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
        case 'HANDLE ITEMS TO ARRAY': {
            return {
                ...state,
                [action.field]: [...action.payload]
            }
        }
        default: 
            return state
    }
}