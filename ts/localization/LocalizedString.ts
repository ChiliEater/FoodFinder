import csv from 'csv-parser';
import { ImageURISource } from 'react-native';
//import table from '../../res/strings.csv';
const table = require('../../res/strings.csv');


class LocalizedString {
    private strings: string[] = [];
    constructor() {
        console.log(`Table: ${table}`);
    }
}

export default LocalizedString;