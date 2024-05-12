import type { Meta, StoryObj } from '@storybook/react';

import { ArrowButton, OnClick } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	parameters: {
		backgrounds: {
			default: 'dark',
		},
	},
	component: ArrowButton,
	argTypes: {
		onClick: { action: 'clicked' },
	},
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

interface ArrowButtonStoryArgs {
	onClick: OnClick;
	isOpen: boolean;
}

export const ArrowButtonStory: Story = (args: ArrowButtonStoryArgs) => {
	return (
		<>
			<ArrowButton {...args} />
		</>
	);
};

ArrowButtonStory.args = {
	onClick: () => console.log('ArrowButton clicked'),
	isOpen: false,
};
