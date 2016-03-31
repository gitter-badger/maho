import { Maho } from './maho.class';

let maho1: Maho = new Maho(<HTMLInputElement>document.getElementById('demo1'), ['foo', 'bar']);
let maho2: Maho = new Maho(<HTMLInputElement>document.getElementById('demo2'), 'test.json');

