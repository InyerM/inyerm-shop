import { UIState } from './UIProvider'

type UIAction = { type: 'UI_TOGGLE_MENU' }

export const uiReducer = (state: UIState, action: UIAction): UIState => {
  switch (action.type) {
    case 'UI_TOGGLE_MENU':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      }

    default:
      return state
  }
}