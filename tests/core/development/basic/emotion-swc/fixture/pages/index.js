import { css } from '@emotion/react';

import {
	Animated,
	Basic,
	BasicExtended,
	bounce,
	Combined,
	ComponentSelectorsExtended,
	Pink,
} from '../shared/styles';

const Home = () => (
	<div
		css={css`
      display: flex;
      flex-direction: column;
      background-color: pink;
    `}
		id={'test-element'}
	>
		<Basic>Cool Styles</Basic>
		<Pink>Pink text</Pink>
		<Combined>
			With <code>:hover</code>.
		</Combined>
		<Animated animation={bounce}>Let's bounce.</Animated>
		<ComponentSelectorsExtended>
			<BasicExtended>Nested</BasicExtended>
		</ComponentSelectorsExtended>
	</div>
);

export default Home;
