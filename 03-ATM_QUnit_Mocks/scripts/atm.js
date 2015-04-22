function Atm(accounts) {
    var currentAccount = null;
    var autoLogOutTimer = null;
    var isAuthenticated = false;


    var authenticate = function (accountNumber, pin) {
        if (isAuthenticated) {
            throw new Error("Already Authenticated");
        }

        for (var i = 0; i < accounts.length; i++) {
            if (accounts[i].accountNumber === accountNumber && accounts[i].pin === pin) {
                currentAccount = accounts[i];
                isAuthenticated = true;

                setAutoLogOff();
                
                return;
            }
        }

        throw new Error("Authentication Failed");
    }

    var changePin = function (currentPin, newPin, newPinCompare) {
        if (isAuthenticated) {
            setAutoLogOff();

            if (currentAccount.pin !== currentPin) {
                throw new Error("Incorrect Pin");
            }

            if (newPin !== newPinCompare) {
                throw new Error("New pin does not match new pin compare");
            }

            currentAccount.pin = newPin;

            return;
        }

        throw new Error("You must authenticate before you can change your pin");
    };

    var getAccountName = function () {
        if (isAuthenticated) {
            setAutoLogOff();
            return currentAccount.firstName + " " + currentAccount.lastName;
        }

        throw new Error("You must authenticate before you can get the account name");
    };

    var getBalance = function () {
        if (isAuthenticated) {
            setAutoLogOff();
            return currentAccount.balance;
        }

        throw new Error("You must authenticate before you get the balance of your account");
    };

    var logout = function () {
        if (isAuthenticated) {
            currentAccount = null;
            isAuthenticated = false;

            clearTimeout(autoLogOutTimer);

            autoLogOutTimer = null;
            return;
        }

        throw new Error("You must authenticate before you can logout");
    };

    var setAutoLogOff = function () {
        if (isAuthenticated) {
            if (autoLogOutTimer != null) {
                clearTimeout(autoLogOutTimer);
            }

            autoLogOutTimer = setTimeout(function () {
                logout();
            }, 30000);

            return;
        }

        throw new Error("You must authenticate before you can set an auto log off timer");
    };

    var withdraw = function (amount) {
        setAutoLogOff();

        if (isAuthenticated) {
            if (amount > currentAccount.balance) {
                throw Error("Insufficient Funds");
            }

            currentAccount.balance = currentAccount.balance - amount;

            return;
        }

        throw new Error("You must authenticate before you can withdraw funds from your account");
    };

    return {
        authenticate: authenticate,
        changePin: changePin,
        getAccountName: getAccountName,
        getBalance: getBalance,
        get isAuthenticated() { return isAuthenticated; },
        logout: logout,
        setAutoLogOff: setAutoLogOff,
        withdraw: withdraw
    };
}