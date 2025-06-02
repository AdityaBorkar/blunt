export default function handler(_, res) {
	res.json({
		env: process.env.FOO,
		envFromHost: process.env.ENV_FROM_HOST,
		envLocal: process.env.LOCAL_SECRET,
		envProd: process.env.PROD_SECRET,
	});
}
