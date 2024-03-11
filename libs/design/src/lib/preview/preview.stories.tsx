import type { Meta } from '@storybook/react';
import { Preview } from './preview';

const Story: Meta<typeof Preview> = {
  component: Preview,
  title: 'Preview',
};
export default Story;

export const Primary = {
  args: {},
};
