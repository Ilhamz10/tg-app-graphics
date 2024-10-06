import React from 'react'

const Webapp = () => {
  return (
    <div>
        {window.Telegram?.WebApp.initData || 'Не нашел initData'}
    </div>
  )
}

export default Webapp