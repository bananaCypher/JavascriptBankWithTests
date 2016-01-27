var Bank = function(){
    this.accounts = [];
    this.allowedTypes = ['personal', 'business'];
};

Bank.prototype = {
    addAccount: function(account){
       this.accounts.push(account); 
    },
    findByName: function(name){
        name = name.toLowerCase();
        for (account of this.accounts) {
            if (account.holderName.toLowerCase() == name) return account;
        } 
        return null;
    },
    findLargestAccount: function(){
        var largest = this.accounts[0];
        for (account of this.accounts) {
            if (account.balance > largest.balance) largest = account;
        }
        return largest;
    },
    findTotalBalance: function(){
        var sum = 0;
        for (account of this.accounts) {
            sum += account.balance;
        }
        return this.penceToPounds(sum);
    },
    findAverageBalance: function(){
        var total = this.findTotalBalance() * 100;
        return this.penceToPounds(total / this.accounts.length);
    },
    findTotalBalanceOfAccountType: function(type){
        var sum = 0;
        if (this.checkType(type) == false) return null;
        for (account of this.accounts) {
            if (this.checkType(account.type) && account.type == type) {
                sum += account.balance; 
            }
        }
        return this.penceToPounds(sum);
    },
    checkType: function(type) {
        var valid = false;
        for (testType of this.allowedTypes) {
            if (testType == type) valid = true; 
        }
        return valid;
    },
    penceToPounds: function(pence) {
        return pence / 100;
    },
};

module.exports = Bank;
