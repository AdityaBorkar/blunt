import css from 'styled-jsx/css';

const divStyles = css`
  div {
    color: orange;
  }
`;

export default function Page(_props) {
	return (
		<>
			<div>styled-jsx support (should be orange)</div>
			<p>styled p tag (should be pink)</p>
			<style jsx>{divStyles}</style>
			<style jsx>{`
        p {
          color: pink;
        }
      `}</style>
			<style global jsx>{`
        body {
          background: #000;
        }
      `}</style>
		</>
	);
}
