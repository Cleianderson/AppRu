interface Action {
  type: string
  payload: any
}

const initialState: MainState = {
  warns: [],
  foods: undefined,
  favorites: undefined,
  day: undefined,
  homeView: undefined,
  thereIsWarn: false
}

export const mainReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_DAY':
      return { ...state, day: action.payload.day }
    case 'SET_FOODS':
      return { ...state, foods: action.payload.foods }
    case 'SET_WEEK':
      return { ...state, week: action.payload.value }
    case 'SET_WARNS':
      return { ...state, warns: action.payload.warns }
    // case 'SET_FAVORITES':
    //   return { ...state, favorites: action.payload.favorites }
    // case 'ADD_FAVORITES': {
    //   const favItem = action.payload.favItem.toUpperCase()
    //   if (!state.favorites?.includes(favItem)) {
    //     const favs = state.favorites ?? []
    //     return { ...state, favorites: [...favs, favItem] }
    //   }
    //   return state
    // }
    case 'REMOVE_FAVORITES': {
      const favs = state.favorites?.filter(fav => fav !== action.payload.favItem)
      return { ...state, favorites: favs }
    }
    case 'SET_HOME_VIEW':
      return { ...state, homeView: action.payload.homeView }
    case 'SET_THERE_IS_WARN':
      return { ...state, thereIsWarn: action.payload.thereIsWarn }
    default:
      return state
  }
}
