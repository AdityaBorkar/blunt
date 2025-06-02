import styles from './blue-button.module.css';
import { Button } from './button';

export function BlueButton() {
	return (
		<Button className={`btn-blue ${styles['blue-button']}`}>Button</Button>
	);
}
