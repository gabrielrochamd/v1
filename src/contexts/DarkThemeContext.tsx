import { setCookies } from 'cookies-next'
import React, { createContext, Dispatch, ReactChild, SetStateAction, useEffect, useState } from "react";

type ContextData = {
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>
}

type Props = {
  children: ReactChild | ReactChild[],
  darkTheme: boolean
}

export const DarkThemeContext = createContext({} as ContextData)

export function DarkThemeProvider({ children, ...rest }: Props) {
  const [active, setActive] = useState(rest.darkTheme)
  const [firstChange, setFirstChange] = useState(true)

  useEffect(() => {
    const root = document.querySelector(':root')
    if (active) {
      root?.classList.add('darkTheme')
    } else {
      root?.classList.remove('darkTheme')
    }
    if (firstChange) {
      root?.classList.add('transitions')
      setFirstChange(false)
    }
    setCookies('darkTheme', active ? '1' : '0', { secure: true })
  }, [active])

  useEffect(() => {
    const root = document.querySelector(':root')
    root?.classList.remove('transitions')
  }, [])
  
  return (
    <DarkThemeContext.Provider value={{ active, setActive }}>
      {children}
    </DarkThemeContext.Provider>
  )
}