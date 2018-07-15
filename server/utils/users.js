//add user(id,name,room)
//remove user(id)
//getUser(id)
//getUserList

 class Users{
    constructor () {
        this.users = [];
    }

    addUser(id,name,room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        //return user that was removed
        var userRemoved;
        this.users = this.users.filter((user) =>{
            if(user.id !== id){
                return true;
            }else{
                userRemoved=user;
                return false;
            }
        });
        return userRemoved;
    }
    getUser (id){
        var user = this.users.filter((user)=> user.id === id)[0];
        return user;  
    }
    getUserList(room){
        var users = this.users.filter((user)=> user.room === room);
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }
 }

 module.exports = {
     Users
 }