const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

// Test 1: Check HTML elements
test('HTML contains the button and message area', () => {
    const html = fs.readFileSync('index.html', 'utf8');

    assert.match(html, /onclick="showMessage\(\)"/);
    assert.match(html, /id="message"/);
});

// Test 2: Check JavaScript function
test('showMessage displays the correct message', () => {
    const messageElement = { innerHTML: '' };

    const document = {
        getElementById: (id) => {
            assert.equal(id, 'message');
            return messageElement;
        }
    };

    const script = fs.readFileSync('script.js', 'utf8');

    const context = { document };

    vm.runInNewContext(script, context);

    context.showMessage();

    assert.equal(
        messageElement.innerHTML,
        'Welcome! Your application is working successfully.'
    );
});