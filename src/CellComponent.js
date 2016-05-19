import template from './CellComponent.html';
import './CellComponent.css';

export const CellComponent = {
	bindings: {
		grid: '<',
		row: '<',
		col: '<'
	},
	controller: function() {
		this.cellData = this.grid.getCellValue(this.row, this.col);
	},
	template
};