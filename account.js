class Acc {
    constructor(amount) {
        this.amount = amount || 0;
    }
    creditAtm(amount) {
        this.amount = this.amount + amount
    }
    checkbalance() {
        return `Your balance is ${this.amount}`
    }
    withdraw(amount) {
        this.amount = this.amount - amount
    }

}

const acc = new Acc()

module.exports = acc