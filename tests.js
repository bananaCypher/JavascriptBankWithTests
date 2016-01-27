var assert = require('assert');
var Account = require ('./account');
var Bank = require ('./bank');

var testAccounts = function(){
    return [
        new Account('Callum', 200000, 'personal'),
        new Account('John', 800000, 'personal'),
        new Account('Iain', 20000, 'personal'),
        new Account('Ryan', 4000000, 'business'),
        new Account('Cameron', 2000000, 'business'),
        new Account('Sarah', 1000000, 'business'),
        new Account('Emma', 7400000, 'business'),
        new Account('Julie', 3000000, 'business'),
        new Account('Lorraine', 2000, 'personal'),
        new Account('Samantha', 250000, 'personal'),
    ]
};
var bankWithAccounts = function() {
    var bank = new Bank();
    for (account of testAccounts()) {
        bank.addAccount(account);
    } 
    return bank;
};

describe('Account', function(){
    it('has account holder name', function(){
        var account = new Account('Callum', 200000, 'personal');
        assert.equal('Callum', account.holderName);
    });
    it("can't have a blank name", function(){
        var account = new Account('', 200000, 'personal');
        assert.equal(true, account.invalid); 
    });
    it('has a balance', function(){
        var account = new Account('Callum', 200000, 'personal');
        assert.equal(200000, account.balance);
    });
    it("balance can't be a float(balance is in pence)", function(){
        var account = new Account('Callum', 150.25, 'personal');
        assert.equal(true, account.invalid);
    });
    it('has an account type', function(){
        var account = new Account('Callum', 200000, 'personal');
        assert.equal('personal', account.type);
    });
    it('can have account type of personal', function(){
        var account = new Account('Callum', 200000, 'personal');
        assert.equal('personal', account.type);
    });
    it('can have account type of business', function(){
        var account = new Account('Callum', 200000, 'business');
        assert.equal('business', account.type);
    });
    it("account type can't be blank", function(){
        var account = new Account('Callum', 200000, '');
        assert.equal(true, account.invalid);
    });
    it("account type must be business or personal", function(){
        var account = new Account('Callum', 200000, 'testing123');
        assert.equal(true, account.invalid);
    });
});

describe('Bank', function(){
    it('can add an account', function(){
        var bank = new Bank();
        var account = new Account('Callum', 200000, 'personal');
        bank.addAccount(account);
        assert.equal(1, bank.accounts.length);
    });
    it('can find account by name', function(){
        var bank = bankWithAccounts();
        var accounts = testAccounts();
        assert.deepEqual(accounts[0], bank.findByName('Callum'));
    });
    it('can find account with wrong case', function(){
        var bank = bankWithAccounts();
        var accounts = testAccounts();
        assert.deepEqual(accounts[3], bank.findByName('ryan'));
    });
    it("will return null if can't find account with name", function(){
        var bank = bankWithAccounts();
        var accounts = testAccounts();
        assert.equal(null, bank.findByName('lolnope'));
    });
    it("will find the largest account", function(){
        var bank = bankWithAccounts();
        var accounts = testAccounts();
        assert.deepEqual(accounts[6], bank.findLargestAccount());
    });
    it('will find the total balance of all accounts', function(){
        var bank = bankWithAccounts();
        assert.equal(186720.00, bank.findTotalBalance());
    });
    it('will find the average account balance of all accounts', function(){
        var bank = bankWithAccounts();
        assert.equal(18672.00, bank.findAverageBalance());
    });
    it('will find the total value for account type personal', function(){
        var bank = bankWithAccounts();
        assert.equal(12720.00, bank.findTotalBalanceOfAccountType('personal'));
    });
    it('will find the total value for account type business', function(){
        var bank = bankWithAccounts();
        assert.equal(174000.00, bank.findTotalBalanceOfAccountType('business'));
    });
    it("will return null if account type isn't personal or business", function(){
        var bank = bankWithAccounts();
        assert.equal(null, bank.findTotalBalanceOfAccountType('testing123'));
    });
});
