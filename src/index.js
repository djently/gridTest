import GridController from './GridController';
import {CellComponent} from './CellComponent';

angular.module('gridTest', ['ui.grid'])
	.controller('GridController', GridController)
	.component('cell', CellComponent)
	;