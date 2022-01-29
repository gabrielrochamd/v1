import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

type ContextData = {
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>
}

type Props = {
  children: ReactNode
}

export const DarkThemeContext = createContext({} as ContextData)

export function DarkThemeProvider({ children }: Props) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const root = document.querySelector(':root')
    if (active) {
      root?.classList.add('darkTheme')
    } else {
      root?.classList.remove('darkTheme')
    }
  }, [active])
  
  return (
    <DarkThemeContext.Provider value={{ active, setActive }}>
      {children}
    </DarkThemeContext.Provider>
  )
}