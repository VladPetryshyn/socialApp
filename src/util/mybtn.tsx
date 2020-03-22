import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';

interface Props {
	tipClassName?: string;
	className?: string;
	event?: (e?: any) => void;
	tip: string;
}
export const MyButton: React.FC<Props> = ({
	children,
	event,
	className,
	tipClassName,
	tip
}) => (
	<Tooltip title={tip} className={tipClassName} placement='top-start'>
		<IconButton onClick={event} className={className}>
			{children}
		</IconButton>
	</Tooltip>
);
