var  expect = require('expect');
var {generateMessage} = require('./message');

describe('generate message',()=>{
    it('should return a message object',()=>{
        var obj = generateMessage("fulano","hey");
        expect(obj.from).toBe('fulano');
        expect(obj.text).toBe('hey');
        expect(obj.createdAt).toBeA('number');
    });
});