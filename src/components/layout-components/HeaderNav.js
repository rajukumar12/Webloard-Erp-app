import React, { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons';
import Logo from './Logo';
import NavNotification from './NavNotification';
import NavProfile from './NavProfile';
import NavLanguage from './NavLanguage';
import NavPanel from './NavPanel';
import NavSearch  from './NavSearch';
import SearchInput from './NavSearch/SearchInput.js'
import { toggleCollapsedNav, onMobileNavToggle } from 'store/slices/themeSlice';
import { NAV_TYPE_TOP, SIDE_NAV_COLLAPSED_WIDTH, SIDE_NAV_WIDTH } from 'constants/ThemeConstant';
import { FormControlLabel, Switch } from "@mui/material";
import { AppContext } from "components/ContextApi";
import utils from 'utils'

const { Header } = Layout;

export const HeaderNav = props => {

	const { isMobile } = props;

	const [searchActive, setSearchActive] = useState(false);

	const dispatch = useDispatch()

	const navCollapsed = useSelector(state => state.theme.navCollapsed)
	const mobileNav = useSelector(state => state.theme.mobileNav)
	const navType = useSelector(state => state.theme.navType)
	const headerNavColor = useSelector(state => state.theme.headerNavColor)
	const currentTheme = useSelector(state => state.theme.currentTheme)
	const direction = useSelector(state => state.theme.direction)

	const onSearchActive = () => {
		setSearchActive(true)
	}

	const onSearchClose = () => {
		setSearchActive(false)
	}

	const onToggle = () => {
		if(!isMobile) {
			dispatch(toggleCollapsedNav(!navCollapsed))
		} else {
			dispatch(onMobileNavToggle(!mobileNav))
		}
	}

	const isNavTop = navType === NAV_TYPE_TOP ? true : false

	const mode = ()=> {
		if(!headerNavColor) {
			return utils.getColorContrast(currentTheme === 'dark' ? '#00000' : '#ffffff' )
		}
		return utils.getColorContrast(headerNavColor);
	}

	const navMode = mode();

	const getNavWidth = () => {
		if(isNavTop || isMobile) {
			return '0px';
		}
		if(navCollapsed) {
			return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
		} else {
			return `${SIDE_NAV_WIDTH}px`;
		}
	}

	useEffect(() => {
		if(!isMobile) {
			onSearchClose();
		}
	})
	
	const {showTitle, setShowTitle }=useContext(AppContext)
	const handelSwitchChange = (e) => {
        setShowTitle(e.target.checked)
    }

	return (
		<Header className={`app-header ${navMode}`} style={{backgroundColor: headerNavColor}}>
			<div className={`app-header-wrapper ${isNavTop ? 'layout-top-nav' : ''}`}>
				<Logo logoType={navMode}/>
				<div className="nav" style={{width: `calc(100% - ${getNavWidth()})`}}>
					<div className="nav-left">
						<div className="nav-item" onClick={onToggle}>
							<div className="d-flex align-items-center">
								{navCollapsed || isMobile ? <MenuUnfoldOutlined className="nav-icon" /> : <MenuFoldOutlined className="nav-icon" />}
							</div>
						</div>
						<ul className="ant-menu ant-menu-root ant-menu-horizontal">
							{
								isMobile ?
								<li className="ant-menu-item ant-menu-item-only-child" onClick={() => {onSearchActive()}}>
									<SearchOutlined />
								</li>
								:
								<li className="ant-menu-item ant-menu-item-only-child" style={{cursor: 'auto'}}>
									<SearchInput mode={mode} isMobile={isMobile} />
								</li>
							}
						</ul>
					</div>
					<div className="nav-right">
					
					<div style={{display:'flex', justifyContent:'justify', alignItems:'center'}}>
					<FormControlLabel
                            value="start"
                            control={<Switch color="primary" onChange={handelSwitchChange} checked={showTitle} />}
                            label="Show Title"
                            labelPlacement="start"

                        />
					</div>
						<NavNotification />
						<NavLanguage />
						<NavPanel direction={direction} />
						<NavProfile />
					</div>
					<NavSearch active={searchActive} close={onSearchClose}/>
				</div>
			</div>
		</Header>
	)
}

export default HeaderNav;