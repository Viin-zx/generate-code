import React from 'react'
import PropTypes from 'prop-types'

function HocBasic(Comp) {
  function WrapComp() {
    return <Comp />
  }

  return React.memo(WrapComp)
}

HocBasic.propTypes = {
  Comp: PropTypes.any,
}

export default HocBasic
