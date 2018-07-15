const expect = require('expect');
const {isRealString}=require('./validation');

//import is realString
    //reject non string
    //reject string with paces
    //allow string with non-space

describe('isRealString',()=>{
    it('should reject a non-string value',()=>{
        expect(isRealString(2132312)).toBe(false);
    });
    it('should reject string with only spaces',()=>{
        expect(isRealString('        ')).toBe(false);
    });
    it('should accept string with non-space values',()=>{
        expect(isRealString(' whatever   ')).toBe(true);
    });
});