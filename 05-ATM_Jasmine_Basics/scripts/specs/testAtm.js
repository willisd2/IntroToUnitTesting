/// <reference path="../jasmine/jasmine.js" />
/// <reference path="../atm.js" />

describe("Atm: An unauthenticated user", function () {
    it("should receive an error when authenticating with an invalid pin", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);

        // act / assert
        expect(function () { theAtm.authenticate(54321, 9999); }).toThrowError(Error)
    });

    it("should receive an error when authenticating with an invalid account number", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);

        // act / assert
        expect(function () { theAtm.authenticate(5432, 1337); }).toThrowError(Error);
    });

    it("should be allowed access to their account when authenticating with valid credentials", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);
        var testAccount = bankAccounts[0];

        // act 
        theAtm.authenticate(testAccount.accountNumber, testAccount.pin);

        // assert
        expect(theAtm.isAuthenticated).toBe(true);
    });

    it("should receive an 'Authentication Failed' error message when authentication is unsuccessful", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);

        // act / assert
        expect(function () { theAtm.authenticate(5432, 1337); }).toThrow(new Error("Authentication Failed"));
        expect(function () { theAtm.authenticate(54321, 13375); }).toThrow(new Error("Authentication Failed"));
        expect(function () { theAtm.authenticate(5432, 13375); }).toThrow(new Error("Authentication Failed"));
        expect(function () { theAtm.authenticate(null, 1337); }).toThrow(new Error("Authentication Failed"));
        expect(function () { theAtm.authenticate(54321, null); }).toThrow(new Error("Authentication Failed"));
        expect(function () { theAtm.authenticate(null, null); }).toThrow(new Error("Authentication Failed"));
    });

    it("should receive an error if they try to change their pin", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);
        var testAccount = bankAccounts[0];

        // act / assert
        expect(function () { theAtm.changePin(testAccount.accountNumber, testAccount.pin); }).toThrowError(Error);
    });

    it("should receive an error if they try to get the name on their account", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);
        var testAccount = bankAccounts[0];

        // act / assert
        expect(function () { theAtm.getAccountName(); }).toThrowError(Error);
    });

    it("should receive an error if they try to get the balance on the account", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);
        var testAccount = bankAccounts[0];

        // act / assert
        expect(function () { theAtm.getBalance(); }).toThrowError(Error);
    });

    it("should receive an error if they try to log off", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);
        var testAccount = bankAccounts[0];

        // act / assert
        expect(function () { theAtm.logout(); }).toThrowError(Error);
    });

    it("should receive an error if they try to reset the auto log off timer", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);
        var testAccount = bankAccounts[0];

        // act / assert
        expect(function () { theAtm.setAutoLogOff(); }).toThrowError(Error);
    });

    it("should receive an error if they try to withdraw money", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);
        var testAccount = bankAccounts[0];

        // act / assert
        expect(function () { theAtm.withdraw(); }).toThrowError(Error);
    });
});

describe("Atm: An authenticated user", function(){

    it("should be able to change the pin on their account", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);
        var testAccount = bankAccounts[0];
        var currentPin = testAccount.pin;
        var newPin = 1111

        // act
        theAtm.authenticate(testAccount.accountNumber, currentPin);
        theAtm.changePin(currentPin, newPin, newPin);

        // assert
        expect(testAccount.pin).not.toBe(currentPin);
        expect(testAccount.pin).toBe(newPin);
    });

    it("should receive an error when trying to change their pin and entering in an incorrect current pin", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);
        var testAccount = bankAccounts[0];
        var incorrectPin = 1111

        // act / assert
        theAtm.authenticate(testAccount.accountNumber, testAccount.pin);
        expect(function () { theAtm.changePin(incorrectPin, 3333, 3333); }).toThrowError(Error);
    });

    it("should receive an error when trying to change their pin, and the new pin and new pin compare don't match", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);
        var testAccount = bankAccounts[0];

        // act / assert
        theAtm.authenticate(testAccount.accountNumber, testAccount.pin);
        expect(function () { theAtm.changePin(testAccount.pin, 5555, 3333); }).toThrow(new Error("New pin does not match new pin compare"));
    });

    it("should be able to view the first name and last name of the account holder", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);
        var testAccount = bankAccounts[0];
        var expected = testAccount.firstName + ' ' + testAccount.lastName;

        // act
        theAtm.authenticate(testAccount.accountNumber, testAccount.pin);
        var actual = theAtm.getAccountName();

        // assert
        expect(expected).toBe(actual);
    });

    it("should be able to retrieve their account balance", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);
        var testAccount = bankAccounts[0];
        var expected = testAccount.balance;

        // act
        theAtm.authenticate(testAccount.accountNumber, testAccount.pin);
        var actual = theAtm.getBalance();

        // assert
        expect(expected).toBe(actual);
    });

    it("should be able to log out of their account", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);
        var testAccount = bankAccounts[0];

        // act / assert
        expect(theAtm.isAuthenticated).toBe(false);

        theAtm.authenticate(testAccount.accountNumber, testAccount.pin);
        
        expect(theAtm.isAuthenticated).toBe(true);

        theAtm.logout();

        expect(theAtm.isAuthenticated).toBe(false);
    });

    it("should be able to withdraw money from their account", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);
        var testAccount = bankAccounts[0];
        var priorBalance = testAccount.balance;
        var withdrawAmount = 500;

        // act
        theAtm.authenticate(testAccount.accountNumber, testAccount.pin);
        theAtm.withdraw(withdrawAmount);

        // assert
        expect(testAccount.balance).toBe(priorBalance - withdrawAmount);
        expect(testAccount.balance).not.toBe(priorBalance);
    });

    it("should be able to withdraw all of the money from their account", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);
        var testAccount = bankAccounts[0];
        var priorBalance = testAccount.balance;

        // act
        theAtm.authenticate(testAccount.accountNumber, testAccount.pin);
        theAtm.withdraw(priorBalance);

        // assert
        expect(testAccount.balance).toBe(0);
        expect(testAccount.balance).not.toBe(priorBalance);
    });

    it("should not be allowed to overdraft their account", function () {
        // arrange
        var bankAccounts = [
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

        var theAtm = new Atm(bankAccounts);
        var testAccount = bankAccounts[0];
        var priorBalance = testAccount.balance;

        // act / assert
        theAtm.authenticate(testAccount.accountNumber, testAccount.pin);
        expect(function () { theAtm.withdraw(priorBalance + .01); }).toThrow(new Error("Insufficient Funds"));
    });
});