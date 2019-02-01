const test = require(`ava`);
const sinon = require(`sinon`);

const calculus = require('../functions/calculus').calculus;

function queryTest(test, query, expectedStatus, expectedSend) {
    // Mock ExpressJS 'req' and 'res' parameters
    const req = {
        query: {
            query: query
        }
    };
    // We use Express as res.status(<status code>).send(<return>)
    const res = {status: sinon.stub()};
    const statusResult = {send: sinon.stub()}
    res.status.callsFake(() => statusResult);

    // Call tested function
    calculus(req, res);

    // Verify status
    test.true(res.status.calledOnce);
    test.deepEqual(res.status.firstCall.args, [expectedStatus]);
    // Verify what was sent back
    test.true(statusResult.send.calledOnce);
    test.deepEqual(statusResult.send.firstCall.args, [expectedSend]);
}

const encode64 = (str) => Buffer.from(str, 'ascii').toString('base64')

test(`/calculus: should 200 with ?query=MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk`, test => {
    queryTest(
        test,
        /* query */ "MiAqICgyMy8oMyozKSktIDIzICogKDIqMyk",
        /* status*/ 200, 
        /* send payload */ {
            error: false,
            result: -132.88888888888889
        }
    );
});

test(`/calculus: should 200 with ?query={2 + 2}`, test => {
    queryTest(
        test,
        /* query */ encode64("2 + 2"),
        /* status*/ 200, 
        /* send payload */ {
            error: false,
            result: 4
        }
    );
});

test(`/calculus: should 400 with ?query={blah}`, test => {
    queryTest(
        test,
        /* query */ encode64("blah"),
        /* status*/ 400, 
        /* send payload */ {
            error: true,
            message: 'Only () + - / * and numbers are supported'
        }
    );
});

test(`/calculus: should 400 with Syntax Error with ?query={/ /}`, test => {
    queryTest(
        test,
        /* query */ encode64("/ /"),
        /* status*/ 400, 
        /* send payload */ {
            error: true,
            message: 'Value expected (char 1)'
        }
    );
});
