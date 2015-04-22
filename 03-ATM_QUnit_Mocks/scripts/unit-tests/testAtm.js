/// <reference path="qunit-1.18.0.js" />
/// <reference path="../atm.js" />
var testAccount;
var bankAccounts;
var theAtm;

QUnit.module("Atm: An unauthenticated user", {
    beforeEach: function () {
        bankAccounts = [
            {
                id: 1,
                accountNumber: 54321,
                firstName: 'Foo',
                lastName: 'Bar',
                pin: 1337,
                balance: 9001.00
            },
            {
                id: 2,
                accountNumber: 55555,
                firstName: 'Jack',
                lastName: 'Sparrow',
                pin: 1234,
                balance: 27000.00
            }
        ];

        theAtm = new Atm(bankAccounts);
        testAccount = bankAccounts[0];
    },

    afterEach: function(){}
});

QUnit.test("should receive an error when authenticating with an invalid pin", function () {
    // act / assert
    QUnit.throws(function () { theAtm.authenticate(54321, 9999); }, Error, "authenticate() didn't throw an exception");
});

QUnit.test("should receive an error when authenticating with an invalid account number", function () {
    // act / assert
    QUnit.throws(function () { theAtm.authenticate(5432, 1337); }, "authenticate() didn't throw an exception");
});

QUnit.test("should be allowed access to their account when authenticating with valid credentials", function () {
    // act 
    theAtm.authenticate(testAccount.accountNumber, testAccount.pin);

    // assert
    QUnit.ok(theAtm.isAuthenticated);
});

QUnit.test("should receive an 'Authentication Failed' error message when authentication is unsuccessful", function () {
    // act / assert
    QUnit.throws(function () { theAtm.authenticate(5432, 1337); }, new Error("Authentication Failed"), "authenticating with invalid account number and a valid pin didn't throw an exception");
    QUnit.throws(function () { theAtm.authenticate(54321, 13375); }, new Error("Authentication Failed"), "authenticating with a valid account number and invalid pin didn't throw an exception");
    QUnit.throws(function () { theAtm.authenticate(5432, 13375); }, new Error("Authentication Failed"), "authenticating with an invalid account number and an invalid password didn't throw an exception");
    QUnit.throws(function () { theAtm.authenticate(null, 1337); }, new Error("Authentication Failed"), "authenticating with the absense of an account number and a valid pin didn't throw an exception");
    QUnit.throws(function () { theAtm.authenticate(54321, null); }, new Error("Authentication Failed"), "authenticating with a valid account number and the absense of a pin didn't throw an exception");
    QUnit.throws(function () { theAtm.authenticate(null, null); }, new Error("Authentication Failed"), "authenticating with the absense of an account number and pin didn't throw an exception");
});

QUnit.test("should receive an error if they try to change their pin", function () {
    // act / assert
    QUnit.throws(function () { theAtm.changePin(testAccount.accountNumber, testAccount.pin); }, Error, "an unauthenticated user did not receive an error when trying to change their pin");
});

QUnit.test("should receive an error if they try to get the name on their account", function () {
    // act / assert
    QUnit.throws(function () { theAtm.getAccountName(); }, Error, "an unauthenticated user did not receive an error when getting the name on their account");
});

QUnit.test("should receive an error if they try to get the balance on the account", function () {
    // act / assert
    QUnit.throws(function () { theAtm.getBalance(); }, Error, "an unauthenticated user did not receive an error when getting the balance on their account");
});

QUnit.test("should receive an error if they try to log off", function () {
    // act / assert
    QUnit.throws(function () { theAtm.logout(); }, Error, "an unauthenticated user was able to log off without receiving an error");
});

QUnit.test("should receive an error if they try to reset the auto log off timer", function () {
    // act / assert
    QUnit.throws(function () { theAtm.setAutoLogOff(); }, Error, "an unauthenticated user was able to reset the auto log off timer without receiving an error");
});

QUnit.test("should receive an error if they try to withdraw money", function () {
    // act / assert
    QUnit.throws(function () { theAtm.withdraw(); }, Error, "an unauthenticated user was able to withdraw money without receiving an error");
});

QUnit.module("Atm: An authenticated user", {
    beforeEach: function () {
        bankAccounts = [
            {
                id: 1,
                accountNumber: 54321,
                firstName: 'Foo',
                lastName: 'Bar',
                pin: 1337,
                balance: 9001.00
            },
            {
                id: 2,
                accountNumber: 55555,
                firstName: 'Jack',
                lastName: 'Sparrow',
                pin: 1234,
                balance: 1500.00
            }
        ];

        theAtm = new Atm(bankAccounts);
        testAccount = bankAccounts[0];

        theAtm.authenticate(testAccount.accountNumber, testAccount.pin);
    },

    afterEach: function () { }
});

QUnit.test("should be able to change the pin on their account", function () {
    // arrange
    var currentPin = testAccount.pin;
    var newPin = 1111

    // act
    theAtm.changePin(currentPin, newPin, newPin);

    // assert
    QUnit.notEqual(testAccount.pin, currentPin);
    QUnit.equal(testAccount.pin, newPin);
});

QUnit.test("should receive an error when trying to change their pin and entering in an incorrect current pin", function () {
    // arrange
    var incorrectPin = 1111

    // act / assert
    QUnit.throws(function () { theAtm.changePin(incorrectPin, 3333, 3333); }, Error, "changing pin supplying an invalid current pin, did not throw an exception");
});

QUnit.test("should receive an error when trying to change their pin, and the new pin and new pin compare don't match", function () {
    // act / assert
    QUnit.throws(function () { theAtm.changePin(testAccount.pin, 5555, 3333); }, new Error("New pin does not match new pin compare"), "supplying a mismatched newPin and newPinCompare did not throw an exception");
});

QUnit.test("should be able to view the first name and last name of the account holder", function () {
    // arrange
    var expected = testAccount.firstName + ' ' + testAccount.lastName;

    // act
    var actual = theAtm.getAccountName();

    // assert
    QUnit.equal(expected, actual);
});

QUnit.test("should be able to retrieve their account balance", function () {
    // arrange
    var expected = testAccount.balance;

    // act
    var actual = theAtm.getBalance();

    // assert
    QUnit.equal(expected, actual);
});

QUnit.test("should be able to log out of their account", function () {
    // act / assert
    QUnit.ok(theAtm.isAuthenticated);

    theAtm.logout();

    QUnit.ok(!theAtm.isAuthenticated);
});

QUnit.test("should be able to withdraw money from their account", function () {
    // arrange
    var priorBalance = testAccount.balance;
    var withdrawAmount = 500;

    // act
    theAtm.withdraw(withdrawAmount);

    // assert
    QUnit.equal(testAccount.balance, priorBalance - withdrawAmount);
    QUnit.notEqual(testAccount.balance, priorBalance);
});

QUnit.test("should be able to withdraw all of the money from their account", function () {
    // arrange
    var priorBalance = testAccount.balance;

    // act
    theAtm.withdraw(priorBalance);

    // assert
    QUnit.equal(testAccount.balance, 0);
    QUnit.notEqual(testAccount.balance, priorBalance);
});

QUnit.test("should not be allowed to overdraft their account", function () {
    // arrange
    var priorBalance = testAccount.balance;

    // act / assert
    QUnit.throws(function () { theAtm.withdraw(priorBalance + .01); }, new Error("Insufficient Funds"));
});


// -----------------------------------------------------------------------------------------------------

QUnit.test("should have the auto log off timer reset when they perform any action except authenticating and logging off", function () {
    // arrange
    var setCallCount = 0;
    var clearCallCount = 0;

    var _setTimeout = window.setTimeout;
    window.setTimeout = function (arg1, arg2) {
        setCallCount += 1;

        return 500;
    };

    var _clearTimeout = window.clearTimeout;
    window.clearTimeout = function (arg1) {
        clearCallCount += 1;
    };

    // act
    theAtm.changePin(testAccount.pin, testAccount.pin, testAccount.pin);  // 1
    theAtm.getAccountName();  // 2
    theAtm.getBalance();  // 3
    theAtm.withdraw(0);  // 4

    // assert
    QUnit.equal(setCallCount, 4);
    QUnit.equal(clearCallCount, 4);

    // cleanup
    window.setTimeout = _setTimeout;
    window.clearTimeout = _clearTimeout;
});

QUnit.test("should be auto logged off after 30 seconds of inactivity", function () {
    // arrange
    var secondsToWait = 0;
    var logoutFunction = null;

    var _setTimeout = window.setTimeout;
    window.setTimeout = function (functionToCall, millisecondsToWait) {
        secondsToWait = millisecondsToWait / 1000;
        logoutFunction = functionToCall;
    };

    // act
    theAtm.setAutoLogOff();

    // assert
    QUnit.ok(theAtm.isAuthenticated);
    QUnit.equal(secondsToWait, 30);

    logoutFunction();

    QUnit.ok(!theAtm.isAuthenticated);

    //cleanup
    window.setTimeout = _setTimeout;

});

QUnit.test("should have the auto logoff timer set upon authenticating", function () {
    // arrange
    theAtm.logout();

    var _setTimeout = window.setTimeout;
    var wasCalled = false;

    window.setTimeout = function (arg1, arg2) {
        wasCalled = true;
    };

    // act    
    theAtm.authenticate(testAccount.accountNumber, testAccount.pin);

    // assert
    QUnit.ok(wasCalled);

    //cleanup
    window.setTimeout = _setTimeout;
});
