import React, { useState } from 'react';
import { MyButton } from '../util/mybtn';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Menu } from '@material-ui/core';

interface Props {
	tip: string;
	render: (closeMenu: () => void) => JSX.Element;
	iconColor?:
		| 'inherit'
		| 'action'
		| 'secondary'
		| 'primary'
		| 'error'
		| 'disabled'
		| undefined;
}
export const ContextMenu: React.FC<Props> = ({
	render,
	tip,
	iconColor = 'inherit'
}) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const openMenu = (e: any) => {
		setAnchorEl(e.target as HTMLButtonElement);
	};
	const closeMenu = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<MyButton tip={tip} event={openMenu}>
				<MoreVertIcon color={iconColor} />
			</MyButton>
			<Menu
				anchorEl={anchorEl}
				open={!!anchorEl}
				onClose={closeMenu}
				style={{ marginLeft: '25px', marginTop: '15px' }}>
				{render(closeMenu)}
			</Menu>
		</>
	);
};
