import helloStyles from './hello.module.css';
import helloStyles3 from './hello.module.sass';
import helloStyles2 from './hello.module.scss';

export function hello(): string {
	console.log(helloStyles.hello);
	console.log(helloStyles2.hello);
	console.log(helloStyles3.hello);
	return 'Hello';
}
