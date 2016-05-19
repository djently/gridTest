import _ from 'lodash';

export default function generate(count) {
	let data = [];
	_.times(count, (row) => {
		data[row] = {};
		_.times(7, (index) => {
			data[row][index] = makeDataRow();
		});
	});

	return data;
}

const colors = ['red', 'green', 'blue', 'transparent'];

function makeDataRow() {
	let piecesCount = Math.floor(Math.random() * 10 % 10),
		pieces = [],
		lengthSum = 0,
		pieceLength;

	_.times(piecesCount, () => {
		pieceLength = Math.floor(Math.random() * 10 % 10);
		lengthSum += pieceLength;

		pieces.push({
			length: pieceLength,
			color: colors[Math.floor(Math.random() * colors.length % colors.length)]
		})
	});

	pieces.forEach((piece) => {
		piece.length = Math.floor(piece.length / lengthSum * 100);
	});

	return pieces;
}