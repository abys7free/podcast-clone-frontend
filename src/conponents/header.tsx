import { faBroadcastTower, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link } from 'react-router-dom';
import { useMe } from '../hooks/useMe'
import nuberLogo from "../images/logo.svg"


export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <header className="py-4 border-b-4 border-double" >
      <div className="w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
        <FontAwesomeIcon icon={faBroadcastTower}
                        className="text-xl text-white" />
        <Link to="/my-profile">
          <span className='text-xs'><FontAwesomeIcon icon={faUser} className="text-xl text-white" /></span>
        </Link>
      </div>
    </header>
  )
}
