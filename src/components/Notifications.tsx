import React, { useState } from 'react';
import {
	Notifications as Notification,
	Favorite,
	Chat,
} from '@material-ui/icons';
import { connect } from 'react-redux';
import { AppState } from '../redux/root-reducer';
import {
	NotificationsTypes,
	markNotificationsRead,
} from '../redux/user-reducer';
import {
	Badge,
	IconButton,
	Tooltip,
	Menu,
	Typography,
	MenuItem,
} from '@material-ui/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { NavLink } from 'react-router-dom';

interface Props {
	notifications: NotificationsTypes;
	markNotificationsRead(ids: Array<string>): void;
}

export const Notifications: React.FC<Props> = ({
	notifications,
	markNotificationsRead,
}) => {
	const [anchorElement, setAnchorElement] = useState(null);
	let notificationIcon;
	dayjs.extend(relativeTime);
	if (notifications && notifications.length > 0) {
		notificationIcon =
			notifications.filter((notification) => notification.read === false)
				.length > 0 ? (
				<Badge
					badgeContent={
						notifications.filter(
							(notification) => notification.read === false
						).length
					}
					color="secondary">
					<Notification />
				</Badge>
			) : (
				<Notification />
			);
	} else {
		notificationIcon = <Notification />;
	}
	const handleOpen = (e: any) => {
		setAnchorElement(e.target);
	};
	const handleClose = () => {
		setAnchorElement(null);
	};
	const onMenuOpened = () => {
		let unreadNotificationsIds = notifications
			.filter((not) => !not.read)
			.map((not) => not.notificationId);
		markNotificationsRead(unreadNotificationsIds);
	};
	let notificationsMarkup =
		notifications && notifications.length > 0 ? (
			notifications.map((notification) => {
				const verb =
					notification.type === 'like' || 'comment-like'
						? 'liked'
						: 'commented on';
				const time = dayjs(notification.createdAt).fromNow();
				const iconColor = notification.read ? 'primary' : 'secondary';
				const icon =
					notification.type === 'like' || 'comment-like' ? (
						<Favorite color={iconColor} style={{ marginRight: '10px' }} />
					) : (
						<Chat color={iconColor} style={{ marginRight: '10px' }} />
					);
				return (
					<MenuItem key={notification.createdAt} onClick={handleClose}>
						{icon}
						<Typography
							component={NavLink}
							color="initial"
							variant="body1"
							to={`/users/${notification.postOwner}/post/${notification.postId}`}>
							{notification.sender} {verb} your{' '}
							{notification.type === 'comment-like' ? 'comment' : 'post'}{' '}
							{time}
						</Typography>
					</MenuItem>
				);
			})
		) : (
			<MenuItem onClick={handleClose}>
				{' '}
				You don't have notifications{' '}
			</MenuItem>
		);
	return (
		<>
			<Tooltip title="Notifications" placement="top">
				<IconButton
					aria-owns={anchorElement ? 'simple-menu' : undefined}
					aria-haspopup={true}
					onClick={handleOpen}>
					{notificationIcon}
				</IconButton>
			</Tooltip>
			<Menu
				anchorEl={anchorElement}
				open={!!anchorElement}
				onClose={handleClose}
				onEntered={onMenuOpened}
				style={{ marginLeft: '25px' }}>
				{notificationsMarkup}
			</Menu>
		</>
	);
};

const mapStateToProps = (state: AppState) => ({
	notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
	Notifications
);
