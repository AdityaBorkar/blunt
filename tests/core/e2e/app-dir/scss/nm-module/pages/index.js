import * as data from 'example';
import * as classes from 'example/index.module.scss';

function Home() {
	return (
		<div className={classes['red-text']} id="nm-div">
			{JSON.stringify(data)} {JSON.stringify(classes)}
		</div>
	);
}

export default Home;
