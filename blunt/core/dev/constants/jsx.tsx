import { Fragment, Profiler, StrictMode } from 'react';

const config = {
	strictMode: true,
	profiler: false,
};

// const { } = globalThis;
// console.log({ BLUNTJS: globalThis.BLUNTJS });

// const RootLayout = (await import('#/src/app/layout')).default;
// console.log({ RootLayout });

// const App = (await import('#/src/app/page')).default;
// console.log({ App });

const StrictModeToggle = config.strictMode ? StrictMode : Fragment;
const ProfilerToggle = config.profiler ? Profiler : Fragment;
// Million Lint / React Scan / React DevTools

export const jsx = (
	<StrictModeToggle>
		{/* <ProfilerToggle id="root" onRender={() => {}}> */}
		{/* <RootLayout>
			<App />
		</RootLayout> */}
		ok
		{/* </ProfilerToggle> */}
	</StrictModeToggle>
);
