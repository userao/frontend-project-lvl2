import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import * as path from 'node:path';
import fs from 'fs';
import genDiff from '../src/utils.js';
import parser from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const pathToEmpty = getFixturePath('json/emptyObj.json');

test('parser', () => {
  expect(() => parser('', '.html')).toThrow(Error);
});

describe('Stylish formatter', () => {
  const expectedPath1 = getFixturePath('expectedStylish1');
  const expected1 = fs.readFileSync(expectedPath1, 'utf-8');
  const expectedPath2 = getFixturePath('expectedStylish2');
  const expected2 = fs.readFileSync(expectedPath2, 'utf-8');
  const expectedPath3 = getFixturePath('expectedStylish3');
  const expected3 = fs.readFileSync(expectedPath3, 'utf-8');

  test('json', () => {
    const firstPath = getFixturePath('json/recursiveObj1.json');
    const secondPath = getFixturePath('json/recursiveObj2.json');

    const actual1 = genDiff(firstPath, secondPath);
    expect(actual1).toEqual(expected1);

    const actual2 = genDiff(firstPath, firstPath);
    expect(actual2).toEqual(expected2);

    const actual3 = genDiff(firstPath, pathToEmpty);
    expect(actual3).toEqual(expected3);

    const actual4 = genDiff(pathToEmpty, pathToEmpty);
    expect(actual4).toEqual('{}');
  });

  test('yaml', () => {
    const firstPath = getFixturePath('yaml/recursiveObj1.yml');
    const secondPath = getFixturePath('yaml/recursiveObj2.yaml');

    const actual1 = genDiff(firstPath, secondPath);
    expect(actual1).toEqual(expected1);

    const actual2 = genDiff(firstPath, firstPath);
    expect(actual2).toEqual(expected2);

    const actual3 = genDiff(firstPath, pathToEmpty);
    expect(actual3).toEqual(expected3);

    const actual5 = genDiff(pathToEmpty, pathToEmpty);
    expect(actual5).toEqual('{}');
  });
});

describe('Plain formatter', () => {
  const expectedPath1 = getFixturePath('expectedPlain1');
  const expected1 = fs.readFileSync(expectedPath1, 'utf-8');
  const expectedPath2 = getFixturePath('expectedPlain2');
  const expected2 = fs.readFileSync(expectedPath2, 'utf-8');

  test('json', () => {
    const firstPath = getFixturePath('json/recursiveObj1.json');
    const secondPath = getFixturePath('json/recursiveObj2.json');

    const actual1 = genDiff(firstPath, secondPath, 'plain');
    expect(actual1).toEqual(expected1);

    const actual2 = genDiff(firstPath, pathToEmpty, 'plain');
    expect(actual2).toEqual(expected2);

    const actual5 = genDiff(pathToEmpty, pathToEmpty, 'palin');
    expect(actual5).toEqual('{}');
  });

  test('yaml', () => {
    const firstPath = getFixturePath('yaml/recursiveObj1.yml');
    const secondPath = getFixturePath('yaml/recursiveObj2.yaml');

    const actual1 = genDiff(firstPath, secondPath, 'plain');
    expect(actual1).toEqual(expected1);

    const actual2 = genDiff(firstPath, pathToEmpty, 'plain');
    expect(actual2).toEqual(expected2);

    const actual3 = genDiff(firstPath, firstPath, 'plain');
    expect(actual3).toEqual('');

    const actual4 = genDiff(pathToEmpty, pathToEmpty, 'plain');
    expect(actual4).toEqual('{}');
  });
});
