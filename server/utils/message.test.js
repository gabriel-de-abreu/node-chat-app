var  expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('generate message',()=>{
    it('should return a message object',()=>{
        var obj = generateMessage("fulano","hey");
        expect(obj.from).toBe('fulano');
        expect(obj.text).toBe('hey');
        expect(obj.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage',()=>{
    it('should generate the correct object location',()=>{
        var obj = generateLocationMessage('fulano',1,1);
        expect(obj.from).toBe('fulano');
        expect(obj.createdAt).toBeA('number');
        expect(obj.url).toBe('http://google.com/maps?q=1,1');
    });
});