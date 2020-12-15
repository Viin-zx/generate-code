import React, { useState } from 'react'

export default function useConfigModel() {
  const [basicConfig, setBasicConfig] = useState({})
  const [config, setConfig] = useState({})

  return {
    basicConfig,
    setBasicConfig,
    config,
    setConfig,
  }
}
