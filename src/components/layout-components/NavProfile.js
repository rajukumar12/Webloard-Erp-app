import React from 'react';
import { Menu, Dropdown, Avatar } from 'antd';
import { useDispatch } from 'react-redux'
import { 
	EditOutlined, 
	SettingOutlined, 
	ShopOutlined, 
	QuestionCircleOutlined, 
	LogoutOutlined 
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import { signOut } from 'store/slices/authSlice';

const MenuItem = (props) => (
	<a href={props.path}>
		<Icon className="font-size-md" type={props.icon} />
		<span className="font-weight-normal mx-2">{props.label}</span>
	</a>
)

const MenuItemSignOut = (props) => (
	<span>
		<LogoutOutlined className="font-size-md" />
		<span className="font-weight-normal mx-2">{props.label}</span>
	</span>
)

export const NavProfile = () => {
	const data = JSON.parse(localStorage.getItem("auth_data") ?? "")

	const dispatch = useDispatch();

	const handleClick = ({ key }) => {
		if (key === 'Sign Out') {
			handleSignOut()
		}
	}

	const handleSignOut = () => {
		dispatch(signOut())
	}

	const menu = (
		<Menu
			onClick={handleClick}
			items={
				[
					{
						key: 'Edit Profile',
						label: <MenuItem path="/" label="Edit Profile" icon={EditOutlined} />,
					},
					{
						key: 'Account Setting',
						label: <MenuItem path="/" label="Account Setting" icon={SettingOutlined} />,
					},
					{
						key: 'Account Billing',
						label: <MenuItem path="/" label="Account Billing" icon={ShopOutlined} />,
					},
					{
						key: 'Help Center',
						label: <MenuItem path="/" label="Help Center" icon={QuestionCircleOutlined} />,
					},
					{
						key: 'Sign Out',
						label: <MenuItemSignOut label="Sign Out" />,
					}
				]
			}
		/>
	) 

	return (
		<Dropdown placement="bottomRight" overlay={menu} trigger={["click"]}>
			<div className="nav-item">
				<div className="d-flex align-items-center">
					<Avatar src="/img/avatars/thumb-1.jpg" />
					<div className="pl-2 d-none d-sm-block profile-text">
						<div className="font-size-base font-weight-bold">{data ? data?.name : "Name"}</div>
						<span className="opacity-0-8">Frontend Developer</span>
					</div>
				</div>
			</div>
		</Dropdown>
	);
}

export default NavProfile
