import _ from 'lodash';
import generate from './DataGenerator';

const column = {
	cellTemplate: '<cell row="row" col="col" grid="grid"></cell>'
};

export default class GridCOntroller {
	constructor() {
		let emptyRows = [];

		_.times(100, () => emptyRows.push({}))

		this.gridOptions = {
			columnDefs: [
				_.assign({}, { field: '0' }, column),
				_.assign({}, { field: '1' }, column),
				_.assign({}, { field: '2' }, column),
				_.assign({}, { field: '3' }, column),
				_.assign({}, { field: '4' }, column),
				_.assign({}, { field: '5' }, column),
				_.assign({}, { field: '6' }, column)
			],
			data: [].concat(generate(5), emptyRows)
		};
	}
}