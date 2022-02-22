import { useContext } from 'react'
import { IconContext } from 'react-icons'
import { BsCircleFill, BsMoonFill } from 'react-icons/bs'
import { DarkThemeContext } from '../contexts/DarkThemeContext'
import styles from '../styles/components/dark-mode-switch.module.scss'

export function DarkThemeSwitch() {
  const { active, setActive } = useContext(DarkThemeContext)
  
  return (
    <button className={`${styles.root} ${active && styles.darkTheme}`} onClick={() => setActive(!active)}>
      <div className={styles.indicator}>
        {
          active ? (
            <IconContext.Provider value={{ color: '#fff', style: { height: '1rem', width: '1rem' } }}>
              <div style={{ height: '1rem' }}>
                <BsMoonFill />
              </div>
            </IconContext.Provider>
          ) : (
            <IconContext.Provider value={{ color: '#ffe700', style: { height: '1rem', width: '1rem' } }}>
              <div style={{ height: '1rem' }}>
                <BsCircleFill />
              </div>
            </IconContext.Provider>
          )
        }
      </div>
    </button>
  )
}