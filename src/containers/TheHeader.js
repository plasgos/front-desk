import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { setSidebar } from '../redux/modules/sidebar/reducer';

// routes config
import routes from '../routes'

import {
  TheHeaderDropdown,
}  from './index'

const TheHeader = () => {
  const dispatch = useDispatch()
  const {show} = useSelector(state => state.sidebar)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(show) ? false : 'responsive'
    dispatch(setSidebar(val))
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none bg-white" to="/">
        <div><b>Plasgos Element</b></div>
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdown/>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
            </CLink>
          </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
