import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

storiesOf('Buttons', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ));