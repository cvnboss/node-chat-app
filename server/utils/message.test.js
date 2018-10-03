const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Phat';
        var text = 'Hello';
        var message = generateMessage(from, text);

        expect(message).toMatchObject({ from, text });
        expect(typeof message.createdAt).toBe('number');
    });
});
