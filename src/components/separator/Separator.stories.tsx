import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
	parameters: {
		backgrounds: {
			default: 'dark',
		},
	},
	component: Separator,
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const SelectStory: Story = {
	render: () => {
		return <Separator />;
	},
};
