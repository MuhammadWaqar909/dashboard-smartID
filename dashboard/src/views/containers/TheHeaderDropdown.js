import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImage,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class TheHeaderDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    console.log('here')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.reload(true)
  }

  render() {
    return (
      <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
        <CDropdownToggle className="c-header-nav-link" caret={false}>
          <div className="c-avatar">
            <CImage src={'avatars/demo.jpg'} className="c-avatar-img" alt="admin" />
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem header tag="div" color="light" className="text-center">
            <strong>Account</strong>
          </CDropdownItem>
          <CDropdownItem onClick={this.logout}>
            <CIcon name="cil-user" className="mfe-2" />
            Logout
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    )
  }
}

export default TheHeaderDropdown
