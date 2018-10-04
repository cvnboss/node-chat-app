const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: 1,
                name: 'Phat',
                room: 'Room 1'
            },
            {
                id: 2,
                name: 'Long',
                room: 'Room 2'
            },
            {
                id: 3,
                name: 'Nhat',
                room: 'Room 1'
            }
        ];
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Phat',
            room: 1
        };
        var { id, name, room } = user;

        var resUser = users.addUser(id, name, room);
        expect(resUser).toMatchObject(user);
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId = 2;
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId = 4;
        var user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = 2;
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = 4;
        var user = users.getUser(userId);

        expect(user).toBe(undefined);
    });

    it('should return names for Room 1', () => {
        var userList = users.getUserList('Room 1');

        expect(userList).toEqual(['Phat', 'Nhat']);
    });

    it('should return names for Room 2', () => {
        var userList = users.getUserList('Room 2');

        expect(userList).toEqual(['Long']);
    });
});
