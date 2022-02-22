import { setCookies } from 'cookies-next'
import React, { createContext, Dispatch, ReactChild, SetStateAction, useEffect, useState } from "react";

type ContextData = {
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>
}

interface Props {
  children: ReactChild | ReactChild[]
  darkTheme: boolean
}

export const DarkThemeContext = createContext({} as ContextData)

export function DarkThemeProvider({ children, ...rest }: Props) {
  const [active, setActive] = useState(rest.darkTheme)

  useEffect(() => {
    const root = document.querySelector(':root')
    if (active) {
      root?.classList.add('darkTheme')
    } else {
      root?.classList.remove('darkTheme')
    }
    setCookies('darkTheme', active ? '1' : '0', { secure: true })
  }, [active])
  
  return (
    <DarkThemeContext.Provider value={{ active, setActive }}>
      {children}
    </DarkThemeContext.Provider>
  )
}