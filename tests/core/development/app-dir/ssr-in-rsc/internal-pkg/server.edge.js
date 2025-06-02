// Fine to drop once React is on ESM
import ReactDOMServerEdgeDefault, * as ReactDOMServerEdge from 'react-dom/server.edge';

const moduleShape = {
	default: Object.keys(ReactDOMServerEdgeDefault).sort(),
	named: Object.keys(ReactDOMServerEdge).sort(),
};

export default moduleShape;
