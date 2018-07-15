const expect = require('expect');
const {Users} = require('./users');


describe('Users',()=>{
    var users;

    beforeEach(()=>{
        users =  new Users();
        users.users = [{
            id: '1',
            name: 'mike',
            room: 'node course'
        },{
            id: '2',
            name: 'jen',
            room: 'react course'
        },{
            id: '3',
            name: 'julie',
            room: 'node course'
        }];
    });
    
    it('should add neu user',() =>{
        var users = new Users();
        var user = {
            id: '123',
            name: 'Andrew',
            room: 'The office fans'
        };
        var resUser= users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);
        expect(resUser).toInclude(user);
    });

    it('should remove a user',()=>{
        var user = users.users[1];
        var resUser = users.removeUser('2');
        expect(users.users.length).toBe(2);
        expect(resUser).toInclude(user);        
    });

    it('should not remove user',()=>{
        var resUser = users.removeUser('5');
        expect(users.users.length).toBe(3);
        expect(resUser).toNotExist();       
    });

    it('should find user',()=>{
        var user = users.getUser('1');
        expect(user).toInclude(users.users[0]);
    });

    it('should not find user',()=>{
        var user = users.getUser('4');
        expect(user).toNotExist();
    });

    it('should return names for node course',()=>{
        var userList =  users.getUserList('node course');
        expect(userList).toEqual(['mike','julie']);
    });

    it('should return names for react course',()=>{
        var userList =  users.getUserList('react course');
        expect(userList).toEqual(['jen']);
    });
});