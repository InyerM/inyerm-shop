import { FC, useReducer } from 'react'
import { UIContext, uiReducer } from './'

export interface UIState {
  isMenuOpen: boolean
}

interface Props {
  children: React.ReactNode
}

const UI_INITIAL_STATE: UIState = {
  isMenuOpen: false
}

export const UIProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE )

  const toggleSideMenu = () => {
    dispatch( { type: 'UI_TOGGLE_MENU' } )
  }

  return (
    <UIContext.Provider value={{ 
        ...state,

        //methods
        toggleSideMenu,
      }}>
      { children }
    </UIContext.Provider>
  )
}
