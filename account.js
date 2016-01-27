var Account = function(name, balance, type){
    if (name) {this.holderName = name} else {return {invalid:true}};
    if (balance % 1 == 0) {this.balance = balance} else {return {invalid:true}};
    if (type == 'personal' || type == 'business') {this.type = type} else {return {invalid:true}};
};

module.exports = Account;
